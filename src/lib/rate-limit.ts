/**
 * Sliding-window, in-memory rate limiter.
 *
 * Works well for portfolio/Vercel serverless deployments:
 * - Zero dependencies, zero cost, zero setup.
 * - Each warm lambda instance gets its own store; rate limits are per-instance
 *   (probabilistic protection, appropriate for a portfolio workload).
 * - Upgrade path: replace `store` with Upstash Redis client and the API stays identical.
 *
 * Usage:
 *   const chatLimiter = createRateLimiter(10, 60_000); // 10 req / 60s
 *   const result = chatLimiter.check(ip);
 *   if (!result.success) return 429;
 */

interface Record {
  /** Unix timestamps (ms) of each request in the current window. */
  requests: number[];
}

interface RateLimitResult {
  /** Whether the request is allowed. */
  success: boolean;
  /** How many requests remain in this window. */
  remaining: number;
  /** Seconds until the oldest request falls out of the window. */
  resetIn: number;
  /** The configured limit for this limiter. */
  limit: number;
}

/**
 * Creates a sliding-window rate limiter.
 * @param limit     Max number of requests allowed per window.
 * @param windowMs  Window duration in milliseconds.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const store = new Map<string, Record>();

  // Periodically prune stale keys to avoid unbounded memory growth
  // in long-running dev / warm-lambda scenarios.
  function prune() {
    const now = Date.now();
    for (const [key, rec] of store) {
      const fresh = rec.requests.filter((t) => t > now - windowMs);
      if (fresh.length === 0) {
        store.delete(key);
      } else {
        rec.requests = fresh;
      }
    }
  }

  // Prune every 5 minutes.
  if (typeof setInterval !== "undefined") {
    setInterval(prune, 5 * 60 * 1_000);
  }

  return {
    /**
     * Check if the given IP is within the rate limit.
     * Mutates the store on every allowed request.
     */
    check(ip: string): RateLimitResult {
      const now = Date.now();
      const windowStart = now - windowMs;

      const rec = store.get(ip) ?? { requests: [] };

      // Slide the window: drop timestamps that have expired.
      rec.requests = rec.requests.filter((t) => t > windowStart);

      if (rec.requests.length >= limit) {
        // Oldest request in window determines when a slot frees up.
        const oldest = rec.requests[0];
        const resetIn = Math.ceil((oldest + windowMs - now) / 1_000);
        return { success: false, remaining: 0, resetIn, limit };
      }

      rec.requests.push(now);
      store.set(ip, rec);

      return {
        success: true,
        remaining: limit - rec.requests.length,
        resetIn: Math.ceil(windowMs / 1_000),
        limit,
      };
    },
  };
}
