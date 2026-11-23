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

**Google Play while CN is direct** — when the direct region includes CN,
`services.googleapis.cn` and `xn--ngstr-lra8j.com` (including its download
subdomains) are routed through the proxy, with matching proxied DNS, ahead
of the broad CN direct rules — so the Play Store keeps working. Removing
CN drops the exception. It is compiled into the run configuration only:
saved, custom, Raw and provider configurations are never rewritten.

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

## Where to edit

*Settings → Advanced → Routing* opens the routing page: **Smart
Routing**, **always-VPN** and the ordinary/advanced **custom assets** —
custom assets share one three-item quota. Using a routing and editing
it are separate actions.

- **Smart** — the form runs in order: direct & block, proxy
  connections, DNS, traffic sniffing and a preview. At most one direct
  region is selected, and it can be explicitly cleared.
- **Custom routing** — a name and ordered rules (each opens its own
  rule page; add, delete, drag or move up/down), then proxy
  connections, DNS and sniffing; import, export and share tools sit at
  the end. An **advanced JSON editor** covers the same parameters
  directly.
- **Sniffing** can't be turned off while FakeDNS is on.
- **Saving while connected** goes through a confirm-reconnect; while a
  Raw or provider config is in effect only the ordinary preferences
  save — the running graph is never rewritten.
- **Multi-entry** — the round-robin / least-latency choice sits next
  to the entry count, with a probe URL, 30/60/300-second interval and
  concurrency options.

Geodata keeps updating underneath: built-in indexes ship with the app
and auto-update on their schedule; the **routing data** entry reuses
the same resource library as the Xray tab.
