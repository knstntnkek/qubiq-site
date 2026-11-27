# Routing

Routing decides which traffic uses the tunnel, which goes directly and
which is blocked. These are advanced settings; the default Smart Routing
is enough for most users.

Provider-managed and personal Raw configurations use their own routing.
Your app routing choices apply to ordinary servers and return when you use
one again.

## Smart Routing

Smart Routing is the default for ordinary servers. Use it to choose:

- which regions or rules go directly or are blocked;
- how proxied connections behave;
- which DNS resolvers are used;
- whether traffic sniffing, FakeDNS or fragmenting are enabled.

When mainland China is selected as a direct region, Qubiq keeps Google
Play traffic on the proxy so the Play Store can continue working.

## Traffic modes

On desktop, the tray menu can switch between Smart Routing, always-VPN and
a saved custom routing asset without opening the app. When a provider or
Raw configuration supplies its own routing, those app-side choices do not
apply to that session.

## Multi-entry and least latency

Configurations with several entry candidates can use:

- **Round-robin** — spread new connections across suitable entries;
- **Least-latency** — prefer the fastest working entry.

Existing connections do not move mid-session, and failures never silently
fall back to a direct connection.

## Where to edit

Open *Settings → Advanced → Routing*.

- **Smart Routing** — edit direct/block rules, proxy behavior, DNS and
  sniffing in a guided form.
- **Custom routing** — create named rule sets, import/export them or edit
  the same settings as JSON. Custom routing and personal Raw configs share
  a three-item limit.
- **Saving while connected** — Qubiq asks before reconnecting when a
  change requires it.
- **Multi-entry** — choose the balancing mode, probe address, interval
  and concurrency.

Routing data updates are maintained by the app; the routing-data entry in
Advanced settings lets you update this resource data manually when needed.
