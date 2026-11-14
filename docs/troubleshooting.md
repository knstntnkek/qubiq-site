# Troubleshooting & FAQ

## First stop: diagnostics

**Xray → check & diagnostics** shows the current phase, the original
error, app and core versions, run duration and the real run JSON plus
log entries. Refresh only re-reads state — it never starts/stops the
VPN or marks an error resolved. Log viewing and export live under the
same card; export streams a copy to a file you pick.

When reporting a bug on
[GitHub](https://github.com/knstntnkek/yavpnclient/issues): include the
platform, app and core versions and reproduction steps — and **remove
credentials** from shared configs, subscription links and logs.

## Connect fails or hangs

- **Nothing usable to run** — the plan needs at least one active,
  readable candidate: a node, or a complete config when the mode
  matches. Check the source's mode and refresh a subscription with an
  empty cache.
- **macOS System Extension pending** — approve it: macOS 15+ *General →
  Login Items & Extensions → Network Extensions*; macOS 14- *Privacy &
  Security*. The connect flow re-submits activation on retry.
- **Windows EXE first connect** — the one-time UAC elevation registers
  the *Qubiq VPN Core* scheduled tasks; declining it leaves the core
  unable to start.
- **Windows/Linux exit interface** — a missing or invalid saved
  interface blocks connect until you re-pick it in the VPN tunnel page.
- **Permission denied earlier** — denied VPN/LAN permissions don't
  re-ask on every entry, but connect retries the authorization; tap the
  explanation to open system settings.

## Connected but nothing flows

- Check **Why this connection** on the connect page — it shows the
  actual entry and final exit, which may not be the node you expected
  (automatic fallback reports the real result).
- Look at per-chain status for multi-entry: available/failed/unknown
  plus last probe. A failed chain isn't retried silently — existing
  sessions never migrate mid-run.
- Smart Routing suspects: the **direct region** may be routing more
  than intended — clear it explicitly to test; check **DNS** resolvers
  and that sniffing is on if rules rely on it.

## Latency numbers look wrong

- Tests run **through the VPN** when connected — the app warns about
  this; test disconnected for real numbers.
- Provider (Remnawave) rows intentionally show no delay — they never
  join single-outbound tests.
- Untested/failed states are shown as status, not delay values — a
  timeout isn't "9999 ms".

## Subscription problems

- **Refresh failed** — the old cache, plan and your edits are kept; the
  error sits on the source. Check the URL, then try a manual refresh.
- **Remnawave returned links, not JSON** — Qubiq asks whether to convert
  to an ordinary app-managed subscription; consent parses the nodes and
  flips the mode.
- **Provider renamed/migrated the sub** — `new-url`/`new-domain` apply
  automatically; a manual edit of the URL clears provider metadata until
  the next refresh.
- **Age decryption fails** — check the secret key; failures never
  overwrite a working cache.

## FAQ

**Does Qubiq provide VPN servers?**
No — it's a client for servers and subscriptions you bring.

**Where's my data?**
In the app's local database — nodes, keys, HWID, plan caches. Nothing
syncs anywhere unless you bind a backup target yourself.

**What does HWID send?**
A per-source random UUID — no hardware/ad/system identifier — to that
source's provider only, and only when the switch is on.

**iOS can't be distributed via the App Store?**
The `.ipa` requires sideloading or enterprise signing today.

**A feature seems missing on Linux/Windows/…**
Some surfaces are platform-specific: backup (not on Linux), system-VPN
policy (MSIX only), per-app VPN (Android), widgets and tiles (mobile),
local API (desktop). Platform tables on each docs page list the bounds.

**Is there telemetry?**
No — no analytics SDK, no crash reporting, no accounts. Logs are local
and opt-in.
