import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { StateManager } from '../../src/state/manager.js';
import type { FeatureState } from '../../src/state/types.js';

describe('StateManager', () => {
  let tmpDir: string;
  let mgr: StateManager;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pxs-test-'));
    const workflowDir = path.join(tmpDir, '.workflow');
    fs.mkdirSync(workflowDir, { recursive: true });
    mgr = new StateManager(tmpDir);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('detects workflow existence', () => {
    expect(mgr.workflowExists()).toBe(true);
  });

  it('reads empty state when no state file exists', () => {
    const state = mgr.readState();
    expect(state.features).toEqual([]);
  });

  it('writes and reads state', () => {
    const feature: FeatureState = {
      feature: 'test-feature',
      type: 'feat',
      branch: 'feat/test-feature',
      phase: 'spec_created',
      total_tasks: 2,
      current_task: 0,
      tasks: [
        { name: 'Task 1', status: 'pending' },
        { name: 'Task 2', status: 'pending' },
      ],
    };

    mgr.upsertFeature(feature);

    const retrieved = mgr.getFeature('test-feature');
    expect(retrieved).toBeDefined();
    expect(retrieved!.feature).toBe('test-feature');
    expect(retrieved!.phase).toBe('spec_created');
    expect(retrieved!.tasks).toHaveLength(2);
  });

  it('updates existing feature', () => {
    const feature: FeatureState = {
      feature: 'test-feature',
      type: 'feat',
      branch: '',
      phase: 'spec_created',
      total_tasks: 0,
      current_task: 0,
      tasks: [],
    };

    mgr.upsertFeature(feature);
    feature.phase = 'implementing';
    mgr.upsertFeature(feature);

    const state = mgr.readState();
    expect(state.features).toHaveLength(1);
    expect(state.features[0].phase).toBe('implementing');
  });

  it('enforces phase guards', () => {
    const feature: FeatureState = {
      feature: 'test-feature',
      type: 'feat',
      branch: '',
      phase: 'spec_created',
      total_tasks: 0,
      current_task: 0,
      tasks: [],
    };

    mgr.upsertFeature(feature);

    // implement is only allowed in ready_to_implement or implementing
    expect(() => mgr.checkPhaseGuard('implement', 'test-feature')).toThrow();
  });

  it('allows commands with no phase restriction', () => {
    const feature: FeatureState = {
      feature: 'test-feature',
      type: 'feat',
      branch: '',
      phase: 'spec_created',
      total_tasks: 0,
      current_task: 0,
      tasks: [],
    };

    mgr.upsertFeature(feature);

    // status has no phase restriction
    expect(() => mgr.checkPhaseGuard('status', 'test-feature')).not.toThrow();
  });

  it('throws for missing feature on phase guard check', () => {
    expect(() => mgr.checkPhaseGuard('refine', 'nonexistent')).toThrow('not found');
  });

  it('generates correct paths', () => {
    expect(mgr.specPath('my-feat')).toBe(path.join(tmpDir, '.workflow', 'specs', 'my-feat.md'));
    expect(mgr.planPath('my-feat')).toBe(path.join(tmpDir, '.workflow', 'plans', 'my-feat.md'));
    expect(mgr.reviewPath('my-feat', 2)).toBe(path.join(tmpDir, '.workflow', 'reviews', 'my-feat-task-2.md'));
  });
});
