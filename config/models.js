const MODEL_CONFIG = {
  groq: {
    primary: {
      model: process.env.GROQ_PRIMARY_MODEL || 'qwen/qwen3.6-27b',
      timeoutMs: 9000,
      status: 'active',
    },
    secondary: {
      model: process.env.GROQ_SECONDARY_MODEL || 'openai/gpt-oss-120b',
      timeoutMs: 10000,
      status: 'active',
    },
  },
  gemini: {
    primary: {
      model: process.env.GEMINI_MODEL,
      timeoutMs: 10000,
      status: 'active',
    },
  },
};

function isExpired(modelConfig) {
  if (!modelConfig.shutdownDate) return false;
  return new Date() >= new Date(modelConfig.shutdownDate);
}

function isDeprecated(modelConfig) {
  return modelConfig.status === 'deprecated';
}

function getActiveModels() {
  const models = [];

  function traverse(config, provider) {
    if (!config) return;
    Object.entries(config).forEach(([key, modelConfig]) => {
      if (modelConfig && typeof modelConfig === 'object') {
        if (modelConfig.model) {
          if (!isExpired(modelConfig)) {
            models.push({
              provider,
              model: modelConfig.model,
              timeoutMs: modelConfig.timeoutMs,
              status: modelConfig.status,
              shutdownDate: modelConfig.shutdownDate,
              replacement: modelConfig.replacement,
            });
          }
        } else {
          traverse(modelConfig, provider);
        }
      }
    });
  }

  Object.entries(MODEL_CONFIG).forEach(([provider, config]) => {
    traverse(config, provider);
  });

  return models;
}

function getDeprecatedModels() {
  const deprecated = [];

  function traverse(config, provider) {
    if (!config) return;
    Object.entries(config).forEach(([key, modelConfig]) => {
      if (modelConfig && typeof modelConfig === 'object') {
        if (modelConfig.model) {
          if (isDeprecated(modelConfig)) {
            deprecated.push({
              provider,
              model: modelConfig.model,
              shutdownDate: modelConfig.shutdownDate,
              replacement: modelConfig.replacement,
            });
          }
        } else {
          traverse(modelConfig, provider);
        }
      }
    });
  }

  Object.entries(MODEL_CONFIG).forEach(([provider, config]) => {
    traverse(config, provider);
  });

  return deprecated;
}

function logDeprecationWarnings() {
  if (process.env.NODE_ENV === 'production') return;

  const deprecated = getDeprecatedModels();
  deprecated.forEach(({ provider, model, shutdownDate, replacement }) => {
    const isActive = !isExpired({ shutdownDate });
    if (isActive) {
      console.warn(
        `[DEPRECATION WARNING] ${provider}:${model} is deprecated and will be removed on ${shutdownDate}. ` +
        `Replacements: ${replacement?.join(', ') || 'none'}. ` +
        `Set the corresponding env var to override or remove from config.`
      );
    }
  });
}

function getModelById(provider, modelId) {
  const providerConfig = MODEL_CONFIG[provider];
  if (!providerConfig) return null;

  for (const key of Object.keys(providerConfig)) {
    const modelConfig = providerConfig[key];
    if (modelConfig.model === modelId) {
      return { ...modelConfig, provider, model: modelId };
    }
  }
  return null;
}

module.exports = {
  MODEL_CONFIG,
  getActiveModels,
  getDeprecatedModels,
  logDeprecationWarnings,
  isExpired,
  isDeprecated,
  getModelById,
};