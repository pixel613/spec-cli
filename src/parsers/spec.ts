export interface ParsedSpec {
  title: string;
  source?: string;
  sections: Record<string, string>;
  raw: string;
}

/**
 * Parse a spec markdown file into structured sections.
 */
export function parseSpec(content: string): ParsedSpec {
  const lines = content.split('\n');
  const result: ParsedSpec = {
    title: '',
    sections: {},
    raw: content,
  };

  let currentSection = '';
  const sectionLines: string[] = [];

  for (const line of lines) {
    // Extract title from first H1
    const h1Match = line.match(/^#\s+(?:Feature:\s*)?(.+)/);
    if (h1Match && !result.title) {
      result.title = h1Match[1].trim();
      continue;
    }

    // Extract source from blockquote
    const sourceMatch = line.match(/^>\s*source:\s*(.+)/);
    if (sourceMatch) {
      result.source = sourceMatch[1].trim();
      continue;
    }

    // Detect H2 sections
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      if (currentSection && sectionLines.length > 0) {
        result.sections[currentSection] = sectionLines.join('\n').trim();
      }
      currentSection = h2Match[1].trim();
      sectionLines.length = 0;
      continue;
    }

    if (currentSection) {
      sectionLines.push(line);
    }
  }

  // Flush last section
  if (currentSection && sectionLines.length > 0) {
    result.sections[currentSection] = sectionLines.join('\n').trim();
  }

  return result;
}
