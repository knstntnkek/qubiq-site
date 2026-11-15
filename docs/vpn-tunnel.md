# VPN tunnel & platforms

The OS-level tunnel applies a per-platform policy on every connect —
addresses, DNS and platform takeover rules. Today these run on their
persisted values: the tunnel settings pages exist in code but have no
rendered entry point, so this page describes what applies by default.

## Common behavior

- **Addresses** — the tunnel's IPv4/IPv6 network addresses are managed
  by the app.
- **DNS** — IPv4/IPv6 resolvers apply as saved; IPv6 sits behind its own
  stored switch.
- **Exit interface** — **Windows and Linux**: the saved outbound
  interface is re-checked before each connect; a missing or invalid one
  prompts a re-pick at that point rather than a silent fallback.

## Apple (iOS / macOS)

Persisted options include always-on, Wi-Fi auto-connect/disconnect,
cellular (iOS) or Ethernet (macOS) behavior, and the excluded-traffic
ranges once the tunnel takes all traffic. iOS also carries a
hide-VPN-icon preference.

## Android

The tunnel policy supports three app modes — **all**, **only selected**
and **except selected** — with independent include/exclude lists. The
persisted selection applies on each connect. Broadcast automation from
other apps sits behind an authorization list — see
[Connect & system entries](connect.md).

## Windows

- The **MSIX** build carries a system-VPN policy — auto-connect, LAN
  bypass and excluded ranges.
- **EXE/ZIP** builds apply the common settings and the exit interface;
  the first connect registers the *Qubiq VPN Core* scheduled tasks via
  one UAC elevation — see [Getting started](getting-started.md).

## Linux

Common settings and the exit interface apply; there is no platform
policy surface (and no backup target — see [Backup](backup.md)).
