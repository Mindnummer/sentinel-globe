# Sentinel Globe v2 — Upgrade Instructions (assume nothing)

v2 replaces v1 completely. It is a different map engine, so the repo gets **5 files** now
instead of 1. Everything still runs on GitHub Pages with no server and no build step.

## What v2 gives you that v1 could not

- **Real zoom** — from spinning globe all the way down to the streets of Decatur (zoom 19).
- **4 basemaps** — Street (city/town names), Satellite (imagery + label overlay), Terrain, Dark.
- **County lines & names** — every US county drawn and labeled as you zoom in (Wise County included), from official US Census geometry vendored right in your repo.
- **Live radar loop** — NEXRAD composite, replaying the last 50 minutes so you see storm motion. Honest note: NEXRAD physically scans every 4–6 minutes; no public source on Earth is faster, and anything claiming to be is interpolating.
- **ALL balancing authorities at once** — no more picking one region. Every US BA (~65) fetched in a single EIA call; circle size = demand, color = demand vs. its own forecast.
- **Power plants / substations / transmission lines** — zoom to your area, press ⚡ Scan (OpenStreetMap public data).
- **Aircraft layer** — with the honest limitation printed on it: OpenSky throttles anonymous users hard; if it shows yellow in the Watchdog, that's them, not the app.
- **AMBIENT mode** — slow, beautiful auto-rotation for leaving on a screen all day.
- **🔔 Notifications** — browser alerts for your home zone: new NWS alerts, M4.5+ quakes within ~300 mi, Kp 6+ storms, fire detections within ~50 mi. Deduplicated.
- **ⓘ on everything** — every layer, panel, tab, and mode has an info button; the **?** button in the header opens the full index. "Balancing authority" is explained in plain English.
- Everything from v1 carries over: Truth Ledger, Watchdog, Mock mode (banner-labeled), Integrity mode, Local Brief, anomaly engine, Decatur as default home.

## The 5 files

| File | What it is |
|---|---|
| `index.html` | The entire app |
| `maplibre-gl.js` | The map engine (MapLibre, open source, pinned v5.24, vendored so no CDN can ever break or spy on you) |
| `maplibre-gl.css` | The map engine's styles |
| `counties.geojson` | US county boundaries (US Census, public domain) |
| `MAPLIBRE-LICENSE.txt` | MapLibre's license (required to ship with it) |

## Upgrade steps — click by click

1. Go to **github.com/mindnummer/sentinel-globe** and sign in.
2. Click **Add file → Upload files** (top right of the file list).
3. Drag **all 5 files** into the box at once.
4. GitHub will say `index.html` already exists — that is correct; it replaces the old one.
5. Click the green **Commit changes** button.
6. Wait 1–2 minutes, then open **https://mindnummer.github.io/sentinel-globe/** and press
   **Ctrl+Shift+R** (hard refresh — otherwise your browser may show the cached old version).

⚠ File names must stay exactly as they are, all lowercase where shown. Renaming any of them breaks the app.

## First 5 minutes with v2

1. Click **AMBIENT** — watch the globe rotate. Click the map to take control back.
2. Type `76234`, press GO — flies to Decatur, Local Brief fills in.
3. Scroll to zoom all the way in. County lines appear ~zoom 5, county names ~zoom 7, streets by ~15.
4. Try **Satellite** basemap — imagery with city labels overlaid.
5. Turn on the **Radar Loop** (▶ Play) — last 50 minutes of storm motion.
6. Press **⚡ Scan** while zoomed to Wise County — power plants, substations, lines from OSM.
7. Click **🔔** and allow notifications — your home watch zone is now armed.
8. Click **?** in the header — the full "what am I looking at" index.
9. Your FIRMS + EIA keys: they were saved in your browser for the old page, and v2 uses a fresh
   storage namespace — so open **⚙ Settings and paste them in once more**. One minute, one time.

## Honest limits that did not change

- EIA grid data is **hourly with 1–2 h lag** — that is the finest public grid telemetry that exists.
  The true real-time stream is operator-internal SCADA and is not public, period.
- Notifications only work while the tab is open (service-worker version is on the roadmap).
- OpenSky anonymous aircraft access is unreliable by their policy, not our bug.
- Schumann resonance: still no reliable public API exists; still shown gray rather than faked.
