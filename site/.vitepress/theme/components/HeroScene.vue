<!--
SPDX-FileCopyrightText: 2026 OpenXPlay.org
SPDX-License-Identifier: MIT
Created by riko chen on 2026-10-21
-->
<script setup lang="ts">
// The home page's one animated moment: an iPhone hands CarPlay to a relay (an Android phone or a
// USB dongle), the relay passes it on, and the head unit's screen lights up. Afterwards the links
// keep a quiet flow of video, and now and then a tap on the screen travels back to the iPhone,
// because touch is returned. Pure CSS animation; with reduced motion the final picture is shown.
import { computed } from 'vue'
import { useData } from 'vitepress'

const TEXT = {
  root: {
    label: 'iPhone 把 CarPlay 交给中继（安卓手机或随身 Wi-Fi），中继再送到车机自带的浏览器中显示，触控传回 iPhone。',
    phone: 'iPhone',
    phoneSub: '无线或 USB 连接',
    relay: '中继',
    relaySub: '安卓手机或随身 Wi-Fi',
    screen: '车机',
    screenSub: '用自带的浏览器显示',
  },
  en: {
    label: 'The iPhone hands CarPlay to a relay (an Android phone or a USB dongle), which passes it to the head unit’s own browser; touch goes back to the iPhone.',
    phone: 'iPhone',
    phoneSub: 'Wireless or USB',
    relay: 'Relay',
    relaySub: 'Android phone or USB dongle',
    screen: 'Head unit',
    screenSub: 'Shown in its own browser',
  },
} as const

const { localeIndex } = useData()
const t = computed(() => TEXT[localeIndex.value as keyof typeof TEXT] ?? TEXT.root)
</script>

