# Connect & system entries

The Connect page renders, top to bottom: connection state and the
primary action, your **connection plan**, the **actual run**, and
**this session**.

## Choosing what runs

The plan's server row opens the picker:

- **Automatic** — Qubiq chooses across usable nodes.
- A **subscription** source, or **all manual nodes**.
- A **pinned** node, personal Raw or provider complete config.

Tabs and search are browse state — only tapping a resource requests the
change. The selection is re-checked before commit: if the asset was
deleted, replaced or its source switched mode while you browsed, the
stale entry can't be selected.

Provider configs and personal Raw live in the same complete-config
category. Selecting one makes the routing row read-only (it carries its
own routing); your ordinary Smart/Custom preference is kept for when you
return to app-managed nodes — and returning asks for confirmation, with
cancel changing nothing.

## What the page tells you

- **Plan vs actual run** — the run identity comes from a snapshot: entry,
  final exit, Raw/provider names reflect what actually started, not
  what's currently selected or renamed since.
- **This session** — real-time rates, up/down totals and duration.
  Unknown metrics show as unknown — no fake zeros, no invented speeds.
- **Why this connection** — explains the actual run snapshot: which entry
  nodes, final exit and config type were chosen and why. It never
  predicts an unstarted plan; a failed but still-cancellable attempt
  keeps its explanation available.
- Start/stop shows the transition immediately — success is never claimed
  early — and prepare/connect phases can be cancelled.

Starting never waits for latency tests; candidates with no successful
delay are still usable, ordered after the ones with measured results.

## Quick entries

- **Mobile quick actions** — long-press the app icon: start, stop,
  switch config, update subscriptions.
- **Desktop tray** — start/stop, reconnect, server/config pickers,
  traffic mode, subscription and Geodata updates, window and exit.
  Picking a provider config disables the traffic-mode/Custom items while
  it's selected or running.
- **iOS widgets** — home-screen small/medium start-stop button (iOS 17+),
  lock-screen accessories that open the app, and a Control Center VPN
  button on iOS 18+.
- **Android** — home-screen widget (state, rate, traffic; icon toggles
  VPN) and a quick-settings tile for start/stop.

## LAN proxy share

A switch in the Xray area offers an **unauthenticated HTTP/SOCKS5
inbound** on your LAN, with the port on its own settings page. Other
devices on the trusted network can then route through your connection.
It's meant for networks you trust — there's no authentication, and it
doesn't apply while a Raw or provider config runs. The preference saves
immediately and takes effect on the next app-compiled connection.

## Local HTTP API (desktop)

Desktop platforms expose a token-authorized HTTP API on **127.0.0.1
only** — scripts and tools on the same machine can read state and issue
commands while Qubiq runs. It never starts or stops the VPN by itself,
and the token can be reset from the same Xray settings card. Mobile has
no API surface.

## Android automation

The app accepts broadcast commands from automation apps — start, stop
and reconfigure — behind an authorization list you approve in the app.
Unknown senders are rejected. Configuration lives on its own settings
page and never forces a reconnect.
