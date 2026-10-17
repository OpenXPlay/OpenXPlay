#!/usr/bin/env python3
# SPDX-FileCopyrightText: 2026 OpenXPlay.org
# SPDX-License-Identifier: MIT
# Created by riko chen on 2026-10-17
#
# Renders the site icons (logo.png, icon-192.png, favicon-32.png, apple-touch-icon.png) from the
# OpenXPlay app icon: the launcher foreground on its #070707 background, cropped to the 72 dp a
# launcher shows of the 108 dp adaptive icon. Needs Pillow.
# Usage: python3 scripts/render-icons.py <OpenXPlay-Relay>/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png
import sys
from pathlib import Path
from PIL import Image, ImageDraw

public = Path(__file__).resolve().parent.parent / 'public'
source = Image.open(sys.argv[1]).convert('RGBA')
inset = round(source.width * 18 / 108)
foreground = source.crop((inset, inset, source.width - inset, source.height - inset))


def square(size):
    icon = Image.new('RGBA', (size, size), (7, 7, 7, 255))
    icon.alpha_composite(foreground.resize((size, size), Image.LANCZOS))
    return icon


def rounded(size):
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=round(size * 0.22), fill=255)
    icon = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    icon.paste(square(size), (0, 0), mask)
    return icon


rounded(512).save(public / 'logo.png', optimize=True)
rounded(192).save(public / 'icon-192.png', optimize=True)
rounded(32).save(public / 'favicon-32.png', optimize=True)
# iOS rounds touch icons itself, so this one stays square and opaque.
square(180).convert('RGB').save(public / 'apple-touch-icon.png', optimize=True)
print('Rendered: logo.png icon-192.png favicon-32.png apple-touch-icon.png')
