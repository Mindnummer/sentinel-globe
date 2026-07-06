# Data Source Registry — Sentinel Globe v1.0

Every adapter in the app logs to the Truth Ledger with: source, URL, fetch time, status,
confidence class, and limitations. This file is the human-readable registry.

Confidence classes used throughout the app:
**OFFICIAL** (government alert product) · **MEASURED** (instrument data) ·
**MODELED** (computed/forecast) · **EXPERIMENTAL** · **MOCK** (sample, never shown unlabeled).

| ID | Source | Endpoint | Key? | Refresh | Known limitations |
|---|---|---|---|---|---|
| usgs | USGS Earthquake Hazards | earthquake.usgs.gov/earthquakes/feed/v1.0/summary/*.geojson | No | 5 min | Feed latency minutes–hours for small events; magnitudes revised after review |
| nws_point | National Weather Service | api.weather.gov/alerts/active?point=lat,lon | No | 3 min | US only; some alerts have no polygon geometry; occasional 503s (watchdog catches) |
| meteo | Open-Meteo | api.open-meteo.com/v1/forecast | No | 10 min | Model-derived current conditions, not a physical station reading |
| kp | NOAA SWPC | services.swpc.noaa.gov/json/planetary_k_index_1m.json | No | 5 min | Estimated 1-min Kp; definitive Kp is published later |
| wind | NOAA SWPC (DSCOVR) | services.swpc.noaa.gov/products/solar-wind/plasma-1-day.json | No | 5 min | L1 point measurement — ~15–60 min upstream of Earth impact |
| xray | NOAA SWPC (GOES) | services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json | No | 5 min | Primary satellite only; eclipse gaps possible |
| donki | NASA DONKI | api.nasa.gov/DONKI/notifications | DEMO_KEY ships; free upgrade | 30 min | DEMO_KEY: 30 req/hr limit; analyst-issued notices, not raw telemetry |
| iss | WhereTheISS.at | api.wheretheiss.at/v1/satellites/25544 | No | 65 s | Third-party TLE propagation; ~km-scale accuracy; rate limit ~1/sec |
| opensky | OpenSky Network | opensky-network.org/api/states/all (bbox) | No (anon) | 60 s, on-demand | Anonymous tier heavily rate-limited; coverage depends on volunteer receivers; not all aircraft broadcast ADS-B |
| firms | NASA FIRMS | firms.modaps.eosdis.nasa.gov/api/area/csv/KEY/VIIRS_SNPP_NRT/... | Free MAP_KEY | 15 min | Detections are thermal anomalies, not confirmed fires; 3–6 hr satellite revisit; cloud obscuration |
| eia | EIA-930 Hourly Grid Monitor | api.eia.gov/v2/electricity/rto/region-data | Free key | 15 min | Hourly, ~1–2 hr publication lag; demand/forecast only — no frequency, reserves, or topology (not public) |
| geocode | Zippopotam.us + Open-Meteo geocoder | api.zippopotam.us / geocoding-api.open-meteo.com | No | on search | ZIP centroid, not street-level |
| moon/terminator | computed locally | — | No | continuous | ±minutes accuracy; equation of time omitted; labeled MODELED |
| schumann | (none available) | — | — | — | GRAY / not configured. No reliable public keyless API exists; the app states this rather than faking data |

## Terms-of-service posture
- All sources above permit browser access for personal/situational-awareness use.
- OpenSky anonymous tier is used within published limits, fetched only on demand for a small bbox.
- No scraping of pages that prohibit it; no ADS-B Exchange (terms restrict redistribution).
- Attribution is displayed in-app (Sources & Integrity panel) for every source, including
  Natural Earth (public domain) for the coastline.
