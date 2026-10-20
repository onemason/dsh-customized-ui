# Customized UI

A local [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) bundle that collects several personal UI refinements for the Harness Web/Desktop client into one plugin.

## Features

- **Frosted Settings sheet** — a translucent, blurred Settings panel with custom navigation, cards, switches, inputs, and account actions.
- **Personalized sidebar identity** — the signed-in person's avatar and name replace the shipped sidebar brand/account seats; the launcher opens Settings and the account menu supports sign-out.
- **Settings header cleanup** — removes the shipped `Open configuration file` action from the Settings header.
- **Sidebar cleanup** — hides the `New Session` button (the `Cmd/Ctrl+N` shortcut still works), renames the `Automation tasks` entry to `Tasks`, and renders the left sidebar as a solid surface instead of the translucent window material.
- **Frosted chrome** — menu popovers, hover cards, and tooltips use the same dark glass material as the Settings sheet.
- **Background-jobs auto-hide** — the header's background-jobs chip disappears as soon as no job is running, instead of lingering with a finished-job count.

## Preview

The frosted Settings sheet, popovers, hover cards, and solid sidebar are designed for the **dark theme on macOS**. Light theme and other platforms keep the shipped surfaces for most of the theme-specific rules; the functional tweaks (New Session hidden, Tasks label, jobs chip auto-hide) are global.

## Requirements

- DeepSeek Harness Desktop or Web with a profile that supports local bundles (`dsh.bundle.patch`).
- The client-side APIs used here: `slots`, `locale`, `remote`, and `remote.account`.

## Installation

This is a local bundle. Install it through the Harness Plugin Manager with the absolute path to this directory, for example:

```text
plugin_manager install_bundle target=/absolute/path/to/customized-ui
```

The installer links the package into the current profile and adds it to `dsh.profile.bundles`. Reload the Harness page after installation if the running client does not pick up the new bundle automatically.

To remove it, use the Plugin Manager's `remove_bundle` action with `@local/customized-ui`.

## Files

| File | Purpose |
| --- | --- |
| `index.js` | Host half of the bundle. Registers no Host service; exists so the bundle has a loadable Host row. |
| `client.js` | All rendering and styling: the browser module registered through `window.__ModuleLoader__.load`, including the frosted styles, sidebar identity, slot takeovers, and the jobs-chip rule. |
| `cordis.patch.yml` | Loader patch that inserts the `customized-ui` row into the profile. |
| `locale/en.json`, `locale/zh.json` | Display title and description used by the Plugin Manager and Settings. |
| `icon.svg` | Bundle icon. |

## How it works

The bundle is intentionally build-free: `client.js` is plain JavaScript and is loaded directly by the Harness client module loader.

- **Theme styles** are injected into `<head>` from `apply()` with `ctx.effect`, so unloading the plugin removes them.
- **Brand and account seats** are replaced through `ctx.slots.inject` / `ctx.slots.register` using the `sidebar.brand.mark`, `sidebar.brand.name`, and `settings.launcher` slots.
- **Settings header action** takes over the shipped `open-document` cell in the `settings.action` slot and renders nothing.
- **Account identity** is read from the signed-in account at runtime (`remote.account`); no personal name or avatar is stored in this repository.
- **Small DOM-level rules** (the `Tasks` label and the jobs-chip visibility) are pure CSS, so they do not interfere with React rendering.

## Customization notes

- Frosted styling is scoped by `SETTINGS_ROOT` in `client.js` (`[data-platform="darwin"]` plus the dark theme). Widen or narrow that selector to change which themes/platforms receive the glass treatment.
- The `Tasks` rename matches the English accessible label `Automation tasks`. If the UI language changes, update the selector in the `CSS` array.
- The sidebar identity uses the live account profile. To use a fixed identity instead, replace the `useAccountIdentity` result in `AccountLauncher`.

## License

No license is included in this repository. Add one before redistributing the plugin.
