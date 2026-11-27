# Subscriptions & providers

A subscription is a server list your provider maintains. Qubiq downloads
it over HTTPS, imports the entries and refreshes it when asked or on a
schedule.

Running a provider panel? The technical integration reference is in
[For providers](providers.md).

## Add a subscription

Tap **＋**, choose **Subscription**, then paste the HTTPS URL from your
provider. A name is optional — it only helps you recognize the source.

Qubiq detects what the subscription contains:

- ordinary servers you can organize and edit;
- provider-managed configurations, which stay read-only and follow the
  provider's updates.

Nothing connects automatically after import.

## Refresh behaviour

- Pull the Home list down to refresh **every** subscription.
- Auto-update can run every **24, 72 or 168 hours**; a provider can also
  suggest a different cadence for its own source.
- Refresh keeps your favorites, selection and server order where
  possible.
- If refresh fails, the previously downloaded server list and plan
  information remain available.

## Plan information

When a provider supplies plan data, the subscription card can show:

- used and total traffic;
- expiry date;
- announcements, support and provider website links.

An expired or exhausted plan is shown as information only — it does not
by itself block connecting. On mobile, Qubiq can remind you before expiry
when the provider enables reminders.

## Provider branding

A provider can apply its colors and logo while its subscription is in
use. Branding can affect Home, the Connect button and that provider's
subscription card; other subscriptions and manual servers keep their own
appearance.

To disable it for one source, open the subscription details and turn off
**Provider appearance**. Your choice is remembered. Branding never
changes the app identity, window title or what you can edit.

## Send logs

The subscription card includes **Send logs** for support requests. It
creates one `qubiq-diagnostics-*.txt` bundle; mobile opens the system
share sheet, while desktop asks where to save the file.

The bundle can include:

- app, platform and connection details;
- traffic counters, latency/probe results and recent VPN-core logs;
- the random app-installation ID and provider-supplied source fields;
- a redacted copy of the running configuration;
- the status and technical details of a fresh subscription check.

Credentials are redacted, core file paths are shortened, and the
subscription URL itself is not included. Review the bundle before sharing
it publicly.

## Address changes

If a provider moves the subscription to a new address or offers a backup
mirror, Qubiq can follow that automatically when the provider supports
it. Normally no action is needed.

If a subscription stops updating, refresh it first. If it still fails,
check whether the provider published a new subscription URL or contact
its support. Editing the URL in Qubiq clears provider-supplied details
until the next successful refresh.

## Add-to-Qubiq links

Providers can place an **Add to Qubiq** button on their website. Tapping
it opens Qubiq with the subscription form already filled in. Nothing is
saved or connected until you confirm.

## Source actions

A subscription's header and details page provide actions to:

- rename it or edit its URL;
- refresh or share it;
- inspect plan and provider information;
- delete the source and its downloaded entries.

If the deleted source provided the selected server, selection returns to
automatic.
