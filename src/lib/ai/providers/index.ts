import type { LLMProvider } from './types';

import { glmProvider } from './glm';
import { cerebrasProvider } from './cerebras';
import { geminiProvider } from './gemini';
import { mistralProvider } from './mistral';
import { groqProvider } from './groq';
import { openRouterProvider } from './openrouter';
import { deepSeekProvider } from './deepseek';
import { ollamaProvider } from './ollama';
import {
  zenMuxProvider,
  kimiProvider,
  qwenProvider,
  tokenRouterDeepSeekProvider,
  miniMaxProvider,
  claudeProvider,
  gptProvider,
  huggingFaceProvider,
} from './free-routes';

/**
 * OmniRouter Engine 2 registry
 * Priority = try order (lower first)
 * OpenRouter free cascade sits early so token limits rotate across many free models.
 */
export const ALL_PROVIDERS: LLMProvider[] = [
  groqProvider,           // 1 fast free
  glmProvider,            // 2 generous free
  cerebrasProvider,       // 3 fast free
  openRouterProvider,     // 4 free multi-model router (never alone)
  deepSeekProvider,       // 5
  geminiProvider,         // 6
  mistralProvider,        // 7
  zenMuxProvider,         // 8+
  kimiProvider,
  qwenProvider,
  tokenRouterDeepSeekProvider,
  miniMaxProvider,
  claudeProvider,
  gptProvider,
  huggingFaceProvider,
  ollamaProvider,         // local last
];

/** Ollama only makes sense where it can actually run: local dev, or
 *  production hosts with OLLAMA_ENABLED=true. Otherwise every chat would
 *  waste a full provider timeout dialing an unreachable localhost. */
export function isOllamaEnabled(): boolean {
  if (process.env.OLLAMA_ENABLED === 'true') return true;
  if (process.env.OLLAMA_ENABLED === 'false') return false;
  if (process.env.OLLAMA_BASE_URL) return true;
  return process.env.NODE_ENV !== 'production';
}

export function getActiveProviders(): LLMProvider[] {
  return ALL_PROVIDERS
    .filter((p) => {
      if (p.slug === 'ollama') return isOllamaEnabled();
      return !!p.getApiKey();
    })
    .sort((a, b) => a.priority - b.priority);
}

export function getProvider(slug: string): LLMProvider | undefined {
  return ALL_PROVIDERS.find((p) => p.slug === slug);
}

export function getProviderStatus() {
  return ALL_PROVIDERS.map((p) => {
    const active = p.slug === 'ollama' ? isOllamaEnabled() : !!p.getApiKey();
    return {
      name: p.name,
      slug: p.slug,
      model: p.model,
      priority: p.priority,
      hasKey: p.slug === 'ollama' ? true : !!p.getApiKey(),
      available: active,
    };
  });
}
