# Troubleshooting & FAQ

## First stop: the failure note

When a connect attempt fails, the hero shows **Try Again** with the real
reason beside it — read that first; it reports the actual phase and
error, not a generic message. The row names also reflect the real run:
the connected server name is the actual entry, which may differ from
what you pinned if automatic fallback stepped in.

When reporting a bug via the
[site repository's issues](https://github.com/knstntnkek/qubiq-site/issues):
include the
platform, app and core versions (Settings → About) and reproduction
steps. For provider or connection issues, the group's **Send logs**
action shares a `qubiq-diagnostics-*.txt` bundle with credentials
redacted and the subscription URL removed — it even covers the previous
session after a failed start, and it re-requests that URL live to dump
the response status and headers verbatim. Attach it to the issue rather
than pasting raw configs or logs yourself.

## Connect fails or hangs

- **Nothing usable to run** — the plan needs at least one active,
  readable candidate: a node, or a complete config matching the source's
  mode. Refresh a subscription whose cache is empty.
- **macOS System Extension pending** — approve it: macOS 15+ *General →
  Login Items & Extensions → Network Extensions*; macOS 14- *Privacy &
  Security*. Connect re-submits activation on retry.
- **Windows EXE first connect** — the one-time UAC elevation registers
  the *Qubiq VPN Core* scheduled tasks; declining it leaves the core
  unable to start.
- **Windows/Linux exit interface** — a missing or invalid saved
  interface prompts a re-pick at connect time.
- **Permission denied earlier** — denied VPN/LAN permissions don't
  re-ask on every entry, but connect retries the authorization; tap the
  explanation to open system settings.

## Connected but nothing flows

- Check which server the hero names — automatic fallback may have run a
  different (or provider) config when ordinary candidates were
  insufficient.
- A provider/Remnawave row runs its **own** routing — app-side Smart
  and traffic-mode preferences don't apply to it.
- For app-managed runs, the saved Smart Routing set decides direct vs
  proxied traffic — see [Routing](routing.md).

## Latency numbers look wrong

- Tests run **through the VPN** when connected — test disconnected for
  real numbers.
- Provider (Remnawave) rows intentionally show no delay — they never
  join single-outbound tests.
- Untested/failed states are shown as status, not delay values — a
  timeout isn't "9999 ms".

## Subscription problems

- **Refresh failed** — the old cache, plan and your edits are kept; the
  error sits on the source. Check the URL, then pull-to-refresh again.
- **Remnawave returned links, not JSON** — the nodes import as an
  ordinary app-managed subscription silently, then one `/json` retry
  recovers the provider view if the panel has it.
- **Provider renamed/migrated the sub** — `new-url`/`new-domain` targets
  are adopted only after they answer with a usable subscription; a
  failing target is remembered and retried on each refresh, and a manual
  URL edit clears provider metadata until the next refresh.
- **Main URL down, provider has a mirror** — a declared
  `fallback-domain` is retried once per refresh with the host swapped;
  the stored URL itself never rewrites to it.
- **Plan meter gone** — the provider stopped sending
  `subscription-userinfo`; withdrawn fields clear on the response that
  omits them.

## FAQ

**Does Qubiq provide VPN servers?**
No — it's a client for servers and subscriptions you bring.

**Where's my data?**
In the app's local database — nodes, keys, HWID, plan caches. Nothing
syncs anywhere unless you bind a backup target yourself.

**What does HWID send?**
A random UUID generated once when the app is installed — no
hardware/ad/system identifier. It goes to your subscription providers
with every subscription download; there is no opt-out.

**Where are routing, tunnel and server settings?**
Under *Settings → Advanced*: **Routing**, **Servers** and **VPN tunnel
& Xray**. Favorites, manual groups and ordering live in the Servers
manager.

**iOS can't be installed from the App Store?**
The `.ipa` requires sideloading or enterprise signing today.

**Is there telemetry?**
No — no analytics SDK, no crash reporting, no accounts. Logs are local
and opt-in.
