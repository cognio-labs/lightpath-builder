import { NextRequest, NextResponse } from "next/server";
import { cleanTextForSpeech } from "@/lib/voice/text-cleaner";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawText = body.text?.trim();

    if (!rawText) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const cleanText = cleanTextForSpeech(rawText);

    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const primaryTtsModel = process.env.OPENROUTER_TTS_MODEL || "fish-audio/s2.1-pro-free:free";
    const fallbackTtsModel = process.env.OPENROUTER_TTS_FALLBACK_MODEL || "deepgram/flux-tts:free";
    const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
    const voice = process.env.OPENROUTER_TTS_VOICE || "";
    const format = process.env.OPENROUTER_TTS_FORMAT || "mp3";

    // 1. Try OpenRouter TTS Models
    if (openrouterKey) {
      const modelsToTry = [primaryTtsModel, fallbackTtsModel];

      for (const model of modelsToTry) {
        try {
          const ttsRes = await fetch(`${baseUrl}/audio/speech`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openrouterKey}`,
              ...(process.env.OPENROUTER_SITE_URL
                ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL }
                : {}),
              ...(process.env.OPENROUTER_SITE_NAME
                ? { "X-Title": process.env.OPENROUTER_SITE_NAME }
                : {}),
            },
            body: JSON.stringify({
              model,
              input: cleanText,
              voice: voice || undefined,
              response_format: format,
            }),
          });

          if (ttsRes.ok) {
            const audioBuffer = await ttsRes.arrayBuffer();
            const audioBase64 = Buffer.from(audioBuffer).toString("base64");
            const contentType = ttsRes.headers.get("content-type") || "audio/mpeg";

            return NextResponse.json({
              available: true,
              audioBase64,
              contentType,
              modelUsed: model,
            });
          } else {
            console.warn(`TTS Model ${model} returned status:`, ttsRes.status);
          }
        } catch (ttsErr) {
          console.warn(`TTS call to ${model} failed:`, ttsErr);
        }
      }
    }

    // 2. Try ElevenLabs fallback if configured
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
    if (elevenLabsKey) {
      try {
        const voiceId = process.env.ELEVENLABS_VOICE_ID || "gHu9GtaHOXcSqFTK06ux";
        const elRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
          {
            method: "POST",
            headers: {
              Accept: "audio/mpeg",
              "Content-Type": "application/json",
              "xi-api-key": elevenLabsKey,
            },
            body: JSON.stringify({
              text: cleanText,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.45,
                similarity_boost: 0.85,
                style: 0.25,
                use_speaker_boost: true,
              },
            }),
          }
        );

        if (elRes.ok) {
          const audioBuffer = await elRes.arrayBuffer();
          const audioBase64 = Buffer.from(audioBuffer).toString("base64");
          return NextResponse.json({
            available: true,
            audioBase64,
            contentType: "audio/mpeg",
            modelUsed: "elevenlabs",
          });
        }
      } catch (elErr) {
        console.warn("ElevenLabs backup TTS failed:", elErr);
      }
    }

    // 3. Fallback to client-side browser speech
    return NextResponse.json({
      available: false,
      reason: "client-fallback",
      message: "Browser speech synthesis fallback enabled.",
    });
  } catch (error: any) {
    console.error("Speak API error:", error);
    return NextResponse.json(
      { available: false, reason: "error", error: error.message },
      { status: 500 }
    );
  }
}
