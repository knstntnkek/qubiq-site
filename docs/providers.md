# For providers

Qubiq subscriptions are controlled by the provider, not only by the app.
When a subscription is added or refreshed, the provider's response can
carry fields that rename the source, show plan information, pin UI
elements or even move the subscription to a new address. This page lists
every field Qubiq understands and what the user sees.

The user-side view of the same features is in
[Subscriptions & providers](subscriptions.md).

## Add-to-Qubiq links

Providers can offer a `qubiq://add?url=…&name=…` button. Percent-encode the
complete HTTPS subscription URL and the optional name separately, for example:

```text
qubiq://add?url=https%3A%2F%2Fexample.com%2Fsubscription%3Ftoken%3Dexample&name=My%20VPN
```

This opens a prefilled import form; it never saves a subscription or starts VPN
without user confirmation. For local node or configuration content,
`qubiq://import?data=…` accepts standard Base64 or Base64url UTF-8 (Base64url
is recommended), or percent-encoded text.

- The path form `qubiq://add/{url}` is also accepted — percent-encode the
  whole payload, including its `?`, `#` and `%`. Don't send both forms or
  duplicate parameters.
- `name=…` or an outer `#name` supplies the subscription name; `name`
  wins.
- Only HTTPS subscription URLs are accepted — other target schemes and
  URLs with `user:password@` credentials are rejected.
- Encoded links are limited to 256 KiB.
- The iOS, macOS, Android, Windows installer/MSIX and Linux DEB/RPM
  builds register `qubiq://`; the portable Windows ZIP does not.
- VPN-control links are a separate, default-off user permission that
  provider fields cannot enable.

Links carry credentials in plain encoding: avoid logging them and do not
embed real tokens in public examples.

### Link builder

<div data-link-builder></div>

The builder runs entirely in your browser — nothing you type is sent
anywhere. Try it with a test token: real tokens in links end up in
browser history.

## How providers send fields

Fields arrive in two places, and panels can use either or both:

- **HTTP response headers** — the canonical channel, e.g.
  `profile-title: My VPN`.
- **Body comments** — `#key: value` lines at the very top of the
  subscription text, e.g. `#profile-title: My VPN`. Qubiq scans at most
  the first 50 lines and stops at the first non-comment line.

For text and URL fields, a valid parsed header value wins over the same body
key; missing or invalid values may be filled from body comments. Expiry-reminder
and collapse-lock flags merge by logical OR: an off header does not override
an enabling body comment. Values that contain characters unsafe for headers
can be sent as `base64:<payload>` (base64url) — Qubiq decodes it transparently.

A field that disappears from a later response is treated as withdrawn and
cleared; a manual edit that changes the request (URL, Age keys, HWID,
User-Agent) clears all provider fields until the next refresh.

## Field reference

| Field | Sent as | What the user sees |
|---|---|---|
| `profile-title` | header / comment | Names the subscription when the user did not type a name |
| `subscription-name` | header / comment | Title fallback after `profile-title` |
| `content-disposition` | header / comment | Filename supplies the last provider-title fallback |
| `profile-description` | header / comment | Secondary text below the provider title |
| `subscription-userinfo` | header | Plan usage and expiry on the group card |
| `announce` | header / comment | Announcement line in the group card |
| `announce-url` | header / comment | Makes the announcement open a web or Telegram destination |
| `support-url` | header / comment | Support button in the group card |
| `support-email` | header / comment | Email support fallback when `support-url` is missing or invalid |
| `profile-web-page-url` | header / comment | Globe button opening the provider's website |
| `homepage` | header / comment | Website fallback when `profile-web-page-url` is missing or invalid |
| `profile-update-interval` | header / comment | Per-source auto-refresh cadence, shown in the header |
| `new-url` | header / comment | Subscription address replaced automatically |
| `new-domain` | header / comment | Subscription host rewritten automatically |
| `fallback-domain` | header / comment | Mirror host retried once when the URL fails |
| `subscriptions-collapse` | header / comment | `0` or `false` pins the group open against manual collapse |
| `notification-subs-expire` | header / comment | Opt-in flag for expiry reminders |
| `color-profile` | header / comment | Provider theme on the app palette while the subscription is in use |
| `profile-logo` | header / comment | Provider logo on the app bar, group card and details page |

