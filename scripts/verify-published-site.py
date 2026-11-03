#!/usr/bin/env python3
"""Compare a static build with its public deployment without consulting CI status."""

import argparse
import concurrent.futures
import hashlib
import json
import re
import time
from pathlib import Path
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen


def digest(data):
    return hashlib.sha256(data).hexdigest()


def normalize(data, path):
    # Astro may assign a different instance ID to identical SSR home islands.
    if path in {"index.html", "en/index.html"}:
        return re.sub(
            rb'(<astro-island uid=")[^"]+(" prefix=)',
            rb'\1SSR_UID\2',
            data,
        )
    return data


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dist", required=True, type=Path)
    parser.add_argument("--site", default="https://joevilcai666.github.io/")
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    root = args.dist.resolve()
    if not (root / "index.html").is_file():
        parser.error("--dist must contain a built index.html")
    if urlparse(args.site).scheme not in {"http", "https"}:
        parser.error("--site must use HTTP or HTTPS")
    paths = sorted(
        p for p in root.rglob("*")
        if p.is_file() and not any(part.startswith(".") for part in p.relative_to(root).parts)
    )

    def check(file):
        relative = file.relative_to(root).as_posix()
        expected = file.read_bytes()
        url = args.site.rstrip("/") + "/" + quote(relative, safe="/")
        for attempt in range(2):
            try:
                with urlopen(Request(url, headers={"Cache-Control": "no-cache"}), timeout=25) as response:
                    actual = response.read()
                    matched = normalize(expected, relative) == normalize(actual, relative)
                    result = {
                        "path": relative,
                        "status": response.status,
                        "matched": matched,
                        "expectedSha256": digest(expected),
                        "actualSha256": digest(actual),
                    }
                    if matched or attempt:
                        return result
            except Exception as error:
                if attempt:
                    return {"path": relative, "matched": False, "error": str(error)}
            time.sleep(2)

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        checks = list(pool.map(check, paths))
    failures = [check for check in checks if not check["matched"]]
    report = {"site": args.site, "checked": len(checks), "passed": len(checks) - len(failures), "checks": checks}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"checked": len(checks), "passed": report["passed"], "failures": failures}, ensure_ascii=False))
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
