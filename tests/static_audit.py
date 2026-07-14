#!/usr/bin/env python3
"""Dependency-free static release audit for Sentinel Globe."""
from __future__ import annotations

import json
import re
import subprocess
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"


class AuditHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.local_refs: list[str] = []
        self.button_depth = 0
        self.nested_buttons = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = dict(attrs)
        if data.get("id"):
            self.ids.append(data["id"] or "")
        if tag == "button":
            if self.button_depth:
                self.nested_buttons += 1
            self.button_depth += 1
        for key in ("src", "href"):
            value = data.get(key)
            if value and not re.match(r"^(?:https?:|data:|#|mailto:|javascript:)", value):
                self.local_refs.append(value)

    def handle_endtag(self, tag: str) -> None:
        if tag == "button" and self.button_depth:
            self.button_depth -= 1


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    raise SystemExit(1)


def main() -> None:
    source = INDEX.read_text(encoding="utf-8")
    parser = AuditHTMLParser()
    parser.feed(source)

    duplicates = [name for name, count in Counter(parser.ids).items() if count > 1]
    if duplicates:
        fail(f"duplicate HTML IDs: {duplicates}")
    if parser.nested_buttons:
        fail(f"nested button elements: {parser.nested_buttons}")

    required_ids = {"btnWeather", "radarScrub", "radarBack", "radarNext", "radarSpeed", "radarSpan", "lightningMini"}
    absent = sorted(required_ids - set(parser.ids))
    if absent:
        fail(f"Weather Core controls missing: {absent}")
    for required in ('data-tab="weather"', 'id:"lightning"', 'Weatherbit Recent Lightning', 'GOES-19', 'lightningzone'):
        if required not in source:
            fail(f"Weather Core contract missing: {required}")

    info_match = re.search(r"const INFO=\{(.*?)\n\};\nfunction openHelpIndex", source, re.S)
    if not info_match:
        fail("INFO registry not found")
    info_keys = set(re.findall(r"^([A-Za-z_][\w]*):\{t:", info_match.group(1), re.M))
    static_info_uses = set(re.findall(r'data-info="([A-Za-z_][\w]*)"', source))
    missing_info = sorted(static_info_uses - info_keys)
    if missing_info:
        fail(f"missing INFO entries: {missing_info}")

    local_fetches = [ref for ref in re.findall(r'fetch\("([^"?]+\.(?:geojson|json|webmanifest|png|js|css))"', source)
                     if not re.match(r"^(?:https?:|data:)", ref)]
    refs = sorted(set(parser.local_refs + local_fetches))
    missing_files = [ref for ref in refs if not (ROOT / ref).exists()]
    if missing_files:
        fail(f"missing local assets: {missing_files}")

    manifest = json.loads((ROOT / "manifest.webmanifest").read_text(encoding="utf-8"))
    for icon in manifest.get("icons", []):
        if not (ROOT / icon["src"]).exists():
            fail(f"manifest icon missing: {icon['src']}")

    for geojson in ("counties.geojson", "faults.geojson", "world.geojson"):
        data = json.loads((ROOT / geojson).read_text(encoding="utf-8"))
        if data.get("type") != "FeatureCollection":
            fail(f"{geojson} is not a FeatureCollection")

    script = re.search(r"<script>\s*(.*?)\s*</script>\s*</body>", source, re.S)
    if not script:
        fail("inline application script not found")
    temp = ROOT / "tests" / ".sentinel-inline.tmp.js"
    temp.write_text(script.group(1), encoding="utf-8")
    try:
        node = subprocess.run(["node", "--check", str(temp)], capture_output=True, text=True)
        if node.returncode:
            fail(node.stderr.strip() or "Node syntax check failed")
    except FileNotFoundError:
        print("WARN: Node is not installed; JavaScript syntax check skipped")
    finally:
        temp.unlink(missing_ok=True)

    version = re.search(r'APP_VERSION="([^"]+)"', source)
    if not version:
        fail("APP_VERSION not found")
    for doc in (ROOT / "README.md", ROOT / "DEPLOYMENT_CHECKLIST.md", ROOT / "RELEASE_NOTES.md"):
        if version.group(1) not in doc.read_text(encoding="utf-8"):
            fail(f"version {version.group(1)} missing from {doc.name}")
    print(f"PASS: Sentinel Globe v{version.group(1)} static audit")
    print(f"PASS: {len(parser.ids)} unique HTML IDs")
    print(f"PASS: {len(refs)} local assets referenced and present")
    print(f"PASS: {len(info_keys)} help topics registered")


if __name__ == "__main__":
    main()
