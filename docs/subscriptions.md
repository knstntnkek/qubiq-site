# Subscriptions & providers

A subscription is a server list your provider maintains — Qubiq downloads
it over HTTPS, imports the entries and refreshes on demand or on a
schedule. The add form asks for exactly two things: a **name** (optional)
and the **HTTPS URL**.

## Modes: app-managed vs provider-managed

What a response contains decides how its entries behave:

- **Ordinary nodes** — share-link style entries managed by you.
- **Complete configs** — whole Xray JSON documents the provider manages
  (e.g. Remnawave panels): each runs its own stored routing and stays
  read-only.

New sources enter with the Remnawave panel default and an undecided mode
— the response format settles it: ordinary nodes become app-managed,
complete JSON becomes provider-managed, and the stored mode shows on the
source afterwards.

A Remnawave source that answers with non-JSON text **converts silently** —
the same response's nodes are parsed and the source becomes generic
app-managed, no prompt and no re-download. When that happens Qubiq makes
one recovery attempt: it retries the same URL with `/json` appended
(query preserved, using the compatibility User-Agent) — a usable
provider-managed result replaces the ordinary one, while any error or
non-provider response keeps the original ordinary result. The stored URL
is never rewritten.

## Refresh behaviour

- Pull the home list down to refresh **every** source in one pass.
- Auto-update runs on a shared switch and a **24/72/168-hour** interval —
  or a provider-set `profile-update-interval` per source.
- A refresh merges: identical new rows adopt the survivor's favorite,
  delay, order and your selection; running configs are never rewritten
  in place.
- Failed refreshes keep the old cache, plan data and drafts — a refresh
  can never empty your list.

## Plan information

Providers reporting `subscription-userinfo` give Qubiq usage bytes
(`upload`/`download`/`total`) and an `expire` timestamp. The group card
shows the usage and expiry — a thin used/total meter for capped plans,
text for unlimited ones — labelled as provider-reported, not live app
traffic, with a warning tint inside the last 7 days. `expire=0` means
no expiry. An expired or exhausted plan only informs —
it never blocks connecting. Mobile can remind you 72 hours before expiry
when the provider opts in.

## Provider fields

Panels control parts of the UI through response headers or `#key: value`
body comments. For text and URL fields a valid header wins over the same
body key, and missing or invalid header values may be filled from the
body; flags like the expiry reminder and collapse lock merge by logical
OR. Fields Qubiq honours:

