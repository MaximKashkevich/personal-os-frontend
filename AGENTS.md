# Personal OS Desktop — project context

## Scope

This repository is the Windows desktop client for Personal OS. It uses Tauri 2,
React, TypeScript, and Vite. The client should stay useful offline and should
not be coupled to the current NestJS backend during the initial UI work.

## Product intent

Personal OS is a private, single-user record of life, not a productivity
scoring system. It helps the owner capture, review, and plan while keeping
decisions with the owner.

- Inbox accepts varied raw captures: notes, ideas, voice, photos, documents,
  and links.
- Planning is a focused selection of tasks for day, week, month, or later.
- AI is optional and advisory. It can suggest formatting or classification but
  must never silently change source data or make decisions.

## Data and privacy rules

- The future encrypted local SQLite vault is the source of truth; the server,
  when added, is only transport and sync support.
- Preserve raw capture exactly. Formatted or AI-derived content is a separate,
  labelled version.
- Never put secrets, personal records, financial content, recovery material,
  or plaintext vault data into source code, logs, URLs, analytics, or commits.
- Before adding sync, encryption, storage, backup, or retention behavior,
  document the trade-off and verify recovery on a clean environment.
- Finance is an immutable ledger: corrections are adjustment transactions, not
  silent balance edits.

## Frontend direction

- Build a polished, minimal Windows desktop application with iOS-inspired
  clarity. Support dark and light themes.
- Use Tailwind CSS and CSS variables for design tokens. Use shadcn/ui as
  editable primitives and Radix UI for behavior. Build distinctive Inbox and
  planning views as custom components.
- Avoid generic dashboard clutter, flashy gradients, artificial scores, and
  speculative abstractions.
- Prefer concise, readable, linear code. Add a library only for a concrete
  screen or flow; do not add backend, cloud, queue, or AI infrastructure to
  this client "just in case".

## Implementation boundaries

- Keep UI, application use cases, domain types, and Tauri/Rust integration
  separate when a feature becomes non-trivial.
- Do not call the backend directly from components. Introduce a small client
  adapter only when a real server-supported use case exists.
- Keep user-visible dates and times timezone-aware; reminders need an exact
  date and time.
- Start with a working vertical slice, such as raw Inbox capture, before
  adding broad navigation or multiple domains.

## Verification

- Run `bun run build` after TypeScript/frontend changes.
- Run `bun run tauri dev` for manual desktop verification when the change
  affects Tauri integration or visible behavior.
- Do not claim storage, sync, encryption, or recovery works without testing
  the real scenario.