<template>
  <div class="oxp-scene">
    <div class="oxp-scene__stage" role="img" :aria-label="t.label">
      <svg class="oxp-scene__device is-phone" viewBox="0 0 80 160" aria-hidden="true">
        <rect class="body" x="2" y="2" width="76" height="156" rx="15" />
        <rect class="glass" x="7" y="7" width="66" height="146" rx="10.5" />
        <rect class="body" x="29" y="12" width="22" height="6" rx="3" />
        <g class="tiles">
          <rect x="15" y="40" width="22" height="22" rx="6" class="tile is-a" />
          <rect x="43" y="40" width="22" height="22" rx="6" class="tile is-b" />
          <rect x="15" y="68" width="22" height="22" rx="6" class="tile is-c" />
          <rect x="43" y="68" width="22" height="22" rx="6" class="tile is-d" />
          <rect x="15" y="122" width="50" height="16" rx="8" class="tile is-dock" />
        </g>
        <rect class="flash" x="7" y="7" width="66" height="146" rx="10.5" />
      </svg>

      <div class="oxp-scene__link is-first" aria-hidden="true">
        <span class="flow" />
        <span class="touch" />
      </div>

      <svg class="oxp-scene__device is-relay" viewBox="0 0 120 112" aria-hidden="true">
        <rect class="android" x="6" y="8" width="54" height="98" rx="10" />
        <rect class="android-glass" x="11" y="13" width="44" height="88" rx="6" />
        <circle class="android-dot" cx="33" cy="19" r="2" />
        <rect class="linux-plug" x="82" y="10" width="20" height="20" rx="2" />
        <rect class="linux-pin" x="87" y="16" width="4" height="4" rx="1" />
        <rect class="linux-pin" x="93" y="16" width="4" height="4" rx="1" />
        <rect class="linux" x="74" y="28" width="36" height="78" rx="8" />
        <circle class="linux-led" cx="92" cy="92" r="3" />
      </svg>

      <div class="oxp-scene__link is-second" aria-hidden="true">
        <span class="flow" />
        <span class="touch" />
      </div>

      <svg class="oxp-scene__device is-screen" viewBox="0 0 520 272" aria-hidden="true">
        <defs>
          <radialGradient id="oxp-scene-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0a84ff" stop-opacity="0.55" />
            <stop offset="100%" stop-color="#0a84ff" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="oxp-scene-cover" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#8e5cf7" />
            <stop offset="100%" stop-color="#0a84ff" />
          </linearGradient>
          <clipPath id="oxp-scene-display">
            <rect x="16" y="16" width="488" height="240" rx="12" />
          </clipPath>
        </defs>
        <ellipse class="glow" cx="260" cy="140" rx="270" ry="150" fill="url(#oxp-scene-glow)" />
        <rect class="bezel" x="4" y="4" width="512" height="264" rx="22" />
        <rect class="display-off" x="16" y="16" width="488" height="240" rx="12" />
        <g class="ui" clip-path="url(#oxp-scene-display)">
          <rect class="ui-bg" x="16" y="16" width="488" height="240" />
          <rect class="ui-dock" x="16" y="16" width="64" height="240" />
          <rect class="dock-icon is-1" x="30" y="36" width="36" height="36" rx="10" />
          <rect class="dock-icon is-2" x="30" y="86" width="36" height="36" rx="10" />
          <rect class="dock-icon is-3" x="30" y="136" width="36" height="36" rx="10" />
          <circle class="dock-home" cx="48" cy="222" r="11" />
          <rect class="card" x="94" y="30" width="250" height="212" rx="12" />
          <path class="road" d="M94 92 H344 M94 190 H344 M168 30 V242 M286 30 V242" />
          <path class="road is-thin" d="M94 140 C150 132 220 150 344 122" />
          <path class="route" pathLength="100" d="M128 226 L168 190 L168 112 C168 98 176 92 190 92 L286 92 L286 54" />
          <circle class="route-end" cx="286" cy="54" r="7" />
          <circle class="route-start" cx="128" cy="226" r="6" />
          <rect class="card" x="356" y="30" width="134" height="104" rx="12" />
          <rect x="370" y="44" width="44" height="44" rx="8" fill="url(#oxp-scene-cover)" />
          <rect class="text-bar" x="424" y="52" width="54" height="8" rx="4" />
          <rect class="text-bar is-dim" x="424" y="68" width="38" height="6" rx="3" />
          <rect class="text-bar is-dim" x="370" y="108" width="106" height="5" rx="2.5" />
          <rect class="progress" x="370" y="108" width="62" height="5" rx="2.5" />
          <rect class="card" x="356" y="144" width="134" height="98" rx="12" />
          <circle class="key" cx="395" cy="193" r="19" />
          <circle class="key" cx="451" cy="193" r="19" />
          <path class="key-glyph" d="M389 193 h12 M395 187 v12" />
          <path class="key-glyph" d="M444 186 l14 7 l-14 7 z" />
        </g>
        <circle class="ripple" cx="226" cy="152" r="20" />
      </svg>

      <p class="oxp-scene__caption is-phone" aria-hidden="true">
        <strong>{{ t.phone }}</strong><span>{{ t.phoneSub }}</span>
      </p>
      <p class="oxp-scene__caption is-relay" aria-hidden="true">
        <strong>{{ t.relay }}</strong><span>{{ t.relaySub }}</span>
      </p>
      <p class="oxp-scene__caption is-screen" aria-hidden="true">
        <strong>{{ t.screen }}</strong><span>{{ t.screenSub }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.oxp-scene {
  --scene-device: #1d1d1f;
  --scene-edge: #1d1d1f;
  --scene-glass: #f2f2f6;
  --scene-surface: var(--vp-c-bg);
  --scene-line: var(--vp-c-divider);
  --scene-flow: var(--oxp-android);
  --scene-touch: var(--vp-c-text-1);
  padding: 0 24px;
}

.dark .oxp-scene {
  --scene-device: #2c2c30;
  --scene-edge: #48484e;
  --scene-glass: #1b1b1f;
}

@media (min-width: 640px) {
  .oxp-scene {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .oxp-scene {
    padding: 0 64px;
  }
}

.oxp-scene__stage {
  display: grid;
  grid-template-columns: auto minmax(16px, 1fr) auto minmax(16px, 1fr) auto;
  align-items: center;
  column-gap: clamp(6px, 1.2vw, 16px);
  row-gap: 14px;
  margin: 0 auto;
  max-width: 1152px;
}

.oxp-scene__device {
  display: block;
  grid-row: 1;
  height: auto;
  overflow: visible;
}

.oxp-scene__device.is-phone {
  grid-column: 1;
  width: clamp(40px, 7vw, 84px);
}

.oxp-scene__device.is-relay {
  grid-column: 3;
  width: clamp(54px, 9vw, 112px);
}

.oxp-scene__device.is-screen {
  grid-column: 5;
  width: clamp(156px, 44vw, 520px);
}

/* Devices */
.is-phone .body {
  fill: var(--scene-device);
  stroke: var(--scene-edge);
  stroke-width: 1.5;
}

.is-phone .glass {
  fill: var(--scene-glass);
}

.is-phone .tile {
  fill: var(--vp-c-default-3);
}

.is-phone .tile.is-a {
  fill: var(--oxp-android);
}

.is-phone .tile.is-d {
  fill: var(--oxp-linux);
}

.is-phone .flash {
  fill: var(--oxp-android);
  opacity: 0;
}

.is-relay .android {
  fill: var(--scene-surface);
  stroke: var(--oxp-android);
  stroke-width: 4;
}

.is-relay .android-glass {
  fill: var(--oxp-android-soft);
}

.is-relay .android-dot {
  fill: var(--oxp-android);
}

.is-relay .linux,
.is-relay .linux-plug {
  fill: var(--scene-surface);
  stroke: var(--oxp-linux);
  stroke-width: 4;
}

.is-relay .linux-pin,
.is-relay .linux-led {
  fill: var(--oxp-linux);
}

.is-screen .bezel {
  fill: #1d1d1f;
  stroke: var(--scene-edge);
  stroke-width: 1.5;
}

.is-screen .display-off {
  fill: #0b0c10;
}

.is-screen .ui-bg {
  fill: #12151c;
}

.is-screen .ui-dock {
  fill: #0d1016;
}

.is-screen .dock-icon.is-1 {
  fill: #0a84ff;
}

.is-screen .dock-icon.is-2 {
  fill: #8e5cf7;
}

.is-screen .dock-icon.is-3 {
  fill: #32ade6;
}

.is-screen .dock-home {
  fill: none;
  stroke: #4a5163;
  stroke-width: 3;
}

.is-screen .card {
  fill: #1d222c;
}

.is-screen .road {
  fill: none;
  stroke: #2a303c;
  stroke-width: 9;
}

.is-screen .road.is-thin {
  stroke-width: 5;
}

.is-screen .route {
  fill: none;
  stroke: #0a84ff;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
}

.is-screen .route-end {
  fill: #fff;
  stroke: #0a84ff;
  stroke-width: 4;
}

.is-screen .route-start {
  fill: #0a84ff;
}

.is-screen .text-bar {
  fill: #c9ceda;
}

.is-screen .text-bar.is-dim {
  fill: #3a4152;
}

.is-screen .progress {
  fill: #0a84ff;
}

.is-screen .key {
  fill: #2a303c;
}

.is-screen .key-glyph {
  fill: #c9ceda;
  stroke: #c9ceda;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.is-screen .glow {
  opacity: 0.5;
}

.dark .is-screen .glow {
  opacity: 0.7;
}

.is-screen .ripple {
  fill: none;
  stroke: #fff;
  stroke-width: 3;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}

/* Links between the devices */
.oxp-scene__link {
  position: relative;
  grid-row: 1;
  height: 2px;
}

.oxp-scene__link.is-first {
  grid-column: 2;
}

.oxp-scene__link.is-second {
  grid-column: 4;
}

.oxp-scene__link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1px;
  background: var(--scene-line);
  transform-origin: left center;
}

.oxp-scene__link .flow {
  position: absolute;
  inset: -4px 0;
  background-image: radial-gradient(circle, var(--scene-flow) 0 2.4px, transparent 3px);
  background-position: 0 50%;
  background-repeat: repeat-x;
  background-size: 16px 10px;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent);
}

