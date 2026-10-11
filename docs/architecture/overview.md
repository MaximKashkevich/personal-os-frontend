# Architecture overview

Personal OS Desktop is a modular Tauri application, not a Feature-Sliced
Design project.

## Source layout

```text
src/
├── app/          Application bootstrap, providers, and composition
├── modules/      Product areas such as Inbox and Planning
├── components/   Editable UI primitives and genuinely shared visual blocks
├── lib/          Small, framework-agnostic utilities
├── styles/       Design tokens and global styles
└── assets/       Static application assets
```

`app` may compose modules. A module can use `components`, `lib`, and `styles`.
Shared code is extracted only after a second concrete use. Modules never import
from one another by default; shared behaviour must have a named owner.

## Theme foundation

`ThemeProvider` owns the UI-only preferences `system`, `light`, and `dark`,
plus a small accent selection. It writes semantic token selectors to the root
HTML element and stores only those preferences in `localStorage`.

No personal records, authentication tokens, or vault data are stored there.

## Future boundaries

When needed, `platform/` will isolate Tauri commands, protected local storage,
and synchronization adapters from React components. API code generated from an
approved OpenAPI contract will live in `generated/` and must not be edited by
hand.
