# Security Notes — Sentinel Globe v10.1.2

## Current posture

- Static GitHub Pages application; no application server and no write access to remote systems.
- No analytics package, advertising SDK, tracking pixel, cookie-based profile, microphone, camera, or WebRTC feature in the application source.
- MapLibre GL and satellite.js are vendored local dependencies. Their exact shipped files should be preserved and reviewed when upgraded.
- All telemetry operations are read-only requests to public-data providers, plus the optional AIS websocket.
- Imported Sentinel backup files are size-limited and validated before applying location, basemap, bookmark, and custom-key fields.

## API keys

Keys are stored in browser `localStorage`, not in the repository. They leave the browser only when sent over HTTPS/WSS to the corresponding provider.

Important limits:

- `localStorage` is not encrypted.
- Any JavaScript running on the same site origin could read it.
- A browser extension, compromised device, or future same-origin script could expose it.
- Use only revocable, rate-limited public-data keys here.
- Paid or high-value secrets belong behind a server-side relay and must never be placed in this static app.

## Untrusted data handling

The application escapes external strings before rendering them into HTML templates. It does not use `eval`, `new Function`, dynamic remote script injection, or raw external HTML. This release also removes invalid nested-button markup and validates coordinates before navigation/import.

This is a source review, not a formal penetration test. A production public service should add automated dependency checks, browser integration tests, security headers at an edge host, and a server-side key boundary.

## Public-infrastructure boundary

Sentinel displays lawful public map and telemetry data. It does not scan networks, probe devices, modify infrastructure, claim access to private SCADA, or infer private vulnerability data.

## Reporting a problem

Document the version shown in the header, the browser and operating system, the exact steps, the Watchdog/feed-chip message, and any console error. Do not include API keys in screenshots or reports.
