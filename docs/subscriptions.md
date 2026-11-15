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

A Remnawave source that answers with non-JSON text offers to **convert to
an ordinary subscription** — on consent the nodes are parsed and the
source becomes generic app-managed. Declining keeps everything as it was.

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
shows a thin used/total meter and an expiry chip — labelled as
provider-reported, not live app traffic. `total=0` means unlimited,
`expire=0` means no expiry. An expired or exhausted plan only informs —
it never blocks connecting. Mobile can remind you 72 hours before expiry
when the provider opts in.

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

Provider fields are withdrawn when they disappear from a later response,
and cleared when you change the request URL.

Fields Qubiq deliberately ignores: provider-picked ping methods
(`ping-type`, `check-url-via-proxy`), `hide-settings`, third-party
telemetry parameters (`providerid`), and `happ://crypt` links.

## Address migration

When a provider's domain is blocked or moved, the old URL's response can
carry `new-url` (replaces the whole subscription URL) or `new-domain`
(rewrites just the host). The migration applies on add and on every
refresh and can chain — never onto an address already used by another
stored source.

## Stored request fields

Each source also carries per-source request values — User-Agent, Age key
pair and the HWID send flag — kept from the stored or default state:

- **User-Agent** — defaults to a compat UA for panel recognition.
- **Age keys** — where present, `ageSecretKey` decrypts **locally** and
  `agePublicKey` goes to the server via `X-Age-Public-Key`. Age protects
  the response body only — it doesn't hide the URL or replace HTTPS, and
  failed decryption keeps the old cache.
- **HWID** — a per-source random UUID sent as `x-hwid`, on by default so
  panels can bind devices to accounts. It's never a hardware, ad or
  system identifier, never appears in shared links or Xray configs, and
  cross-origin redirects strip it permanently for that request.

## Source actions

Group-header actions open the source's **edit** page (name and URL),
**share**, update and delete. Editing the URL clears provider metadata
until the next refresh; deleting the source clears its caches and
associated selections.
