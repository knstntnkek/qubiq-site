# Connect & system entries

The home screen is a single vertical flow: a **connection hero** on top
and your **server list** below, inside a pull-to-refresh scroll view.
The app bar carries the app mark — or the provider logo while a branded
subscription is in use — plus the active provider profile title, an
add-server action and the settings action.

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

An **automatic** entry plus servers grouped by their subscription:

- **Tap** a row to pin it as the connection target.
- **Double-tap / double-click** pins it *and* runs the same connect as
  the hero — it never disconnects a live tunnel.
- **Long-press** toggles the favorite where the row supports it.
- **Pull down** to refresh every subscription source.
- **Latency** shows as coloured milliseconds or **signal bars** per the
  node-latency settings' *Latency display* option — three green bars up
  to 300 ms, two amber through 800 ms, one red above; tooltips keep the
  exact ms either way.

Group headers collapse per source ("N servers" summary, persisted):
collapsing hides the rows and the announcement while plan info, expiry
and the provider actions — **Support**, **Send logs**, **Website** —
stay reachable as labeled chips. **Settings → Appearance → Compact home
layout** moves those actions to labeled header icons and tightens
spacing; it's off by default, local to the device and excluded from
backups. A provider-pinned group stays expanded. Headers carry the
provider's logo while its branding is active, the last-check time and
update cadence; provider descriptions appear under the title.
Announcements show one line with **More** for the full text — linked
announcements open their destination, and support actions can hand off
to Telegram or email.

With no servers, the hero stays and a dashed *No servers yet* card
offers the add action and a help link.

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

The settings branch holds appearance and language, the Apple app icon,
launch behavior (launch at login, hidden start, connect on start),
connection-config backup, data cleanup and About with version info and
update checks. See [Backup](backup.md) for the backup target rules.
