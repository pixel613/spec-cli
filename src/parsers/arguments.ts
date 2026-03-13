export interface ParsedArgs {
  name: string;
  agents: string[];
  skills: string[];
  text: string;
  options: Record<string, string | boolean | string[]>;
}

/**
 * Parse variadic CLI arguments into structured parts.
 *
 * Rules:
 * - First word not starting with @, /, or -- is <name>
 * - Words starting with @ are agent references (e.g., @architect)
 * - Words starting with / are skill/MCP references (e.g., /mysql)
 * - Words starting with -- are options (handled by commander, but we parse leftovers)
 * - Remaining text is supplementary instructions
 */
export function parseArgs(args: string[]): ParsedArgs {
  const result: ParsedArgs = {
    name: '',
    agents: [],
    skills: [],
    text: '',
    options: {},
  };

  const textParts: string[] = [];
  let nameFound = false;

  for (const arg of args) {
    if (arg.startsWith('@')) {
      result.agents.push(arg.slice(1));
    } else if (arg.startsWith('/')) {
      result.skills.push(arg.slice(1));
    } else if (arg.startsWith('--')) {
      // Skip option flags (handled by commander)
      continue;
    } else if (!nameFound) {
      result.name = arg;
      nameFound = true;
    } else {
      textParts.push(arg);
    }
  }

  result.text = textParts.join(' ');
  return result;
}
