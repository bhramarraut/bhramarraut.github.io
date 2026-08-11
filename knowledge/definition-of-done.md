---
title: "Definition of Done: Why Code Complete Is Not Always Done"
slug: "definition-of-done"
description: "A shared quality commitment that makes completed work transparent."
category: "scrum"
label: "EXPLAINER"
tags:
  - "Scrum"
  - "Definition of Done"
status: "published"
featured: false
start_here: false
order: 127
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "sprint-goal-vs-tasks"
  - "psm-i-scrum-thinking"
---

# Definition of Done: Why Code Complete Is Not Always Done

The developer says the feature is done. Testing has not started, keyboard users cannot reach the dialog, support has no error guide, and the database migration has never been tried on a realistic copy.

Something may be code complete. The product increment is not necessarily Done.

## What the Definition of Done does

In Scrum, the Definition of Done is the formal description of the state of the Increment when it meets the quality measures required for the product. It creates transparency: everyone can understand what “Done” means.

If a Product Backlog item does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review as part of the Increment. It returns to the Product Backlog for future consideration.

## A practical product example

For a web product, a Definition of Done might require that completed work:

- Meets the accepted functional behavior.
- Has appropriate automated and manual checks completed.
- Preserves role and tenant boundaries.
- Meets agreed accessibility and responsive standards.
- Includes necessary monitoring, migration, and rollback considerations.
- Has no unresolved critical defects.
- Updates user or support documentation when behavior changes.
- Is integrated with the existing Increment and usable.

This is only an example. The actual Definition of Done belongs to the product and organization context.

## Done is not acceptance criteria

Acceptance criteria describe what is specific to one Product Backlog item. The Definition of Done describes the quality state expected of every Increment.

For a password-reset item:

- “The reset link expires after the agreed period” is acceptance criteria.
- “Security checks pass and the change is integrated and documented” may be part of the Definition of Done.

Both matter. One describes the feature; the other protects the quality of the product.

## Why ambiguity becomes expensive

When “done” means something different to each person:

- Testing becomes a hidden phase after the Sprint.
- Completed counts exaggerate usable progress.
- Defects and documentation accumulate as invisible work.
- The Product Owner sees an Increment that cannot actually be released.
- Teams compare velocity using incompatible definitions.

A stricter Definition of Done may initially make less work appear complete. That is increased transparency, not reduced productivity.

## Improve it without turning it into a novel

The Definition of Done should be clear, observable, and relevant. “High quality” is too vague. “All supported keyboard interactions pass the agreed accessibility check” is testable.

Teams can strengthen the Definition of Done as capability grows. They should not quietly weaken it to make a Sprint chart look better. If an organizational standard exists, Scrum Teams must follow it as a minimum; multiple Scrum Teams working on one product share the same Definition of Done.

## Questions I would ask

- Could this Increment be used safely in its intended environment?
- Is it integrated, or only complete on one person’s machine?
- Are functional and important negative cases verified?
- Are security, accessibility, data, and operational expectations visible?
- Does any unfinished work remain hidden behind the word “done”?

## Reference

[The official Scrum Guide, November 2020](https://scrumguides.org/scrum-guide.html)

> “Done” is not a celebration word. It is a shared quality boundary.

