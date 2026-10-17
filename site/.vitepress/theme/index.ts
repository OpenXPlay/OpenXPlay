// SPDX-FileCopyrightText: 2026 OpenXPlay.org
// SPDX-License-Identifier: MIT
// Created by riko chen on 2026-10-17

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme
