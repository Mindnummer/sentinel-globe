# SENTINEL GLOBE v1.0

**Public-telemetry command center — single file, no build step, no server, no telemetry.**

One file (`index.html`) contains the entire app: a 3D-style rotating globe + 2D map, location
search, 11 live public-data adapters, a Watchdog integrity panel, a Truth Ledger, a rule-based
anomaly engine, Mock Mode (unmistakably labeled), and Integrity Mode.

---

## Why this is one HTML file instead of React + Node

The original spec suggested React/TypeScript/Vite + a Node backend. I deliberately chose the
simpler architecture, for reasons that fit how you actually deploy:

1. **GitHub Pages cannot run a backend.** A Node server would require paid hosting, keys
   management, and maintenance. Every data source used here supports direct browser access
   (CORS), so no proxy server is needed.
2. **No build step = no Node.js, no npm, no Vite, nothing to break.** Upload one file, done.
   This is the same architecture as Selah and SPECTRUM·SIGNAL, which you already deploy successfully.
3. **Auditable.** One readable file. Anyone can View Source and verify there is no tracking,
   no hidden calls, no secrets.

Trade-off stated honestly: API keys you enter (FIRMS, EIA) are stored in **your browser's
localStorage only** — they never leave your machine and are never in the GitHub repo. That is
acceptable for personal keys on a personal tool. It would NOT be acceptable for paid/secret
keys on a public product; that is what the Phase 2 proxy is for (see ROADMAP).

---

## What works LIVE with zero keys (out of the box)

| Layer | Source | Confidence label |
|---|---|---|
| Earthquakes (hour/day/week/30d) | USGS GeoJSON feeds | MEASURED |
| US Weather Alerts (point + national) | NWS api.weather.gov | OFFICIAL |
| Local conditions (temp/wind/precip) | Open-Meteo | MEASURED |
| Space weather: Kp index | NOAA SWPC | MEASURED |
| Space weather: solar wind (DSCOVR) | NOAA SWPC | MEASURED |
| Space weather: GOES X-ray / flare class | NOAA SWPC | MEASURED |
| Solar events (flares, CMEs, storms) | NASA DONKI (DEMO_KEY) | OFFICIAL |
| ISS live position | WhereTheISS.at | MEASURED |
| Aircraft near your location | OpenSky Network (anonymous, rate-limited) | MEASURED |
| Moon phase / illumination / day-night terminator | Computed locally | MODELED |
| Geocoding (ZIP / city / coords) | Zippopotam + Open-Meteo geocoder | OFFICIAL |

## What needs a free key (Settings ⚙ button in the app)

- **NASA FIRMS fires** — free MAP_KEY from https://firms.modaps.eosdis.nasa.gov/api/ (works without it in Mock Mode only, clearly labeled).
- **EIA-930 grid demand** — free key from https://www.eia.gov/opendata/register.php (ERCOT region pre-selected; TEX/CAL/MISO/PJM/etc. selectable).
- **NASA DONKI** — ships with `DEMO_KEY` (low rate limit); free upgrade at https://api.nasa.gov.

## What is honestly NOT included (and why)

- **Schumann resonance**: shown GRAY / experimental. There is currently **no reliable public
  keyless Schumann API**. The app says so instead of faking one. Adapter slot exists for Phase 2.
- **Satellite pass predictions (SGP4)**: needs an orbital propagation library; Phase 2.
  ISS *position* is live; *pass predictions* are not.
- **Radar imagery tiles, lightning, tides, flood gauges, volcano feeds**: Phase 2 (see ROADMAP.md).
- **Grid frequency / reserve margin / private topology**: not public; will never be claimed.

---

# HOW TO PUT THIS ON GITHUB — STEP BY STEP (assume nothing)

You already have the account **mindnummer** on github.com. These steps mirror how Selah was deployed.

### Part 1 — Create the repository
1. Go to **https://github.com** and sign in.
2. Click the **green "New"** button (left side), or go to https://github.com/new.
3. In **Repository name**, type exactly: `sentinel-globe` (all lowercase — capitalization
   mismatches have caused you Pages problems before; lowercase avoids the whole issue).
4. Leave it **Public**. Do NOT check any of the "initialize" boxes.
5. Click the green **Create repository** button.

### Part 2 — Upload the app
6. On the new empty repo page, click the link that says **"uploading an existing file"**.
7. Drag **`index.html`** (and this `README.md`, and the `docs` folder if you want) into the box.
   ⚠ The file must be named exactly `index.html` — all lowercase — or Pages will show 404.
8. Scroll down and click the green **Commit changes** button.

### Part 3 — Turn on GitHub Pages
9. Click the **Settings** tab (top of the repo, gear icon).
10. In the left sidebar, click **Pages**.
11. Under **Build and deployment → Source**, choose **Deploy from a branch**.
12. Under **Branch**, choose **main**, folder **/ (root)**, then click **Save**.
13. Wait 1–3 minutes. Refresh the page. A box appears at the top:
    **"Your site is live at https://mindnummer.github.io/sentinel-globe/"**
14. Click that link. Sentinel Globe is now running.

### Part 4 — First use
15. Type your ZIP code (e.g., `76234`) in the search box, press Enter.
16. Right panel fills with your Local Brief. Bottom tabs: **Alerts · Anomalies · Ledger · Watchdog**.
17. Click **⚙ Settings** to paste your free FIRMS / EIA keys (stored in your browser only).
18. Click **MOCK** in the header to see the sample-data demo — a large orange banner makes
    it impossible to confuse with live data. Click again to return to live.
19. Click **INTEGRITY** to hide anything that is mock, experimental, or low-confidence.

### Updating later
Edit → repo page → click `index.html` → pencil icon (✏) → paste new version → Commit changes.
Pages redeploys automatically in ~1 minute. **The GitHub copy is the single source of truth** —
don't keep divergent copies on other machines.

---

## Testing done before delivery
A headless smoke test (jsdom, Node) booted the full app with canned API responses and verified:
zero script errors; geocode → Local Brief for Decatur TX; anomaly engine produced 5 correctly-worded
findings; mock/integrity toggles; watchdog 14 checks; ledger writes; Kp/solar-wind/X-ray parsing;
quake and ISS rendering. Live-API behavior should still be eyeballed in a real browser after deploy —
the harness cannot test real network conditions, and I won't claim it can.

## Existing open-source projects worth knowing (your "save time" question)
I searched for a ready-made equivalent; nothing public combines these layers with an integrity
ledger, so the single file was built fresh. But these are proven building blocks for Phase 2+:
- **satellite.js** (github.com/shashwatak/satellite-js) — SGP4 propagation for real pass predictions.
- **CesiumJS** (cesium.com) — true 3D WebGL globe if you outgrow the canvas renderer.
- **MapLibre GL** — vector maps with globe projection, still no server needed.
- **NASA Open MCT** (github.com/nasa/openmct) — NASA's open-source mission-control framework;
  heavyweight, but the gold standard if Sentinel Globe ever becomes a multi-user product.

Soli Deo Gloria.
