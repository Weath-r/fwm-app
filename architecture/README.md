# Architecture reference

Living documentation of the fwm-app architecture, meant to be consulted before making
structural decisions. Update it when the shape of the system changes.

| File | Purpose |
|---|---|
| [`current-architecture.md`](./current-architecture.md) | As-is: system context, frontend layering, caching rules, and the detailed `weather_data` flow with its known inefficiencies |
| [`weather-data-websocket.md`](./weather-data-websocket.md) | Target design: `weather_data` over Directus Realtime — topology, socket lifecycle, per-page impact, Directus prerequisites, migration order |
| [`architecture.html`](./architecture.html) | Both documents in one page with rendered, pan/zoom-able diagrams. Fully self-contained (~2.5 MB, Mermaid inlined) — open it directly in a browser, works offline |

Notes:

- The markdown diagrams are Mermaid fences — GitHub renders them natively.
- `architecture.html` embeds the same diagram sources; when editing a diagram, update it in both
  the `.md` file and the `DIAGRAMS` object at the bottom of the HTML.
- Snapshot date of the current content: **2026-07-18** (branch `development`, v1.18.x).
