import { NextResponse } from "next/server";
import { createRateLimiter } from "@/lib/rate-limit";

// Two-tier rate limiting for the voice endpoint — ElevenLabs bills per character.
//
// Tier 1 (per-minute): blocks rapid bursts.
// Tier 2 (per-hour):  prevents session-long drain even at a slow pace.
const voiceMinuteLimiter = createRateLimiter(3, 60_000);        // 3 req / 60s
const voiceHourlyLimiter = createRateLimiter(10, 60 * 60_000);  // 10 req / 1hr

// Hard cap on text length — prevents crafted payloads from generating huge bills.
const MAX_TEXT_LENGTH = 500;

export async function POST(req: Request) {
  try {
    // ── Rate limiting ────────────────────────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    const rlMin = voiceMinuteLimiter.check(ip);
    const rlHour = voiceHourlyLimiter.check(ip);

    const rlHeaders = {
      "X-RateLimit-Limit-Minute": String(rlMin.limit),
      "X-RateLimit-Remaining-Minute": String(rlMin.remaining),
      "X-RateLimit-Limit-Hour": String(rlHour.limit),
      "X-RateLimit-Remaining-Hour": String(rlHour.remaining),
    };

    // Both tiers must pass.
    const blocked = !rlMin.success || !rlHour.success;
    if (blocked) {
      const resetIn = !rlMin.success ? rlMin.resetIn : rlHour.resetIn;
      return NextResponse.json(
        { error: "Voice rate limit exceeded. Try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(resetIn), ...rlHeaders },
        }
      );
    }

    // ── Input validation ─────────────────────────────────────────────────────
    const body = await req.json();
    const rawText = body?.text;

    if (!rawText || typeof rawText !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string." },
        { status: 400, headers: rlHeaders }
      );
    }

    // Truncate — never send more than MAX_TEXT_LENGTH chars to ElevenLabs.
    const text = rawText.slice(0, MAX_TEXT_LENGTH);

    // ── Credentials check ────────────────────────────────────────────────────
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID;

    if (!apiKey || !voiceId) {
      console.warn("ElevenLabs credentials missing. Returning 503.");
      return NextResponse.json(
        { error: "ElevenLabs API Key or Voice ID is not configured" },
        { status: 503, headers: rlHeaders }
      );
    }

    // ── ElevenLabs call ──────────────────────────────────────────────────────
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to generate speech" },
        { status: response.status, headers: rlHeaders }
      );
    }

    // Return the audio stream directly to the client.
    const audioHeaders = new Headers(rlHeaders);
    audioHeaders.set("Content-Type", "audio/mpeg");

    return new NextResponse(response.body, { status: 200, headers: audioHeaders });
  } catch (error) {
    console.error("Error in voice API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
