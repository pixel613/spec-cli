import fs from 'node:fs';
import path from 'node:path';

const WORKFLOW_DIR = '.workflow';

/**
 * Load a prompt template from .workflow/prompts/<name>.md
 */
export function loadPrompt(name: string, cwd: string = process.cwd()): string {
  const promptPath = path.join(cwd, WORKFLOW_DIR, 'prompts', `${name}.md`);
  if (!fs.existsSync(promptPath)) {
    throw new Error(`Prompt template "${name}" not found at ${promptPath}`);
  }
  return fs.readFileSync(promptPath, 'utf-8');
}

/**
 * Substitute template variables in a prompt string.
 * Variables use {varName} syntax.
 */
export function renderPrompt(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, value);
  }
  return result;
}

/**
 * Build the agent/skill instruction block for prompt injection.
 */
export function buildAgentSkillBlock(agents: string[], skills: string[]): string {
  const parts: string[] = [];

  if (agents.length > 0) {
    parts.push(`\n## Agent Instructions\nInvolve the following agents in analysis: ${agents.map(a => `@${a}`).join(', ')}`);
  }

  if (skills.length > 0) {
    parts.push(`\n## Skill/MCP Instructions\nUse the following skills/MCPs to assist: ${skills.map(s => `/${s}`).join(', ')}`);
  }

  return parts.join('\n');
}

/**
 * Assemble a full prompt from template name + variables + agents/skills + extra text.
 */
/**
 * Load architecture constraints from .workflow/architecture.md if it exists.
 */
export function loadArchitectureConstraint(cwd: string = process.cwd()): string {
  const archPath = path.join(cwd, WORKFLOW_DIR, 'architecture.md');
  if (!fs.existsSync(archPath)) return '';

  const content = fs.readFileSync(archPath, 'utf-8');
  return `\n## Architecture Constraint
This project follows the architecture specification below. All implementations must comply:
${content}

<HARD-GATE>
- New files must be placed in the correct directory as defined by the architecture
- Dependency direction must not be violated (e.g., domain must not reference infrastructure)
- Follow the architecture's naming conventions and file naming rules
- If requirements cross layers, use Port/Adapter or the corresponding architectural pattern
- NestJS projects: new features must create independent Modules; do not stuff logic into unrelated Modules
</HARD-GATE>`;
}

/**
 * Assemble a full prompt from template name + variables + agents/skills + extra text.
 */
export function assemblePrompt(opts: {
  templateName: string;
  vars: Record<string, string>;
  agents?: string[];
  skills?: string[];
  extraText?: string;
  cwd?: string;
}): string {
  const template = loadPrompt(opts.templateName, opts.cwd);
  let prompt = renderPrompt(template, opts.vars);

  // Auto-append architecture constraints when architecture.md exists
  const archConstraint = loadArchitectureConstraint(opts.cwd);
  if (archConstraint) {
    prompt += archConstraint;
  }

  const agentSkillBlock = buildAgentSkillBlock(opts.agents ?? [], opts.skills ?? []);
  if (agentSkillBlock) {
    prompt += '\n' + agentSkillBlock;
  }

  if (opts.extraText) {
    prompt += `\n\n## Additional Instructions\n${opts.extraText}`;
  }

  return prompt;
}
