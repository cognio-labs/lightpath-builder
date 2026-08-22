import { NextRequest, NextResponse } from "next/server";
import { DIVINE_SYSTEM_PROMPT, sanitizeAIResponse } from "@/lib/ai/divine-system-prompt";
import { retrieveRelevantKnowledge } from "@/lib/ai/knowledge-retrieval";
import { cleanTextForSpeech } from "@/lib/voice/text-cleaner";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface DivineAIRequestPayload {
  messages?: ChatMessage[];
  message?: string;
  mode?: "voice" | "chat";
  isVoiceMode?: boolean;
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
  return greetings.some(
    (g) => q === g || q === `${g}!` || q === `${g}?` || q === `${g} ji` || q === `${g} guruji`
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DivineAIRequestPayload;

    // Extract user message from messages array or message field
    let userText = "";
    const conversationHistory: ChatMessage[] = [];

    if (Array.isArray(body.messages) && body.messages.length > 0) {
      const lastMsg = body.messages[body.messages.length - 1];
      if (lastMsg.role === "user") {
        userText = lastMsg.content?.trim() || "";
      }
      conversationHistory.push(...body.messages.slice(-6, -1));
    } else if (body.message) {
      userText = body.message.trim();
    }

    if (!userText) {
      return NextResponse.json({ error: "User message is required" }, { status: 400 });
    }

    const isVoice = body.mode === "voice" || Boolean(body.isVoiceMode);
    const isGreeting = isCasualGreeting(userText);

    // 1. Retrieve verified Science Divine knowledge (only when not a basic greeting)
    const retrieval = isGreeting
      ? { contextText: "", sourceItems: [], primaryLinks: [] }
      : retrieveRelevantKnowledge(userText);

    // 2. OpenRouter Config from Server Environment — 2 SEPARATE DEDICATED MODELS
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

    // 🌟 Voice Model (Ultra-fast, conversational 1-2 line speech) vs Chat Model (Deep, rich wisdom)
    const voiceModel = process.env.OPENROUTER_VOICE_MODEL || "openrouter/free";
    const chatModel = process.env.OPENROUTER_CHAT_MODEL || "nvidia/nemotron-3.5-lightning:free";

    const selectedModel = isVoice ? voiceModel : chatModel;
    const fallbackModel = isVoice ? "google/gemma-4-31b-it:free" : "openrouter/free";

    if (openrouterKey) {
      const voiceInstructions = isVoice
        ? "\n\nVOICE MODE ACTIVE: Keep response strictly to 1-2 short spoken sentences for real-time speech. Never use markdown, asterisks, or bullet lists."
        : "\n\nCHAT MODE ACTIVE: Provide a clear, well-structured, warm response with actionable spiritual guidance.";

      const systemPromptWithKnowledge = isGreeting
        ? `${DIVINE_SYSTEM_PROMPT}${voiceInstructions}`
        : `${DIVINE_SYSTEM_PROMPT}${voiceInstructions}

==================================================
VERIFIED SCIENCE DIVINE KNOWLEDGE BASE:
==================================================
${retrieval.contextText}
==================================================`;

      const messagesForLLM = [
        { role: "system", content: systemPromptWithKnowledge },
        ...conversationHistory.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
        { role: "user", content: userText },
      ];

      const modelsToTry = [
        selectedModel,
        fallbackModel,
        "openrouter/free",
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
              temperature: isVoice ? 0.65 : 0.7,
              max_tokens: isVoice ? 120 : 300,
            }),
          });

          if (llmRes.ok) {
            const data = await llmRes.json();
            const rawContent = data.choices?.[0]?.message?.content?.trim();
            if (rawContent) {
              const sanitizedAnswer = sanitizeAIResponse(rawContent);
              const spokenText = cleanTextForSpeech(sanitizedAnswer);

              return NextResponse.json({
                answer: sanitizedAnswer,
                response: sanitizedAnswer,
                spokenText,
                sources: retrieval.sourceItems,
                links: retrieval.primaryLinks,
                modelUsed: model,
                mode: isVoice ? "voice" : "chat",
              });
            }
          }
        } catch (modelErr) {
          console.warn(`Call to model ${model} failed:`, modelErr);
        }
      }
    }

    // 3. Fallback Local Synthesizer
    const fallbackAnswer = synthesizeKnowledgeResponse(userText, retrieval);
    const sanitizedFallback = sanitizeAIResponse(fallbackAnswer);
    const spokenText = cleanTextForSpeech(sanitizedFallback);

    return NextResponse.json({
      answer: sanitizedFallback,
      response: sanitizedFallback,
      spokenText,
      sources: retrieval.sourceItems,
      links: retrieval.primaryLinks,
      modelUsed: "knowledge-engine-local",
      mode: isVoice ? "voice" : "chat",
    });
  } catch (error: any) {
    console.error("Divine AI API error:", error);
    const safeErrorAnswer =
      "🙏 Hari Om! Connection mein thodi samasya aa rahi hai. Kripya apna prashna punah poochhein.";
    return NextResponse.json(
      {
        answer: safeErrorAnswer,
        response: safeErrorAnswer,
        spokenText: "Hari Om! Kripya apna prashna punah poochhein.",
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
    /\b(hai|hain|kya|kaun|kaise|karo|batao|kripya|unka|unki|mujhe|chahiye|kahan|kab|haal)\b/i.test(
      query
    );

  // Casual Greeting
  if (isCasualGreeting(query)) {
    if (isHindi) {
      return "Hey! Hari Om 🙏 Kaise hain aap? Aaj kis baare mein baat karna chahenge?";
    }
    return "Hey! Hari Om 🙏 How are you doing today? How can I assist you with Science Divine or Guru Ji's teachings?";
  }

  // Who is Sakshi Shree / Guru Ji
  if (
    q.includes("guru ji") ||
    q.includes("sakshi shree") ||
    q.includes("who is") ||
    q.includes("kaun hain")
  ) {
    if (isHindi) {
      return "🙏 Sakshi Shree enlightened spiritual master hain aur Science Divine Movement ke sansthapak hain. Unka mool sandesh hai 'Bheetar se sanyaas, bahar se sansaar' — yaani sansaar ke saare kaam nibhate hue bheetar se shaant aur sakshi bhaav mein jeena.";
    }
    return "🙏 Sakshi Shree is an enlightened spiritual master and the guide behind Science Divine Movement. He teaches 'Bheetar se sanyaas, bahar se sansaar' — living with inner peace and detachment while fulfilling all worldly and family duties.";
  }

  // Teachings
  if (q.includes("teaching") || q.includes("philosophy") || q.includes("kya sikhate")) {
    if (isHindi) {
      return "Sakshi Shree ki shiksha 3 mukhya pillars par aadharit hai: 1. Sound Body (Swasth Shareer), 2. Sound Mind (Shant aur Sakarātmak Man), aur 3. Self Realization (Aatm-Sakshatkar).";
    }
    return "Sakshi Shree's teachings center on three core pillars: Sound Body (physical vitality), Sound Mind (mental clarity & peace), and Self Realization (spiritual awakening).";
  }

  // Courses
  if (q.includes("course") || q.includes("program")) {
    if (isHindi) {
      return "Science Divine ke 4 mukhya transformational courses hain: Design Your Destiny, Science of Joyful Living, Mind Power Meditation, aur Sanjeevani Kriya.";
    }
    return "Science Divine offers four core transformational courses: Design Your Destiny, Science of Joyful Living, Mind Power Meditation, and Sanjeevani Kriya.";
  }

  if (retrieval.sourceItems.length > 0) {
    return retrieval.sourceItems[0].content;
  }

  if (isHindi) {
    return "Aap Guru Ji ke pravachan, meditation techniques, courses ya session booking ke vishay mein pooch sakte hain.";
  }
  return "You can ask me about Guru Ji's teachings, meditation techniques, courses, or booking a personal session.";
}
