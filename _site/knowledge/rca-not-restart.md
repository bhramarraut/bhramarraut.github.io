---
title: "Root Cause Analysis: Why ‘Restarted the App’ Is Not a Root Cause"
slug: "rca-not-restart"
description: "A restart can restore service without explaining why the failure happened."
category: "support"
label: "PRACTICAL NOTE"
tags:
  - "RCA"
  - "root cause"
  - "troubleshooting"
status: "published"
featured: false
start_here: false
order: 107
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "incident-problem-change"
  - "approach-application-issue"
---

# Root Cause Analysis: Why “Restarted the App” Is Not a Root Cause

Restarting is one of the most useful actions in support—and one of the most commonly misunderstood.

When a frozen application works after a restart, the restart has proven something: resetting process state changed the outcome. It has not proven why the state became unhealthy.

## Workaround, fix, and cause

- A **workaround** restores progress without removing the underlying condition.
- A **fix** corrects the behavior for the intended scenario.
- A **root cause** explains the verified mechanism that produced the failure.

Restarting may be a workaround. A code correction may be a fix. Evidence that an unreleased resource exhausted a pool may establish the cause. These can all be true in the same incident.

## The five-minute memory leak story

Imagine a reporting service that becomes slow every afternoon. Restarting it returns response times to normal. The team could write “root cause: service needed restart,” but that only restates the action.

A stronger investigation might establish this chain:

1. Memory rises after each large export.
2. Completed exports do not release a particular object.
3. Memory pressure triggers heavy garbage collection and timeouts.
4. Restarting clears process memory, so performance temporarily returns.
5. A corrected cleanup path stops the growth during a repeatable load test.

Now the restart makes sense inside the explanation. It is evidence, not the cause.

## Questions that move beyond symptoms

- What changed before the first occurrence?
- What resource was exhausted, locked, expired, or misconfigured?
- Which condition is necessary for the failure?
- Why did monitoring or an existing control not catch it earlier?
- Does the proposed explanation predict the observed pattern?
- Can the suspected cause be reproduced or otherwise verified?
- After correction, does the original scenario pass without the workaround?

The “five whys” can help, but mechanically asking “why?” five times does not create evidence. Complex failures can have several contributing conditions rather than one dramatic root cause.

## Be honest when the cause is unknown

“Cause not confirmed” is better than a confident invention. A useful record can still say:

- Service recovered after process restart.
- Failure occurred twice after approximately six hours of runtime.
- Memory was elevated before the second occurrence.
- Logs required for deeper confirmation were unavailable.
- Monitoring and recurrence investigation are pending.

That is disciplined uncertainty. It gives the next investigator a starting point without laundering a guess into history.

## What a useful RCA contains

- User and business impact.
- A timeline based on timestamps.
- Detection and recovery actions.
- Verified causal and contributing factors.
- Evidence linking those factors to the failure.
- Corrective and preventive actions with owners.
- Validation criteria.
- What remains unknown.

An RCA should improve the system, not search for a person to blame. If people expect punishment, they hide the small details that often explain the failure.

> Recovery answers “How did we get users moving again?” Root cause analysis answers “What conditions created the failure, and what evidence supports that explanation?”

