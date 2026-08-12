---
title: "My Windows Troubleshooting Checklist"
slug: "windows-troubleshooting-checklist"
description: "A repeatable path from vague symptom to isolated, documented evidence."
category: "windows"
label: "CHECKLIST"
tags:
  - "Windows"
  - "troubleshooting"
  - "support"
status: "published"
featured: true
start_here: true
order: 6
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "windows-commands-toolkit"
  - "windows-startup-troubleshooting"
  - "dns-troubleshooting"
---

# My Windows Troubleshooting Checklist

When a computer “has become slow,” it is tempting to clear temporary files, update drivers, run repair commands, and restart three times. If performance improves, I still do not know which action mattered.

My checklist is designed to remove uncertainty before applying a repair.

## 1. Define the symptom

- What exact action is slow or failing?
- When did it last work normally?
- Is the failure constant or intermittent?
- What message, code, sound, or visible state appears?
- Can the behavior be reproduced from a known starting point?
- What would normal behavior look like?

“Excel takes 45 seconds to open one network workbook” is better than “the laptop is slow.”

## 2. Establish scope

- One application or the whole system?
- One file or every file of that type?
- One Windows user profile or all profiles?
- One network or every network?
- One peripheral or every peripheral?
- One device or several devices?

Scope often identifies the layer faster than a repair utility.

## 3. Capture recent change

- Windows or application update.
- New driver, peripheral, VPN, antivirus, or extension.
- Changed password, role, proxy, or network.
- Storage becoming full.
- Power interruption or forced shutdown.

Sequence is not proof of cause, but it gives a testable direction.

## 4. Observe before changing

- Task Manager: CPU, memory, disk, network, and startup impact.
- Event Viewer around the exact failure time.
- Free space and storage-health indicators.
- Windows Update and update history.
- Device Manager warnings.
- Application logs or reliability history when relevant.
- Network and DNS results for cloud-dependent applications.

Record timestamps. A red event from three months ago is less useful than one matching the current reproduction.

## 5. Isolate one variable

- Restart the affected application before the whole PC.
- Try a known-good file.
- Try another user profile.
- Try another browser without extensions.
- Try a permitted alternative network.
- Disconnect a nonessential peripheral.
- Use Safe Mode or a clean boot when the symptom justifies it.

Change one variable and record the result.

## 6. Repair proportionately

Begin with the smallest reversible action connected to the evidence. Reinstalling Windows is not a proportionate response to one corrupted browser profile.

Before system repair, driver rollback, reset, BIOS changes, or disk operations:

- Back up important data.
- Confirm administrator and recovery-key access.
- Understand what the action changes.
- Use official vendor guidance.
- Plan how to validate and, where possible, undo it.

## 7. Validate

Repeat the original failing steps under the original conditions. Then check one nearby scenario to ensure the repair did not simply move the problem.

Document:

- Original symptom and impact.
- Evidence and isolation results.
- Action taken and why.
- Validation outcome.
- Remaining risk or follow-up.

## When I stop and escalate

- Signs of hardware failure or data loss.
- BitLocker or account recovery uncertainty.
- Employer-managed device or policy-controlled software.
- Suspected malware or credential compromise.
- Repeated crashes, overheating, electrical smell, or battery swelling.
- The next step requires access or expertise I do not have.

> Good troubleshooting is not the number of tools I run. It is the quality of the question each tool answers.

