# Servers & nodes

The Servers page manages three resource types: **nodes** (single
outbounds), **complete configs** (whole Xray JSON documents) and
**subscriptions** (the sources that feed the first two). Browsing and
opening details never changes what you're connected to — only the
**Use** action commits a selection.

## Adding nodes

- **Share links** — one per line: VMessAEAD/VLESS, Hysteria2, SS, SOCKS,
  Trojan. Old `vmess://Base64(JSON)` QR codes and Clash/Mihomo formats
  are not supported.
- **Manual JSON** — paste a single outbound object; it goes through the
  same validation as links.
- **QR scan** — iOS and Android.
- **File import** — via the system picker.

Imported nodes enter the automatic latency queue — results are not
required before connecting.

## Complete configs: Raw and provider

A complete config runs an entire Xray JSON — its own outbounds, routing,
DNS and balancers — instead of the app's compiled routing.

- **Personal Raw** is editable, and the app keeps at most **three** Raw
  or custom assets in total.
- **Provider configs** (e.g. Remnawave) arrive through a subscription,
  are read-only and follow refresh updates. To edit one, copy it into
  personal Raw — the copy detaches from the source and counts toward the
  same quota.

Complete configs support select, favorite, view original JSON, share,
delete and copy-to-Raw. Sharing any complete config asks for a
sensitive-information confirmation first.

## Groups and order

Manual nodes can be organized into **one level of custom groups** —
create, rename and move-to-group from the node menu. Dissolving a group
keeps its nodes; deleting a group *and* its nodes asks for a count and
running-impact confirmation. Groups are for browsing only — they create
no connection scope.

- The **ungrouped** bucket is pinned first; empty groups are kept.
- Sort by default, name or delay — the choice applies everywhere
  (list, final-exit picker, desktop tray).
- **Arrange** mode (long-press handles on touch, drag handles or
  up/down buttons on desktop) writes a manual order committed on save;
  cancelling writes nothing.
- Search and the favorites filter narrow the list without rewriting
  your sort preference.

## Latency

Nodes show real delay labels — ≤500 ms fast, ≤1000 ms slow — or a
dedicated untested/failed status; a failure diagnostic is never dressed
up as a delay value.

- **Single node** or **whole group** tests run from the menus; a running
  batch can be cancelled without stopping VPN or other sources' tests.
- While VPN is connected, manual tests warn that traffic may go through
  the tunnel and skew results — test with VPN off for accurate numbers.
- Provider configs never join single-outbound tests; their rows show no
  delay.

## Favorites

Ordinary nodes and provider configs can be favorited from the list or
the detail page. Favorites survive subscription refresh — identical
fresh rows adopt the old row's favorite, delay and manual position.
Personal Raw has no favorites.

## Subscription sources

Each subscription gets its own detail page showing the active mode,
plan info, cache status and update/edit/share actions. Sources keep a
tab above the list so management doesn't depend on scrolling. See
[Subscriptions & providers](subscriptions.md).

## Editing and safety

The JSON workspace (nodes, Raw, advanced routing) keeps unsaved-change
guards: closing, cancelling or a system back gesture asks
*continue editing / discard* when the text actually differs. Explicit
discard never writes.
