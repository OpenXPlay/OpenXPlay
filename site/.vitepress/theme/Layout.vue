<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-10-17
-->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import LanguageBanner from './components/LanguageBanner.vue'
import HeroScene from './components/HeroScene.vue'
import { useAnchorFixes } from './anchors'

const { frontmatter } = useData()
useAnchorFixes()
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <LanguageBanner />
    </template>
    <template #home-hero-after>
      <HeroScene />
    </template>
    <template #home-features-before>
      <div v-if="frontmatter.featuresTitle" class="oxp-features-heading">
        <h2>{{ frontmatter.featuresTitle }}</h2>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>
