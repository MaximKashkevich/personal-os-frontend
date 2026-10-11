# Personal OS Desktop

Windows desktop client for Personal OS, built with Tauri 2, React, TypeScript,
Vite, Tailwind CSS v4, and shadcn/ui conventions. This repository currently
contains a native application shell and frontend engineering foundation.

## Requirements

- [Bun](https://bun.sh/)
- [Rust and Cargo](https://www.rust-lang.org/tools/install)
- [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
  with the Desktop development with C++ workload

## Commands

```bash
bun install
bun run dev
bun run tauri:dev
bun run build
bun run tauri:build
bun run lint
bun run format
bun run format:check
bun run typecheck
bun run check
```

## Current scope

The application shell supports light, dark, and system themes with a small set
of accent tokens. Local protected storage, encryption, synchronization, backend
integration, and domain features are intentionally not implemented yet. No user
data is stored or transmitted by this baseline.
