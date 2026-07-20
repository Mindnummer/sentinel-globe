# Sentinel Globe v10.1.2

**Source-transparent public telemetry and weather situational-awareness command center.**

Sentinel Globe is a static browser application built for GitHub Pages. It combines a MapLibre globe/flat map, a custom north-polar renderer, public weather and earth-data feeds, grid telemetry, aircraft/ship/satellite layers, a Watchdog, a Truth Ledger, and deterministic anomaly rules.

## Active deployment bundle

The live app requires these files in the repository root:

- `index.html` — application and interface
- `maplibre-gl.js`, `maplibre-gl.css`, `MAPLIBRE-LICENSE.txt` — vendored MapLibre GL
- `satellite.min.js` — vendored SGP4 propagation library
- `counties.geojson`, `faults.geojson`, `world.geojson` — local geometry datasets
- `manifest.webmanifest`, `sentinel-icon-192.png`, `sentinel-icon-512.png` — install metadata and icons
- `.nojekyll` — prevents GitHub Pages from processing the static bundle through Jekyll

Historical builds are retained under `archive/`; they are not loaded by the live application.

## What v10.1.2 currently does

- Globe, Mercator flat-world, and north-polar azimuthal views
- Street, satellite, terrain, and dark basemaps
- NEXRAD composite radar loop with archive spans
- NWS alerts and measured NWS station observations
- Open-Meteo model nowcast, hourly forecast, and seven-day forecast
- USGS earthquakes and regional 30-day enrichment
- NASA FIRMS thermal detections with a user-supplied key
- NOAA SWPC solar wind, IMF Bz/Bt, Kp, and GOES X-ray feeds
- NASA DONKI notices
- ISS position, ground track, and smooth SGP4 follow mode
- Optional aircraft, AIS ship, satellite/debris, traffic, grid-demand, grid-flow, power-infrastructure, county, and fault layers
- Watchdog, feed-status bar, Truth Ledger, source registry, anomaly engine, bookmarks, presets, backups, and journal

## Confidence vocabulary

- **OFFICIAL** — an official alert or published operational product
- **MEASURED** — instrument or observation data
- **MODELED** — forecast, propagation, geometry, or computed inference
- **EXPERIMENTAL** — useful but not yet reliable enough for ordinary operational use
- **MOCK** — sample data, always visibly labeled
- **UNAVAILABLE** — no trustworthy value was obtained

Open-Meteo “current” values are correctly labeled **MODELED**. NWS station observations are the measured weather row when available.

## Deploy to GitHub Pages

1. Back up the current repository.
2. Upload every file and folder from this release ZIP to the repository root, replacing matching files.
3. In GitHub, open **Settings → Pages**.
4. Select **Deploy from a branch**, branch **main**, folder **/(root)**.
5. Wait for the Pages deployment to finish, then open the site and press **Ctrl+Shift+R** once.
6. Follow `DEPLOYMENT_CHECKLIST.md` before treating the release as verified.

Do not upload API keys into GitHub. Keys entered through Settings are stored in that browser’s `localStorage` and transmitted only to the provider whose adapter uses them. Browser storage is not encrypted; do not use valuable secret credentials here.

## Verification

Run the dependency-free static audit from the repository root:

```bash
python tests/static_audit.py
```

Then perform the real-browser checklist. Static analysis cannot prove that every external provider is reachable, correctly handling CORS, or returning the same schema today.

## Architecture direction

The static architecture remains appropriate for a personal, transparent dashboard. The planned lightning, storm-cell, historical replay, and background-alert system will require a small trusted backend because raw lightning/radar products need conversion, durable history, and secret-safe provider access. See `ROADMAP.md`.
