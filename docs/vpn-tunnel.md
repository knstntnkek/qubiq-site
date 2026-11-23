# VPN tunnel & platforms

*Settings → Advanced → VPN tunnel & Xray* opens a page with **Tunnel**
and **Xray** tabs. The Tunnel tab applies a per-platform policy on
every connect — restore-defaults doesn't save, cancel writes nothing,
and only changes effective on the current platform ask to reconnect.

## Common behavior

- **Addresses** — the tunnel's IPv4/IPv6 network addresses are
  read-only.
- **DNS** — IPv4/IPv6 resolvers are editable, plus the Apple DoT
  server domain; IPv6 sits behind its own switch.
- **Exit interface** — **Windows and Linux**: must be chosen
  explicitly; the saved outbound interface is re-checked before each
  connect, and a missing or invalid one prompts a re-pick at that
  point rather than a silent fallback.

## Apple (iOS / macOS)

The page offers always-on, Wi-Fi auto-connect/disconnect, cellular
(iOS) or Ethernet (macOS) behavior. With full-traffic takeover on,
four system exclusion switches show; with it off, your own excluded
ranges apply instead and are editable. iOS also offers hide-VPN-icon,
which only takes effect without full takeover.

## Android

Three app modes — **all**, **only selected** and **except selected** —
with independent include/exclude lists. The app picker pins checked
apps to the top and supports search. Broadcast automation from other
apps is configured on its own detail page under the Android system-VPN
page, saves immediately and never reconnects — see
[Connect & system entries](connect.md).

## Windows

- The system-VPN entry shows only on the **MSIX** build —
  auto-connect, LAN bypass and excluded ranges.
- **EXE/ZIP** builds apply the common settings and the exit interface;
  the first connect registers the *Qubiq VPN Core* scheduled tasks via
  one UAC elevation — see [Getting started](getting-started.md).

## Linux

Common settings and the exit interface apply; there is no platform
policy surface (and no backup target — see [Backup](backup.md)).

## Xray tab

The **Xray** tab holds four cards — run state, check & diagnostics,
connection & resources, and share & interfaces:

- **Run state** — the core name and real version.
- **Check & diagnostics** — a read-only diagnostics page showing the
  current phase, the original error, version, run duration and the
  real run JSON/log; refresh only re-reads state — it never starts or
  stops the VPN. **Log settings** and restore-defaults live on their
  own page — hidden on the macOS System Extension build.
- **Connection & resources** — routing data, data updates
  (subscription and Geodata auto-update switches with 24/72/168-hour
  intervals), node-latency settings (delay URL, timeout and
  **Latency display**) and server dialing (domain resolution and Happy
  Eyeballs).
- **Share & interfaces** — the **LAN share** switch and port, applied
  on the next app-compiled connection: HTTP/SOCKS5 with no
  authentication on all interfaces — trusted networks only — and never
  applied to personal Raw or provider configs. On desktop the local
  HTTP API joins it.
