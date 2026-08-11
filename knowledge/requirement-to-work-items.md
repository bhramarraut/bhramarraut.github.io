---
title: "Turning a Product Requirement Into Trackable Work"
slug: "requirement-to-work-items"
description: "How I decompose a feature without losing the user outcome that justified it."
category: "product"
label: "PRACTICAL NOTE"
tags:
  - "requirements"
  - "OpenProject"
  - "delivery"
status: "published"
featured: false
start_here: false
order: 137
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "dependencies-thinking"
  - "openproject-work-tracking"
  - "ai-acceptance-criteria"
---

# Turning a Product Requirement Into Trackable Work

“Build a lead management module” is not one work item. It is a suitcase packed with different users, states, rules, integrations, and unanswered questions.

If the team carries it as one ticket, progress looks simple until the suitcase opens during testing.

## Start with the outcome

Before splitting work, I try to write the user and business outcome:

“A Counselor can find assigned leads, record a follow-up, and see the next action without accessing another branch’s data.”

That sentence protects the purpose. Otherwise decomposition can produce twenty completed technical tasks and no usable workflow.

## Identify the workflow and its boundaries

For a lead follow-up feature, I would clarify:

- Who performs the action?
- What state begins the journey?
- What is the happy path?
- What alternate and error paths matter?
- Which roles can view or change the record?
- Which branch or tenant owns the data?
- What must be audited?
- What external system or notification is involved?
- What proves success to the user?

Unknown answers become explicit questions or discovery items—not silent assumptions inside implementation.

## Split by verifiable capability

Useful work items might be:

- Display assigned leads with an empty state.
- Open an in-scope lead and deny an out-of-scope lead.
- Record follow-up outcome and next-action date.
- Validate required fields and invalid dates.
- Preserve an audit entry for the status change.
- Notify the assigned user when ownership changes.
- Add role-and-scope UAT cases.

Each item should produce behavior that can be demonstrated or tested. “Work on backend” is activity, not a verifiable result.

## What I put in a work item

- **Title:** User-visible behavior, not a vague component name.
- **Context:** Why this work exists.
- **Scope:** What is included and deliberately excluded.
- **Acceptance criteria:** Observable outcomes and boundaries.
- **Dependencies:** Decisions, services, data, access, or earlier work.
- **Evidence:** Design, requirement, example payload, or policy reference.
- **Owner and status:** Who moves it forward and where it stands.
- **Validation notes:** How the completed behavior will be checked.

## Acceptance criteria that can fail

Weak: “Lead update should work properly.”

Stronger:

- Given a lead assigned to the signed-in Counselor, when the Counselor records a follow-up with a valid next-action date, then the update is saved and visible after refresh.
- Given a lead from another branch, when the Counselor opens its direct URL, then access is denied and no lead data is returned.
- Given a next-action date in the past, when the form is submitted, then the field shows a clear validation message and no update is saved.

Criteria are useful only if a tester can observe pass or fail.

## Keep relationships visible

In OpenProject, a work package can represent a task, feature, bug, or other configured type and can carry fields such as status, assignee, priority, and due date. Relations can express blocking or sequencing. The tool helps, but it cannot rescue unclear work.

The tracker should reveal:

- Which item supports which outcome.
- What blocks it.
- Which decision is outstanding.
- What has been verified.
- What remains outside scope.

## The final test

After decomposition, read only the work-item titles. Do they describe a coherent user journey, or a list of technical nouns? Then read the acceptance criteria. Could another person validate them without asking what “done” means?

## Reference

[OpenProject documentation: Work packages](https://www.openproject.org/docs/user-guide/work-packages/)

> Good decomposition makes work smaller without making the purpose disappear.