### `profile-title`

The display name of the subscription. Qubiq resolves a name in this order:
the name the user typed, then `profile-title`, then `subscription-name`, then
the `content-disposition` filename, then the URL's host and finally the raw
URL. These fallbacks apply when adding a source or clearing its editable
name; refresh keeps the stored name, including custom names.

Both title fields accept plain text or `base64:`. A filename may be quoted
or unquoted; RFC 5987 `filename*=UTF-8''My%20VPN.yaml` wins over a valid
`filename=MyVPN.txt`. An invalid extended filename falls back to the plain
one. Directory components (including Windows paths) and the final extension
are stripped. Malformed percent escapes or UTF-8 in `filename*` parameters, and
malformed Base64 metadata, are ignored without failing the subscription refresh.
Plain `filename=` text is kept raw, including non-ASCII characters and literal
percent signs; it is not percent-decoded or validated as URL encoding.
Header precedence is applied per field before resolving
fallbacks, so a body `profile-title` still outranks a header `subscription-name`.

### `profile-description`

Plain text or `base64:` text, trimmed and limited to 4,096 Unicode characters,
like `announce`. It appears below the subscription title as up to two lines
of secondary text. Without a description, the header keeps its existing layout.

### `subscription-userinfo`

`upload`, `download` and `total` byte counts plus `expire` as Unix
seconds, e.g.
`subscription-userinfo: upload=0; download=123456; total=500000000; expire=1767225600`.
The group card shows used/total traffic and the expiry date, labelled as
provider-reported data rather than live app traffic. `total=0` means
unlimited and `expire=0` means no expiry — a missing value is not the
same.

### `announce`

Provider text rendered in the group card's help strip, e.g. maintenance
notices or migration warnings. Plain or `base64:` text is trimmed and
limited to 4,096 Unicode characters.

### `announce-url`

An http/https or `tg:` URL makes the announcement text tappable. Invalid or
absent URLs leave the announcement as ordinary text; a URL without text
does not add a standalone action. `mailto:` is not accepted for announcements.

### `support-url`

An http/https, `tg:` or `mailto:` URL behind the help-strip support button —
the provider's help desk, bot, email or docs page. Other schemes, including
`javascript:`, `file:` and `intent:`, are rejected. Telegram and email actions
are handed to an external application on every platform; an installed
handler is required. Provider action URLs are limited to 2,048 characters.
HTTP(S) action URLs require a host and no userinfo; an explicit port must be
1–65535. An invalid primary URL does not suppress its website or email fallback.

### `support-email`

A plain email address (or a `base64:`-encoded address) supplies a `mailto:`
support action only when there is no valid `support-url`. Display names,
multiple addresses and query/header suffixes are not accepted.
For this field and the address path of a `mailto:` support URL, domains must
have at least two ASCII labels, each 1–63 alphanumeric/hyphen characters without
leading or trailing hyphens, and total at most 253 characters. The TLD must be
alphabetic (at least two characters) or an `xn--` A-label. Providers must send
Punycode for IDNA domains, for example `help@example.xn--p1ai`; Unicode U-labels
are not accepted. Addresses remain limited to 254 characters with a 64-character
local part. This email validation does not change the separate `new-domain` /
`fallback-domain` migration-host rules.

### `profile-web-page-url`

An http/https URL behind the help-strip globe button — the provider's
website or personal cabinet. Unlike `support-url`, which is meant for
help, this is the general provider page.

### `homepage`

An http/https website fallback, used only when `profile-web-page-url` is
absent or invalid. It accepts plain URLs or the same `base64:` encoding.

### `profile-update-interval`

Whole hours, `1`–`720`. Overrides Qubiq's global auto-update interval for
this source only; the group header shows the effective cadence as
"checked … · updates every N h". Manual refresh is never affected, and a
provider cannot slow another source down — the value applies per
subscription.

### `new-url` and `new-domain`

Server-side address migration. When a provider's domain is blocked or
moved, the old URL's response tells Qubiq where to go next:

- `new-url` replaces the whole subscription URL. Must be a downloadable
  `https://` URL — no embedded credentials, valid port.
- `new-domain` rewrites only the host of the existing `https://` URL,
  keeping port, path and query. Must be a bare hostname.

