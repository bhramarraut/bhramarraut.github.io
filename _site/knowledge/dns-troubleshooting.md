---
title: "DNS Troubleshooting for Non-Network Engineers"
slug: "dns-troubleshooting"
description: "A safe path from ‘the internet works but this site does not’ to useful evidence."
category: "windows"
label: "PRACTICAL NOTE"
tags:
  - "DNS"
  - "networking"
  - "Windows"
status: "published"
featured: false
start_here: false
order: 115
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "windows-commands-toolkit"
  - "windows-troubleshooting-checklist"
---

# DNS Troubleshooting for Non-Network Engineers

The Wi-Fi icon says connected. A video keeps playing. One company portal says “server not found.” That pattern is a useful clue: general connectivity exists, but the name may not be resolving correctly.

DNS translates names such as `portal.example.com` into addresses a device can use. It is one layer in the journey, not a synonym for “the internet.”

## Separate name resolution from reachability

I begin with three comparisons:

1. Does another known site open?
2. Does the failing name resolve with `nslookup` or `Resolve-DnsName`?
3. Can another device on the same network open it?

If the name resolves but the application still fails, DNS may have completed its job. The next issue could be routing, TLS, proxy, firewall, server health, or the application itself.

## A Windows investigation path

**Check the current configuration**

`ipconfig /all` shows adapter addresses, gateway, and configured DNS servers. I look for unexpected adapters, VPN-provided DNS, or an address that indicates the machine did not receive normal network configuration.

**Query the name**

`nslookup portal.example.com` shows whether a DNS server returns an answer. `Resolve-DnsName portal.example.com` provides a PowerShell-native view.

**Compare deliberately**

Querying a known resolver can help compare results, but changing corporate DNS settings may break internal names or violate policy. I collect evidence before overriding managed configuration.

**Review the local overrides**

The hosts file, VPN client, security software, browser secure-DNS setting, and proxy can change name-resolution behavior. I do not edit them casually; I verify whether they are expected.

**Clear stale cache when justified**

`ipconfig /flushdns` clears the Windows DNS resolver cache. It can help after a record changed or a stale negative result was cached. It does not repair an authoritative DNS record or a broken network.

## Read the pattern

- One user fails, others succeed: local cache, adapter, VPN, hosts file, or policy direction.
- Everyone on one network fails: local resolver, firewall, or network policy direction.
- External names work, internal names fail: corporate DNS or VPN path direction.
- Name resolves to a different address for different users: split DNS, cache, rollout, or resolver difference.
- Name resolves everywhere but connection times out: move beyond DNS.

These are investigation directions, not verdicts.

## Evidence for escalation

- Exact hostname and timestamp.
- Network and VPN state.
- Output from `ipconfig /all` with sensitive details reviewed.
- `nslookup` or `Resolve-DnsName` result and resolver used.
- Comparison from another device or network.
- Whether the resolved address can be reached on the expected service.
- Recent DNS, VPN, proxy, or certificate changes if verified.

## Safety notes

Do not paste full network configuration publicly without reviewing internal domains, addresses, device names, and search suffixes. Do not switch a managed work device to a public DNS resolver without authorization.

## References

- [Microsoft Learn: nslookup](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup)
- [Microsoft Learn: ipconfig](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig)

> DNS troubleshooting becomes simpler when I ask one precise question first: did this name resolve to the address the system was expected to use?

