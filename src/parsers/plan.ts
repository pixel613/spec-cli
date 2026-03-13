import type { FeatureType } from '../state/types.js';

export interface PlanTask {
  number: number;
  title: string;
  files: string[];
  description: string;
  dependsOn: string;
  complexity: string;
  acceptance: string;
  raw: string;
}

export interface ParsedPlan {
  name: string;
  type: FeatureType;
  branch: string;
  totalTasks: number;
  tasks: PlanTask[];
  raw: string;
}

/**
 * Parse a plan markdown file into structured tasks.
 */
export function parsePlan(content: string): ParsedPlan {
  const result: ParsedPlan = {
    name: '',
    type: 'feat',
    branch: '',
    totalTasks: 0,
    tasks: [],
    raw: content,
  };

  const lines = content.split('\n');

  // Extract metadata from blockquotes at top
  for (const line of lines) {
    const typeMatch = line.match(/^>\s*type:\s*(.+)/);
    if (typeMatch) {
      result.type = typeMatch[1].trim() as FeatureType;
    }
    const branchMatch = line.match(/^>\s*branch:\s*(.+)/);
    if (branchMatch) {
      result.branch = branchMatch[1].trim();
    }
    const totalMatch = line.match(/^>\s*total_tasks:\s*(\d+)/);
    if (totalMatch) {
      result.totalTasks = parseInt(totalMatch[1], 10);
    }
    const titleMatch = line.match(/^#\s+Implementation Plan:\s*(.+)/);
    if (titleMatch) {
      result.name = titleMatch[1].trim();
    }
  }

  // Split into task sections by H2
  const taskRegex = /^##\s+Task\s+(\d+):\s*(.+)/;
  let currentTask: PlanTask | null = null;
  const taskLines: string[] = [];

  for (const line of lines) {
    const taskMatch = line.match(taskRegex);
    if (taskMatch) {
      if (currentTask) {
        currentTask.raw = taskLines.join('\n').trim();
        parseTaskFields(currentTask, taskLines);
        result.tasks.push(currentTask);
      }
      currentTask = {
        number: parseInt(taskMatch[1], 10),
        title: taskMatch[2].trim(),
        files: [],
        description: '',
        dependsOn: 'None',
        complexity: 'Medium',
        acceptance: '',
        raw: '',
      };
      taskLines.length = 0;
    } else if (currentTask) {
      taskLines.push(line);
    }
  }

  // Flush last task
  if (currentTask) {
    currentTask.raw = taskLines.join('\n').trim();
    parseTaskFields(currentTask, taskLines);
    result.tasks.push(currentTask);
  }

  if (result.totalTasks === 0) {
    result.totalTasks = result.tasks.length;
  }

  return result;
}

function parseTaskFields(task: PlanTask, lines: string[]): void {
  let currentField = '';
  const fieldLines: string[] = [];

  for (const line of lines) {
    const fieldMatch = line.match(/^-\s+\*\*(\w[\w\s]*)\*\*:\s*(.*)/);
    if (fieldMatch) {
      flushField(task, currentField, fieldLines);
      currentField = fieldMatch[1].trim();
      fieldLines.length = 0;
      const value = fieldMatch[2].trim();
      if (value) fieldLines.push(value);
    } else if (currentField && line.match(/^\s+-\s+/)) {
      // Sub-list items (like file paths)
      fieldLines.push(line.replace(/^\s+-\s+/, '').trim());
    } else if (currentField && line.trim()) {
      fieldLines.push(line.trim());
    }
  }

  flushField(task, currentField, fieldLines);
}

function flushField(task: PlanTask, field: string, lines: string[]): void {
  if (!field) return;
  const value = lines.join('\n').trim();

  switch (field.toLowerCase()) {
    case 'files':
      task.files = lines.map((l) => l.replace(/`/g, '').replace(/\s*\(.*\)$/, '').trim());
      break;
    case 'description':
      task.description = value;
      break;
    case 'depends on':
      task.dependsOn = value || 'None';
      break;
    case 'complexity':
      task.complexity = value;
      break;
    case 'acceptance':
      task.acceptance = value;
      break;
  }
}
