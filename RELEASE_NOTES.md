# Release Notes — v10.2.0 Weather Core

## Weather operating mode

- Added **☁ WX** mode that focuses the interface on radar, lightning, alerts, and county context.
- Preserves the user’s previous layer state and restores it when Weather Core closes.
- Added a dedicated Weather tab with measured station observation, model nowcast, official alerts, 12-hour forecast, and lightning intelligence.

## Radar engine

- Added timeline scrubbing, previous/next frame controls, three playback speeds, and clearer pause/play state.
- Added smoother crossfades and next-frame priming.
- Improved archive-span handling and explicit experimental labeling for archive gaps.
- Added an extended hold on the latest frame so the loop is easier to read.

## Lightning

- Added optional Weatherbit Current Lightning integration with configurable 25/50/75 km radius and 15/30/45 minute lookback.
- Added age-colored map points, query-radius ring, popup provenance, nearest distance, returned-count metrics, recent activity trend, and cautious closer/farther distance trend.
- Added NOAA GOES-19 GLM Flash Extent Density as an official no-key cross-check.
- Added lightning to Polar view, Mock mode, Watchdog/feed status, Truth Ledger, source registry, local brief, anomaly engine, and notifications.
- Explicitly distinguishes a lightning flash/detection from a proven cloud-to-ground strike.

## Home-watch correctness

- NWS home alerts are now fetched independently from the currently viewed location.
- Duplicate current/home/national alerts merge their scope flags rather than silently losing the home designation.
- Navigation immediately clears old location-scoped weather, station, lightning, fire, and local-alert state before fetching the new location.

## Forecast improvements

- Expanded hourly model data to include weather code, precipitation amount, wind, and gusts.
- Set precipitation units explicitly to inches.

## Verification status

- Node JavaScript syntax check: passed.
- Dependency-free static audit: passed.
- Unique static HTML IDs: passed.
- Nested-button check: passed.
- Manifest and all three GeoJSON files: passed.
- Local asset and help-reference checks: passed.
- Dependency-free mocked runtime smoke test: passed through top-level boot, map-load callbacks, Weather Core entry/exit, radar stepping, and Mock mode.

This execution environment blocks Chromium from opening even localhost/file URLs, so the final live network/browser test must be performed after GitHub Pages deployment with `DEPLOYMENT_CHECKLIST.md`.
