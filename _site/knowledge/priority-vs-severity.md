---
title: "Priority vs Severity: Related but Not the Same"
slug: "priority-vs-severity"
description: "Severity measures impact; priority decides what should be handled first."
category: "support"
label: "EXPLAINER"
tags:
  - "priority"
  - "severity"
  - "ITSM"
status: "published"
featured: false
start_here: false
order: 104
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "what-is-sla"
  - "support-escalation-structure"
---

# Priority vs Severity: Related but Not the Same

Two issues arrive together. One corrupts a field in a rarely used internal test environment. The other is a spelling mistake on the payment button that millions of customers will see during tonight’s campaign.

Which is worse? Which should be handled first?

Those are different questions.

## Severity asks how bad the impact is

Severity describes the scale and nature of harm. Useful factors include:

- How many users or business processes are affected?
- Is a critical workflow blocked or merely inconvenient?
- Is data lost, exposed, duplicated, or incorrect?
- Is there a security, safety, financial, or compliance risk?
- Is a safe workaround available?

A crash affecting every user is usually severe. A slight alignment issue on one browser is usually not. But labels should follow the organization’s defined model, not personal emotion.

## Priority asks what should be handled first

Priority is a decision about order and urgency. It includes severity, but also considers:

- Contractual response commitments.
- A release, audit, campaign, or customer deadline.
- Availability of a workaround.
- Dependencies blocking other work.
- Effort and risk of the proposed correction.
- Strategic or reputational context.

Priority can change while technical severity stays the same. A cosmetic issue may become urgent before a televised product demonstration, then return to normal priority afterward.

## Four believable combinations

**High severity, high priority:** All customers are unable to sign in and no workaround exists.

**High severity, lower immediate priority:** A destructive defect exists only in an isolated test environment, is access-controlled, and can be contained while a safer fix is prepared.

**Low severity, high priority:** The company name is misspelled on a public campaign landing page launching in one hour.

**Low severity, low priority:** A non-blocking icon is one pixel out of alignment in an internal tool.

These examples are not universal classifications. They show why one label cannot replace the other.

## A practical triage conversation

Instead of asking, “Is this P1?”, I prefer to establish the facts first:

1. What user journey is affected?
2. How many users, tenants, roles, or regions are in scope?
3. What is the worst verified impact?
4. Is data or security involved?
5. Is there a tested workaround?
6. What time-bound business event changes the urgency?
7. Which policy or SLA defines the final priority?

That conversation makes the label explainable. It also prevents the loudest person in the room from becoming the priority system.

## The sentence I would put in a ticket

“Severity is high because checkout is blocked for all users. Priority is urgent because no workaround exists and the failure is affecting live transactions.”

Or:

“Severity is low because the issue is visual and does not block completion. Priority is high until today’s customer demonstration because the defect appears on its opening screen.”

> Severity describes the wound. Priority decides who is treated first. Good triage records the reasoning behind both.

