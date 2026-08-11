---
title: "A Practical UAT Checklist for a Multi-Role SaaS Product"
slug: "uat-multirole-saas"
description: "Testing real journeys across roles, states, permissions, and tenant boundaries."
category: "product"
label: "CHECKLIST"
tags:
  - "UAT"
  - "SaaS"
  - "RBAC"
status: "published"
featured: true
start_here: true
order: 3
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "rbac-testing-strategy"
  - "expected-vs-actual-bug-report"
  - "auth-authz-permissions"
---

# A Practical UAT Checklist for a Multi-Role SaaS Product

Multi-role software can look perfect from the Admin account and still be unusable for everyone who does the daily work.

User acceptance testing should answer a practical question: can the intended users complete their real journeys under realistic rules and data conditions?

## Begin with personas, not pages

List each role and the outcome it needs. In an admissions product, that might include:

- A student submits an application and tracks its status.
- A Counselor works only assigned leads within the correct branch.
- A Branch Manager sees branch performance and reassigns work.
- An Admin manages configuration and permissions.

This prevents UAT from becoming a tour of screens with no business purpose.

## Prepare trustworthy test data

For each journey, define:

- A clean account with exactly the intended role.
- An active and inactive account.
- Records inside and outside the user’s scope.
- Empty, typical, and boundary data.
- Known starting states such as Draft, Submitted, Approved, or Suspended.
- Payment or notification stubs appropriate to the test environment.

Do not use real personal or payment data unless the environment, permission, and purpose explicitly allow it.

## Authentication and session behavior

- Valid login, invalid login, password reset, and logout behave clearly.
- Session expiry does not silently lose submitted work.
- A suspended user cannot start a new session.
- Role changes take effect according to the documented session policy.
- Browser back and copied URLs do not reveal protected content after logout.

## Authorization and data isolation

- Each role sees the actions it should use.
- Hidden actions are also rejected by the service when attempted directly.
- Users cannot access another tenant, branch, or owner’s records by changing an identifier.
- Admin overrides are explicit and auditable.
- Exports contain only data within the role’s allowed scope.

Test denial as carefully as success.

## Workflow and state transitions

- The happy path reaches the intended outcome.
- Required fields prevent incomplete transitions.
- Invalid transitions are rejected with a useful explanation.
- Refreshing or returning later preserves the correct state.
- Duplicate clicks do not create duplicate payments, records, or notifications.
- Cancellation, rejection, suspension, and reopening follow policy.

For example, a Submitted application may become read-only for the student while remaining reviewable by a Counselor. That expectation must be explicit.

## Payments and entitlements

- Successful payment creates the correct entitlement once.
- Failed or cancelled payment creates no false entitlement.
- A delayed callback does not duplicate the order.
- The visible amount, currency, tax, and receipt agree.
- Refund or admin override behavior matches permission policy.

Use authorized sandbox mechanisms; never test destructive payment behavior against real accounts casually.

## Communication and audit trail

- The correct person receives the correct notification.
- Notification content contains no unintended sensitive data.
- Links return the user to an allowed context.
- Important state and permission changes appear in the audit history.
- Timestamps and actor identity are understandable.

## Failure and recovery

- Empty states explain what to do next.
- Validation identifies the field and the correction needed.
- Network interruption does not create a false success.
- Retrying is safe where it should be.
- Support can locate a request, order, or correlation ID when provided.

## How I record a UAT result

For each case, I keep the role, precondition, steps, expected result, actual result, evidence, and pass/fail status. If it fails, I write a separate defect rather than turning the checklist cell into a long investigation thread.

I also distinguish a **product defect** from an **unclear requirement**. Both block acceptance, but they need different next actions.

## Exit questions

- Have all critical journeys passed for their real roles?
- Have cross-role and cross-tenant boundaries been tested?
- Are high-impact defects resolved and retested?
- Are accepted limitations documented honestly?
- Can support explain known errors and locate useful evidence?
- Has the business owner accepted the remaining risk?

> UAT is not proof that software has no defects. It is evidence that agreed users can complete agreed outcomes within agreed boundaries.

