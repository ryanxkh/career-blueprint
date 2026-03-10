/**
 * Simple in-memory sliding window rate limiter.
 * Good enough for single-instance Vercel deployments.
 * For multi-instance, swap to @vercel/kv or upstash/ratelimit.
 */

const store = new Map<string, number[]>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export function rateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const timestamps = store.get(key) ?? [];
  const recent = timestamps.filter((t) => t > windowStart);

  if (recent.length >= config.maxRequests) {
    store.set(key, recent);
    return { allowed: false, remaining: 0 };
  }

  recent.push(now);
  store.set(key, recent);
  return { allowed: true, remaining: config.maxRequests - recent.length };
}

// Cleanup old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  const maxAge = 15 * 60 * 1000; // 15 minutes
  for (const [key, timestamps] of store) {
    const recent = timestamps.filter((t) => t > now - maxAge);
    if (recent.length === 0) {
      store.delete(key);
    } else {
      store.set(key, recent);
    }
  }
}, 5 * 60 * 1000);
