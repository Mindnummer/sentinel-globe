# Security Notes — Sentinel Globe v10.2.0

## Current posture

- Static GitHub Pages application with read-only public-data requests and an optional AIS websocket.
- No analytics, ads, tracking pixels, cookies, microphone, camera, WebRTC, `eval`, `new Function`, or dynamic remote script injection in the application source.
- MapLibre GL and satellite.js are vendored locally.
- Backup import is size-limited and validates sensitive location and key-bearing fields before application.
- External strings are escaped before HTML rendering.

## API keys

Keys are stored in browser `localStorage`, which is **not encrypted**. They are transmitted over HTTPS/WSS only to the associated provider, but query-string keys can appear in browser/network logs.

Use only revocable, rate-limited public-data keys. Weatherbit access may be paid or plan-restricted; do not place a high-value unrestricted key in the public static client. Valuable secrets belong behind a trusted server relay.

## Weather data safety boundary

- The app does not represent every lightning flash as a ground strike.
- Derived trends are labeled and are not official warnings.
- Notifications are convenience signals, not a life-safety replacement.
- Home NWS alerts are independently fetched to avoid confusing the current map focus with the home watch zone.

## Public infrastructure boundary

Sentinel does not scan, probe, write to, or control any infrastructure. It does not claim private SCADA access or infer private vulnerabilities.

## Verification boundary

Static review is not a penetration test. A larger public deployment should add a backend key boundary, CSP/security headers at an edge host, dependency monitoring, schema-contract tests, and automated real-browser tests.
