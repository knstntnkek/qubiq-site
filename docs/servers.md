# Servers & nodes

Servers live right on the home screen — grouped by their subscription,
under the connect hero. There are three resource types: **nodes**
(single outbounds), **complete configs** (whole Xray JSON documents) and
**subscriptions** (the sources that feed the first two).

## Working with the list

- **Tap** a row to pin it as the connection target.
- **Double-tap / double-click** to pin and connect in one move — it
  never disconnects a live tunnel.
- **Long-press** toggles the favorite where the row supports it.
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

## About the current build

The current UI keeps the surface deliberately thin: group details,
per-node resource pages, manual groups, arrange mode and the node/Raw
editors exist in code but have no rendered entry today. What ships is
the home list, the import flow, and the subscription edit/share pages.
The underlying services (latency, refresh merge, provider fields) run
unchanged underneath.
