# Sentinel Globe v10.2.0 — Weather Core

**Source-transparent public telemetry and weather situational-awareness command center.**

Sentinel Globe is a static GitHub Pages application combining MapLibre globe/flat views, a custom north-polar renderer, public weather and earth-data feeds, grid telemetry, aircraft/ship/satellite layers, a Watchdog, Truth Ledger, and deterministic anomaly rules.

## Weather Core in v10.2.0

Press **☁ WX** to enter a focused weather desk. Sentinel temporarily preserves and hides unrelated layers, then restores the prior layer state when Weather Core closes.

- Fluid NEXRAD timeline with scrubbing, step controls, playback speed, opacity, crossfades, and archive spans
- Dedicated Weather tab combining model nowcast, measured NWS station reading, official NWS alerts, 12-hour forecast, and recent lightning
- Optional recent lightning locations through the Weatherbit Current Lightning API
- Lightning age colors, exact query-radius ring, nearest distance, activity trend, and cautious closer/farther distance trend
- Official NOAA GOES-19 GLM Flash Extent Density viewer as a no-key visual cross-check
- Home NWS alerts fetched independently from whichever place is currently being viewed
- Local lightning watch condition and optional notification when the keyed lightning query is focused on home
- Immediate clearing of old location-scoped weather data when navigating, preventing the prior location’s readings from appearing inside the new location’s radius

**Lightning integrity:** satellite/provider flash locations may include in-cloud lightning. Sentinel does not label every point a cloud-to-ground strike.

## Other current capabilities

- Globe, Mercator flat-world, and north-polar azimuthal views
- Street, satellite, terrain, and dark basemaps
- USGS earthquakes, NASA FIRMS thermal detections, NOAA SWPC space weather, NASA DONKI, ISS/SGP4 tracking
- Optional aircraft, AIS ships, satellites/debris, TomTom traffic, EIA grid demand/interchange, OSM power infrastructure, counties, and faults
- Feed-status bar, Watchdog, Truth Ledger, source registry, anomaly engine, bookmarks, presets, backups, journal, Mock and Integrity modes

## Deployment bundle

The repository root must include:

- `index.html`
- `maplibre-gl.js`, `maplibre-gl.css`, `MAPLIBRE-LICENSE.txt`
- `satellite.min.js`
- `counties.geojson`, `faults.geojson`, `world.geojson`
- `manifest.webmanifest`, both Sentinel icons, and `.nojekyll`
- `tests/`, documentation, and `archive/`

## Confidence vocabulary

- **OFFICIAL** — official alert or operational product
- **MEASURED** — instrument or observation data
- **MODELED** — forecast, propagation, geometry, or computed inference
- **EXPERIMENTAL** — useful but not yet reliable enough for ordinary operational use
- **MOCK** — sample data, visibly labeled
- **UNAVAILABLE** — no trustworthy value obtained

## Deploy

1. Use **Settings → Export FULL backup** in the live app.
2. Upload every file and folder from the v10.2.0 release into the GitHub repository root, replacing matching files.
3. Commit, wait for GitHub Pages, then press **Ctrl+Shift+R** once.
4. Complete `DEPLOYMENT_CHECKLIST.md`.

Do not commit API keys. Browser keys are stored in `localStorage`, are not encrypted, and are sent only to the provider used by that adapter. Weatherbit Current Lightning access is plan-dependent and provider quota applies.

## Verification

```bash
python tests/static_audit.py
node tests/mock_runtime_smoke.js
```

The static audit validates JavaScript syntax, unique IDs, help references, local assets, manifest, and GeoJSON structure. A normal-browser deployment test remains necessary for external provider availability, CORS, account entitlement, and live response schemas.

## Architecture direction

v10.2.0 proves the Weather Core interaction model inside the static app. A trusted backend remains the correct boundary for secret-safe paid keys, raw MRMS/GLM conversion, durable replay, multi-zone background alerts, and automated schema monitoring. See `ROADMAP.md`.
