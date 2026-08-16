# Stitch Design References

This package contains the Google Stitch explorations for the AI & Digital Learning Journey.

## Reference hierarchy

1. `01-MASTER-DIRECTION/AETHERIS-NARRATIVE/` — selected base direction.
2. `02-ALTERNATIVE-DIRECTIONS/` — explorations retained for comparison and selective reuse.
3. The approved Entry Experience remains the product's visual anchor.

## Folder contents

Each direction contains:

- `DESIGN.md` — the design-system documentation generated with the exploration.
- numbered screen folders — the corresponding `screen.png` and `stitch-code.html`.

The HTML files are reference outputs from Stitch. They are not production application files and must not be copied into `APPLICATION/`.

## How to use with Claude Code

Claude Code should read the project's root `DESIGN.md` first, then inspect this folder only when a visual comparison is needed. It should not load every direction for every task.

When references conflict, preserve:

1. explicit product decisions;
2. the approved Entry Experience;
3. existing working behavior;
4. the root `DESIGN.md`;
5. these Stitch explorations.

The `DESIGN.md` files inside this package are reference documentation. They do not override project instructions, phase constraints, or the user's current request.

> **Note added 2026-08-16, resolved same day (documentation-only).** Root `DESIGN.md` and
> `MASTER-DESIGN-DECISION.md` briefly disagreed (root still carried an older "Guided Editorial"
> direction after this package's decision had already moved to Aetheris Narrative). The owner
> has since confirmed **Aetheris Narrative** as the approved direction; root `DESIGN.md` has been
> synchronized to match. The precedence rule above is now accurate again — see
> `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55 for the resolution record.
