import { NextRequest, NextResponse } from "next/server";
import { DIVINE_SYSTEM_PROMPT } from "@/lib/ai/divine-system-prompt";
import { retrieveRelevantKnowledge } from "@/lib/ai/knowledge-retrieval";

interface ChatPayload {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatPayload;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const history = body.history || [];

    // 1. Retrieve verified Science Divine knowledge
    const retrieval = retrieveRelevantKnowledge(message);

    // 2. Check for OpenRouter / LLM key
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

    if (openrouterKey) {
      try {
        const systemPromptWithKnowledge = `${DIVINE_SYSTEM_PROMPT}

==================================================
VERIFIED SCIENCE DIVINE KNOWLEDGE (GROUND TRUTH):
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

        const openrouterEndpoint = process.env.OPENROUTER_API_KEY
          ? "https://openrouter.ai/api/v1/chat/completions"
          : "https://api.openai.com/v1/chat/completions";

        const modelName = process.env.OPENROUTER_API_KEY
          ? "meta-llama/llama-3.3-70b-instruct"
          : "gpt-4o-mini";

        const llmResponse = await fetch(openrouterEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openrouterKey}`,
            ...(process.env.OPENROUTER_API_KEY
              ? {
                  "HTTP-Referer": "https://sciencedivine.org",
                  "X-Title": "Science Divine AI Guide",
                }
              : {}),
          },
          body: JSON.stringify({
            model: modelName,
            messages: messagesForLLM,
            temperature: 0.5,
            max_tokens: 350,
          }),
        });

        if (llmResponse.ok) {
          const data = await llmResponse.json();
          const answer = data.choices?.[0]?.message?.content?.trim();
          if (answer) {
            return NextResponse.json({
              response: answer,
              sources: retrieval.sourceItems,
              links: retrieval.primaryLinks,
            });
          }
        }
      } catch (llmErr) {
        console.warn("LLM API call failed, falling back to Knowledge Engine:", llmErr);
      }
    }

    // 3. Fallback: Intelligent Knowledge Engine synthesis
    const synthesizedAnswer = synthesizeKnowledgeResponse(message, retrieval, history);

    return NextResponse.json({
      response: synthesizedAnswer,
      sources: retrieval.sourceItems,
      links: retrieval.primaryLinks,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        response:
          "🙏 Hari Om! Main aapki baat sun raha hoon. Science Divine aur Guru Ji se sambandhit kisi bhi vishesh vishay jaise courses, meditation, ya personal session ke baare mein pooch sakte hain.",
        sources: [],
        links: [],
      },
      { status: 200 }
    );
  }
}

function synthesizeKnowledgeResponse(
  query: string,
  retrieval: ReturnType<typeof retrieveRelevantKnowledge>,
  history: { role: string; content: string }[]
): string {
  const q = query.toLowerCase();

  // Language detection
  const isHindiOrHinglish =
    /[\u0900-\u097F]/.test(query) ||
    /\b(hai|hain|kya|kaun|kaise|karo|batao|kripya|unka|unki|mujhe|chahiye|kahan|kab)\b/i.test(query);

  // Check Guru Ji identity query
  if (q.includes("guru ji kaun") || q.includes("sakshi shree kaun") || q.includes("who is sakshi shree") || q.includes("who is guru")) {
    if (isHindiOrHinglish) {
      return "🙏 Sakshi Shree Science Divine Movement ke margdarshak aur enlightened spiritual master hain. Unka sandesh hai 'Bheetar se sanyaas, bahar se sansaar' — yaani sansaar ke kartavyon ko nibhate hue bheetari shanti aur sakshi bhaav mein jeena. Unki teachings Sound Body, Sound Mind aur Self Realization par aadharit hain.";
    }
    return "🙏 Sakshi Shree is an enlightened spiritual master and the guide behind the Science Divine Movement. He teaches the philosophy of 'Bheetar se sanyaas, bahar se sansaar' — cultivating inner peaceful awareness while actively excelling in everyday worldly duties, focusing on Sound Body, Sound Mind, and Self Realization.";
  }

  // Check teachings/philosophy query
  if (
    q.includes("teaching") ||
    q.includes("philosophy") ||
    q.includes("kya sikhate") ||
    q.includes("sikhate hain") ||
    q.includes("darshan")
  ) {
    if (isHindiOrHinglish) {
      return "Guru Ji ki core philosophy practical spirituality par aadharit hai: 'Bheetar se sanyaas, bahar se sansaar'. Iske teen mukhya stambh hain — 1. Sound Body (Yoga aur Pranayama dwara urja), 2. Sound Mind (Mind Power Meditation aur Sakshi Bhaav dwara chinta mukti), aur 3. Self Realization (apne divya aatma-swaroop ka sakshatkar).";
    }
    return "Sakshi Shree's philosophy is rooted in practical spirituality: 'Bheetar se sanyaas, bahar se sansaar' (inner renunciation, outer responsibility). It encompasses three pillars: Sound Body (physical vitality through yoga and breath), Sound Mind (clarity and peace through meditation), and Self Realization (awakening higher consciousness).";
  }

  // Check quotes query
  if (q.includes("quote") || q.includes("anmol vachan") || q.includes("vachan") || q.includes("suvichar")) {
    return "Guru Ji ka verified anmol vachan hai: \"Your thoughts create your reality. Choose them wisely, for they hold the power to design your destiny.\" Sath hi unka mool mantra hai: \"Bheetar se sanyaas, bahar se sansaar.\"";
  }

  // Check courses query
  if (q.includes("course") || q.includes("courses") || q.includes("program") || q.includes("programs")) {
    if (isHindiOrHinglish) {
      return "Science Divine ke mukhya transformational courses hain: 1. Design Your Destiny, 2. Science of Joyful Living, 3. Mind Power Meditation, aur 4. Sanjeevani Kriya. Aap Courses section mein inke curriculum aur registration details dekh sakte hain.";
    }
    return "Science Divine currently features four core courses: Design Your Destiny, Science of Joyful Living, Mind Power Meditation, and Sanjeevani Kriya. You can explore their curriculum and register on the Courses page.";
  }

  // If specific items retrieved
  if (retrieval.sourceItems.length > 0) {
    const topItem = retrieval.sourceItems[0];
    if (isHindiOrHinglish) {
      return `${topItem.content}\n\nAap website par iske vishay mein aur gehrai se jaan sakte hain.`;
    }
    return `${topItem.content}\n\nYou can explore more details on the official website page.`;
  }

  // Unverified / Unknown query fallback (Zero hallucination guard)
  if (isHindiOrHinglish) {
    return "Mere paas Science Divine ke official knowledge base mein is vishay par pramanit jaankari uplabdh nahi hai. Aap Guru Ji ke pravachan, courses, meditation techniques, ya personal session booking ke baare mein pooch sakte hain.";
  }
  return "I don't have verified information about that in my Science Divine knowledge source. You can ask me about Guru Ji's teachings, courses, meditation practices, initiatives, or booking a personal session.";
}
