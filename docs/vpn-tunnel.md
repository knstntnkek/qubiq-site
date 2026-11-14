# VPN tunnel & platforms

The VPN tunnel page holds the parameters the OS-level tunnel uses —
common settings first, then per-platform policy. Edits stay in a draft
until you save; an effective change while connected asks before
reconnecting. *Restore defaults* resets the whole draft — it's still
not saved until you commit.

## Common settings

- **Addresses** — the tunnel's IPv4/IPv6 network addresses (read-only).
- **DNS** — editable IPv4 and IPv6 resolvers; IPv6 sits behind its own
  switch.
- **DoT server domain** — Apple platforms only.
- **Exit interface** — **Windows and Linux only**, chosen explicitly.
  Qubiq re-checks it before each connect; a missing or invalid interface
  prompts a re-pick rather than a silent fallback.

## Apple (iOS / macOS)

- **Always-on** — keep the tunnel up.
- **Wi-Fi auto-connect / auto-disconnect** — react to trusted-network
  changes; cellular (iOS) or Ethernet (macOS) behaviour is configurable
  alongside.
- **System exclusions** — once the tunnel takes all traffic, four
  switches control excluded traffic ranges; turn them off to edit the
  ranges.
- iOS offers a **hide VPN icon** option; disabling options follows the
  save draft like everything else.

## Android

Three app modes for the tunnel:

| Mode | Effect |
| --- | --- |
| **All** | Every app's traffic goes through the VPN. |
| **Only selected** | Checked apps use the VPN; the rest go direct. |
| **Except selected** | Checked apps bypass the VPN; everything else tunnels. |

The include/exclude lists save independently and show app icons.
Opening the picker pins checked apps to the top; uninstalled-but-checked
apps stay listed first so you can still uncheck them. Broadcast
automation (Tasker-style commands) is configured on a separate page —
see [Connect & system entries](connect.md#android-automation).

## Windows

- The **system-VPN** policy — auto-connect, LAN bypass and excluded
  ranges — is offered on the **MSIX** build.
- EXE/ZIP builds keep the common settings and exit interface; the
  disabled MSIX policy neither applies nor validates.

## Linux

Common settings and the exit interface apply; there's no platform
policy page (and no backup support — see [Backup](backup.md)).

## IPv6 policy

IPv6 DNS and addresses are controlled by the IPv6 switch — off means
the tunnel carries IPv4 only. Dual-stack exits keep their normal
behaviour when the switch is on.
