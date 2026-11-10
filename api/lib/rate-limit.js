const rateLimitStore = new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;
const MAX_TRACKED_IPS = 5000;

// Headers set by the platform in front of this function. On Vercel, both are
// written by the edge network and cannot be supplied by the client. Elsewhere
// (local dev, self-hosting) they are client-controlled, so they are only read
// when TRUST_PROXY=1 says a trusted reverse proxy sets them.
const PLATFORM_IP_HEADERS = ['x-vercel-forwarded-for', 'x-forwarded-for'];

function trustsForwardedHeaders() {
  return Boolean(process.env.VERCEL) || process.env.TRUST_PROXY === '1';
}

function firstValue(header) {
  if (Array.isArray(header)) header = header[0];
  if (typeof header !== 'string') return null;
  return header.split(',')[0].trim() || null;
}

function getClientIp(req) {
  if (trustsForwardedHeaders()) {
    for (const name of PLATFORM_IP_HEADERS) {
      const ip = firstValue(req.headers?.[name]);
      if (isValidIp(ip)) {
        return ip;
      }
    }
  }
  const socketIp = req.socket?.remoteAddress;
  if (socketIp && isValidIp(socketIp)) {
    return socketIp;
  }
  return 'unknown';
}

function isValidIp(ip) {
  if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') return false;
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.').map(Number);
    return parts.every(p => p >= 0 && p <= 255);
  }
  return ipv6Regex.test(ip) || ip.includes(':');
}

function pruneExpired(now) {
  for (const [ip, timestamps] of rateLimitStore) {
    if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] >= WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}

function checkRateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();

  if (rateLimitStore.size > MAX_TRACKED_IPS) {
    pruneExpired(now);
  }

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const timestamps = rateLimitStore.get(ip);
  const recent = timestamps.filter(t => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return { allowed: false, retryAfter: Math.ceil((recent[0] + WINDOW_MS - now) / 1000) };
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return { allowed: true };
}

function resetRateLimit() {
  rateLimitStore.clear();
}

module.exports = { checkRateLimit, getClientIp, resetRateLimit, MAX_REQUESTS, WINDOW_MS };
