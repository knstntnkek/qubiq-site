# Getting started

Qubiq is a cross-platform Xray-core client. It provides **no VPN access and
no servers of its own** — you bring share links, a subscription from your
provider, or Xray JSON, and Qubiq runs the tunnel.

## Install

Packages are published on this site — see the
[Download section](index.html#modal-download).

| Platform | Package | Requirements |
| --- | --- | --- |
| iPhone / iPad | `Qubiq-ios.ipa` | iOS / iPadOS 16+, sideloading or enterprise signing |
| macOS | `Qubiq-macos-universal.dmg` | macOS 13+, Apple silicon or Intel |
| Android | `Qubiq-android-universal.apk` | Android 10+, arm64-v8a or x86_64 |
| Windows | `Qubiq-windows-amd64.exe` / `.zip` · `Qubiq-windows-arm64.exe` / `.zip` | Windows 10 20H2+ (x64) or Windows 11 (ARM64) |
| Linux | `Qubiq-linux-x86_64.deb` / `.rpm` / `.zip` · `Qubiq-linux-aarch64.deb` / `.rpm` / `.zip` | Linux 5.3+, glibc 2.39+ |

## First run

There is no setup wizard — the app opens straight on the **Connect**
home. First launch initializes the database, built-in Geodata and the
connection coordinator, then asks for the platform permissions below —
each once. Denying one still lets you in; you'll be asked again when you
actually connect.

- **iOS / macOS / Android** — the system VPN authorization sheet. Android
  versions that need it also ask for local-network permission.
- **macOS (System Extension build)** — approve the extension once:
  - macOS 15+: *System Settings → General → Login Items & Extensions →
    Network Extensions*
  - macOS 14 and earlier: *System Settings → Privacy & Security*

  If approval is still pending when you connect, Qubiq shows an
  explanation with an **Open system settings** button and re-submits the
  activation on retry.
- **Windows (EXE/ZIP)** — the first connect elevates the bundled
  `QubiqCoreLauncher.exe` once via UAC, registering the *Qubiq VPN Core*
  scheduled tasks; later connects need no UAC. The MSIX build uses the
  packaged system-VPN instead.
- **Windows / Linux exit interface** — Qubiq re-checks the saved outbound
  interface before each connect; if it's missing or invalid you'll be
  prompted to pick one at that point.
- **Linux** — the core needs execute permission, TUN and capabilities;
  the .deb and .rpm handle this, the .zip may need manual setup.

## Add a server

Tap **＋** in the header — or, on an empty Home, the Connect circle or
**Add connection** — to open the import flow:

- **Subscription** — paste the HTTPS URL your provider gave you, or tap
  a provider's `qubiq://add` button which prefills the same form. Panel
  and mode are decided by what the response actually contains.
- **Share links** — VMessAEAD/VLESS, legacy VMess QR, WireGuard,
  Hysteria2, SS, SOCKS, Trojan — one per line.
- **QR scan** — iOS and Android.
- **File** — via the system picker.

Details live in [Servers & nodes](servers.md) and
[Subscriptions & providers](subscriptions.md).

## Connect

The home screen is the whole loop:

- Tap a server row to **pin** it — or pin nothing and let automatic
  selection choose.
- Press the **hero button** — or **double-tap / double-click a row** to
  pin and connect in one move.
- Connected shows the running server name and an elapsed clock;
  favorites live in *Settings → Advanced → Servers*.

Pull the list down to refresh every subscription. The full model is in
[Connect & system entries](connect.md).

## Keep going

- [Subscriptions & providers](subscriptions.md) — plan info, provider
  fields, address migration.
- [Routing](routing.md) — how Smart Routing and traffic modes apply.
- [Backup](backup.md) — bind a target once your servers are set up.
- [Troubleshooting](troubleshooting.md) — permissions and common fixes.
