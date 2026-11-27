# Getting started

Qubiq is a cross-platform VPN client built on the Xray core. It is **not a VPN provider and
has no servers of its own** — you bring a subscription, share links or an
Xray configuration, and Qubiq runs the tunnel.

## Install

Download the package for your device from the
[Download section](index.html#modal-download).

| Platform | Package | Requirements |
| --- | --- | --- |
| iPhone / iPad | `.ipa` | iOS / iPadOS 16+; sideloading or enterprise signing is required |
| macOS | `.dmg` (x64 or ARM64) | macOS 13+, Apple silicon or Intel |
| Android | `.apk` (ARM64) | Android 10+ |
| Windows | `.exe` or `.zip` (x64) | Windows 10 20H2+ |
| Linux | `.deb`, `.rpm` or `.zip` (x64) | Linux 5.3+, glibc 2.39+ |

## First run

There is no account and no setup wizard — Qubiq opens on the **Connect**
home. During first setup or connect, the system may ask for permission:

- **iOS / macOS / Android** — allow the system VPN prompt. Android may
  also ask for local-network permission.
- **macOS** — approve the network extension once:
  - macOS 15+: *System Settings → General → Login Items & Extensions →
    Network Extensions*
  - macOS 14 and earlier: *System Settings → Privacy & Security*
- **Windows** — approve the one-time security prompt so the VPN core can
  start.
- **Windows / Linux** — if asked, choose the network interface that
  connects to the internet.

Denying a permission does not lock you out; Qubiq asks again when you
connect. On Linux, prefer the `.deb` or `.rpm` package — the portable
`.zip` may require additional system setup.

## Add a server

Tap **＋** in the header — or, on an empty Home, the Connect circle or
**Add connection** — then choose a source:

- **Subscription** — paste the HTTPS URL your provider gave you, or use
  the provider's **Add to Qubiq** button.
- **Share links** — paste one or more server links.
- **QR scan** — scan a server code on iOS or Android.
- **File** — import a supported configuration file.

Qubiq detects the format automatically. Supported formats and import
details live in [Servers & nodes](servers.md).

## Connect

- Tap a server row to choose it, or leave nothing selected and let
  automatic selection choose for you.
- Press the **Connect** button — or **double-tap / double-click a row**
  to choose it and connect in one move.
- While connected, Home shows the running server and elapsed time.

Pull the list down to refresh your subscriptions. More connection details
live in [Connect & system entries](connect.md).

## Keep going

- [Subscriptions & providers](subscriptions.md) — refresh, plan info,
  provider appearance and diagnostics.
- [Routing](routing.md) — choose which traffic uses the tunnel.
- [Backup](backup.md) — keep a copy of your servers and settings.
- [Troubleshooting](troubleshooting.md) — permissions and common fixes.
