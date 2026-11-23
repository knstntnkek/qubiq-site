# Backup & restore

The backup entry lives in **Settings → data section**. One bound target
serves both backup and restore — there's no version list, no two-way
sync and no cloud account to sign into.

> **The backup file is unencrypted.** It contains node credentials,
> subscription URLs, Age private keys and the HWID — Base64 is encoding,
> not secrecy. Choose where it lives accordingly.

## Targets by platform

| Platform | Target |
| --- | --- |
| iOS / macOS | iCloud Drive (`Documents/Qubiq-backup.json`) or a user-picked file — both share the same backup, restore and schedule |
| Android | A document in the system picker (SAF) — shows the provider's real filename |
| Windows | A file in a user-picked, OneDrive-synced directory |
| Linux | Not available |

Pick a target outside app-private folders so the file survives
uninstall — reinstalling loses the binding, not the file; re-picking the
same file is enough to restore.

## How binding works

Binding first probes the file's content:

- **Empty file** → the first backup writes directly.
- **File with content** → choose *restore* or *overwrite*; cancelling
  leaves the old binding and file untouched.

Later backups overwrite the same file. Unbind or change-target is always
available; unbinding never deletes the file, and neither does clearing
app data.

## Automatic backup

A switch beside the section title plus an interval setting — scheduled
writes go to the bound target under the same rules as manual ones
(including the VPN-idle conditions). A successful write means the file
was accepted locally — cloud sync finishing is the provider's job.

## Restore

Restore reads the whole file, validates it and shows a preview
confirmation before anything is replaced. It swaps connection assets —
nodes, subscriptions, configs, routing assets — and matching-platform
VPN settings, while keeping local bindings, authorizations and
preferences. After restore, plan info refetches on the next normal
update.

If the binding write fails, restore doesn't start; if restore fails,
the original binding rolls back.

## Cleanup vs wipe

Two different destructive operations in Settings:

- **Clear connection resources** — removes nodes, subscriptions, Raw
  and caches, manual groups, custom routes and Geodata, and old run
  logs. Keeps platform policies, preferences, the login item, backup
  binding, API/automation authorizations and default Geodata.
- **Clear all app data** — also cancels the login item, clears
  preferences and rebuilds defaults. Only this removes the local backup binding.

Neither deletes external files — iCloud, OneDrive or SAF copies stay
where they are.
