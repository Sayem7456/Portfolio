const { validateChatRequest } = require('./lib/request-validator');
const { checkRateLimit, getClientIp } = require('./lib/rate-limit');
const { safeError, ERROR_CODES, normalizeError } = require('./lib/safe-error');
const { loadProfileContext, buildSystemPrompt } = require('./lib/context-loader');
const { routeChat } = require('./lib/provider-router');

const DEFAULT_ALLOWED_ORIGIN = 'https://portfolio-xdk9.vercel.app';
const GUARD_REPLY = "I can't help with that request. I'm here to answer questions about Sayem's background, research, projects, and experience, so feel free to ask about any of those.";

function getAllowedOrigins() {
  const origins = new Set([process.env.ALLOWED_ORIGIN || DEFAULT_ALLOWED_ORIGIN]);
  if (process.env.VERCEL_ENV === 'development') {
    origins.add('http://localhost:3000');
  }
  return origins;
}
const MAX_PAYLOAD_SIZE = 64 * 1024;
const REQUEST_TIMEOUT_MS = 25000;

async function handler(req, res) {
  const allowedOrigins = getAllowedOrigins();
  const requestOrigin = req.headers.origin;
  const corsOrigin = allowedOrigins.has(requestOrigin) ? requestOrigin : [...allowedOrigins][0];
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    logSecurityEvent('INVALID_METHOD', req, { method: req.method });
    res.status(405).json(safeError('Method not allowed.', ERROR_CODES.INVALID_REQUEST));
    return;
  }

  // Browsers always send Origin on a POST fetch, so a missing Origin means a
  // non-browser client. A script can set the header too, so this is a
  // low-cost filter, not authentication; the rate limiter does the real work.
  const origin = req.headers.origin;
  if (!origin || !allowedOrigins.has(origin)) {
    logSecurityEvent('INVALID_ORIGIN', req, { origin: origin || null });
    res.status(403).json(safeError('Invalid or missing origin.', ERROR_CODES.INVALID_ORIGIN));
    return;
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    logSecurityEvent('INVALID_CONTENT_TYPE', req, { contentType });
    res.status(415).json(safeError('Content-Type must be application/json.', ERROR_CODES.INVALID_CONTENT_TYPE));
    return;
  }

  if (req.headers['content-length'] && parseInt(req.headers['content-length'], 10) > MAX_PAYLOAD_SIZE) {
    logSecurityEvent('PAYLOAD_TOO_LARGE', req, { contentLength: req.headers['content-length'] });
    res.status(413).json(safeError('Request payload too large.', ERROR_CODES.PAYLOAD_TOO_LARGE));
    return;
  }

  const rateLimit = checkRateLimit(req);
  if (!rateLimit.allowed) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', req, { retryAfter: rateLimit.retryAfter });
    res.setHeader('Retry-After', rateLimit.retryAfter);
    res.status(429).json(safeError('Rate limit exceeded. Please wait before sending another message.', ERROR_CODES.RATE_LIMITED));
    return;
  }

  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    logSecurityEvent('INVALID_JSON', req);
    res.status(400).json(safeError('Invalid JSON in request body.', ERROR_CODES.INVALID_REQUEST));
    return;
  }

  const validation = validateChatRequest(body);
  if (!validation.valid) {
    logSecurityEvent('VALIDATION_FAILED', req, { errors: validation.errors });
    res.status(400).json(safeError(validation.errors.join(' '), ERROR_CODES.VALIDATION_ERROR));
    return;
  }

  if (validation.injectionDetected) {
    logSecurityEvent('PROMPT_INJECTION_BLOCKED', req);
    res.status(200).json({ answer: GUARD_REPLY, provider: 'guard', model: null, fallbackUsed: false });
    return;
  }

  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Request timeout')), REQUEST_TIMEOUT_MS);
  });

  try {
    const profile = await loadProfileContext();
    const systemPrompt = buildSystemPrompt(profile);

    const result = await Promise.race([
      routeChat(profile, body.message, validation.history || [], systemPrompt),
      timeoutPromise,
    ]);

    res.status(200).json({
      answer: result.answer,
      provider: result.provider,
      model: result.model,
      fallbackUsed: result.fallbackUsed,
    });
  } catch (err) {
    const normalized = normalizeError(err);
    logSecurityEvent('HANDLER_ERROR', req, { error: err.message, code: normalized.code });
    
    if (err.message === 'Request timeout') {
      res.status(504).json(safeError('The request timed out. Please try again.', ERROR_CODES.PROVIDER_FAILED));
    } else {
      res.status(500).json(safeError('The portfolio assistant is temporarily unavailable.', ERROR_CODES.CHAT_UNAVAILABLE));
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

function logSecurityEvent(event, req, details = {}) {
  const ip = getClientIp(req);
  const timestamp = new Date().toISOString();
  console.log(`[SECURITY] ${timestamp} | ${event} | IP: ${ip} | UA: ${req.headers['user-agent']?.slice(0, 100)} | ${JSON.stringify(details)}`);
}

module.exports = handler;