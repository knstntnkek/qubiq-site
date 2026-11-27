# Backup & restore

The backup entry lives in **Settings → Data**. Choose one file or
cloud location and use it for both backup and restore. There is no version
history, two-way sync or Qubiq cloud account.

> **The backup file is unencrypted.** It contains server credentials,
> subscription URLs and Age private keys. Store it somewhere you trust.

## Targets by platform

| Platform | Backup target |
| --- | --- |
| iOS / macOS | iCloud Drive or a file you choose |
| Android | A document chosen in the system file picker |
| Windows | A file in a OneDrive-synced folder you choose |
| Linux | Not available |

Choose a location outside app-private folders so the file survives
uninstalling the app. Reinstalling loses the binding, not the backup file;
choose the same file again to restore.

## How binding works

When you choose a target:

- an empty file is prepared for the first backup;
- a file with existing content can be restored or overwritten;
- cancelling leaves the previous file and binding untouched.

Later backups overwrite the same file. Unbinding or changing the target
never deletes the file.

## Automatic backup

Use the backup switch and interval setting to write to the bound target
on a schedule. Automatic backups follow the same rules as manual ones.
Cloud synchronization itself is handled by the storage provider.

## Restore

Qubiq reads and validates the backup, then shows a confirmation before
anything is replaced. Restore replaces rather than merges — a valid empty
backup can clear the current connection setup. Confirming stops the VPN
and does not reconnect automatically.

Restore brings back local servers, subscriptions, complete configs,
routing settings and VPN settings that match the current platform. Local
preferences, authorizations, the physical interface and the backup binding
stay local. Subscription server lists and provider plan details are not
stored in the backup; refresh subscriptions after restoring.

## Cleanup vs wipe

Settings has two different destructive actions:

- **Clear connection resources** — removes servers, subscriptions,
  configs, custom routes, caches and old run logs, while keeping app
  preferences, system permissions and the backup binding.
- **Clear all app data** — also removes preferences, startup entries and
  the local backup binding.

Neither action deletes backup files stored in iCloud, OneDrive, Android
storage or another external location.
