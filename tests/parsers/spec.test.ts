import { describe, it, expect } from 'vitest';
import { parseSpec } from '../../src/parsers/spec.js';

describe('parseSpec', () => {
  it('parses title from H1', () => {
    const spec = parseSpec('# Feature: Auth Login\n\n## Context\nSome context');
    expect(spec.title).toBe('Auth Login');
  });

  it('parses source from blockquote', () => {
    const spec = parseSpec('# Feature: Auth\n> source: jira:AUTH-123\n\n## Context\nText');
    expect(spec.source).toBe('jira:AUTH-123');
  });

  it('parses H2 sections', () => {
    const content = `# Feature: Test
## Context
Some context here

## Requirements
1. Requirement one
2. Requirement two

## Constraints
Must be fast`;

    const spec = parseSpec(content);
    expect(spec.sections['Context']).toBe('Some context here');
    expect(spec.sections['Requirements']).toContain('Requirement one');
    expect(spec.sections['Constraints']).toBe('Must be fast');
  });

  it('preserves raw content', () => {
    const content = '# Feature: Test\n## Context\nHello';
    const spec = parseSpec(content);
    expect(spec.raw).toBe(content);
  });
});
