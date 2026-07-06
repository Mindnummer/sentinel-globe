# Sentinel Globe — Roadmap

## Phase 1 (DELIVERED — v1.0, single file)
Globe/2D map · location search · 11 live adapters · moon/terminator · Local Brief ·
rule-based anomaly engine with honest wording · Watchdog (14 checks) · Truth Ledger ·
Mock Mode (banner-labeled) · Integrity Mode · localStorage snapshots + "What changed" ·
settings for free keys (browser-local only).

## Phase 2 — deeper data, still no server required
Ordered by value-per-effort:
1. **SGP4 pass predictions** — add satellite.js (single script include keeps the no-build rule);
   CelesTrak GP data; ISS/Starlink/NOAA-sat passes with "TLE age" and propagation-confidence labels.
2. **NEXRAD radar overlay** — Iowa State Mesonet public tile service (no key) drawn on the 2D map.
3. **Air quality** — AirNow (free key) or Open-Meteo air-quality endpoint (no key).
4. **NOAA storm reports, tsunami (tsunami.gov), volcano (USGS VNS)** feeds.
5. **River/flood gauges** — USGS Water Services (no key).
6. **Watch Zones** — named saved locations with per-zone thresholds and mute rules (localStorage).
7. **Richer history** — IndexedDB instead of localStorage; 30-day replay slider.
8. **Muted Ledger + rule builder** — "only tell me if it matters" rules, inspectable, never silent deletion.
9. **Schumann adapter** — manual-entry panel + adapter slot for any station that publishes data;
   stays EXPERIMENTAL-labeled; no medical/spiritual/prediction claims, ever.

## Phase 3 — the Adaptive Visualization + Investigation Workspace (second spec document)
This is genuinely a larger product and would outgrow one file. Honest recommendation:
1. Move to **MapLibre GL or CesiumJS** for a true WebGL globe with layer compositing.
2. **Dashboard grid engine** (drag/resize/save presets: North Texas Watch, Grid+Weather,
   TV Wall, Investigation Mode, etc.) — golden-layout or gridstack.js are proven OSS options.
3. **Investigation Mode + Evidence Ledger** — historical queries need real storage:
   a small always-on collector (Raspberry Pi or your Proxmox box) writing to
   **PostgreSQL + TimescaleDB + PostGIS**, exactly as the spec suggested. Browser-only apps
   cannot see the past before you opened them; a collector can. This is the single biggest
   unlock for "what happened last week in New York" questions.
4. **Sentinel Assistant** — command parser first (deterministic: mute/filter/layout/replay verbs),
   optional LLM layer later, hard-bound to the Evidence Ledger so it cannot invent facts.
5. **Correlation matrix / event-chain views** — labeled correlation-only, built on the
   TimescaleDB history.

## Standing integrity rules (all phases)
No faked data · no unlabeled mock · no certainty language outside official alerts ·
no private-infrastructure claims · no scanning/probing capability · every alert traceable
in the ledger · "what would increase confidence" attached to every hypothesis.
