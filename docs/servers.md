# Servers & nodes

Your servers appear on Home below the Connect button: manual servers and
groups first, then one card for each subscription. Add them once, choose
one, or let Qubiq choose automatically.

## Working with the list

- **Tap** a server row to choose it as the connection target.
- **Double-tap / double-click** a row to choose it and connect in one
  move.
- **Pull down** to refresh every subscription.
- Subscription headers can collapse their server rows. Qubiq remembers
  your choice; a provider can keep its own group expanded.
- Latency is shown as milliseconds or signal bars, depending on the
  *Latency display* setting. Colors give a quick quality hint; the exact
  value remains available where supported.

Provider branding can add a logo or colors to a subscription card. Turn
it off for that source in its details page with **Provider appearance**.

## Import methods

Tap **＋** and choose how to add servers:

- **Subscription** — paste the HTTPS URL from your provider.
- **Share links** — paste one or more VMess/VLESS, WireGuard, Hysteria2,
  Shadowsocks, SOCKS or Trojan links. Clash/Mihomo configuration files
  are not supported.
- **QR scan** — scan a server code on iOS or Android.
- **File** — import a WireGuard `.conf` or another supported JSON
  configuration.

Imported servers can be used right away; latency results are not required
before connecting.

## What refresh keeps

Refreshing a subscription keeps your favorites, selection and server
order where possible. If refresh fails, the previously downloaded servers
remain available, so a failed update cannot empty your list.

## Complete configs

A complete config is a whole Xray configuration rather than a single
server outbound.

- **Provider configs** arrive through subscriptions, stay read-only and
  use the provider's own routing.
- **Personal Raw configs** are editable copies. Raw configs and custom
  routing assets share a three-item limit.

Sharing a complete config asks for confirmation because it can contain
sensitive information.

## Subscription sources

A subscription card shows its servers, plan information when supplied,
announcements and provider actions. Its details page lets you rename or
edit the source, refresh it, control provider appearance, share it or
delete it.

See [Subscriptions & providers](subscriptions.md) for the user-side
subscription flow.

## Servers manager

*Settings → Advanced → Servers* opens the full manager for nodes,
complete configs and subscriptions. Use it to:

- search, sort and filter servers;
- favorite frequently used servers;
- create one-level manual groups;
- reorder rows when search and favorites filtering are off;
- return the connection target to **Automatic selection**.

A server's details page shows its type, source, latency and a read-only
configuration preview. Ordinary nodes can be edited as JSON. Provider
configs can be viewed, shared, deleted or copied to personal Raw within
the three-item limit.
