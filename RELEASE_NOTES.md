# Release Notes — v10.1.2

## Correctness fixes

- Fixed invalid EIA interchange geometry caused by treating coordinate arrays as objects.
- Fixed grid anomaly cards that attempted to navigate to undefined coordinates.
- Labeled Open-Meteo nowcast/forecast as MODELED and NWS station readings as MEASURED.
- Rejected impossible raw and imported latitude/longitude values.
- Added safe fallback for corrupted/unknown basemap values.
- Hardened backup import size and field validation.

## Interface and persistence fixes

- Saved basemap, orbit speed, and performance mode now restore on reload.
- Fixed the Views/Polar help button.
- Removed invalid nested Follow ISS button markup.
- Replaced unsupported Watchdog `gray` state with `off`.
- Removed redundant Follow ISS drag listener and noisy false release records.
- Removed the nonfunctional “press GO again” instruction.
- Added `noopener` to the static attribution link.

## Deployment and documentation

- Replaced obsolete v1/v2 documentation with v10.1.2 documentation.
- Added proper 192px and 512px application icons.
- Added `.nojekyll`, a dependency-free static audit, and a deployment checklist.
- Preserved older HTML builds under `archive/`.

## Verification status

- JavaScript syntax: passed with Node `--check`.
- Manifest JSON: passed.
- GeoJSON parsing: passed for counties, faults, and world datasets.
- Duplicate IDs: none.
- Nested buttons: none.
- Static help references: complete.
- Local referenced assets: present.

A live browser/network smoke test is still required after deployment because this execution environment blocks browser access to local and external sites and cannot validate provider CORS or live schema responses.
