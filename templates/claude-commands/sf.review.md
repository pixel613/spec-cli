---
description: View review records
---

Parse $ARGUMENTS:
- First word not starting with @, /, or -- is <name>
- --step N: view specific task review
- --summary: all tasks summary
- @ prefixed = agent, / prefixed = skill

Read `.workflow/state.yaml`.

- No options: show current pending review or most recent review
- --step N: read `.workflow/reviews/<name>-task-N.md` and display
- --summary: list all tasks' review status

{If @agent /skill present, they can provide supplementary analysis on existing reviews}
