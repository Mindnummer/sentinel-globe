# Sentinel Globe — Truth-First Roadmap

## Release 10.1.2 — stabilization delivered

- Corrected EIA power-flow geometry and grid-anomaly navigation coordinates
- Restored saved basemap, orbit-speed, and performance preferences
- Validated saved/imported coordinates and basemap values
- Corrected modeled-versus-measured weather labeling
- Removed duplicate IDs, duplicate help key behavior, invalid nested buttons, dead Polar help, and invalid Watchdog states
- Removed obsolete v2 boot metadata and misleading search instructions
- Added proper install icons, `.nojekyll`, current documentation, a static audit, deployment checklist, and release notes

## Next release — Weather Core

Highest-value work before adding more unrelated telemetry:

1. **Unified weather timeline** — one scrubber controlling radar, lightning, alerts, observations, and forecast context.
2. **Lightning layer** — flash locations colored by age; nearest flash; counts inside configurable radii/time windows; approaching/retreating trend; source age and coverage always visible.
3. **Fluid radar engine** — frame preloading, cancellation, memory budget, missing-frame detection, smooth interpolation only when explicitly labeled, and station/product selection where lawful data supports it.
4. **Storm-cell intelligence** — identify and track cells, motion vector, hail/wind/rotation evidence, uncertainty cone, and estimated arrival range rather than a false precise time.
5. **Family Watch Zones** — multiple named locations, per-hazard thresholds, quiet hours, escalation rules, and deduplication.
6. **“What changed?” briefing** — compare the current evidence state with the last verified snapshot.
7. **Weather-source reconciliation** — measured station vs model nowcast vs official forecast, with disagreement highlighted instead of averaged away.

## Backend boundary

The weather system should gain a small trusted backend when lightning and historical intelligence are introduced. Its jobs:

- Convert large/raw official products into efficient map tiles or vector events
- Keep provider keys and tokens off public clients
- Maintain durable history and replay
- Deduplicate alerts and deliver background push notifications
- Record immutable provenance, retrieval time, processing version, and checksums

The browser remains the presentation and investigation client. The backend must not invent conclusions; it stores evidence and runs inspectable transforms.

## Later intelligence modules

- Air quality, smoke transport, flood/river gauges, storm reports, tsunami, volcano, drought, and tropical products
- Offline app shell and last-known-state display with unmistakable stale/offline labeling
- Automated cross-browser tests and schema-contract tests
- Modular source files or TypeScript build once feature velocity makes the single-file architecture a liability
- Durable history on the user’s own Proxmox/server, with exportable open formats

## Standing integrity rules

No faked data. No unlabeled mock data. No certainty language outside an official product. No silent source substitution. No private-infrastructure claims. No scanning or probing. Every derived finding must expose its inputs, age, confidence, and what would disprove it.
