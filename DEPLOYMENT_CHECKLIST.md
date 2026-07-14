# Sentinel Globe v10.2.0 — Deployment Checklist

## Identity and boot

- [ ] Header shows `v10.2.0 · PUBLIC TELEMETRY`
- [ ] Browser title contains `Sentinel Globe v10.2.0`
- [ ] No 404 for local JS/CSS, manifest, icons, or GeoJSON files
- [ ] Globe loads and all three views work
- [ ] DevTools Console has no uncaught red errors

## Weather Core

- [ ] Press **☁ WX**; WEATHER tab opens and unrelated layers temporarily hide
- [ ] Press **☁ WX** again; prior layer states return
- [ ] Model card is labeled MODELED and NWS station card MEASURED
- [ ] NWS alerts card is OFFICIAL
- [ ] Next-12-hour table displays temperature, precipitation, wind, and gusts
- [ ] Changing location immediately removes the old location’s weather/lightning points while new data loads

## Radar

- [ ] Scrubber moves through all recent frames
- [ ] Previous/next buttons move exactly one frame
- [ ] 0.5×, 1×, and 2× playback work
- [ ] Crossfade does not leave two opaque radar frames stacked
- [ ] Latest frame pauses longer than intermediate frames
- [ ] 3h/12h/24h/72h archive modes are labeled EXPERIMENTAL
- [ ] Blank archive imagery is not interpreted as clear weather

## Lightning

Without a Weatherbit key:

- [ ] Weather tab clearly says point locations require a key/eligible plan
- [ ] NOAA GLM button opens the official GOES-19 view

With an eligible Weatherbit key:

- [ ] Feed chip turns green or gives an exact entitlement/rate error
- [ ] Dashed radius ring follows the selected location
- [ ] Radius and lookback selectors refetch data
- [ ] Points are red ≤5 min, orange 6–15 min, yellow older
- [ ] Popup says a flash may be in-cloud and does not claim ground strike
- [ ] Nearest distance and activity/range trends update
- [ ] Polar view displays the same lightning points

## Home-watch correctness

- [ ] Set a non-home location; home NWS alerts still remain eligible for notification
- [ ] Viewed-location alerts do not masquerade as home alerts
- [ ] Lightning notification only operates when the lightning query is focused on home

## Existing regression checks

- [ ] HOME, search, bookmarks, presets, backup import/export, Mock, Integrity, Orbit, Focus, Follow ISS, basemaps, mobile sheets, and Watchdog still work
- [ ] Reload preserves basemap, orbit speed, performance, keys, and settings

Record any failure with browser/OS, exact steps, screenshot, Console text, request URL/status, and feed-chip message—never include API keys.
