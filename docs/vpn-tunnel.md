# VPN tunnel & platforms

*Settings → Advanced → VPN tunnel & Xray* contains platform tunnel
options and Xray diagnostics. These are advanced settings; most users can
leave them unchanged.

## Common behavior

- **Addresses** — the tunnel's IPv4/IPv6 addresses are shown read-only.
- **DNS** — edit IPv4/IPv6 resolvers; IPv6 can be switched separately.
- **Exit interface** — on Windows and Linux, choose the network interface
  that connects to the internet. Qubiq asks again if the saved interface
  is no longer valid.

## Apple (iOS / macOS)

Apple platforms offer always-on and network-dependent connection behavior,
plus exclusion options when full traffic takeover is enabled. iOS can also
hide the VPN indicator in configurations where the system allows it.

## Android

Choose whether all apps use the VPN, only selected apps use it, or
selected apps bypass it. The app picker supports search and keeps checked
apps easy to find. Automation access for other apps is configured from
its own detail page.

## Windows

MSIX and portable/installer packages expose different system VPN options.
All Windows builds can use the common DNS and exit-interface settings.
The first connection may show a one-time security prompt; approve it so
the VPN core can start.

## Linux

Linux uses the common DNS and exit-interface settings. There is no
platform-policy page and no backup target on Linux.

## Xray tab

The **Xray** tab is for diagnostics and advanced resource settings:

- **Run state** — core name and version.
- **Check & diagnostics** — current state, error details, configuration
  and logs for troubleshooting.
- **Connection & resources** — routing-data updates, latency testing and
  server dialing options.
- **Share & interfaces** — share the local proxy on trusted networks and
  configure the local HTTP API where available.

Do not enable LAN sharing on untrusted networks: the local proxy does not
use authentication.
