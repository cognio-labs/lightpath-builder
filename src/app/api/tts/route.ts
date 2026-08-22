import { NextRequest, NextResponse } from "next/server";
import { cleanTextForSpeech } from "@/lib/voice/text-cleaner";
import { sanitizeAIResponse } from "@/lib/ai/divine-system-prompt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawText = body.text?.trim();

    if (!rawText) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const sanitized = sanitizeAIResponse(rawText);
    const cleanText = cleanTextForSpeech(sanitized);

    if (!cleanText || cleanText.length < 1) {
      return NextResponse.json({ available: false, reason: "empty-text" }, { status: 200 });
    }

    const freeAiKey = process.env.FREE_AI_API_KEY?.trim();
    const openrouterKey = process.env.OPENROUTER_API_KEY?.trim();

    // 1. Primary: Free.ai TTS (Kokoro model preferred)
    if (freeAiKey) {
      try {
        const freeAiRes = await fetch("https://api.free.ai/v1/audio/speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${freeAiKey}`,
          },
          body: JSON.stringify({
            model: "kokoro",
            input: cleanText,
            voice: "af_bella",
            response_format: "mp3",
          }),
        });

        if (freeAiRes.ok) {
          const audioBuffer = await freeAiRes.arrayBuffer();
          const audioBase64 = Buffer.from(audioBuffer).toString("base64");
          return NextResponse.json({
            available: true,
            audioBase64,
            contentType: "audio/mpeg",
            provider: "free.ai",
          });
        }
      } catch (freeErr) {
        console.warn("Free.ai TTS attempt failed, trying fallback:", freeErr);
      }
    }

    // 2. Secondary: OpenRouter TTS (Fish Audio / OpenAI compatible speech)
    if (openrouterKey) {
      try {
        const openrouterTtsRes = await fetch("https://openrouter.ai/api/v1/audio/speech", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openrouterKey}`,
            ...(process.env.OPENROUTER_SITE_URL ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL } : {}),
            ...(process.env.OPENROUTER_SITE_NAME ? { "X-Title": process.env.OPENROUTER_SITE_NAME } : {}),
          },
          body: JSON.stringify({
            model: process.env.OPENROUTER_TTS_MODEL || "fish-audio/s2.1-pro-free:free",
            input: cleanText,
            response_format: "mp3",
          }),
        });

        if (openrouterTtsRes.ok) {
          const audioBuffer = await openrouterTtsRes.arrayBuffer();
          const audioBase64 = Buffer.from(audioBuffer).toString("base64");
          const contentType = openrouterTtsRes.headers.get("content-type") || "audio/mpeg";

          return NextResponse.json({
            available: true,
            audioBase64,
            contentType,
            provider: "openrouter",
          });
        }
      } catch (orErr) {
        console.warn("OpenRouter TTS fallback failed:", orErr);
      }
    }

    // 3. Fallback to client browser SpeechSynthesis
    return NextResponse.json({
      available: false,
      reason: "client-fallback",
      message: "Browser speech synthesis active.",
    });
  } catch (error: any) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { available: false, reason: "error", message: "TTS temporarily unavailable" },
      { status: 200 }
    );
  }
}
