# Servers & nodes

Servers live right on the home screen under the connect hero —
ungrouped manual servers first, then manual groups, then one card per
subscription. There are three resource types: **nodes**
(single outbounds), **complete configs** (whole Xray JSON documents) and
**subscriptions** (the sources that feed the first two).

## Working with the list

- **Tap** a row to pin it as the connection target.
- **Double-tap / double-click** to pin and connect in one move — it
  never disconnects a live tunnel.
- **Favorites** live in the
  [Servers manager](servers.md#servers-manager) and in a resource's
  details — not on the home rows.
- **Pull down** refreshes every source.
- Group headers **collapse** per source — the choice persists across
  launches; a provider-pinned group stays open. Headers carry the
  provider logo while its branding is active — opt out per source via
  its details page's *Provider appearance* switch.

Ordinary node rows carry protocol/transport/security and a latency
badge — exact milliseconds by default, or **signal bars** per the
node-latency settings' *Latency display* option (three green bars up to
300 ms, two amber through 800 ms, one red above; tooltips keep the exact
ms). Untested/failed states show dedicated status text — never dressed
up as a delay value. Provider rows display their Remnawave type and no
ordinary delay.

## Import methods

The **＋** action opens the import flow:

- **Subscription** — an HTTPS URL; see
  [Subscriptions & providers](subscriptions.md).
- **Share links** — VMessAEAD/VLESS, legacy VMess QR
  (`vmess://Base64(JSON)`), WireGuard (`wireguard://`, `wg://`),
  Hysteria2 (`hysteria2://`, `hy2://`), SS, SOCKS (`socks://`,
  `socks5://`, `socks5h://`), Trojan — one per line. Clash/Mihomo
  formats are not supported.
- **QR scan** — iOS and Android.
- **File** — the system picker, including WireGuard `.conf` files and
  single-outbound WireGuard JSON.

Imported nodes join the automatic latency queue — results are not
required before connecting.

## What refresh keeps

A subscription refresh merges rather than overwrites: identical fresh
rows adopt the survivor's favorite, delay, order and your selection;
running configs are never rewritten in place. Failed refreshes keep the
old cache, plan data and drafts — a refresh can never empty your list.

## Complete configs

A complete config runs an entire Xray JSON — its own outbounds, routing
and DNS — instead of the app-compiled routing.

- **Provider configs** (e.g. Remnawave) arrive via subscription, are
  read-only and follow refresh updates.
- **Personal Raw** copies are editable and capped at three assets across
  Raw and custom routing combined.

Sharing a complete config asks for a sensitive-information confirmation
first.

## Subscription sources

Group-header actions open a source's **edit** (name and URL) and
**share** pages. The source detail tracks the active mode
(app-managed or provider-managed), cache status, plan info and the
update entry — see
[Subscriptions & providers](subscriptions.md).

## Servers manager

*Settings → Advanced → Servers* opens the resource manager — the full
browser behind the home list. Tabs cover **nodes**, **complete
configs** and **subscriptions**, with a search field over the lists.

- **Sort** — default, name or delay; the choice saves locally, also
  orders the desktop tray and the final-exit picker, and the default
  order never shifts from latency updates.
- **Favorites** — favorite or unfavorite nodes and provider configs
  and filter a list to favorites; personal Raw has no favorites.
- **Manual groups** — one level of groups for ordinary manual nodes:
  create, rename and move nodes via the node menu; dissolving a group
  keeps its nodes.
- **Arrange** — reorder via phone long-press handles, desktop drag
  handles or the up/down buttons, only while search is empty and the
  favorite filter is off.
- **Automatic selection** — a button that returns the connection
  target to automatic.

A resource's details show its protocol, source and delay plus a
read-only JSON preview — browsing never changes the connection target,
**use** does. Ordinary nodes edit as JSON; provider configs can be
viewed, shared, deleted or copied to personal Raw (the copy counts
toward the three-Raw quota). A subscription's detail shows its current
mode, plan and cache status, with **Update**, **Edit** and a
destructive **Delete this source**.
