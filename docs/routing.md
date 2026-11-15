# Routing

Routing decides which traffic goes through the tunnel, which goes direct
and which is blocked. Two worlds apply:

- **App-managed nodes** run a Qubiq-compiled config driven by your saved
  routing preferences.
- **Provider configs** (Remnawave, personal Raw) run their own stored
  routing — app-side routing preferences are bypassed *for that session*
  and apply again when you return to app-managed nodes.

## Smart Routing

The default mode for app-managed connections. The compiled config
combines:

- **Direct & block** — traffic matching the selected direct region and
  block rules skips or never enters the tunnel; a single region can be
  selected or cleared.
- **Proxy connections** — the tunnel path, including optional fragment.
- **DNS** — separate main-proxy and direct resolvers with ordered
  fallbacks and caching; direct DNS can fall back to the proxy resolver
  on failure while proxied domains never fall back to direct. Non-A/AAAA
  queries route to proxy, direct or an empty answer — proxy by default.
- **Traffic sniffing** — on by default, route-only or metadata-only; it
  never reads content. FakeDNS and fragment sit alongside it.

Smart Routing is the useful starting point for app-managed nodes; the
persisted values apply at compile time every connect.

## Traffic modes

On desktop, the **tray menu** switches the traffic mode without opening
the app — smart routing, always-VPN or a saved custom routing asset.
The current mode is respected when an app-managed connection compiles;
while a provider config is selected or running, the app-side
traffic-mode items are disabled — provider routing is in charge.

## Multi-entry and least latency

With several entry candidates, new connections spread across them:

- **Round-robin** (default) — distribute across the best available
  entries.
- **Least-latency** — probes at least two proxy chains in the current
  connection and routes new connections through the fastest.

New connections pick by least latency; existing sessions never migrate
and failures never silently fall back to direct.

## About the current build

The standalone routing editor pages — the Smart form, custom rule
editor, advanced JSON, direct-region and final-exit pickers — exist in
code but have no rendered entry point today. What applies is the saved
preference set (defaults plus anything stored before), the tray
traffic-mode switch, and provider-supplied routing. Geodata keeps
updating underneath: built-in indexes ship with the app and auto-update
on their schedule.
