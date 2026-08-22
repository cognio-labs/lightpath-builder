import { NextRequest, NextResponse } from "next/server";
import { DIVINE_SYSTEM_PROMPT } from "@/lib/ai/divine-system-prompt";
import { retrieveRelevantKnowledge } from "@/lib/ai/knowledge-retrieval";
import { cleanTextForSpeech } from "@/lib/voice/text-cleaner";

interface VoiceChatPayload {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
  isVoiceMode?: boolean;
}

// Helper to strip thinking tags from reasoning models
function cleanModelOutput(text: string): string {
  let cleaned = text;
  // Remove <think>...</think>
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "");
  // Remove markdown headers like "Here's a thinking process:"
  cleaned = cleaned.replace(/^(?:Here's a thinking process:|Thinking Process:)[\s\S]*?\n\n/i, "");
  return cleaned.trim();
}

function isCasualGreeting(query: string): boolean {
  const q = query.toLowerCase().trim();
  const greetings = [
    "hey",
    "hi",
    "hello",
    "namaste",
    "hari om",
    "kaise ho",
    "kya haal hai",
    "good morning",
    "good evening",
    "good afternoon",
    "who are you",
    "aap kaun ho",
    "tum kaun ho",
    "sup",
    "yo",
  ];
  return greetings.some((g) => q === g || q === `${g}!` || q === `${g}?` || q === `${g} ji`);
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
    const isGreeting = isCasualGreeting(message);

    // 1. Retrieve knowledge only if not a simple greeting
    const retrieval = isGreeting
      ? { contextText: "", sourceItems: [], primaryLinks: [] }
      : retrieveRelevantKnowledge(message);

    // 2. OpenRouter Model configuration from env
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const primaryModel = process.env.OPENROUTER_CHAT_MODEL || "nvidia/nemotron-3.5-lightning:free";
    const fallbackModel = process.env.OPENROUTER_CHAT_FALLBACK_MODEL || "openrouter/free";
    const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

    if (openrouterKey) {
      const voiceInstructions = isVoiceMode
        ? "\n\nVOICE MODE ACTIVE: Keep response very concise (1-2 short spoken sentences). Do NOT use bullet points, asterisks, or markdown. Use natural conversational Hindi/Hinglish/English."
        : "";

      const systemPromptWithKnowledge = isGreeting
        ? `${DIVINE_SYSTEM_PROMPT}${voiceInstructions}`
        : `${DIVINE_SYSTEM_PROMPT}${voiceInstructions}

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
        "openrouter/free",
        fallbackModel,
        "google/gemma-4-31b-it:free",
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
              temperature: 0.7,
              max_tokens: isVoiceMode ? 150 : 280,
            }),
          });

          if (llmRes.ok) {
            const data = await llmRes.json();
            let rawContent = data.choices?.[0]?.message?.content?.trim();
            if (rawContent) {
              rawContent = cleanModelOutput(rawContent);
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

    // 3. Fallback to Natural Synthesizer
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
  const q = query.toLowerCase().trim();
  const isHindi =
    /[\u0900-\u097F]/.test(query) ||
    /\b(hai|hain|kya|kaun|kaise|karo|batao|kripya|unka|unki|mujhe|chahiye|kahan|kab|haal)\b/i.test(query);

  // Casual Greeting
  if (isCasualGreeting(query)) {
    if (isHindi) {
      return "Hey! Hari Om 🙏 Kaise hain aap? Aaj kis baare mein baat karna chahenge? Guru Ji ke pravachan, meditation ya courses ke vishay mein pooch sakte hain.";
    }
    return "Hey! Hari Om & Namaste 🙏 How are you doing today? How can I assist you with Guru Ji's teachings, meditation, or courses?";
  }

  // Who is Guru Ji
  if (q.includes("guru ji kaun") || q.includes("sakshi shree kaun") || q.includes("who is sakshi shree") || q.includes("who is guru")) {
    if (isHindi) {
      return "🙏 Sakshi Shree Science Divine Movement ke margdarshak aur enlightened spiritual master hain. Unka mool mantra hai 'Bheetar se sanyaas, bahar se sansaar' — yaani sansaar ke kartavyon ko nibhate hue bheetar se shant aur sakshi bhaav mein jeena.";
    }
    return "🙏 Sakshi Shree is an enlightened spiritual master and the founder-guide of Science Divine Movement. He teaches 'Bheetar se sanyaas, bahar se sansaar' — living with inner peace while excelling in worldly and family duties.";
  }

  // Teachings
  if (q.includes("teaching") || q.includes("philosophy") || q.includes("kya sikhate") || q.includes("sikhate hain")) {
    if (isHindi) {
      return "Guru Ji ki shiksha practical spirituality par aadharit hai jiske 3 mukhya pillars hain: 1. Sound Body (Yoga aur Pranayama), 2. Sound Mind (Mind Power Meditation aur Sakshi Bhaav), aur 3. Self Realization (divine awakening).";
    }
    return "Sakshi Shree's teachings focus on three pillars: Sound Body (physical health), Sound Mind (clarity & freedom from anxiety), and Self Realization (spiritual awakening).";
  }

  // Courses
  if (q.includes("course") || q.includes("courses") || q.includes("program")) {
    if (isHindi) {
      return "Science Divine ke 4 mukhya courses hain: Design Your Destiny, Science of Joyful Living, Mind Power Meditation, aur Sanjeevani Kriya. Aap Courses section mein inki details dekh sakte hain.";
    }
    return "Science Divine offers four core transformational courses: Design Your Destiny, Science of Joyful Living, Mind Power Meditation, and Sanjeevani Kriya. You can explore details on the Courses page.";
  }

  // If specific item retrieved
  if (retrieval.sourceItems.length > 0) {
    const topItem = retrieval.sourceItems[0];
    return topItem.content;
  }

  if (isHindi) {
    return "Aap Guru Ji ke pravachan, meditation techniques, courses ya personal session booking ke vishay mein pooch sakte hain.";
  }
  return "You can ask me about Guru Ji's teachings, meditation techniques, courses, or booking a personal session.";
}
