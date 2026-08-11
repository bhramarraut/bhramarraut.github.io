---
title: "What OWASP ZAP Is—and What It Is Not"
slug: "owasp-zap"
description: "An intercepting proxy and web security tool whose results still require scope and judgment."
category: "security"
label: "LEARNING NOTE"
tags:
  - "OWASP ZAP"
  - "web security"
  - "authorized testing"
status: "published"
featured: true
start_here: true
order: 7
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "owasp-wstg"
  - "free-security-testing-tools"
---

# What OWASP ZAP Is—and What It Is Not

OWASP ZAP can sit between a browser and a web application, show the requests and responses, passively flag suspicious patterns, crawl reachable content, and—when explicitly authorized—actively send test payloads.

That last capability is why “I only clicked scan” is not a safety argument.

## Passive and active are different risk levels

**Passive scanning** examines traffic that passes through ZAP without changing the messages. It is a good place to begin learning because it observes normal use.

**Active scanning** uses known attack techniques against selected targets. ZAP’s own documentation clearly warns that this is an attack and should not be used on applications the tester does not own.

Active scanning can alter data, trigger defenses, create load, or affect workflows. Written authorization, correct scope, suitable environment, and recovery planning come first.

## What ZAP can help with

- Inspecting HTTP requests, responses, headers, and cookies.
- Understanding how an application maintains a session.
- Finding certain missing security headers or insecure patterns.
- Crawling and mapping reachable application paths.
- Replaying and editing requests in an authorized lab.
- Automating selected checks in a controlled delivery pipeline.

## What ZAP cannot decide for me

ZAP does not know the full business policy. It may not discover that a Counselor can approve their own exception, that a refund can be repeated, or that one tenant can infer another tenant’s data through totals.

Its documentation also notes that automated active scanning cannot find all vulnerability types, including many logical access-control problems. Alerts need manual verification.

## A safe beginner exercise

1. Run an intentionally vulnerable local lab such as OWASP Juice Shop.
2. Set the browser to proxy through ZAP.
3. Browse a simple workflow normally.
4. Find the request and identify method, URL, headers, body, and response status.
5. Review passive alerts and read the evidence and confidence level.
6. Verify one finding using the lab’s intended learning material.
7. Reset the lab.

Active scanning should come later, still against the lab, after scope and behavior are understood.

## What a useful ZAP finding report says

- Which authorized target and path were tested.
- Whether the evidence came from passive observation or active testing.
- The exact request and relevant sanitized response.
- Why the behavior matters in this application.
- Whether the alert was manually verified.
- What the tool could not establish.

## References

- [OWASP ZAP](https://www.zaproxy.org/)
- [ZAP documentation: Active Scan](https://www.zaproxy.org/docs/desktop/start/features/ascan/)
- [ZAP documentation: Passive Scan](https://www.zaproxy.org/docs/desktop/start/features/pscan/)

> ZAP is a powerful microscope and, in active mode, a sharp instrument. Neither replaces permission, method, or judgment.

