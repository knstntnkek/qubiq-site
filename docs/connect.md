# Connect & system entries

The home screen is a single vertical flow: a **connection hero** on top
and your **server list** below, inside a pull-to-refresh scroll view.
Until you add a subscription, the app bar shows the Qubiq logo and name.
With subscriptions it shows the active provider's logo — when it sends
one and its *Provider appearance* is on — or the Qubiq logo, next to the
provider profile title or *Connect*. The add-server (**＋**) and settings
actions are always there. The active provider's theme can also color
Home and the hero — see [Provider branding](subscriptions.md#provider-branding).

## The hero

A circular power button inside a thin outer ring with a centered accent
glow:

- **Connect** — starts the tunnel with the selected (or automatic)
  target.
- **Cancel** — aborts a prepare/connect in flight.
- **Disconnect** — stops the running tunnel.
- **Try Again** — after a failure, with the real reason shown below it.

While connected it shows the running server name and an elapsed clock.
Start/stop shows the transition immediately — success is never claimed
early — and duplicate submissions are prevented.

## The list

Your servers as cards — ungrouped manual servers first, then manual
groups, then one card per subscription:

- **Tap** a row to pin it as the connection target.
- **Double-tap / double-click** pins it *and* runs the same connect as
  the hero — it never disconnects a live tunnel.
- **Pull down** to refresh every subscription source.
- **Latency** shows as coloured milliseconds or **signal bars** per the
  node-latency settings' *Latency display* option — three green bars up
  to 300 ms, two amber through 800 ms, one red above; tooltips keep the
  exact ms either way.

Automatic selection is the default while nothing is pinned — return to
it via **Automatic selection** in *Settings → Advanced → Servers* or
the desktop tray.

Group headers collapse per source ("N servers" summary, persisted):
collapsing hides the rows and the announcement while plan info, expiry
and the provider actions — **Support**, **Send logs**, **Website** —
stay reachable as labeled chips. **Settings → Appearance → Compact home
layout** reshapes the card instead: **Refresh**, **Send logs** and
**More** sit beside the provider name in the header with the last check
and update cadence beneath it, and a separate plan band carries a usage
pill — filled in proportion for capped plans, ∞ for unlimited — the
expiry and the **Support** and **Website** actions. It's off by default, local to the
device and excluded from backups. A provider-pinned group stays expanded. Headers carry the
provider's logo while its branding is active, the last-check time and
update cadence.
Standard announcements show one line with **More** for the full text;
compact ones center up to three lines with **More** only when the text
does not fit, and support actions can hand off to Telegram or email.

With no servers, the hero stays and the list shows a borderless *No
servers yet* section with **Add connection**. The idle hero then opens
the same import flow — its tooltip says *Add connection* — while a saved
complete Raw config still connects directly.

## What actually runs

Run name, entry and final exit come from the runtime snapshot — renaming
or re-browsing afterwards doesn't rewrite what connected. Complete
configs (Remnawave/provider) run their own stored routing; selecting one
bypasses app-side Smart, custom and region preferences *for that
session* — your saved preferences survive and apply again on
app-managed selections. When ordinary candidates are insufficient,
automatic may run a provider config.

Starting never waits for latency tests — candidates with no successful
delay are usable, ordered after measured ones.

## Sessions that outlive the app

A running tunnel does not depend on the app staying open. If Qubiq is
quit or killed while the VPN keeps running, reopening it restores the
session from the recorded run metadata — the hero shows the live
connection rather than claiming a fresh disconnected state. The native
state wins over missing details: absent counters or a missing
description are never read as "disconnected".

## Tray and quick entries

- **Desktop tray** — start/stop, reconnect, server and traffic-mode
  selection, subscription and routing-data updates, window and exit.
  Picking a provider config disables the app-side traffic-mode items
  while it's selected or running.
- **Mobile quick actions** — long-press the app icon: start, stop,
  switch config, update subscriptions.
- **iOS widgets** — home-screen start/stop (iOS 17+), lock-screen
  accessories, Control Center VPN button (iOS 18+).
- **Android** — home-screen widget (state, rate, traffic; icon toggles
  VPN) and a quick-settings tile for start/stop.

## Settings

Settings is a single page in sections:

- **Appearance** — theme (system, light or dark), **Connect button
  size** and **Compact home layout**; Android adds **Add traffic
  widget**.
- **Language** — the interface language.
- **Startup** — **Connect after app launch**; desktop adds **Launch at
  login** and **Start hidden**, and macOS **Hide Dock icon**.
- **Advanced** — **Routing**, **Servers**, **VPN tunnel & Xray** and
  **Allow VPN control from links** (off by default).
- **Data** — **Backup & restore** (iOS, macOS, Android and Windows),
  **Clear connection resources** and **Clear all app data**.
- **About** — the app and Xray-core versions.

See [Backup](backup.md) for the backup target rules.
