import type { AIBackend } from './interface.js';
import { ClaudeBackend } from './claude.js';
import { CodexBackend } from './codex.js';

const backends: Record<string, () => AIBackend> = {
  claude: () => new ClaudeBackend(),
  codex: () => new CodexBackend(),
};

export function createBackend(name: string): AIBackend {
  const factory = backends[name];
  if (!factory) {
    throw new Error(`Unknown backend: "${name}". Available: ${Object.keys(backends).join(', ')}`);
  }
  return factory();
}
