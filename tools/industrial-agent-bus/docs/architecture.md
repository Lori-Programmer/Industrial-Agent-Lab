# Industrial Agent Bus Architecture

## Planned Layers

- Message schema: who says what, when, and with which context.
- State event schema: industrial scene state changes.
- Tool call schema: allowed tool actions and constraints.
- Audit trail: non-sensitive event trace for debugging.

## Design Principle

The bus should carry engineering state and tool intent, not secrets or personal data.