A declared target is adopted only after it proves itself: Qubiq downloads
the target through the normal subscription pipeline and stores it as the
source URL only when it returns a usable subscription. This verification
runs when the subscription is first added and on every refresh, so panels
can chain moves over time — one hop per refresh, with each response's own
declaration scheduling the next.

A target that fails the check is remembered per source and retried on the
next refresh — the current URL keeps working meanwhile, so a provider can
announce a new address before it goes live. The newest declaration
replaces a remembered one, and the pending target is dropped when the
provider stops declaring it or the user changes the request. If the
current URL stops responding entirely, the remembered target is tried
right away as the recovery address. A target that collides with another
stored subscription is deferred without a probe and adopted automatically
once the collision clears.

### `fallback-domain`

A temporary mirror, not a move. `fallback-domain: mirror.example` is a
bare hostname, validated like `new-domain`, that Qubiq remembers from a
successful response. When the subscription URL later stops answering,
the same request is retried once against it with the host swapped to the
fallback domain — port, path and query preserved — and the mirror's data
serves that refresh.

The stored URL is never rewritten to the fallback address: every refresh
tries the real domain first, so the mirror is a safety net rather than a
migration. A remembered migration target is tried before the fallback —
a provider's declared move outranks a temporary mirror — and a mirror
response can itself declare `new-url`/`new-domain`, which resolves like
any response.

The fallback domain stays armed while the URL is broken: a mirror that
does not re-send the header does not disarm it. A successful response
from the real URL updates or clears it normally, and a request edit by
the user clears it like other provider state.

### `subscriptions-collapse`

Group-card pinning. `subscriptions-collapse: 0` or `false` locks the group open:
its server rows always show and the collapse toggle is disabled until a later
response sends a different value. All other values leave the user's
collapse choice free.

### `notification-subs-expire`

`true`/`1` opts the subscription into expiry reminders; anything else is
off. When the provider reports an `expire` timestamp, Qubiq schedules one
system notification 72 hours before it on iOS and Android — a subscription
already inside that window reminds once shortly after the refresh that
discovered it. A renewed plan reports a new timestamp and re-arms; clearing
the flag, removing the expiry or deleting the source cancels the reminder.
Reminders are inexact alarms — no special alarm permission is requested.

### `color-profile`

A JSON object restyling the app while this subscription is in use, e.g.
`color-profile: {"buttonColor":"#1E3AFF","backgroundColors":["#0B1020","#1A2340"]}`.
Two key families are accepted:

- **Happ `color-profile` keys** — themes authored for Happ apply
  unchanged. Every Happ key is an alias onto a palette slot, and several
  keys can share one target — a canonical slot wins over every alias
  pointing at it:

  | Happ key | Palette slot |
  |---|---|
  | `backgroundColors` (list; first and last stops) | `background` + `pageBackgroundEnd` |
  | `buttonColor` | `primarySolid` |
  | `buttonTextColor` | `primaryForeground` |
  | `settingsControlsTintColor`, `subHeaderButtonColor` | `primary` |
  | `powerIconColor`, `supportIconColor` | `accentForeground` |
  | `serverRowBackgroundColor` | `card` |
  | `serverRowTitleTextColor` | `cardForeground` |
  | `selectedServerRowColor` | `selectedSurface` |
  | `serverRowSubTitleTextColor`, `subscriptionInfoTextColor`, `disclosureSubHeaderTextColor`, `profileWebPageIconColor` | `mutedForeground` |
  | `serverRowChevronColor`, `topBarButtonsColor`, `additionalOptionsButtonColor` | `mutedStrong` |
  | `disclosureHeaderTextColor` | `foreground` |
  | `subsHeaderColor` | `insetSurface` |
  | `subscriptionInfoBackgroundColor`, `subscriptionTrafficBackgroundColor` | `muted` |

  Happ layout keys with no Qubiq counterpart — ellipses, button
  images/timers, gradient angle and intensity — are ignored, so an
  existing Happ theme degrades gracefully.
