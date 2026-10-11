# ADR 0001: Use modular architecture for the desktop client

## Status

Accepted.

## Context

The desktop client starts with one application and no implemented product
modules. Feature-Sliced Design layers and a workspace monorepo would add empty
directories and dependency rules before a second client or reusable package
exists.

## Decision

Use `src/app` for composition and `src/modules` for product areas. A module
owns its screen, local components, types, schemas, and use cases. Extract a
visual block or utility only after a second real use.

## Consequences

The source tree remains small during the first vertical slices. A future second
client may justify a workspace with shared UI and API packages, but that is not
part of the current desktop client.
