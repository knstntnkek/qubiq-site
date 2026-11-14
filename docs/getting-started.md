# Getting started

Qubiq is an open-source Xray-core client. It provides **no VPN access and
no servers of its own** — you bring share links, a subscription from your
provider, or Xray JSON, and Qubiq runs the tunnel.

## Install

Packages are published on
[GitHub Releases](https://github.com/knstntnkek/yavpnclient/releases).

| Platform | Package | Requirements |
| --- | --- | --- |
| iPhone / iPad | `Qubiq-ios.ipa` | iOS / iPadOS 16+, sideloading or enterprise signing |
| macOS | `Qubiq-macos-universal.zip` | macOS 13+, Apple silicon or Intel |
| Android | `Qubiq-android-universal.apk` | Android 10+, arm64-v8a or x86_64 |
| Windows | `Qubiq-windows-amd64.exe` / `.zip` · `Qubiq-windows-arm64.exe` / `.zip` | Windows 10 20H2+ (x64) or Windows 11 (ARM64) |
| Linux | `Qubiq-linux-x86_64.deb` / `.zip` · `Qubiq-linux-aarch64.deb` / `.zip` | Linux 5.3+, glibc 2.39+ |

## First run

The first launch walks through a short setup — no VPN permission is
requested here, and no servers are added:

1. **Privacy consent** — what the app does and doesn't collect (spoiler:
   nothing is uploaded).
2. **Region and interface** — pick your region (it seeds the Smart
   Routing direct-region default) and, on **Windows and Linux only**,
   choose the outbound network interface. This choice is required there —
   Qubiq never guesses it.

After that the main shell initializes the database, built-in Geodata and
the connection coordinator, then asks for the platform permissions below
— each once, on entry. Denying one still lets you into the app; you'll be
asked again when you actually connect.

## Platform permissions

- **iOS / macOS / Android** — the system VPN authorization sheet. Android
  versions that need it also ask for local-network permission.
- **macOS (System Extension build)** — approve the extension once:
  - macOS 15+: *System Settings → General → Login Items & Extensions →
    Network Extensions*
  - macOS 14 and earlier: *System Settings → Privacy & Security*

  If the approval is still pending when you connect, Qubiq shows an
  explanation with an **Open system settings** button and re-submits the
  activation on retry. The connect flow never proceeds before
  authorization completes.
- **Windows (EXE/ZIP)** — on the first connect, a single UAC prompt
  elevates the bundled `QubiqCoreLauncher.exe`, which registers the
  *Qubiq VPN Core* scheduled tasks. Later connects need no UAC. The MSIX
  build uses the packaged system-VPN instead.
- **Linux** — the core needs execute permission, TUN and capabilities;
  the .deb handles this, the .zip may need manual setup.

## Add your first server

Open **Servers → Add server** and pick a method:

- **Subscription** — paste the HTTPS URL your provider gave you.
- **Share links** — VMessAEAD/VLESS, Hysteria2 (`hysteria2://`, `hy2://`),
  SS, SOCKS and Trojan links, one per line.
- **Xray JSON** — a single node outbound, or a complete config as Raw
  JSON.
- **QR scan** — iOS/Android only.
- **File** — the system file picker.

Details for each method live in [Servers & nodes](servers.md) and
[Subscriptions & providers](subscriptions.md).

## Connect

Back on **Connect**, pick the connection plan:

- **Automatic** — Qubiq chooses across your usable nodes.
- A **subscription**, **all manual nodes**, or a **pinned** node or
  complete config.

Then press connect. The page shows the plan, the actual run, real-time
rates, this session's totals and duration — and *Why this connection*
explains which entry and final exit were actually picked. The full model
is in [Connect & system entries](connect.md).

## Keep going

- Tune [Routing](routing.md) — Smart Routing is the default and a good
  starting point for app-managed nodes.
- Set per-platform tunnel options in [VPN tunnel](vpn-tunnel.md) —
  per-app VPN on Android, always-on on Apple, exclusions.
- Turn on [Backup](backup.md) once your servers are set up.
