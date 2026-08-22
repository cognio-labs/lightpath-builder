/**
 * SCIENCE DIVINE — SAFE ENVIRONMENT VALIDATOR
 * Validates server-side API keys and models without exposing secrets.
 */

export interface EnvValidationResult {
  isValid: boolean;
  hasOpenRouter: boolean;
  hasFreeAI: boolean;
  openrouterModel: string;
  freeAiKey: string;
  openrouterKey: string;
  errorMessage?: string;
}

export function validateDivineEnv(): EnvValidationResult {
  const openrouterKey = process.env.OPENROUTER_API_KEY?.trim() || "";
  const openrouterModel =
    process.env.OPENROUTER_MODEL?.trim() ||
    process.env.OPENROUTER_CHAT_MODEL?.trim() ||
    "openrouter/free";
  const freeAiKey = process.env.FREE_AI_API_KEY?.trim() || "";

  const hasOpenRouter = Boolean(openrouterKey && openrouterKey.length > 5);
  const hasFreeAI = Boolean(freeAiKey && freeAiKey.length > 5);

  if (!hasOpenRouter) {
    return {
      isValid: false,
      hasOpenRouter: false,
      hasFreeAI,
      openrouterModel,
      freeAiKey,
      openrouterKey,
      errorMessage: "AI service configuration is incomplete (OpenRouter key missing).",
    };
  }

  return {
    isValid: true,
    hasOpenRouter: true,
    hasFreeAI,
    openrouterModel,
    freeAiKey,
    openrouterKey,
  };
}
