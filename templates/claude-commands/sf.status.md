---
description: View workflow status
---

Parse $ARGUMENTS:
- Has value → show specific feature status
- No value → list all features

Read `.workflow/state.yaml`.

- No args: list all features with name, type, phase, task progress, branch
- Has <name>: show detailed status for that feature, including each task's status
