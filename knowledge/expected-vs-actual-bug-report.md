---
title: "Expected vs Actual: Writing a Useful Bug Report"
slug: "expected-vs-actual-bug-report"
description: "A practical way to turn ‘it is not working’ into evidence someone can act on."
category: "support"
label: "CHECKLIST"
tags:
  - "bug report"
  - "UAT"
  - "documentation"
status: "published"
featured: true
start_here: true
order: 2
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "approach-application-issue"
  - "support-escalation-structure"
---

# Expected vs Actual: Writing a Useful Bug Report

“The login is broken” sounds urgent, but it gives the next person almost nothing to investigate. Which login? Which user? What happened after the button was pressed? Was there an error, a blank screen, or simply no response?

A useful bug report closes that gap. It turns frustration into a small, reproducible piece of evidence.

## The two sentences that change everything

**Expected:** After entering a valid email and password, the user should reach the dashboard.

**Actual:** After selecting **Sign in**, the loading indicator runs for about ten seconds and the page returns to the login form with the message “Session could not be created.”

The expected statement describes the intended contract. The actual statement records only what was observed. Keeping them separate prevents guesses such as “the database is down” from being presented as facts.

## A report another person can continue

I use this structure:

- **Summary:** One sentence naming the user, action, and failure.
- **Environment:** App environment, OS, browser or device, app version, and user role.
- **Precondition:** The state that must already exist, such as an active account or assigned lead.
- **Steps to reproduce:** Numbered actions starting from a known point.
- **Expected result:** What the requirement, design, or accepted workflow says should happen.
- **Actual result:** What visibly happened instead.
- **Frequency:** `5/5`, intermittent, or unable to reproduce.
- **Evidence:** Screenshot, timestamp, request ID, relevant log excerpt, or network response—with secrets removed.
- **Impact:** What the user cannot complete and whether a workaround exists.

## A relatable example

Imagine a counselor updating a lead in an admissions product.

**Weak report:** “Lead status not changing.”

**Useful report:** “A Counselor assigned to Branch A cannot change an assigned lead from New to Contacted. After selecting Save, the form closes but the status remains New. Reproduced 3/3 times in Chrome on Windows 11. An Admin can update the same lead. The counselor cannot record the completed follow-up.”

That report does not claim the permission system is defective. It simply reveals a role-related comparison worth investigating.

## Evidence should reduce uncertainty

A screenshot can prove what the screen displayed, but not what request failed. A network response can show an HTTP status, but not automatically explain the root cause. A timestamp helps someone correlate the report with service logs or a release window. Each item answers a different question.

Capture the smallest useful evidence set. Do not include passwords, access tokens, personal data, full cookies, or unrelated customer information.

## Common mistakes

- Writing “not working” without naming the expected outcome.
- Starting the steps halfway through the journey.
- Omitting the user role in a role-based product.
- Reporting a one-time observation as “always.”
- Mixing diagnosis into observation: “The API is broken” when only a spinner was seen.
- Attaching a screenshot without a timestamp or explanation.
- Marking a defect fixed without repeating the original failing scenario.

## Copy-ready template

**Summary:**  
**Environment:**  
**Account or role:**  
**Precondition:**  
**Steps to reproduce:**  
**Expected:**  
**Actual:**  
**Frequency:**  
**Evidence:**  
**Impact:**  
**Workaround:**

> A good bug report is not long for the sake of being long. It is complete enough that the next person does not have to rediscover the problem.

