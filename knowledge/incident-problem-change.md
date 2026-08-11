---
title: "Incident vs Problem vs Change: A Beginner Mental Model"
slug: "incident-problem-change"
description: "Three IT service concepts explained through one ordinary application failure."
category: "support"
label: "EXPLAINER"
tags:
  - "incident"
  - "problem"
  - "change"
  - "ITSM"
status: "published"
featured: false
start_here: false
order: 106
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "rca-not-restart"
  - "support-escalation-structure"
---

# Incident vs Problem vs Change: A Beginner Mental Model

At 9:05 a.m., users cannot submit a payment. By 9:20, the team restarts a service and payments begin moving again. At 2:00 p.m., engineers discover that a connection pool was being exhausted. The next morning, they deploy a configuration correction after review.

That one story contains an incident, a problem, and a change.

## Incident: restore the service

An **incident** is an unplanned interruption or reduction in service quality. The immediate question is: how do we restore a usable service safely?

In the payment example, failed submissions are the incident. Restarting the service may be a valid recovery action if it is approved and understood. The incident can be resolved when service is restored even if the deeper cause is still unknown.

This can feel unsatisfying, but restoration and explanation are different responsibilities. A hospital does not postpone stopping the bleeding until it understands every detail of the accident.

## Problem: understand and reduce recurrence

A **problem** is the cause, or potential cause, of one or more incidents. Problem work asks why the failure happened, what conditions made it possible, and how recurrence can be reduced.

“The application went down” is not a problem diagnosis. “Database connections were not released after a timeout path, gradually exhausting the pool” is closer—provided evidence supports it.

Some problems are known before an incident occurs. A team might spot disk growth during monitoring and investigate before users feel any impact.

## Change: alter something deliberately

A **change** is a planned addition, modification, or removal that could affect a service. Deploying the connection-pool correction is a change. So is updating a firewall rule, rotating a certificate, or enabling a feature flag.

Changes deserve proportionate control because a change intended to prevent one incident can create another. The level of review should match the risk, not the size of the ticket description.

## Why the distinction matters in support

When these words are blurred, teams make avoidable mistakes:

- They keep an incident open for weeks while waiting for a full root-cause analysis.
- They close the problem record because a restart restored service.
- They deploy an unreviewed “quick fix” without recognizing it as a service-affecting change.
- They promise that an incident will never recur before the cause has been verified.

A cleaner sequence is:

1. Record user impact and restore service.
2. Preserve evidence from the incident.
3. Investigate the underlying problem when justified.
4. Propose, assess, test, and implement a change.
5. Verify both the change and the original user journey.

## A smaller everyday example

A desktop application freezes every afternoon. Ending the process lets the user continue: incident recovery. Repeated observations show memory usage growing after each file import: problem investigation. Releasing and installing a tested version that disposes of the import object correctly: change.

The restart was useful. It was not the root cause.

> The shortest mental model I keep is: an incident hurts now, a problem explains why, and a change deliberately alters the service.

