# Connect & system entries

Home is the main connection screen: the Connect button at the top and
your servers below it. The **＋** and Settings actions stay available in
the app bar.

## The hero

The circular button changes with the connection state:

- **Connect** — starts the selected server, or automatic selection if
  nothing is selected.
- **Cancel** — stops a connection attempt that is still starting.
- **Disconnect** — stops the running tunnel.
- **Try Again** — retries after a failure; the reason is shown nearby.

While connected, the button shows the running server and elapsed time.
Until the system confirms the tunnel, Qubiq keeps showing the transition
rather than claiming success early.

## The list

- **Tap** a row to choose a server.
- **Double-tap / double-click** to choose and connect in one move.
- **Pull down** to refresh every subscription.
- If nothing is selected, **Automatic selection** is used.

Subscription cards can show server rows, plan information, announcements,
support links and **Send logs**. Collapse a group when you want a shorter
list. **Settings → Appearance → Compact home layout** shows the same
information in a smaller card and only affects the current device.

With no servers yet, Home offers **Add connection** and the Connect
button opens the same import flow.

## What actually runs

The name shown while connected is the server that actually runs. If you
use automatic selection, it can differ from the row you originally
selected.

Provider-managed configurations use the provider's own routing for that
session. Your routing preferences are not lost; they apply again when you
connect through an ordinary app-managed server. Changes made after a
connection starts apply to the next connection.

## Sessions that outlive the app

The VPN tunnel can keep running after Qubiq is closed. Reopening the app
restores the current connection state instead of starting over.

## Tray and quick entries

- **Desktop tray** — connect, disconnect, reconnect, choose servers and
  traffic mode, update subscriptions or routing data, show the window or
  quit.
- **Mobile quick actions** — long-press the app icon for start, stop,
  configuration switching and subscription updates.
- **iOS widgets** — Home Screen start/stop (iOS 17+), Lock Screen
  accessories and the Control Center VPN button (iOS 18+).
- **Android** — Home Screen widget and a quick-settings tile for
  start/stop.

## Settings

Settings is a single page in sections:

- **Appearance** — theme, Connect button size and Compact home layout;
  Android also offers the traffic widget.
- **Language** — interface language.
- **Startup** — connect after launch; desktop adds launch at login and
  start hidden, and macOS can hide the Dock icon.
- **Advanced** — Routing, Servers, VPN tunnel & Xray, and VPN control
  from links.
- **Data** — backup and the cleanup actions.
- **About** — app and Xray-core versions.

See [Backup](backup.md) for backup targets and restore behavior.