| Field | What you see |
| --- | --- |
| `profile-title` | Names the source unless you typed a name |
| `content-disposition` | Filename supplies the last title fallback |
| `subscription-userinfo` | Plan usage + expiry on the group card |
| `announce` | Announcement line in the group card |
| `support-url` | Support action (web, Telegram or email) |
| `profile-web-page-url` | Website action to the provider's page |
| `profile-update-interval` | Per-source refresh cadence (1–720 h) |
| `new-url` / `new-domain` | Subscription address migrates automatically |
| `fallback-domain` | Mirror host retried once when the URL fails |
| `subscriptions-collapse` | `0`/`false` pins the group open |
| `notification-subs-expire` | Opts into expiry reminders (mobile) |
| `color-profile` / `profile-logo` | Provider theme and logo — see [Provider branding](subscriptions.md#provider-branding) |

Running a panel? The full reference — validation rules, the theme-key
mapping, logo limits — is in [For providers](providers.md).

A blank editable name resolves as `profile-title` →
the `content-disposition` filename → the URL's host; a name you typed
always wins and survives refreshes. Provider fields are withdrawn when
they disappear from a later response, and cleared when you change the
request URL or Age keys.

## Provider branding

A provider can restyle the app while its subscription is in use — two
response fields drive it:

- **`color-profile`** — a [theme profile](providers.md#color-profile),
  sent as JSON or `base64:` JSON. It colors Home, the Connect
  circle and Settings controls, plus the provider's own headers, rows and
  usage info — other subscriptions and manual servers keep their look.
  Hex values only, 16 KB cap; unknown keys, old Qubiq-only palette keys
  and malformed JSON are ignored. The literal `resetcolors` — or
  removing the field — withdraws the theme.
- **`profile-logo`** — the provider's mark in the Home header in place
  of the Qubiq logo, on its source card and on the details page. Inline `data:` images or HTTPS URLs
  (≤512 KB, format-verified, cached across refreshes; a failed refetch
  keeps the cache, a withdrawn declaration clears it).

Branding follows the subscription in use — the connected provider
profile, otherwise the selected source or server, otherwise the only
branded provider. Switching source swaps the theme; deleting the source
reverts it. Each subscription's details page lists what the provider set
and carries a **Provider appearance** switch that opts that source out —
the choice is yours and survives edits and refreshes. Branding never
touches the window title, the app identity, or what you can edit.

## Send logs

The group card strip also carries a **Send logs** action — it writes a
single `qubiq-diagnostics-*.txt` bundle; mobile hands it to the system
share sheet while desktop goes straight to a save dialog. The bundle
holds:

- app, platform and connection metadata, live traffic counters and
  per-path probe results
- the source's panel fields and the HWID — **never** its URL
- a live re-request of the subscription URL — its response status and
  headers are dumped verbatim
- the runtime Xray config with credentials `***`-redacted and core file
  paths trimmed to basenames
- the last 256 KB of each core log file — the warning-level error log is
  always collected per session, so it exists even with record-logs off

Disconnected or after a failed start, the bundle still recovers the
previous session's config (redacted the same way) and declared log paths.
Empty logs are marked `(empty)` — nothing is silently omitted.

## Address migration & fallback

When a provider's domain is blocked or moved, the old URL's response can
carry `new-url` (replaces the whole subscription URL) or `new-domain`
(rewrites just the host of an HTTPS URL). A declared target is adopted
**only after it proves itself** — Qubiq downloads it through the normal
pipeline and stores it only when it returns a usable subscription. The
check runs on add and on every refresh — one hop per refresh, each
response's own declaration scheduling the next.

A target that fails is remembered per source and retried on every
refresh — the current URL keeps working meanwhile, so a provider can
announce a new address before it goes live. The newest declaration
replaces a remembered one; the pending target is dropped when the
provider stops declaring it or you edit the request. If the current URL
stops responding entirely, the remembered target is tried right away as
the recovery address. A target that collides with another stored
subscription is deferred without a probe and adopted automatically once
the collision clears.

`fallback-domain` is a mirror, not a move. A successful response can
declare a bare mirror host; when the stored URL later stops answering,
the same request is retried once with the host swapped to it — port,
path and query preserved — and the mirror's data serves that refresh.
The stored URL is never rewritten to the fallback: every refresh tries
the real domain first, a pending migration target outranks it, and a
mirror response can itself declare migrations. The fallback stays armed
until the real URL answers again or you edit the request.

## User-Agent & Age keys

Every download — subscriptions, Geodata and other fetches alike — sends
the app's live User-Agent. It consists of a fixed compatibility product
token followed by
`Qubiq/<app version> (<package>; build:<build>; <platform>)`.
The compatibility token is kept so panels recognise the client; there is
no per-source or global control, and an upgraded app always sends its
current identity.

Age keys are the one per-source request value: where present,
`ageSecretKey` decrypts **locally** and `agePublicKey` goes to the
server via `X-Age-Public-Key`. Age protects the response body only —
it doesn't hide the URL or replace HTTPS, and failed decryption keeps
the old cache.

## Add-to-Qubiq links

Providers can put a `qubiq://add?url=…&name=…` button on their panel —
tapping it opens the prefilled subscription form (name optional);
nothing saves or connects without your confirmation.
`qubiq://import?data=…` does the same for node or config content, taking
Base64, Base64url or percent-encoded text. Links carry credentials in
plain encoding — providers should treat them like secrets and keep real
tokens out of examples. Providers can generate a button with the
[link builder](providers.md#link-builder).

## Source actions

Group-header actions open the source's **edit** page (name and URL),
**share**, update and delete. Editing the URL clears provider metadata
until the next refresh; deleting the source clears its caches and
associated selections.
