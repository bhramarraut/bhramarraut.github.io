---
title: "How I Think About Dependencies"
slug: "dependencies-thinking"
description: "A dependency is not a date—it is a relationship that can block an outcome."
category: "product"
label: "PRACTICAL NOTE"
tags:
  - "dependencies"
  - "planning"
  - "delivery"
status: "published"
featured: false
start_here: false
order: 138
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "requirement-to-work-items"
  - "openproject-work-tracking"
---

# How I Think About Dependencies

A team can finish the payment screen on Tuesday and still be unable to release payments on Friday. The gateway account is not approved, tax rules are undecided, and nobody has created the refund permission.

The screen is complete. The outcome is not.

## A dependency is a relationship

A dependency exists when one piece of work, decision, system, or person needs something else before it can safely progress or finish.

Common forms include:

- **Technical:** The UI needs an API contract.
- **Data:** Testing needs realistic, privacy-safe sample records.
- **Decision:** Implementation needs a policy choice from the product owner.
- **Access:** Investigation needs a test account with the affected role.
- **External:** Release needs approval or credentials from a payment provider.
- **Sequence:** Migration must finish before the new service becomes authoritative.

Writing “blocked” without naming the dependency hides the useful part.

## The sentence I want to see

“Checkout validation is blocked by confirmation of the tax calculation rule. Product owner: Priya. Decision needed by 14 August to protect the test window. Until then, the team can complete layout and error-state work but cannot verify final totals.”

This names the relationship, owner, required outcome, date, impact, and work that can continue.

## Dependencies are not excuses

A visible dependency should lead to action:

1. Confirm that it is real, not assumed.
2. Identify the smallest deliverable that unblocks progress.
3. Assign an owner on both sides of the handoff.
4. Record when it is needed and what happens if it slips.
5. Look for parallel work or a safe temporary interface.
6. Recheck the dependency when facts change.

“Waiting for backend” is passive. “API team will provide the error schema by Wednesday; UI can build against the agreed example in the meantime” is managed.

## A multi-role product example

Consider an admissions product with Admin, Branch Manager, and Counselor roles. A requirement says counselors can view assigned leads.

That apparently small story depends on:

- A definition of assignment.
- Branch and tenant scoping rules.
- Permission names and default role mappings.
- Test users for each role.
- Records inside and outside the allowed branch.
- Audit expectations for changes.

If these are discovered only during UAT, the team experiences them as surprise defects. If they are exposed during decomposition, they become manageable planning information.

## False “done” states

Dependencies often reveal work marked done too early:

- Code merged, but configuration is absent.
- Feature enabled, but no role can access it.
- API deployed, but the consuming client still uses the old schema.
- Migration ran, but reconciliation was not completed.
- Training material exists, but support has not received it.

Done should describe an integrated result, not isolated activity.

## My dependency check

- What must be true before this can start?
- What must be true before users can benefit?
- Who or what supplies each prerequisite?
- Is the dependency accepted by that owner?
- What evidence will show it is complete?
- Can we reduce, mock, split, or remove it safely?
- What downstream work depends on us?

> A dependency map is valuable because it exposes where a plan can break before the calendar does.

