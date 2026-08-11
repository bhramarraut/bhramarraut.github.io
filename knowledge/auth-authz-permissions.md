---
title: "Authentication, Authorization and Permissions"
slug: "auth-authz-permissions"
description: "A product-support view of three access-control ideas people often mix together."
category: "product"
label: "EXPLAINER"
tags:
  - "authentication"
  - "authorization"
  - "permissions"
status: "published"
featured: false
start_here: false
order: 110
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "rbac-testing-strategy"
  - "uat-multirole-saas"
---

# Authentication, Authorization and Permissions

A user signs in successfully, sees the dashboard, and then receives “Access denied” when opening a report. Was login broken?

No. Authentication succeeded. The failure appeared when the product decided what that authenticated user was allowed to do.

## Authentication: who are you?

Authentication establishes an identity. A password, one-time code, security key, passkey, or federated identity provider can be part of that process.

Typical authentication issues include:

- Correct credentials are rejected.
- A one-time code never arrives or expires too quickly.
- Single sign-on redirects in a loop.
- A session expires and the UI does not recover cleanly.
- The user authenticates to the wrong tenant or account context.

Authentication does not answer whether the person should see payroll, edit a lead, or approve a refund.

## Authorization: may you do this here?

Authorization evaluates whether an authenticated identity may perform an action on a resource under the current conditions.

The decision can consider role, ownership, organization, branch, record state, subscription, time, device posture, or other policy inputs. “Can edit leads” may still mean “can edit leads assigned to the user’s branch, except after closure.”

That is why authorization testing needs more than one admin account.

## Permissions: the individual grants

Permissions are the specific allowed operations—such as `lead.read`, `lead.update`, or `refund.approve`. A role usually groups permissions so administrators can assign a meaningful job function instead of configuring every action separately.

In a simple role-based model:

- Users are assigned roles.
- Roles contain permissions.
- Permissions allow operations on resources.

Real systems can add exceptions and data scope, so the role name alone is not always enough to predict access.

## A support-oriented diagnosis

Suppose a Counselor can sign in and list leads but cannot open one particular lead.

I would compare:

1. Can the same user open another assigned lead?
2. Can another Counselor in the same branch open the record?
3. Can an Admin open that exact record?
4. Does the failing record belong to a different branch or owner?
5. Does the request return `401`, `403`, or another response?
6. Was the role, assignment, tenant, or record state recently changed?

An HTTP `401` generally points toward missing or invalid authentication. A `403` generally means the server understood the request but refuses it. These are directions for investigation, not complete root causes.

## Security boundary, not only navigation

Hiding an Edit button is useful interface behavior, but it is not sufficient authorization. A user can still send a request directly. The service must enforce the permission at the trusted boundary.

Good testing therefore checks both sides:

- An allowed role can complete the intended action.
- A disallowed role cannot complete it, even through a copied URL or direct request.

## A clean issue statement

“Authentication succeeds for the Counselor account. The lead list loads. Opening assigned Lead 1842 returns HTTP 403, while an Admin can open the same record. Expected permission: Counselors can view leads assigned to their branch. The role assignment and branch scope require verification.”

That statement separates evidence from diagnosis.

## References

- [NIST glossary: Role-Based Access Control](https://csrc.nist.gov/glossary/term/role_based_access_control)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

