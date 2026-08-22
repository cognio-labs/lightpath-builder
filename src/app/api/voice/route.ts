import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DEFAULT_ELEVENLABS_VOICE_ID = "gHu9GtaHOXcSqFTK06ux";
const MAX_SPEECH_CHARACTERS = 1_200;
const REQUESTS_PER_MINUTE = 20;

const speechInputSchema = z.object({
  text: z.string().trim().min(1).max(MAX_SPEECH_CHARACTERS),
});

let rateWindowStartedAt = Date.now();
let requestsInWindow = 0;
let providerUnavailableUntil = 0;

function checkRateLimit() {
  const now = Date.now();
  if (now - rateWindowStartedAt >= 60_000) {
    rateWindowStartedAt = now;
    requestsInWindow = 0;
  }

  requestsInWindow += 1;
  if (requestsInWindow > REQUESTS_PER_MINUTE) {
    throw new Error("Voice service is busy. Please try again in a minute.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = speechInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { text } = parsed.data;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        available: false,
        reason: "not-configured",
      });
    }

    if (Date.now() < providerUnavailableUntil) {
      return NextResponse.json({
        available: false,
        reason: "temporarily-unavailable",
      });
    }

    checkRateLimit();

    const voiceId =
      process.env.ELEVENLABS_VOICE_ID || DEFAULT_ELEVENLABS_VOICE_ID;
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.42,
            similarity_boost: 0.84,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const requestId = response.headers.get("request-id");
      if (response.status === 402) {
        providerUnavailableUntil = Date.now() + 5 * 60_000;
      } else if (response.status === 429) {
        providerUnavailableUntil = Date.now() + 60_000;
      }

      console.warn(
        "ElevenLabs TTS unavailable; browser voice fallback enabled",
        {
          status: response.status,
          requestId,
        }
      );

      return NextResponse.json({
        available: false,
        reason:
          response.status === 402 ? "payment-required" : "provider-error",
      });
    }

    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");
    const contentType =
      response.headers.get("content-type") || "audio/mpeg";

    return NextResponse.json({
      available: true,
      audioBase64,
      contentType,
    });
  } catch (error) {
    console.error("Voice API error:", error);
    return NextResponse.json(
      { available: false, reason: "provider-error" },
      { status: 500 }
    );
  }
}