.oxp-scene__link .touch {
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border: 2px solid var(--scene-touch);
  border-radius: 50%;
  background: var(--vp-c-bg);
  opacity: 0;
}

/* Captions, centred under each device without widening its column */
.oxp-scene__caption {
  grid-row: 2;
  justify-self: center;
  width: 0;
  margin: 0;
  white-space: nowrap;
  text-align: center;
}

.oxp-scene__caption.is-phone {
  grid-column: 1;
}

.oxp-scene__caption.is-relay {
  grid-column: 3;
}

.oxp-scene__caption.is-screen {
  grid-column: 5;
}

.oxp-scene__caption strong,
.oxp-scene__caption span {
  display: block;
  width: max-content;
  transform: translateX(-50%);
}

.oxp-scene__caption strong {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--vp-c-text-1);
}

.oxp-scene__caption span {
  font-size: 13px;
  line-height: 18px;
  color: var(--vp-c-text-2);
}

@media (max-width: 559px) {
  .oxp-scene__caption span {
    display: none;
  }

  .oxp-scene__caption strong {
    font-size: 13px;
  }
}

/* The sequence: iPhone, link, relay, link, screen on. Then video flows and taps come back. */
@media (prefers-reduced-motion: no-preference) {
  .oxp-scene__device.is-phone,
  .oxp-scene__caption.is-phone {
    animation: oxp-scene-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.1s both;
  }

  .oxp-scene__link.is-first::before {
    animation: oxp-scene-draw 0.45s ease-out 0.45s both;
  }

  .oxp-scene__device.is-relay,
  .oxp-scene__caption.is-relay {
    animation: oxp-scene-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.75s both;
  }

  .oxp-scene__link.is-second::before {
    animation: oxp-scene-draw 0.45s ease-out 1.1s both;
  }

  .oxp-scene__caption.is-screen {
    animation: oxp-scene-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) 1.4s both;
  }

  .is-screen .ui {
    animation: oxp-scene-power 0.7s ease-out 1.5s both;
  }

  .is-screen .glow {
    animation: oxp-scene-glow 1.4s ease-out 1.5s both;
  }

  .is-screen .dock-icon {
    transform-box: fill-box;
    transform-origin: center;
    animation: oxp-scene-pop 0.4s cubic-bezier(0.3, 1.4, 0.5, 1) both;
  }

  .is-screen .dock-icon.is-1 {
    animation-delay: 1.75s;
  }

  .is-screen .dock-icon.is-2 {
    animation-delay: 1.83s;
  }

  .is-screen .dock-icon.is-3 {
    animation-delay: 1.91s;
  }

  .is-screen .route {
    animation: oxp-scene-route 1.2s ease-in-out 1.95s both;
  }

  .is-screen .route-end {
    transform-box: fill-box;
    transform-origin: center;
    animation: oxp-scene-pop 0.4s cubic-bezier(0.3, 1.4, 0.5, 1) 3s both;
  }

  .oxp-scene__link .flow {
    animation: oxp-scene-fade 0.5s ease-out 2.1s both, oxp-scene-flow 1.1s linear 2.1s infinite;
  }

  /* One 6 s cycle: a tap ripples on the screen, then travels back over both links to the iPhone. */
  .is-screen .ripple {
    animation: oxp-scene-ripple 6s ease-out 3.6s infinite;
  }

  .oxp-scene__link.is-second .touch {
    animation: oxp-scene-touch-second 6s linear 3.6s infinite;
  }

  .oxp-scene__link.is-first .touch {
    animation: oxp-scene-touch-first 6s linear 3.6s infinite;
  }

  .is-phone .flash {
    animation: oxp-scene-flash 6s ease-out 3.6s infinite;
  }
}