- **Qubiq palette slots** — the semantic names on `AppPalette`:
  `background`, `pageBackgroundEnd`, `foreground`, `card`,
  `cardForeground`, `popover`, `popoverForeground`, `primary`,
  `primaryHover`, `primaryText`, `primarySolid`, `primarySolidHover`,
  `primaryForeground`, `surfaceHover`, `secondary`, `secondaryForeground`,
  `muted`, `mutedForeground`, `mutedStrong`, `insetSurface`, `accent`,
  `accentForeground`, `border`, `borderStrong`, `input`, `ring`,
  `selection`, `switchUnchecked`, `header`, `brand`, `sidebar`,
  `sidebarForeground`, `sidebarPrimary`, `sidebarPrimaryForeground`,
  `sidebarAccent`, `sidebarAccentForeground`, `sidebarBorder`,
  `sidebarRing` and `selectedSurface`. A canonical slot always wins over
  a Happ alias mapping to the same slot.

Some slots paint more than one element and cannot be split:
`accentForeground` colors the disconnected connect button's power icon
and label *and* the help-strip action icons and pill text — setting it
yellow turns all of them yellow; the connected button instead takes
`primary` for its face, border and glow with `primaryForeground` for its
label. `insetSurface` is the help strip's background, which is what
`subsHeaderColor` actually recolors.

Values are hex only; the payload is capped at 16 KB, unknown keys are
skipped and a malformed document is ignored entirely. The literal
`color-profile: resetcolors` withdraws the profile, as does removing the
field.

Branding belongs to the subscription in use — the connected provider
profile, otherwise the selected source or server, otherwise the only
branded provider. Switching to another subscription swaps the theme;
deleting the source reverts it. A profile that only sets accents merges
into the user's light and dark themes; a profile that redefines surfaces
renders one coherent look under both. Error, status and chart colors are
never overridable, and text colors missing from the theme derive from
the provided surfaces so contrast is preserved.

### `profile-logo`

The provider's mark, shown in the connect app bar in place of the shield
icon, on the group card and in the details page's provider section.
Two transports:

- `data:image/png|jpeg|webp|gif;base64,…` — an inline image decoded at
  parse time.
- `https://…` — fetched once per refresh over HTTPS, without device
  headers; ≤4 redirects, ≤512 KB, PNG/JPEG/WebP/GIF magic verified.

A failed refetch of an unchanged URL keeps the cached logo; a new,
invalid or withdrawn declaration clears it.

### Provider appearance switch

Provider branding is on by default. Each subscription's details page
lists what the provider set — theme, logo — and a per-source
"Provider appearance" switch opts that source out; the choice is the
user's own and survives edits and refreshes. Branding never changes the
window title, the app identity or the ability to edit anything.

## Per-server provider fields

Providers can attach a human description to a node, shown on the server
row:

- in a share link: `#title?serverDescription=<base64>`
- in provider JSON: a `serverDescription` meta field per outbound

## What users see

- **Collapsible groups** — tapping a subscription's header folds its
  server rows behind an "N servers" summary; the choice persists across
  launches. A provider-pinned group (above) cannot be folded.
- **Pull-to-refresh** — pulling the home list refreshes every source,
  applying all provider fields in one pass.
- **Source card** — the expanded card shows a one-line announcement with
  More for the full text. Support and Website (when provided) and Send
  logs stay visible even while collapsed: as labeled chips by default or
  header icons in Compact home layout. Update cadence remains in the header.
- **Diagnostics handoff** — a Send logs bundle that a user shares with
  you holds the response status and headers verbatim, the source's panel
  fields including HWID, the redacted runtime config and core log tails —
  never the subscription URL. See [Send logs](subscriptions.md#send-logs).
- **Plan and expiry** — the card shows usage and the absolute expiry
  date when supplied via `subscription-userinfo`. Capped plans show a thin
  used/total bar; unlimited plans use text only. Expiry inside 7 days is
  highlighted with a warning color.

## Device identity (HWID)

Qubiq always attaches a per-subscription random UUID in the `x-hwid` header
to subscription downloads so panels can bind devices to accounts. Legacy
disabled rows are re-enabled on refresh, retaining their saved UUID or generating
one if absent. It is
never shown in ordinary UI, never leaves with shared links and never
appears in Xray configs. `subscription-always-hwid-enable` is not supported;
transmission is not optional. The identity survives URL edits; deleting and
recreating the source generates a different identity. See
[Stored request fields](subscriptions.md#stored-request-fields).
