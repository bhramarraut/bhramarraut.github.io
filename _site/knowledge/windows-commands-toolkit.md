---
title: "Essential Windows Commands in My Toolkit"
slug: "windows-commands-toolkit"
description: "Commands grouped by the question they answer, with risk and interpretation in view."
category: "windows"
label: "LAB"
tags:
  - "Windows"
  - "commands"
  - "PowerShell"
status: "published"
featured: false
start_here: false
order: 112
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "dns-troubleshooting"
  - "windows-troubleshooting-checklist"
---

# Essential Windows Commands in My Toolkit

A command is useful when I know which question it answers. Running ten commands and saving none of the output is activity, not diagnosis.

I begin with low-risk observation and move toward repair only when the evidence justifies it.

## Network identity and path

`ipconfig /all` — Shows adapter addresses, gateway, DHCP, and DNS configuration. Useful for comparing a working and failing machine.

`ping host` — Tests whether ICMP replies return. A failed ping does not prove the host is down; firewalls commonly block ICMP.

`tracert host` — Displays the route hops that answer. Missing later hops can be normal filtering, so interpret patterns rather than treating every asterisk as failure.

`nslookup name` — Queries DNS and shows which resolver answered.

`Test-NetConnection host -Port 443` — PowerShell check for name resolution and TCP connectivity to a specific port. More relevant to an HTTPS service than ping alone.

`netstat -ano` — Shows connections, listening ports, and process IDs. Pair a PID with Task Manager or `Get-Process`; do not assume an unfamiliar connection is malicious.

## Processes and services

`tasklist` — Lists running processes.

`Get-Process` — PowerShell process view with sortable properties.

`Get-Service` — Shows service names and states.

`taskkill /PID number` — Ends a process. This can lose unsaved work or interrupt a system function; identify the process and impact first.

## System and event evidence

`systeminfo` — Reports Windows version, boot time, hotfix information, memory, and system details.

`Get-WinEvent` — Queries Windows event logs. A timestamp and narrow provider or log filter are more useful than dumping thousands of events.

`driverquery` — Lists installed drivers and can help compare versions after a change.

`Get-Volume` — Shows volumes, file systems, size, and free space in PowerShell.

## Integrity and repair

`sfc /scannow` — Verifies protected system files and repairs incorrect versions when possible. It requires administrative rights.

`DISM /Online /Cleanup-Image /RestoreHealth` — Repairs the Windows component store used for servicing. Follow current Microsoft guidance and allow the operation to finish.

`chkdsk` — Examines file-system state; repair options may require a restart and can be disruptive. Back up important data and understand the storage-health context first.

Repair commands are not a ritual to run against every slow application. A browser extension problem does not become a system-file problem because SFC exists.

## A disciplined command record

For a support note, I keep:

- The question being tested.
- Exact command.
- Time and machine context.
- Relevant output, sanitized.
- Interpretation and uncertainty.
- Next action based on the result.

Example: “`Test-NetConnection portal.example.com -Port 443` resolves the expected address but TCP connection fails on office Wi-Fi and succeeds on hotspot. Network path or policy requires investigation.”

## Reference

[Microsoft Learn: Windows commands](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)

> The safest toolkit is not the longest list. It is a small set of commands tied to clear questions and reversible decisions.

