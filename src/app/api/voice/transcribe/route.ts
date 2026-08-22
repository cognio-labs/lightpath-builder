import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "Audio file is required" }, { status: 400 });
    }

    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const sttModel = process.env.OPENROUTER_STT_MODEL || "openai/whisper-large-v3";
    const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

    if (openrouterKey) {
      try {
        const outFormData = new FormData();
        outFormData.append("file", file, "audio.webm");
        outFormData.append("model", sttModel);
        outFormData.append("language", "hi");

        const sttRes = await fetch(`${baseUrl}/audio/transcriptions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openrouterKey}`,
            ...(process.env.OPENROUTER_SITE_URL
              ? { "HTTP-Referer": process.env.OPENROUTER_SITE_URL }
              : {}),
            ...(process.env.OPENROUTER_SITE_NAME
              ? { "X-Title": process.env.OPENROUTER_SITE_NAME }
              : {}),
          },
          body: outFormData,
        });

        if (sttRes.ok) {
          const data = await sttRes.json();
          const transcript = data.text?.trim();
          if (transcript) {
            return NextResponse.json({ text: transcript });
          }
        }
      } catch (sttErr) {
        console.warn("OpenRouter STT request failed:", sttErr);
      }
    }

    return NextResponse.json({
      text: "",
      fallback: true,
    });
  } catch (error: any) {
    console.error("Transcribe API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
