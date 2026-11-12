<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: CC-BY-4.0
Created by riko chen on 2026-10-17
-->

# OpenXPlay website

The source of the OpenXPlay website, built with [VitePress](https://vitepress.dev/). English, the default language, is at the root and Simplified Chinese under `zh/`, with the same file names. The How it works pages show the diagrams in `../assets/` and the Community pages the QR codes in `../Group/`, the same files the repository README uses. The workflow `../.github/workflows/pages.yml` builds this directory and deploys it to GitHub Pages whenever any of them changes on `main`.

## Run it locally

Node.js 20 or later.

```sh
npm ci
npm run dev       # development server with hot reload
npm run build     # static site in .vitepress/dist
npm run preview   # serve the built site
```

## Car database

The Head units pages (`head-units.md`, `zh/head-units.md`) are generated from `data/`: one YAML file per car in `data/cars/<brand>/<model>.yaml`, named by the apps' car catalog IDs, and the tests outside a car in `data/bench.yaml`. `.vitepress/cars.ts` describes the fields and how to add a car; the build stops on a file with a missing field, an unknown key or a bad date.

## Change the site URL

The public address comes from two environment variables, read at build time by `.vitepress/site.ts`:

| Variable | Default | Meaning |
| --- | --- | --- |
| `SITE_URL` | `https://openxplay.org` | Origin only, without a path |
| `BASE` | `/` | Path the site is served under |

```sh
SITE_URL=https://example.github.io BASE=/OpenXPlay/ npm run build
```

They set canonical and alternate links, Open Graph URLs, structured data, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` and `CNAME` (written only for a custom domain, never for `*.github.io`). In the workflow, set them as the repository variables `SITE_URL` and `BASE`. Crawlers read `robots.txt` only at the root of a host, so a non-root `BASE` needs its own robots file there.

`public/og-image-*.png` are rendered from the diagrams with `sh scripts/render-images.sh` (needs Chrome and ImageMagick), and the PNG icons from the Relay app icon with `scripts/render-icons.py` (needs Pillow).

## Licence

Site code: MIT. Written content: CC BY 4.0. See [LICENSE](LICENSE).
