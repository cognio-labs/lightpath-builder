import { NextRequest, NextResponse } from "next/server";
import { DIVINE_SYSTEM_PROMPT } from "@/lib/ai/divine-system-prompt";
import { retrieveRelevantKnowledge } from "@/lib/ai/knowledge-retrieval";
import { cleanTextForSpeech } from "@/lib/voice/text-cleaner";

interface VoiceChatPayload {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
  isVoiceMode?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VoiceChatPayload;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const history = body.history || [];
    const isVoiceMode = Boolean(body.isVoiceMode);

    // 1. Retrieve verified Science Divine knowledge (RAG)
    const retrieval = retrieveRelevantKnowledge(message);

    // 2. OpenRouter Model configuration from env
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const primaryModel = process.env.OPENROUTER_CHAT_MODEL || "openrouter/free";
    const fallbackModel = process.env.OPENROUTER_CHAT_FALLBACK_MODEL || "openrouter/free";
    const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

    if (openrouterKey) {
      const voiceInstructions = isVoiceMode
        ? "\n\nVOICE MODE ACTIVE: Keep response very concise (1-3 short spoken sentences). Do NOT use bullet points, asterisks, or markdown. Use natural conversational Hindi/Hinglish/English."
        : "";

      const systemPromptWithKnowledge = `${DIVINE_SYSTEM_PROMPT}${voiceInstructions}

==================================================
VERIFIED SCIENCE DIVINE KNOWLEDGE BASE (GROUND TRUTH):
==================================================
${retrieval.contextText}
==================================================`;

      const messagesForLLM = [
        { role: "system", content: systemPromptWithKnowledge },
        ...history.slice(-6).map((h) => ({
          role: h.role === "assistant" ? "assistant" : "user",
          content: h.content,
        })),
        { role: "user", content: message },
      ];

      const modelsToTry = [
        primaryModel,
        fallbackModel,
        "openrouter/free",
        "google/gemma-4-31b-it:free",
        "nvidia/nemotron-3.5-lightning:free",
      ];

      for (const model of modelsToTry) {
        try {
          const llmRes = await fetch(`${baseUrl}/chat/completions`, {
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
              messages: messagesForLLM,
              temperature: 0.5,
              max_tokens: isVoiceMode ? 200 : 350,
            }),
          });

          if (llmRes.ok) {
            const data = await llmRes.json();
            const rawContent = data.choices?.[0]?.message?.content?.trim();
            if (rawContent) {
              const spokenText = cleanTextForSpeech(rawContent);
              return NextResponse.json({
                response: rawContent,
                spokenText,
                sources: retrieval.sourceItems,
                links: retrieval.primaryLinks,
                modelUsed: model,
              });
            }
          }
        } catch (modelErr) {
          console.warn(`Call to model ${model} failed:`, modelErr);
        }
      }
    }

    // 3. Fallback to Science Divine Knowledge Synthesizer
    const fallbackAnswer = synthesizeKnowledgeResponse(message, retrieval);
    const spokenText = cleanTextForSpeech(fallbackAnswer);

    return NextResponse.json({
      response: fallbackAnswer,
      spokenText,
      sources: retrieval.sourceItems,
      links: retrieval.primaryLinks,
      modelUsed: "knowledge-engine-local",
    });
  } catch (error: any) {
    console.error("Voice Chat API error:", error);
    return NextResponse.json(
      {
        response:
          "🙏 Hari Om! Main aapka Divine AI Guide hoon. Kripya apna prashna thoda aur spasht batayein.",
        spokenText: "Hari Om! Main aapka Divine AI Guide hoon. Kripya apna prashna thoda aur spasht batayein.",
        sources: [],
        links: [],
      },
      { status: 200 }
    );
  }
}

function synthesizeKnowledgeResponse(
  query: string,
  retrieval: ReturnType<typeof retrieveRelevantKnowledge>
): string {
  const q = query.toLowerCase();
  const isHindi =
    /[\u0900-\u097F]/.test(query) ||
    /\b(hai|hain|kya|kaun|kaise|karo|batao|kripya|unka|unki|mujhe|chahiye|kahan|kab)\b/i.test(query);

  if (q.includes("guru ji kaun") || q.includes("sakshi shree kaun") || q.includes("who is sakshi shree") || q.includes("who is guru")) {
    if (isHindi) {
      return "🙏 Sakshi Shree Science Divine Movement ke margdarshak aur enlightened spiritual master hain. Unka sandesh hai 'Bheetar se sanyaas, bahar se sansaar' — yaani sansaar ke kartavyon ko nibhate hue bheetari shanti aur sakshi bhaav mein jeena. Unki teachings Sound Body, Sound Mind aur Self Realization par aadharit hain.";
    }
    return "🙏 Sakshi Shree is an enlightened spiritual master and the guide behind the Science Divine Movement. He teaches 'Bheetar se sanyaas, bahar se sansaar' — cultivating inner peace while fulfilling worldly duties with excellence, focusing on Sound Body, Sound Mind, and Self Realization.";
  }

  if (q.includes("teaching") || q.includes("philosophy") || q.includes("kya sikhate") || q.includes("sikhate hain")) {
    if (isHindi) {
      return "Guru Ji ki core philosophy 'Bheetar se sanyaas, bahar se sansaar' hai, jiske 3 pillars hain: Sound Body (Yoga aur Pranayama), Sound Mind (Meditation aur Sakshi Bhaav), aur Self Realization (apne divya swaroop ka anubhav).";
    }
    return "Sakshi Shree's philosophy focuses on practical spirituality: 'Bheetar se sanyaas, bahar se sansaar', resting upon Sound Body, Sound Mind, and Self Realization.";
  }

  if (q.includes("course") || q.includes("courses") || q.includes("program")) {
    if (isHindi) {
      return "Science Divine ke 4 mukhya courses hain: Design Your Destiny, Science of Joyful Living, Mind Power Meditation, aur Sanjeevani Kriya. Aap Courses page par inka curriculum dekh sakte hain.";
    }
    return "Science Divine features four core courses: Design Your Destiny, Science of Joyful Living, Mind Power Meditation, and Sanjeevani Kriya. You can explore details on the Courses page.";
  }

  if (retrieval.sourceItems.length > 0) {
    const topItem = retrieval.sourceItems[0];
    return topItem.content;
  }

  if (isHindi) {
    return "Mere paas Science Divine ke verified source mein iski jaankari nahi hai. Aap Guru Ji ke pravachan, courses ya meditation ke vishay mein pooch sakte hain.";
  }
  return "I don't have verified information about that in my Science Divine knowledge source. You can ask me about Guru Ji's teachings, courses, or meditation practices.";
}
