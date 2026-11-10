const {
  MAX_USER_MESSAGE_LENGTH,
  MAX_HISTORY_MESSAGES,
} = require('./context-budget');

const ALLOWED_ROLES = new Set(['user', 'assistant']);

const INJECTION_PATTERNS = [
  /ignore\s+(?:previous|above|all)\s+(?:instructions|prompts?|rules?)/i,
  /forget\s+(?:everything|all\s+that|what\s+you\s+know)/i,
  /you\s+are\s+(?:now|an?)\s+(?:hacker|admin|root|superuser)/i,
  /system\s*:\s*you\s+are/i,
  /<\|system\|>/i,
  /<\|user\|>/i,
  /<\|assistant\|>/i,
  /\[system\]/i,
  /\[user\]/i,
  /\[assistant\]/i,
  /###\s*system/i,
  /###\s*user/i,
  /###\s*assistant/i,
  /override\s+(?:safety|security|guidelines?)/i,
  /disable\s+(?:safety|filters?|moderation)/i,
  /reveal\s+(?:your\s+)?(?:system\s+)?(?:prompt|instructions?)/i,
  /what\s+(?:is|are)\s+(?:your\s+)?(?:system\s+)?(?:prompt|instructions?)/i,
  /output\s+(?:your\s+)?(?:system\s+)?(?:prompt|instructions?)/i,
  /act\s+as\s+(?:if\s+you\s+are\s+)?(?:unrestricted|unfiltered|uncensored)/i,
  /roleplay\s+as\s+(?:an?\s+)?(?:unrestricted|evil|harmful)/i,
  /(?:repeat|print|show)\s+(?:the\s+)?(?:above|previous)\s+(?:prompt|instruction)/i,
];

// Returns { valid, errors, injectionDetected, history }.
// Prompt-injection matches are not validation errors: a flagged current message
// is reported through injectionDetected so the handler can refuse politely, and
// flagged history entries are dropped from the returned `history`. (The chat UI
// keeps every sent message in its history, so rejecting on a flagged entry would
// make every later request in that session fail too.)
function validateChatRequest(body) {
  const errors = [];
  let injectionDetected = false;
  let history;

  if (!body || typeof body !== 'object') {
    return { valid: false, errors: ['Request body must be a JSON object.'] };
  }

  if (!body.message || typeof body.message !== 'string') {
    errors.push('"message" is required and must be a string.');
  } else if (body.message.trim().length === 0) {
    errors.push('"message" must not be empty.');
  } else if (body.message.length > MAX_USER_MESSAGE_LENGTH) {
    errors.push(`"message" must not exceed ${MAX_USER_MESSAGE_LENGTH} characters (your message is ${body.message.length}).`);
  } else if (containsInjection(body.message)) {
    injectionDetected = true;
  }

  if (body.history !== undefined) {
    if (!Array.isArray(body.history)) {
      errors.push('"history" must be an array.');
    } else if (body.history.length > 0) {
      if (body.history.length > MAX_HISTORY_MESSAGES) {
        errors.push(`"history" must not exceed ${MAX_HISTORY_MESSAGES} messages.`);
      }
      const kept = [];
      for (let i = 0; i < body.history.length; i++) {
        const entry = body.history[i];
        if (!entry || typeof entry !== 'object') {
          errors.push(`history[${i}] must be an object.`);
          continue;
        }
        if (entry.role === 'system') {
          errors.push(`history[${i}].role must not be "system". Only "user" and "assistant" roles are accepted.`);
        } else if (!ALLOWED_ROLES.has(entry.role)) {
          errors.push(`history[${i}].role must be "user" or "assistant".`);
        }
        if (typeof entry.content !== 'string') {
          errors.push(`history[${i}].content must be a string.`);
        } else if (entry.content.length > MAX_USER_MESSAGE_LENGTH) {
          errors.push(`history[${i}].content must not exceed ${MAX_USER_MESSAGE_LENGTH} characters.`);
        } else if (containsInjection(entry.content)) {
          continue;
        }
        kept.push(entry);
      }
      history = kept;
    } else {
      history = [];
    }
  }

  return { valid: errors.length === 0, errors, injectionDetected, history };
}

function containsInjection(text) {
  const normalized = text.toLowerCase();
  return INJECTION_PATTERNS.some(pattern => pattern.test(normalized));
}

module.exports = { validateChatRequest, containsInjection };