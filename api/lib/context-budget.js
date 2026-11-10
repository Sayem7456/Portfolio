const DEFAULT_REQUEST_TOKEN_BUDGET = 3500;
const MAX_HISTORY_MESSAGES = 20;
const MAX_HISTORY_TOKENS = 600;
const MAX_USER_MESSAGE_LENGTH = 1200;
const OUTPUT_RESERVE = Number(process.env.OUTPUT_RESERVE) || 1024;

const MODEL_BUDGETS = {
  "qwen/qwen3.6-27b": {
    freeTPM: Number(process.env.GROQ_QWEN_TPM || 0),
    safetyRatio: 0.85,
  },
  "openai/gpt-oss-120b": {
    freeTPM: Number(process.env.GROQ_GPT_OSS_TPM || 8000),
    safetyRatio: 0.85,
  },
};

function getModelBudget(modelId) {
  return MODEL_BUDGETS[modelId] || null;
}

function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

function estimateMessageTokens(messages) {
  if (!Array.isArray(messages)) return 0;
  let total = 0;
  for (const msg of messages) {
    total += estimateTokens(msg.content || '');
  }
  return total;
}

function estimateRequestTokens(systemPrompt, history, currentMessage) {
  const systemTokens = estimateTokens(systemPrompt);
  const historyTokens = estimateMessageTokens(history);
  const messageTokens = estimateTokens(currentMessage);
  return systemTokens + historyTokens + messageTokens + OUTPUT_RESERVE;
}

function fitsModelBudget(modelId, estimatedTokens) {
  const config = getModelBudget(modelId);
  if (!config) return true;

  if (!config.freeTPM || config.freeTPM <= 0) {
    return true;
  }

  const safeLimit = Math.floor(config.freeTPM * config.safetyRatio);
  return estimatedTokens <= safeLimit;
}

function safeLimit(modelId) {
  const config = getModelBudget(modelId);
  if (!config || !config.freeTPM || config.freeTPM <= 0) return Infinity;
  return Math.floor(config.freeTPM * config.safetyRatio);
}

module.exports = {
  DEFAULT_REQUEST_TOKEN_BUDGET,
  MAX_HISTORY_MESSAGES,
  MAX_HISTORY_TOKENS,
  MAX_USER_MESSAGE_LENGTH,
  OUTPUT_RESERVE,
  MODEL_BUDGETS,
  estimateTokens,
  estimateMessageTokens,
  estimateRequestTokens,
  fitsModelBudget,
  getModelBudget,
  safeLimit,
};
