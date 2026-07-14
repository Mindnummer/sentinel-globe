# Sentinel Globe — Truth-First Roadmap

## v10.2.0 — Weather Core delivered

- Focused WX mode with layer-state restoration
- Fluid radar timeline, scrubber, stepping, speed control, crossfade, and archive spans
- Optional recent point-lightning feed with age, radius, nearest distance, activity trend, and range trend
- Official NOAA GLM visual cross-check
- Weather desk reconciling measured station, modeled nowcast/forecast, and official alerts
- Independent home-alert fetch and corrected home notification scope
- Location-state clearing to prevent cross-location data contamination

## v10.2.x — hardening

1. Live-browser test across Chrome, Edge, Firefox, Android, and iPhone/Safari.
2. Add provider schema-contract tests and a visible response-shape failure reason.
3. Add radar missing-frame detection rather than relying only on blank-tile observation.
4. Add memory/network budget controls for weak phones.
5. Add keyboard and screen-reader labels for every Weather Core control.
6. Add a user-visible “last verified” timestamp for each weather card.

## v10.3 — Storm Intelligence

1. Storm-cell identification from defensible radar products, not visual guesswork.
2. Cell motion vectors and uncertainty cones.
3. Hail, wind, and rotation evidence shown separately from official warning language.
4. Arrival **ranges**, never false single-minute precision.
5. Spatial lightning trend using cell-relative motion, beyond the current local median-distance comparison.
6. NEXRAD station/product selection, including velocity where lawful browser access is stable.

## v10.4 — Family Watch Zones

- Multiple named locations with independent alert, lightning, wind, flood, and fire thresholds
- Quiet hours and escalation rules
- Deduplication across zones
- “What changed since I last checked?” evidence briefing
- Explicit offline/stale state

## Trusted backend boundary

A small user-controlled backend should eventually:

- Keep valuable provider credentials off the public browser
- Convert raw NOAA GLM/MRMS/NEXRAD products into efficient tiles/events
- Store durable history and replay with checksums and processing version
- Deliver background push notifications while the browser is closed
- Monitor provider schema changes
- Run inspectable transforms without inventing causes

## Later modules

Air quality/smoke, river/flood gauges, local storm reports, tropical systems, tsunami, volcano, drought, road conditions, power outages, offline app shell, modular TypeScript build, and storage on the user’s own Proxmox server.

## Standing integrity rules

No fabricated data. No unlabeled mock data. No certainty outside an official product. No silent source substitution. Every derived claim exposes inputs, age, uncertainty, and what could disprove it.
