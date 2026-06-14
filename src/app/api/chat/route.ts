import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { getRickSystemPrompt } from "@/lib/rick-prompt";

// API key is automatically picked up from process.env.GROQ_API_KEY

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // The system prompt is always injected as the first context
    const systemPrompt = await getRickSystemPrompt();

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"), // Using the fast Llama 3.3 model on Groq
      system: systemPrompt,
      messages,
      temperature: 0.75, // Slightly lower — rewritten prompt provides better character guidance
      maxOutputTokens: 500, // Prevent excessively long monologues
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to communicate with Rick. He probably passed out." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
