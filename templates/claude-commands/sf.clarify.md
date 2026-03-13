---
description: Run requirement clarification on a spec
---

Parse $ARGUMENTS:
- First word not starting with @ or / is <name>
- @ prefixed = agent, / prefixed = skill
- Remaining = supplementary instructions

Read `.workflow/specs/<name>.md`.

Analyze spec, identify requirements that can be further clarified.
Present as numbered questions, wait for user answers.
Update spec based on answers.

{If @agent present, involve corresponding agent}
{If /skill present, use corresponding MCP/skill to assist}
{Supplementary instructions}
