# Upgrade to Sentinel Globe v10.1.2

## Before replacing anything

1. Open the current app and use **Settings → FULL backup**.
2. Save a ZIP of the current GitHub repository.
3. Keep your API keys outside screenshots and commits.

## Replace the GitHub Pages bundle

1. Extract the v10.1.2 release ZIP on your computer.
2. Open the `sentinel-globe-v10.1.2` folder.
3. In the GitHub repository, choose **Add file → Upload files**.
4. Drag the entire contents of the release folder into the repository root.
5. Confirm that `index.html`, the three GeoJSON files, MapLibre files, satellite.js, manifest, icons, documentation, `.nojekyll`, `tests/`, and `archive/` are present.
6. Commit with a clear message such as `Release Sentinel Globe v10.1.2 stabilization`.
7. Wait for GitHub Pages to deploy.
8. Open the site and perform one hard refresh with **Ctrl+Shift+R**.
9. Complete `DEPLOYMENT_CHECKLIST.md`.

## Rollback

The release includes `archive/index-v10.1-original.html`. To restore the pre-audit application temporarily, download that file, rename the copy to `index.html`, upload it to the repository root, and commit. Keep the complete pre-upgrade repository ZIP as the stronger rollback method.

## Browser-local settings

The release keeps the same `sg2_` localStorage namespace, so ordinary settings and keys should remain in the same browser. The restored-preference fixes mean saved basemap, orbit speed, and performance mode now survive reloads.
