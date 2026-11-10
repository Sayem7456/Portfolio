const test = require('node:test');
const assert = require('node:assert');
const { checkRateLimit, getClientIp, resetRateLimit, MAX_REQUESTS } = require('./rate-limit');

function req(headers = {}, remoteAddress = '203.0.113.5') {
  return { headers, socket: { remoteAddress } };
}

function withEnv(vars, fn) {
  const saved = {};
  for (const k of Object.keys(vars)) {
    saved[k] = process.env[k];
    if (vars[k] === undefined) delete process.env[k]; else process.env[k] = vars[k];
  }
  try { return fn(); } finally {
    for (const k of Object.keys(saved)) {
      if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k];
    }
  }
}

test('getClientIp ignores forwarded headers when no trusted proxy is configured', () => {
  withEnv({ VERCEL: undefined, TRUST_PROXY: undefined }, () => {
    const r = req({ 'x-forwarded-for': '198.51.100.9', 'x-vercel-forwarded-for': '198.51.100.9' });
    assert.strictEqual(getClientIp(r), '203.0.113.5');
  });
});

test('getClientIp never trusts client-spoofable CDN headers', () => {
  withEnv({ VERCEL: '1', TRUST_PROXY: undefined }, () => {
    const r = req({ 'cf-connecting-ip': '198.51.100.9', 'true-client-ip': '198.51.100.10' });
    assert.strictEqual(getClientIp(r), '203.0.113.5');
  });
});

test('getClientIp prefers x-vercel-forwarded-for on Vercel and uses the first hop', () => {
  withEnv({ VERCEL: '1', TRUST_PROXY: undefined }, () => {
    const r = req({ 'x-vercel-forwarded-for': '198.51.100.9, 10.0.0.1', 'x-forwarded-for': '192.0.2.1' });
    assert.strictEqual(getClientIp(r), '198.51.100.9');
  });
});

test('getClientIp honours forwarded headers when TRUST_PROXY=1', () => {
  withEnv({ VERCEL: undefined, TRUST_PROXY: '1' }, () => {
    assert.strictEqual(getClientIp(req({ 'x-forwarded-for': '198.51.100.9' })), '198.51.100.9');
  });
});

test('getClientIp falls back to socket address for malformed header values', () => {
  withEnv({ VERCEL: '1' }, () => {
    assert.strictEqual(getClientIp(req({ 'x-forwarded-for': 'not-an-ip' })), '203.0.113.5');
  });
});

test('checkRateLimit blocks after MAX_REQUESTS and reports Retry-After', () => {
  withEnv({ VERCEL: undefined, TRUST_PROXY: undefined }, () => {
    resetRateLimit();
    const r = req();
    for (let i = 0; i < MAX_REQUESTS; i++) {
      assert.strictEqual(checkRateLimit(r).allowed, true);
    }
    const blocked = checkRateLimit(r);
    assert.strictEqual(blocked.allowed, false);
    assert.ok(blocked.retryAfter >= 1 && blocked.retryAfter <= 60);
    // A different client is unaffected.
    assert.strictEqual(checkRateLimit(req({}, '203.0.113.77')).allowed, true);
    resetRateLimit();
  });
});

test('rotating a spoofed x-forwarded-for does not evade the limit off-Vercel', () => {
  withEnv({ VERCEL: undefined, TRUST_PROXY: undefined }, () => {
    resetRateLimit();
    let allowed = 0;
    for (let i = 0; i < MAX_REQUESTS + 5; i++) {
      if (checkRateLimit(req({ 'x-forwarded-for': `198.51.100.${i + 1}` })).allowed) allowed++;
    }
    assert.strictEqual(allowed, MAX_REQUESTS);
    resetRateLimit();
  });
});
