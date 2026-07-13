#!/usr/bin/env python3
"""Check every internal href/src in a built Hugo site resolves to a file.

Usage: python3 scripts/check_internal_links.py public

Parses with html.parser (not regex) because `hugo --minify` strips
attribute quotes. External, mailto:, tel:, data: and fragment-only
targets are out of scope — this is a regression net for internal
routes and assets, meant to stay dependency-free and CI-stable.
"""
import collections
import os
import sys
import urllib.parse
from html.parser import HTMLParser


class LinkCollector(HTMLParser):
    def __init__(self, page, refs):
        super().__init__()
        self.page = page
        self.refs = refs

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key not in ("href", "src") or not value:
                continue
            if value.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:", "//")):
                continue
            path = value.split("#")[0].split("?")[0]
            if path:
                self.refs[path].add(self.page)


def main(root):
    refs = collections.defaultdict(set)
    for dirpath, _, files in os.walk(root):
        for name in files:
            if not name.endswith(".html"):
                continue
            page = os.path.join(dirpath, name)
            with open(page, encoding="utf-8", errors="ignore") as fh:
                LinkCollector(page, refs).feed(fh.read())

    broken = []
    for url, pages in sorted(refs.items()):
        rel = urllib.parse.unquote(url.lstrip("/"))
        candidates = [os.path.join(root, rel), os.path.join(root, rel, "index.html")]
        if not any(os.path.exists(c) for c in candidates):
            broken.append((url, sorted(pages)))

    print(f"checked {len(refs)} unique internal refs under {root}/")
    if broken:
        print("BROKEN INTERNAL LINKS:")
        for url, pages in broken:
            print(f"  {url}")
            for page in pages[:3]:
                print(f"    <- {page}")
        return 1
    print("no broken internal links")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "public"))
