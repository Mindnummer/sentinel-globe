# Data Source Registry — Sentinel Globe v10.2.0

Every adapter is instrumented in the Feed Status Bar, Watchdog, and Truth Ledger.

| Area | Primary source | Classification | Key | Important limitation |
|---|---|---:|---:|---|
| Weather alerts | National Weather Service API | OFFICIAL | No | US only; some alerts lack geometry; home and viewed-location alerts are fetched separately |
| Station weather | NWS/ASOS | MEASURED | No | Nearest station can be distant or temporarily unavailable |
| Nowcast/forecast | Open-Meteo | MODELED | No | Model-derived, not a thermometer at the selected point |
| Radar | NOAA NEXRAD composite via Iowa Environmental Mesonet | MEASURED processed mosaic | No | Reflectivity is not precipitation at ground; archive gaps can render blank |
| Recent lightning points | Weatherbit Current Lightning | MEASURED/provider-derived | Key; plan-dependent | Quota applies; source may be GLM or radar estimate; flash does not necessarily mean ground strike |
| Lightning visual cross-check | NOAA GOES-19 GLM Flash Extent Density | OFFICIAL satellite product | No | Total-lightning density imagery, not individual ground-strike classification |
| Earthquakes | USGS | MEASURED | No | Early magnitude/location may be revised |
| Thermal detections | NASA FIRMS VIIRS | MEASURED | Key | Heat anomaly does not prove wildfire; clouds hide detections |
| Kp, solar wind, IMF, X-ray | NOAA SWPC | MEASURED/operational estimate | No | L1 values are upstream; Kp may be revised |
| Solar notices | NASA DONKI | OFFICIAL analyst notice | DEMO_KEY/key | Notices are not raw telemetry; rate limits apply |
| ISS | WhereTheISS.at | MEASURED-derived | No | TLE-derived, kilometer-scale |
| Satellites/debris | CelesTrak + satellite.js | MODELED from measured orbit | No | Accuracy degrades with orbit age; display capped |
| Aircraft | OpenSky → adsb.fi → airplanes.live | MEASURED | Usually no | Receiver coverage/rate limits vary |
| Ships | AISStream | MEASURED | Key | Primarily coastal; transmitters may be disabled |
| Grid demand/interchange | EIA-930 | MEASURED values / MODELED map coordinates | Key | Hourly lag; not SCADA, reserves, or frequency |
| Power infrastructure | OSM/Overpass | Crowd-mapped public data | No | Incomplete mapping does not mean absence |
| Traffic | TomTom flow tiles | MEASURED aggregate | Key | Aggregate flow only; no individual vehicles |
| Counties | US Census | OFFICIAL static | No | Simplified, not legal boundaries |
| Faults | GEM Global Active Faults | Research compilation | No | Regional completeness varies; not prediction |
| Moon/terminator/projection/anomaly rules | Local computation | MODELED | No | Derived values remain labeled |
| Journal | User | USER / Tier 7 | No | Subjective and isolated from telemetry |

## Lightning interpretation law

1. “Flash” or “detection” is the default wording.
2. Sentinel does not convert total lightning into “ground strikes.”
3. Age, source, query radius, lookback, and distance remain visible.
4. Activity/range trends are observational comparisons, not arrival predictions.
5. Provider failure or account denial displays unavailable rather than synthetic data.
