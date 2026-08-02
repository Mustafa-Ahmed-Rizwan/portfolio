import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { getRickSystemPrompt } from "@/lib/rick-prompt";
import { createRateLimiter } from "@/lib/rate-limit";

// API key is automatically picked up from process.env.GROQ_API_KEY

export const maxDuration = 30;

// 10 requests per 60 seconds per IP — protects Groq free-tier RPM quota.
const chatLimiter = createRateLimiter(10, 60_000);

// Validation constants
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4_000; // chars per message

export async function POST(req: Request) {
  try {
    // ── Rate limiting ────────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    const rl = chatLimiter.check(ip);

    const rlHeaders = {
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(Math.floor(Date.now() / 1_000) + rl.resetIn),
    };

    if (!rl.success) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Slow down." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rl.resetIn),
            ...rlHeaders,
          },
        }
      );
    }

    // ── Input validation ─────────────────────────────────────────────────────
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages must be an array." }),
        { status: 400, headers: { "Content-Type": "application/json", ...rlHeaders } }
      );
    }

    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: "Too many messages in context." }),
        { status: 400, headers: { "Content-Type": "application/json", ...rlHeaders } }
      );
    }

    // Truncate individual messages to prevent oversized payloads.
    // Cast role to the SDK's expected literal union.
    const sanitizedMessages = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant" | "system",
        content:
          typeof m.content === "string"
            ? m.content.slice(0, MAX_MESSAGE_LENGTH)
            : "",
      })
    );

    // ── LLM call ─────────────────────────────────────────────────────────────
    const systemPrompt = await getRickSystemPrompt();

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages: sanitizedMessages,
      temperature: 0.75,
      maxOutputTokens: 500,
    });

    const streamResponse = result.toTextStreamResponse();

    // Attach rate-limit headers to the streaming response
    Object.entries(rlHeaders).forEach(([key, value]) =>
      streamResponse.headers.set(key, value)
    );

    return streamResponse;
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to communicate with Rick. He probably passed out." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
