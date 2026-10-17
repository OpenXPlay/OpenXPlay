#!/bin/sh
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: MIT
# Created by riko chen on 2026-10-17
#
# Regenerates the social preview images in public/ (og-image-en.png, og-image-zh.png) from the
# relay diagrams in the repository's assets/. The icons come from scripts/render-icons.py.
# Needs Google Chrome (or Chromium) and ImageMagick. The build itself does not run this script.
# Usage: sh scripts/render-images.sh
set -eu
cd "$(dirname "$0")/.."
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
command -v "$CHROME" >/dev/null 2>&1 || [ -x "$CHROME" ] || { echo "Set CHROME to a Chrome or Chromium binary" >&2; exit 1; }
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

shot() { # shot SOURCE OUTPUT WIDTH HEIGHT
  "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size="$3,$4" --screenshot="$2" "file://$1" >/dev/null 2>&1
}

# Social images: the diagram cropped to 1800x945 (1.905:1) and scaled to 1200x630, without the
# animated particles.
for lang in en zh; do
  suffix=$([ "$lang" = zh ] && echo "-zh" || true)
  sed -e '1s#width="1800" height="1120" viewBox="0 0 1800 1120"#width="1200" height="630" viewBox="0 0 1800 945"#' \
      -e '1s#<style>#<style>.flow-particle{display:none}#' \
      "../assets/openxplay-relay-animated$suffix.svg" > "$work/og-$lang.svg"
  printf '<!doctype html><html><body style="margin:0"><img src="og-%s.svg" width="1200" height="630" style="display:block"></body></html>' "$lang" > "$work/og-$lang.html"
  shot "$work/og-$lang.html" "public/og-image-$lang.png" 1200 630
  magick "public/og-image-$lang.png" -strip "public/og-image-$lang.png"
done
echo "Rendered: og-image-en.png og-image-zh.png"
