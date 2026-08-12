---
title: "SIEM vs SOAR vs XDR vs MDR: My Mental Model"
slug: "siem-soar-xdr-mdr"
description: "Four security-operations terms explained through the work they help perform."
category: "security"
label: "LEARNING NOTE"
tags:
  - "SIEM"
  - "SOAR"
  - "XDR"
  - "MDR"
status: "published"
featured: false
start_here: false
order: 139
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "incident-problem-change"
  - "support-escalation-structure"
---

# SIEM vs SOAR vs XDR vs MDR: My Mental Model

Security acronyms become easier when I stop treating them as competing boxes and ask what operational work each one supports.

My simplified model is: **SIEM collects and correlates, SOAR coordinates response, XDR connects detections across security layers, and MDR supplies people and service operation.** Product boundaries vary by vendor, so this is a learning model—not a purchasing specification.

## SIEM: a place to investigate signals

A Security Information and Event Management platform ingests logs and events from systems such as identity providers, endpoints, servers, cloud services, and network devices. It supports search, correlation, detection rules, dashboards, and investigation.

The difficult work is not only collecting more logs. It is ensuring timestamps, identity, retention, parsing, access, and detection logic are reliable. A noisy SIEM can bury analysts under alerts.

## SOAR: repeatable response workflow

Security Orchestration, Automation, and Response connects tools and organizes playbooks. For a suspicious-login alert, a playbook might enrich the IP, look up the user, open a case, request approval, and disable a session.

Automation must be proportionate. Automatically isolating a critical server on a weak signal can create its own incident. Human approval belongs where impact and uncertainty are high.

## XDR: joined-up detection and response

Extended Detection and Response aims to correlate telemetry and response across several security domains—commonly endpoint, identity, email, cloud, or network—rather than treating each tool as an island.

“Extended” is defined differently across products. Before comparing solutions, I would ask which data sources are native, which are merely integrated, what response actions are possible, and who owns the evidence.

## MDR: an operated service

Managed Detection and Response is a service in which an external provider helps monitor, investigate, and respond using agreed technology and procedures.

Buying MDR does not transfer every security responsibility. The customer still needs clear contacts, escalation authority, asset context, access decisions, containment rules, and internal incident ownership.

## One alert through the model

A user signs in from an unusual location and an endpoint begins running an unexpected process.

- The SIEM correlates identity and other logs.
- XDR may connect endpoint, identity, and cloud evidence into one incident.
- SOAR runs enrichment and a response playbook.
- An MDR analyst reviews the evidence, contacts the customer, and acts within the agreed authority.

One product may perform several of these functions. The labels describe capabilities and service models, not clean physical boundaries.

## Questions that matter more than the acronym

- Which telemetry is actually collected?
- How quickly is it available and retained?
- Who validates and tunes detections?
- Which actions can be automated, and who approves them?
- What happens outside business hours?
- How are incidents handed back to the organization?
- Can evidence be exported if the vendor changes?

> I am learning security operations, not claiming professional SOC experience. This mental model helps me ask clearer questions without turning vendor language into assumed truth.

