import { describe, it, expect } from 'vitest';
import { parseArgs } from '../../src/parsers/arguments.js';

describe('parseArgs', () => {
  it('parses name as first non-prefixed word', () => {
    const result = parseArgs(['my-feature']);
    expect(result.name).toBe('my-feature');
    expect(result.agents).toEqual([]);
    expect(result.skills).toEqual([]);
    expect(result.text).toBe('');
  });

  it('parses agents with @ prefix', () => {
    const result = parseArgs(['my-feature', '@architect', '@dba']);
    expect(result.name).toBe('my-feature');
    expect(result.agents).toEqual(['architect', 'dba']);
  });

  it('parses skills with / prefix', () => {
    const result = parseArgs(['my-feature', '/mysql', '/context7']);
    expect(result.name).toBe('my-feature');
    expect(result.skills).toEqual(['mysql', 'context7']);
  });

  it('collects remaining text as supplementary instructions', () => {
    const result = parseArgs(['my-feature', '@architect', 'focus', 'on', 'security']);
    expect(result.name).toBe('my-feature');
    expect(result.agents).toEqual(['architect']);
    expect(result.text).toBe('focus on security');
  });

  it('skips -- prefixed options', () => {
    const result = parseArgs(['my-feature', '--skip-clarify', '@architect']);
    expect(result.name).toBe('my-feature');
    expect(result.agents).toEqual(['architect']);
    expect(result.text).toBe('');
  });

  it('handles mixed order', () => {
    const result = parseArgs(['@dba', 'my-feature', '/mysql', 'extra', 'text']);
    expect(result.agents).toEqual(['dba']);
    expect(result.name).toBe('my-feature');
    expect(result.skills).toEqual(['mysql']);
    expect(result.text).toBe('extra text');
  });

  it('handles empty args', () => {
    const result = parseArgs([]);
    expect(result.name).toBe('');
    expect(result.agents).toEqual([]);
    expect(result.skills).toEqual([]);
    expect(result.text).toBe('');
  });
});
