# Sentinel Globe v10.1.2 — Deployment Checklist

Complete this in a normal desktop browser after GitHub Pages finishes deploying.

## Identity and local assets

- [ ] Header shows `v10.1.2 · PUBLIC TELEMETRY`
- [ ] Browser tab title contains `Sentinel Globe v10.1.2`
- [ ] No 404 errors for MapLibre, satellite.js, manifest, icons, counties, faults, or world GeoJSON
- [ ] Globe renders and can zoom, pitch, rotate, and switch basemaps

## View continuity

- [ ] Search `76234`; all three views preserve the selected location
- [ ] Globe → Flat World → Polar → Globe does not jump to an unrelated location
- [ ] Right-drag/touch rotation behaves intentionally in each view
- [ ] HOME returns to the saved coordinates
- [ ] Manual drag, zoom, rotate, another view, HOME, or search releases Follow mode

## Persistence

- [ ] Select a non-default basemap, change orbit speed, and choose LOW/HIGH performance
- [ ] Reload; all three values persist
- [ ] Bookmark and preset survive reload
- [ ] FULL backup exports and reimports without console errors

## Weather and telemetry

- [ ] NWS station row is labeled MEASURED when available
- [ ] Open-Meteo row is labeled MODELED
- [ ] Radar displays recent frames and the timestamp changes during playback
- [ ] A missing archive frame is not represented as clear weather
- [ ] Feed chips expose errors and official-source links
- [ ] Watchdog contains no unexplained red condition

## Integrity and mobile

- [ ] MOCK mode displays its large banner and never leaks into live mode
- [ ] INTEGRITY mode hides mock/experimental/low-confidence findings as designed
- [ ] Mobile width shows bottom navigation and one sheet at a time
- [ ] No uncaught red errors in DevTools Console

Record failures with browser version, screenshot, Console text, Network request URL/status, and the relevant feed-chip message.
