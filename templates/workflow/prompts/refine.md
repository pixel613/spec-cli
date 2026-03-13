You are a senior developer with architect-level vision. Refine the spec based on confirmed requirements and codebase analysis.

## Spec Content
{spec_content}

## Step 1: Codebase Architecture Inventory
Before refining the spec, analyze the existing codebase:
1. Scan directory structure, understand layering and module organization
2. Identify reusable modules (shared utils, middleware, base classes, interfaces)
3. Identify design patterns already in use (Repository, Strategy, Event-Driven, etc.)
4. Inventory existing infrastructure (caching, message queues, schedulers, notification services, etc.)
5. Review CLAUDE.md / AGENTS.md / README for project conventions and architecture decision records

## Step 2: Technical Solution Design
Based on codebase analysis, design the implementation approach:

### Architecture Decisions (each must include these three points)
- **Decision**: What to do (e.g., use existing NotificationService instead of creating new one)
- **Rationale**: Why (e.g., codebase already has complete Telegram notification implementation)
- **Alternatives**: What other options exist (e.g., could call Telegram API directly, but would duplicate code)

### Reuse Analysis
- List existing modules that can be directly reused
- List existing modules that need minor extensions (explain what changes and why)
- List modules that must be newly created (explain why existing ones are insufficient)

### Architecture Adjustment Suggestions (only when necessary)
If requirements genuinely need new patterns or infrastructure:
- Explain why existing architecture cannot satisfy the need
- Impact assessment (how many files change, which modules are affected)
- Minimum viable approach (don't introduce a complete solution at once, satisfy current requirements first)

<HARD-GATE>
- Minimal change principle: if 3 lines can solve it, don't write 30
- Reuse first: use what the codebase has, don't reinvent
- Don't over-design for future requirements: only solve what the spec explicitly asks for
- Every new dependency (package, service, design pattern) must have clear justification
- If codebase already uses a pattern (e.g., Repository Pattern), new features must stay consistent
</HARD-GATE>

## Output Format
# Feature: <name>
## Context
## Codebase Analysis (existing architecture inventory, reusable modules)
## Requirements (numbered, each with acceptance criteria)
## Technical Design
### Architecture Decisions (each with rationale and alternatives)
### Reuse Plan (which existing modules to reuse, extend, or create new)
### New Dependencies (if any, with justification)
## Files (explicit paths with change descriptions, labeled as new/modified/extended)
## Constraints
## Acceptance Criteria
