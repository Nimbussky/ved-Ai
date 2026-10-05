const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Bound the Map: each entry is per (key + window), evict oldest first.
// Edge isolates each have their own Map, so this is a best-effort shield,
// not a hard distributed limit.
const MAX_ENTRIES = 5000;

function evictIfNeeded() {
  while (rateLimitMap.size > MAX_ENTRIES) {
    const oldest = rateLimitMap.keys().next();
    if (oldest.done) break;
    rateLimitMap.delete(oldest.value);
  }
}

export function checkRateLimit(
  key: string,
  maxRequests: number = 30,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    evictIfNeeded();
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    const resetIn = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetIn: Math.ceil((entry.resetTime - now) / 1000) };
}

export function getClientIP(request: Request): string {
  // Platform-set headers first (cannot be spoofed behind Vercel/Cloudflare
  // because the platform overwrites them); generic x-forwarded-for last.
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP.trim();
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP.trim();
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  // No trustworthy IP: fail open with a unique bucket so unrelated users
  // never share one 'unknown' bucket and block each other.
  return `unknown-${Math.random().toString(36).slice(2)}`;
}
