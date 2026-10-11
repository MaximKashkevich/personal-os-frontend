# ADR 0002: Keep theme preferences as UI-only local settings

## Status

Accepted.

## Context

The desktop shell needs light, dark, and system modes plus a small accent
palette. Protected local storage is not implemented yet.

## Decision

Store only the selected theme mode and accent in `localStorage`. Apply semantic
CSS variables through root `data-theme` and `data-accent` attributes.

## Consequences

Theme preferences remain independent from future vault design. Personal
records, credentials, tokens, and sync settings must not be stored in this
mechanism.
