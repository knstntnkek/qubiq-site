# Troubleshooting & FAQ

## First stop: the failure note

When connecting fails, the Connect button shows **Try Again** and the
reason nearby. Read that first. Also check the server name shown while
connected — automatic selection can choose a different usable server.

When reporting a bug in
[GitHub Issues](https://github.com/knstntnkek/qubiq-site/issues), include
your platform, app and Xray-core versions and the steps to reproduce the
problem. For subscription or connection problems, use **Send logs** in
the app and attach the bundle. It redacts credentials and removes the
subscription URL.

## Connect fails or hangs

- **No usable server** — add a server or refresh a subscription whose
  server list is empty.
- **macOS network extension not approved** — approve it in System
  Settings, then try again.
- **Windows security prompt declined** — connect again and approve the
  one-time prompt so the VPN core can start.
- **Windows/Linux interface missing** — choose the network interface
  that connects to the internet.
- **VPN permission denied** — connect again and allow the system prompt,
  or open system settings from the explanation shown in the app.

## Connected but nothing flows

- Check which server is actually shown as running.
- A provider-managed configuration uses the provider's own routing, not
  your app routing preferences.
- For ordinary servers, check your Smart Routing direct/proxy choices in
  [Routing](routing.md).
- Try another server or refresh the subscription.

## Latency numbers look wrong

- Test while disconnected; tests run through the VPN while it is connected.
- Provider-managed rows may not show ordinary latency.
- A failed test is shown as a failure, not as a very large delay.

## Subscription problems

- **Refresh failed** — the previous server list and plan information are
  kept. Check the URL and refresh again.
- **Subscription is empty or changed** — contact the provider or check
  whether it published a replacement URL.
- **Provider moved the subscription** — Qubiq follows supported moves
  automatically; otherwise add the new URL from the provider.
- **Plan information disappeared** — the provider may have stopped
  sending it. The subscription can still work without it.

## FAQ

**Does Qubiq provide VPN servers?**
No — it is a client for servers and subscriptions you bring.

**Where is my data?**
On your device. Nothing syncs anywhere unless you choose a backup target.

**What is the HWID sent to subscription providers?**
A random ID generated once when the app is installed. It is not a
hardware, advertising or system identifier, and it is sent with
subscription downloads so providers can recognize the installation.

**Where are routing, tunnel and server settings?**
Under *Settings → Advanced*: **Routing**, **Servers** and **VPN tunnel &
Xray**.

**Can I install iOS from the App Store?**
Not today. The `.ipa` requires sideloading or enterprise signing.

**Is there telemetry?**
No — no analytics SDK, crash reporting or accounts. Logs are local and
leave only when you share them.
