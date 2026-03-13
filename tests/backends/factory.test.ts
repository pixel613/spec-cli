import { describe, it, expect } from 'vitest';
import { createBackend } from '../../src/backends/factory.js';

describe('createBackend', () => {
  it('creates claude backend', () => {
    const backend = createBackend('claude');
    expect(backend.name).toBe('claude');
  });

  it('creates codex backend', () => {
    const backend = createBackend('codex');
    expect(backend.name).toBe('codex');
  });

  it('throws for unknown backend', () => {
    expect(() => createBackend('unknown')).toThrow('Unknown backend');
  });
});
