# Security Notes — Sentinel Globe v1.0

## Architecture posture
- **Zero dependencies, zero CDNs, zero build chain.** The entire app is one auditable file.
  There is no supply chain to attack because there is no supply chain.
- **No telemetry, no analytics, no cookies.** Nothing about you is sent anywhere except the
  public API requests you can see in the Truth Ledger.
- **Read-only by design.** The app only performs GET requests to public endpoints. It contains
  no scanning, probing, exploitation, or write capability of any kind.

## API keys
- FIRMS / EIA / NASA keys are stored in **browser localStorage only** — never in the repo,
  never transmitted anywhere except to that provider's own API over HTTPS.
- These are free-tier, rate-limited, read-only public-data keys. Worst case if leaked:
  someone reads public data on your quota. Still, treat them as yours:
  - Don't paste keys into the repo, screenshots, or shared machines.
  - If a key is exposed, regenerate it at the provider (both take ~1 minute).
- If this ever becomes a public multi-user product, keys move server-side behind a proxy
  (Phase 3) — the correct pattern for secret credentials.

## Input handling
- All external data is treated as untrusted: API responses are parsed, validated for expected
  shape, and rendered via `textContent`/sanitized templates — no `eval`, no `innerHTML` of raw
  external strings, no dynamic script loading.
- Geocoding input is encoded before being placed in URLs.

## Infrastructure ethics (built into the code and the wording)
- Only lawful public sources; OpenStreetMap-derived and government data only.
- The app will never display or claim substation vulnerability, private grid topology, or
  non-public outage prediction. Grid layer = public EIA-930 demand data, period.
- Alert language is constrained to "elevated risk / watch condition / pattern detected /
  hypothesis" unless the source itself is an official government alert.

## Verifying the file yourself
1. Open `index.html` in a text editor. Search for `http` — every network call is visible
   and matches DATA_SOURCES.md.
2. Open the browser DevTools → Network tab while the app runs. What you see is all there is.
3. The Watchdog panel includes a mock-data guard: if any mock item ever appears while the
   app is in live mode, it flags RED.
