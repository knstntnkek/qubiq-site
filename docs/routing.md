# Routing

Routing decides which traffic goes through the tunnel, which goes direct
and which is blocked. The standalone Routing page holds four modes;
using and editing are always separate actions — drafts only commit on
save, and a connected VPN asks before an effective change reconnects.

## The four modes

| Mode | What it is |
| --- | --- |
| **Smart Routing** | App-compiled config: direct region, split DNS, sniffing — the default and best starting point. |
| **Always VPN** | Everything through the tunnel — minimal rules. |
| **Custom (ordinary)** | Your own ordered rule list on the app form. |
| **Custom (advanced JSON)** | Bounded Xray routing JSON: DNS, inbounds, rules — still compiled by the app. |

Custom assets share **one three-item quota** across ordinary and
advanced kinds — delete one to make room. A corrupt asset is isolated to
itself and can't block Smart/Always or the other assets.

Complete configs (personal Raw and provider configs) bypass this page —
they carry their own routing. While one is in effect you can still edit
your ordinary routing preferences; they apply next time an app-managed
node runs.

## Smart Routing

Sections, in order: **direct & block**, **proxy connections**, **DNS**,
**traffic sniffing**, **preview**.

- **Direct region** — at most one region, explicitly clearable; the
  candidates come from installed Geodata indexes. Traffic matching the
  region goes direct; the rest follows the proxy rules.
- **DNS** — separate main-proxy and direct resolvers, each with ordered
  fallbacks. The DNS cache switch defaults on. Direct DNS can fall back
  to the proxy resolver on failure; proxied domains never fall back to
  direct. "Other DNS queries" (non-A/AAAA) pick proxy, direct or empty
  answer — proxy by default.
- **Traffic sniffing** — on by default, route-only or metadata-only
  modes; it never reads content. It can't be disabled while FakeDNS is
  on — turn FakeDNS off first.
- **FakeDNS & fragment** — FakeDNS lives under sniffing, fragment under
  proxy connections.
- **Preview** — the compiled rule view before you commit.

## Custom routing (ordinary)

Name, ordered rules, proxy connections, DNS and sniffing — rules open in
their own page with add/delete/reorder, and cancelling a rule page never
touches the parent draft. Import, export and share tools sit in a
separate card at the end.

## Advanced custom JSON

A bounded JSON editor for DNS, inbounds and routing that still uses the
app's compile — the first 1–3 empty objects in `outbounds` stand for the
entry nodes Qubiq fills in (selected server, `proxy` balancer group,
`direct`/`block`, platform settings). Extra inbounds need explicit rules.
Field hints and diagnostics sit in the editor.

## Multi-entry and least latency

With several entry candidates, new connections spread across them:

- **Round-robin** (default) — distribute across the best available
  entries.
- **Least-latency** — probes at least two proxy chains in the current
  connection and routes new connections through the fastest. A single
  node keeps the preference and shows a not-started note. Probe URL and
  30/60/300-second intervals are in advanced options.

New connections pick by least latency; existing sessions never migrate,
and failures never silently fall back to direct. The connect page shows
per-chain available/failed/unknown plus last probe latency — it measures
HTTP reachability of the probe URL, nothing more.

## Geodata

Routing rules and Smart regions resolve through Geodata indexes. The
Geodata manager (Xray → routing data) lists built-in and custom HTTPS
sources, downloads files transactionally and can roll back; custom
sources share the auto-update schedule under data updates.
