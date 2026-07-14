# Upgrade to Sentinel Globe v10.2.0

1. In the live app, use **Settings → Export FULL backup**.
2. Download a ZIP backup of the current GitHub repository.
3. Extract the v10.2.0 release ZIP.
4. Upload everything inside `sentinel-globe-v10.2.0` to the repository root, replacing matching files.
5. Commit as `Release Sentinel Globe v10.2.0 Weather Core`.
6. Wait for GitHub Pages, hard-refresh once, and complete `DEPLOYMENT_CHECKLIST.md`.

The release keeps the existing `sg2_` browser-storage namespace, so previous settings and keys remain in the same browser. Weatherbit is a new optional key field.

## Rollback

`archive/index-v10.1.2-stable.html` is the immediate code rollback. Copy it to `index.html`, commit, and deploy. The complete pre-upgrade repository ZIP remains the strongest rollback.
