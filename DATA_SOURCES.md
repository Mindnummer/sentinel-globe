# Data Source Registry — Sentinel Globe v10.1.2

Every fetch attempt is instrumented in the in-app Feed Status Bar, Watchdog, and Truth Ledger. This document describes the current source classes; the live provider response remains the final authority for availability and schema.

| Area | Primary source | Classification | Key | Important limitation |
|---|---|---:|---:|---|
| Earthquakes | USGS earthquake feeds/FDSN | MEASURED | No | Early magnitudes and locations may be revised |
| Weather alerts | National Weather Service API | OFFICIAL | No | US only; some alerts lack polygon geometry |
| Station weather | NWS/ASOS observation stations | MEASURED | No | Station may be distant or temporarily unavailable |
| Nowcast/forecast | Open-Meteo | MODELED | No | Model-derived, not a physical local instrument |
| Radar | NOAA NEXRAD composite via Iowa Environmental Mesonet tiles | MEASURED/processed mosaic | No | Composite reflectivity is not raw radar-volume data; archive gaps occur |
| Thermal detections | NASA FIRMS VIIRS | MEASURED | Free key | Heat anomaly does not prove an active wildfire; clouds hide detections |
| Kp, solar wind, IMF, X-ray | NOAA SWPC | MEASURED/operational estimate | No | L1 solar-wind data reaches Earth later; Kp may be revised |
| Solar-event notices | NASA DONKI | OFFICIAL analyst notice | DEMO_KEY/free key | Notices are not raw telemetry; rate limits apply |
| ISS position | WhereTheISS.at | MEASURED-derived position | No | TLE-derived, kilometer-scale accuracy |
| Satellite/debris positions | CelesTrak orbits + satellite.js SGP4 | MODELED from measured orbit | No | Accuracy degrades as orbit elements age; display is capped for performance |
| Aircraft | OpenSky, with adsb.fi and airplanes.live fallbacks | MEASURED | Usually no | Receiver coverage and rate limits vary; some aircraft do not broadcast |
| Ship positions | AISStream | MEASURED | Free key | Primarily terrestrial/coastal coverage; transmitters can be disabled |
| Grid demand/forecast and interchange | EIA-930 | MEASURED values / MODELED map positions | Free key | Hourly data with publication lag; not SCADA, reserves, or frequency |
| Power infrastructure | OpenStreetMap via Overpass | Crowd-mapped public data | No | Incomplete mapping does not mean absence |
| Road traffic | TomTom flow tiles | MEASURED aggregate | Free key | Aggregate traffic flow, never individual private vehicles |
| County geometry | US Census cartographic boundaries | OFFICIAL static | No | Simplified; not a legal property-boundary product |
| Fault geometry | GEM Global Active Faults compilation | MEASURED research compilation | No | Regional completeness varies; not an earthquake prediction |
| Basemaps | OSM, Esri imagery, OpenTopoMap, CARTO | Mixed mapped imagery | No | Satellite imagery is not live |
| Moon, terminator, projection, anomaly rules | Local computation | MODELED | No | Approximation/inference is labeled and must not be treated as observation |
| Journal | User-entered local notes | USER / Tier 7 | No | Subjective and deliberately isolated from telemetry |

## Standing source rules

1. A failed feed shows unavailable/degraded rather than silently substituting a fabricated value.
2. Mock data is never mixed invisibly with live data.
3. Forecasts and computed positions are not labeled measured.
4. Official warnings remain distinct from local anomaly rules.
5. Every hypothesis states what would increase confidence.
