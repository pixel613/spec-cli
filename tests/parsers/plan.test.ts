import { describe, it, expect } from 'vitest';
import { parsePlan } from '../../src/parsers/plan.js';

describe('parsePlan', () => {
  const planContent = `# Implementation Plan: auth-feature

> type: feat
> branch: feat/auth-feature
> total_tasks: 2

## Task 1: Add JWT middleware
- **Files**:
  - \`src/middleware/jwt.go\` (new)
  - \`src/config/auth.go\` (modify)
- **Description**: Create JWT middleware for auth
- **Depends on**: None
- **Complexity**: Medium
- **Acceptance**: JWT tokens validated on protected routes

## Task 2: Add refresh token
- **Files**:
  - \`src/handlers/refresh.go\` (new)
- **Description**: Implement refresh token flow
- **Depends on**: Task 1
- **Complexity**: High
- **Acceptance**: Tokens can be refreshed`;

  it('parses plan metadata', () => {
    const plan = parsePlan(planContent);
    expect(plan.name).toBe('auth-feature');
    expect(plan.type).toBe('feat');
    expect(plan.branch).toBe('feat/auth-feature');
    expect(plan.totalTasks).toBe(2);
  });

  it('parses task list', () => {
    const plan = parsePlan(planContent);
    expect(plan.tasks).toHaveLength(2);
    expect(plan.tasks[0].title).toBe('Add JWT middleware');
    expect(plan.tasks[1].title).toBe('Add refresh token');
  });

  it('parses task fields', () => {
    const plan = parsePlan(planContent);
    const task1 = plan.tasks[0];
    expect(task1.number).toBe(1);
    expect(task1.files).toContain('src/middleware/jwt.go');
    expect(task1.files).toContain('src/config/auth.go');
    expect(task1.description).toBe('Create JWT middleware for auth');
    expect(task1.dependsOn).toBe('None');
    expect(task1.complexity).toBe('Medium');
    expect(task1.acceptance).toBe('JWT tokens validated on protected routes');
  });

  it('parses task dependencies', () => {
    const plan = parsePlan(planContent);
    expect(plan.tasks[1].dependsOn).toBe('Task 1');
  });
});
