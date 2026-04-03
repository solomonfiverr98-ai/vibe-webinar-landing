# Project Constitution: gemini.md

## Data Schemas

### Supabase View: `registrations`
```json
{
  "table": "registrations",
  "columns": {
    "id": "uuid (primary key)",
    "name": "text",
    "email": "text",
    "source": "text",
    "registered_at": "timestamp with time zone",
    "status": "text"
  },
  "rls": "Anonymous inserts allowed"
}
```

## Behavioral Rules
1. **Deterministic Execution:** Prioritize reliability and self-healing.
2. **Data-First:** Define schemas before building tools.
3. **Layered Isolation:** Separation of Architecture (SOPs), Navigation (Reasoning), and Tools (Next.js Server Actions).
4. **No Guessing:** Never guess at business logic; ask for clarification.
5. **Mobile-First Perfection:** Target audience is mobile; ensure impeccable responsive design.
6. **Dark Mode Only:** Background #0A0A0A, zero light mode.

## Architectural Invariants
- Layer 1: `architecture/` (Markdown SOPs)
- Layer 2: Reasoning/Navigation logic
- Layer 3: `app/` (Next.js App Router + Server Actions)
- Temporary files: `.tmp/`

## Maintenance Log
*TBD during Phase 5.*
