<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-10-17
-->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LanguageBanner from './components/LanguageBanner.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <LanguageBanner />
    </template>
  </DefaultTheme.Layout>
</template>
