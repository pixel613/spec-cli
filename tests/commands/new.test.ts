import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { StateManager } from '../../src/state/manager.js';

describe('pxs new (blank spec)', () => {
  let tmpDir: string;
  let originalCwd: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pxs-new-'));
    originalCwd = process.cwd();
    process.chdir(tmpDir);

    // Setup .workflow structure
    fs.mkdirSync(path.join(tmpDir, '.workflow', 'specs'), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, '.workflow', 'templates'), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, '.workflow', 'config.yaml'),
      'project:\n  name: test\n  language: typescript\n  framework: node\ngit:\n  convention: conventional\nbackend:\n  default: claude\ntest:\n  strategy: none\n  type: unit\n'
    );
    fs.writeFileSync(
      path.join(tmpDir, '.workflow', 'templates', 'spec-template.md'),
      '# Feature: <name>\n\n## Context\n\n## Requirements\n\n## Constraints\n\n## Notes\n'
    );
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('creates blank spec from template', async () => {
    const { newCommand } = await import('../../src/commands/new.js');
    await newCommand('test-feature', {});

    const specPath = path.join(tmpDir, '.workflow', 'specs', 'test-feature.md');
    expect(fs.existsSync(specPath)).toBe(true);

    const content = fs.readFileSync(specPath, 'utf-8');
    expect(content).toContain('# Feature: test-feature');
  });

  it('updates state.yaml after creation', async () => {
    const { newCommand } = await import('../../src/commands/new.js');
    await newCommand('test-feature', {});

    const mgr = new StateManager(tmpDir);
    const feature = mgr.getFeature('test-feature');
    expect(feature).toBeDefined();
    expect(feature!.phase).toBe('spec_created');
  });
});