@keyframes oxp-scene-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}

@keyframes oxp-scene-draw {
  from {
    transform: scaleX(0);
  }
}

@keyframes oxp-scene-power {
  from {
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
}

@keyframes oxp-scene-glow {
  from {
    opacity: 0;
  }
}

@keyframes oxp-scene-pop {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
}

@keyframes oxp-scene-route {
  from {
    stroke-dashoffset: 100;
  }
}

@keyframes oxp-scene-fade {
  from {
    opacity: 0;
  }
}

@keyframes oxp-scene-flow {
  to {
    background-position: 16px 50%;
  }
}

@keyframes oxp-scene-ripple {
  0% {
    opacity: 0.85;
    transform: scale(0.3);
  }
  14% {
    opacity: 0;
    transform: scale(1.7);
  }
  100% {
    opacity: 0;
    transform: scale(1.7);
  }
}

@keyframes oxp-scene-touch-second {
  0%,
  8% {
    left: 100%;
    opacity: 0;
  }
  10% {
    left: 100%;
    opacity: 1;
  }
  21% {
    left: 0;
    opacity: 1;
  }
  22%,
  100% {
    left: 0;
    opacity: 0;
  }
}

@keyframes oxp-scene-touch-first {
  0%,
  23% {
    left: 100%;
    opacity: 0;
  }
  24% {
    left: 100%;
    opacity: 1;
  }
  35% {
    left: 0;
    opacity: 1;
  }
  36%,
  100% {
    left: 0;
    opacity: 0;
  }
}

@keyframes oxp-scene-flash {
  0%,
  35% {
    opacity: 0;
  }
  38% {
    opacity: 0.35;
  }
  50%,
  100% {
    opacity: 0;
  }
}
</style>
