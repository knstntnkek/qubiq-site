# Subscriptions & providers

A subscription is a server list your provider maintains — Qubiq downloads
it over HTTPS, imports the entries and can refresh it later. Everything
after the URL is optional: name, Age keys, HWID and User-Agent live in an
expandable advanced section of the form.

## What a refresh imports

Two kinds of content can come back:

- **Ordinary nodes** — share-link style entries, managed by you
  (app-managed mode).
- **Complete configs** — whole Xray JSON documents the provider manages,
  e.g. Remnawave panels (provider-managed mode).

New sources default by response format: ordinary nodes → app-managed,
complete JSON → provider-managed. You can switch the mode on the source —
switching only changes the local list and candidate type (no re-download,
no reconnect); if the other cache is missing you'll be asked to refresh.

A Remnawave source that answers with non-JSON text offers to **convert to
an ordinary subscription** — on consent the nodes are parsed and the
source becomes a generic app-managed one, keeping URL, keys and HWID.
Declining keeps everything as it was.

## Refresh behaviour

- Pull the home list down to refresh **every** source in one pass.
- Auto-update runs on a shared switch and a **24/72/168-hour** interval —
  or a provider-set `profile-update-interval` per source.
- A refresh merges: identical new rows adopt the survivor's favorite,
  delay, manual order and your selection; running configs are never
  rewritten in place.
- Failed refreshes keep the old cache, plan data and your drafts — a
  refresh can never empty your list.

## Plan information

Providers reporting `subscription-userinfo` give Qubiq usage bytes
(`upload`/`download`/`total`) and an `expire` timestamp. The group card
shows a thin used/total meter and an expiry chip — clearly labelled as
provider-reported, not live app traffic. `total=0` means unlimited,
`expire=0` means no expiry. An expired or exhausted plan only informs —
it never blocks connecting. Mobile can show a reminder 72 hours before
expiry when the provider opts in.

## Provider fields

Panels control parts of the UI through response headers or `#key: value`
body comments (headers win). Fields Qubiq honours:

| Field | What you see |
| --- | --- |
| `profile-title` | Names the source unless you typed a name |
| `subscription-userinfo` | Plan meter + expiry chip on the group card |
| `announce` | Announcement line in the group card |
| `support-url` | Support button in the group card |
| `profile-web-page-url` | Globe button to the provider's site |
| `profile-update-interval` | Per-source refresh cadence (1–720 h) |
| `new-url` / `new-domain` | Subscription address migrates automatically |
| `subscriptions-collapse: 0` | Group pinned open against manual collapse |
| `notification-subs-expire` | Opts into expiry reminders (mobile) |

Group headers collapse per source ("N servers" summary, persisted);
collapsing also folds the announcement strip. Provider fields are
withdrawn when they disappear from a later response, and cleared when you
edit the request (URL, keys, HWID, UA).

Fields Qubiq deliberately ignores: provider-picked ping methods
(`ping-type`, `check-url-via-proxy` — Qubiq probes latency itself),
`hide-settings`, third-party telemetry parameters (`providerid`),
and `happ://crypt` links — Qubiq uses Age encryption instead.

## Address migration

When a provider's domain is blocked or moved, the old URL's response can
carry `new-url` (replaces the whole subscription URL) or `new-domain`
(rewrites just the host). The migration applies on add and on every
refresh and can chain — never onto an address already used by another
stored source.

## Age-encrypted subscriptions

For sensitive lists, a provider can ship the payload Age-encrypted:

- `ageSecretKey` decrypts **locally** — it never leaves the device.
- `agePublicKey` goes to the server in the `X-Age-Public-Key` header.
- Keys generate as X25519 or ML-KEM-768 + X25519 hybrid pairs in the
  subscription form.

Age protects the response body only — it doesn't hide the URL, replace
HTTPS, or prove the source trustworthy. Failed decryption keeps the old
cache.

## Device identity (HWID)

On by default for new sources: Qubiq sends a per-source random UUID as
`x-hwid` so panels can bind devices to accounts.

- It's **not** a hardware, ad or system identifier — just a generated
  UUID that stays with that source forever.
- It never appears in shared links, Xray configs or ordinary UI.
- Cross-origin redirects strip it permanently for that request.
- Switch it off per source in the advanced section; a provider's
  `subscription-always-hwid-enable` response can force it back on for
  that source.

## User-Agent

Each source can carry its own `User-Agent` (single-line ASCII). The form
pre-fills a compat UA for panel recognition; clearing falls back to the
app default.
