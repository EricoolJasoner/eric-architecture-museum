import fs from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('C:/Users/北北/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')

const root = process.cwd()
const outDir = path.join(root, 'promo-output')
const shotsDir = path.join(outDir, 'cinematic-shots')
const videoDir = path.join(outDir, 'cinematic-video')
const stagePath = path.join(outDir, 'cinematic-stage.html')
const webmPath = path.join(outDir, 'architecture-field-museum-cinematic.webm')
const mp4Path = path.join(outDir, 'architecture-field-museum-cinematic.mp4')
const appUrl = process.env.APP_URL || 'http://localhost:5173/'
const viewport = { width: 1920, height: 1080 }

await fs.mkdir(shotsDir, { recursive: true })
await fs.mkdir(videoDir, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function clickText(page, text, waitMs) {
  await page.getByText(text, { exact: true }).click()
  await page.waitForTimeout(waitMs)
}

async function captureAppShots() {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const page = await context.newPage()
  await page.goto(appUrl, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(shotsDir, '01-landing.png') })

  await page.getByRole('button', { name: 'Enter architecture museum' }).click()
  await page.waitForTimeout(4200)
  await page.screenshot({ path: path.join(shotsDir, '02-orbit.png') })

  await clickText(page, 'Section', 2200)
  await page.screenshot({ path: path.join(shotsDir, '03-section.png') })

  await clickText(page, 'Assembly', 2600)
  await page.screenshot({ path: path.join(shotsDir, '04-assembly.png') })

  await clickText(page, 'Night', 1800)
  await page.screenshot({ path: path.join(shotsDir, '05-night.png') })

  await context.close()
}

function shot(name) {
  return `cinematic-shots/${name}`
}

async function writeReferenceDocs() {
  const design = `# Design System

## Overview

Eric's Youth Daily: Architecture Field Museum is a dark, premium, museum-grade 3D learning interface for children aged eight to fourteen. The page uses a night-city photographic base, glowing gold building geometry, and glass UI panels to make architecture feel like field research rather than a cartoon. The layout is dense and operational: landmark archive at left, 3D model in the center, reference photography and data on the right.

## Colors

- **Museum Black**: \`#03070a\` — video canvas and deep interface shadows.
- **Panel Carbon**: \`#071016\` — glass panels and UI shells.
- **Gold Signal**: \`#ffd21f\` — highlighted building edges, active controls, progress accents.
- **Amber Structure**: \`#f59e0b\` — floor plates and structural overlays.
- **Cyan Systems**: \`#67e8f9\` — elevator core, data lines, technical labels.
- **Red Bracing**: \`#ef4444\` — cross-bracing and section warnings.
- **Text White**: \`#f8fafc\` — primary titles.
- **Slate Text**: \`#cbd5e1\` — supporting copy and educational labels.

## Typography

- **Display/Sans**: Manrope-style geometric sans for large product claims, heavy weights, tight but readable.
- **Data/Labels**: ui-monospace for HUD labels, tabular data, location codes, and numbered modes.
- **Scale**: 88-124px hero titles, 30-42px section titles, 20-26px body copy, 16-18px data labels.

## Elevation

Depth comes from glassmorphism, thin low-opacity borders, bloom glows, vignetted photography, and perspective-tilted screenshots. The product should feel like a dark Apple keynote crossed with a National Geographic interactive exhibit.

## Components

- **Night Skyline Hero**: full-frame city photo, minimal gold wireframe building mark, single ENTER button.
- **Three-Column Museum Console**: left archive, central 3D model viewport, right reference/photo/data panel.
- **Light Study Swatches**: compact colored mode chips, amber/cyan highlights, active gold outline.
- **Cutaway Labels**: cyan, amber, and red labels attached to exposed structural systems.
- **Hotspot Index**: educational list that connects model parts to learning content.

## Do's and Don'ts

### Do's

- Use dark museum surfaces with gold/cyan accents and localized glow.
- Keep screenshots in perspective with visible camera movement.
- Use real app captures generously so the product is always visible.
- Make structural systems feel inspectable with labels, rings, and scanner lines.

### Don'ts

- Do not turn the experience into a playful cartoon.
- Do not use flat static screenshots without push, rotation, or parallax.
- Do not use bright full-screen gradients; use solid dark surfaces plus local glows.
- Do not overcrowd the center model with text that blocks the building.
`

  const script = `# Script

Imagine a museum where a skyscraper becomes a living machine.

Eric's Youth Daily turns world architecture into an interactive 3D field study.

Kids can rotate the Empire State Building, compare it with real New York night photography, and switch between orbit, section, assembly, and lighting modes.

In section view, the tower opens up: elevator core, floor plates, steel frame, and cross bracing become visible systems.

Assembly mode separates the layers so structure, history, and design are easier to understand.

It's sophisticated enough to feel like a professional research tool, and clear enough for young explorers.

Architecture Field Museum. Rotate the landmark. Peel back the layers. Learn how buildings work.
`

  const storyboard = `# Storyboard

**Format:** 1920x1080
**Audio:** generated ambient underscore, no voiceover track in this export
**Style basis:** DESIGN.md

## Beat 1 — Night Museum Opens (0:00-0:05)

Camera starts already moving over the dark skyline. The gold wireframe icon glows at center, then the whole landing screen tilts forward as if the viewer is entering the museum. Thin coordinate lines and amber particles establish the field-research tone.

## Beat 2 — Product Console Reveal (0:05-0:10)

Whip-pan into the main interface. The full product screenshot rotates in 3D from a left yaw into a centered museum console. Left archive, center model, and right reference panel receive separate HUD brackets.

## Beat 3 — Rotate And Study (0:10-0:15)

The orbit view becomes the product hero. A large circular camera path sweeps around the Empire State Building while feature chips appear: Orbit, Reference Photo, Hotspots, Light Study.

## Beat 4 — Cutaway Systems (0:15-0:21)

Zoom-through transition into section mode. Cyan, amber, and red labels attach to elevator core, floor plates, steel frame, and cross bracing. Scanner lines move vertically over the tower to make the building feel dissected.

## Beat 5 — Exploded Assembly (0:21-0:27)

The assembly capture floats in perspective. Duplicate glass panels slide apart in z-depth, echoing exploded floors. The title shifts from visual spectacle to learning value: "Structure becomes understandable."

## Beat 6 — Lighting Study And CTA (0:27-0:34)

Night mode becomes the final color study. Lighting chips rotate across the foreground, the skyline blooms, then everything resolves into the brand lockup and final command: Rotate the landmark. Peel back the layers. Learn how buildings work.
`

  await fs.writeFile(path.join(outDir, 'DESIGN.md'), design, 'utf8')
  await fs.writeFile(path.join(outDir, 'SCRIPT.md'), script, 'utf8')
  await fs.writeFile(path.join(outDir, 'STORYBOARD.md'), storyboard, 'utf8')
}

async function writeStage() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Eric's Youth Daily Architecture Field Museum Cinematic Promo</title>
  <style>
    * { box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
      background: #03070a;
      font-family: Manrope, Avenir Next, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif;
    }
    body { display: flex; align-items: center; justify-content: center; }
    .stage {
      position: relative;
      width: 1920px;
      height: 1080px;
      overflow: hidden;
      background: #03070a;
      color: #f8fafc;
      isolation: isolate;
    }
    .stage::before {
      content: "";
      position: absolute;
      inset: -20%;
      background:
        radial-gradient(circle at 50% 42%, rgba(255, 210, 31, .2), rgba(255, 210, 31, 0) 28%),
        radial-gradient(circle at 78% 18%, rgba(103, 232, 249, .14), rgba(103, 232, 249, 0) 22%),
        radial-gradient(circle at 12% 78%, rgba(239, 68, 68, .12), rgba(239, 68, 68, 0) 25%),
        #03070a;
      animation: atmosphere 34s ease-in-out both;
      z-index: 0;
    }
    .grain, .scanlines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 24;
    }
    .grain {
      opacity: .095;
      mix-blend-mode: overlay;
      background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 1px, rgba(255,255,255,0) 1px 4px);
    }
    .scanlines {
      opacity: .13;
      background-image: linear-gradient(rgba(103,232,249,.18) 1px, rgba(103,232,249,0) 1px);
      background-size: 100% 7px;
    }
    .scene {
      position: absolute;
      inset: 0;
      opacity: 0;
      perspective: 1600px;
      z-index: 2;
    }
    .photo {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: saturate(1.08) contrast(1.06);
    }
    .photo::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 50% 45%, rgba(255, 210, 31, .11), rgba(3, 7, 10, .15) 28%, rgba(3, 7, 10, .78) 80%),
        linear-gradient(90deg, rgba(3, 7, 10, .88), rgba(3, 7, 10, .18) 46%, rgba(3, 7, 10, .82));
    }
    .landing-photo::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 360px;
      height: 430px;
      z-index: 1;
      background:
        radial-gradient(ellipse at 50% 45%, rgba(3, 7, 10, .96), rgba(3, 7, 10, .72) 48%, rgba(3, 7, 10, 0) 78%),
        linear-gradient(90deg, rgba(3, 7, 10, .96), rgba(3, 7, 10, .72), rgba(3, 7, 10, .96));
    }
    .shot-card {
      position: absolute;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, .16);
      border-radius: 26px;
      background: rgba(7, 16, 22, .7);
      box-shadow: 0 54px 160px rgba(0,0,0,.58), 0 0 80px rgba(255, 210, 31, .12);
      transform-style: preserve-3d;
    }
    .shot-card img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .scene-title {
      position: absolute;
      left: 92px;
      bottom: 108px;
      width: 760px;
      z-index: 10;
    }
    .kicker {
      margin: 0 0 20px;
      color: #ffd21f;
      font: 800 17px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      letter-spacing: .26em;
      text-transform: uppercase;
    }
    h1, h2 {
      margin: 0;
      color: #f8fafc;
      font-weight: 850;
      letter-spacing: 0;
      text-shadow: 0 30px 90px rgba(0,0,0,.72);
    }
    h1 { font-size: 116px; line-height: .9; max-width: 1020px; }
    h2 { font-size: 84px; line-height: .94; }
    .copy {
      margin: 26px 0 0;
      max-width: 660px;
      color: #dbeafe;
      font-size: 27px;
      line-height: 1.34;
      font-weight: 560;
      text-shadow: 0 16px 50px rgba(0,0,0,.75);
    }
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-variant-numeric: tabular-nums;
    }
    .hud-top {
      position: absolute;
      left: 56px;
      right: 56px;
      top: 42px;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(226, 232, 240, .86);
      font: 700 16px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      letter-spacing: .22em;
      text-transform: uppercase;
    }
    .hud-top span {
      padding: 16px 22px;
      border: 1px solid rgba(148, 163, 184, .18);
      border-radius: 13px;
      background: rgba(7, 16, 22, .64);
      backdrop-filter: blur(18px);
    }
    .progress {
      position: absolute;
      left: 72px;
      right: 72px;
      bottom: 46px;
      z-index: 22;
      height: 3px;
      background: rgba(255,255,255,.13);
      overflow: hidden;
    }
    .progress::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      transform-origin: left;
      background: linear-gradient(90deg, #ffd21f, #67e8f9, #ef4444, #ffd21f);
      animation: progress 34s linear both;
    }
    .wire-mark {
      position: absolute;
      left: 50%;
      top: 178px;
      width: 260px;
      height: 360px;
      margin-left: -130px;
      z-index: 7;
      filter: drop-shadow(0 0 28px rgba(255, 210, 31, .55));
      animation: wireOrbit 5s cubic-bezier(.22, .72, .16, 1) both;
    }
    .wire-mark div {
      position: absolute;
      left: 50%;
      border: 3px solid #ffe36c;
      transform: translateX(-50%);
      background: rgba(255, 210, 31, .04);
    }
    .w1 { bottom: 0; width: 230px; height: 58px; }
    .w2 { bottom: 58px; width: 178px; height: 118px; }
    .w3 { bottom: 176px; width: 112px; height: 142px; }
    .w4 { bottom: 318px; width: 50px; height: 42px; }
    .spike {
      position: absolute;
      left: 50%;
      top: -54px;
      width: 2px;
      height: 72px;
      margin-left: -1px;
      background: #ffe36c;
      box-shadow: 0 0 24px rgba(255, 210, 31, .75);
    }
    .enter-beam {
      position: absolute;
      left: 50%;
      top: 580px;
      width: 260px;
      height: 70px;
      margin-left: -130px;
      border-radius: 16px;
      background: linear-gradient(135deg, #fff0a3, #ffd21f);
      box-shadow: 0 0 60px rgba(255, 210, 31, .52);
      z-index: 7;
      animation: buttonPush 5s ease both;
    }
    .enter-beam::before {
      content: "ENTER";
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #03070a;
      font: 950 22px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      letter-spacing: .28em;
    }
    .orbit-ring, .orbit-ring::before, .orbit-ring::after {
      position: absolute;
      border: 1px solid rgba(255, 210, 31, .35);
      border-radius: 50%;
      pointer-events: none;
    }
    .orbit-ring {
      width: 900px;
      height: 900px;
      left: 510px;
      top: 84px;
      z-index: 8;
      transform: rotateX(72deg) rotateZ(-16deg);
      animation: ringSpin 10s linear infinite;
    }
    .orbit-ring::before {
      content: "";
      inset: 74px;
      border-color: rgba(103, 232, 249, .22);
    }
    .orbit-ring::after {
      content: "";
      width: 18px;
      height: 18px;
      left: 50%;
      top: -9px;
      background: #ffd21f;
      box-shadow: 0 0 30px rgba(255, 210, 31, .85);
    }
    .callout {
      position: absolute;
      z-index: 13;
      padding: 12px 18px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,.18);
      background: rgba(7, 16, 22, .78);
      backdrop-filter: blur(18px);
      color: #f8fafc;
      font: 900 17px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      letter-spacing: .04em;
      text-transform: uppercase;
      box-shadow: 0 20px 50px rgba(0,0,0,.34);
    }
    .callout.gold { color: #ffe36c; border-color: rgba(255, 210, 31, .44); }
    .callout.cyan { color: #67e8f9; border-color: rgba(103, 232, 249, .5); }
    .callout.red { color: #fecaca; border-color: rgba(239, 68, 68, .56); }
    .connector {
      position: absolute;
      z-index: 12;
      height: 2px;
      background: linear-gradient(90deg, rgba(255,255,255,0), currentColor);
      transform-origin: right center;
      opacity: .8;
    }
    .data-panel {
      position: absolute;
      right: 92px;
      top: 170px;
      width: 430px;
      z-index: 14;
      padding: 26px;
      border: 1px solid rgba(148,163,184,.2);
      border-radius: 22px;
      background: rgba(7,16,22,.68);
      backdrop-filter: blur(24px);
      box-shadow: 0 38px 120px rgba(0,0,0,.42);
    }
    .data-panel .label {
      color: #67e8f9;
      font: 800 16px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      letter-spacing: .2em;
      text-transform: uppercase;
    }
    .data-panel .metric {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 18px;
      margin-top: 22px;
      padding-top: 18px;
      border-top: 1px solid rgba(255,255,255,.1);
      color: #cbd5e1;
      font-size: 22px;
    }
    .data-panel strong { color: #f8fafc; font-weight: 900; }
    .chip-row {
      position: absolute;
      left: 50%;
      bottom: 118px;
      z-index: 15;
      display: flex;
      gap: 16px;
      width: 760px;
      margin-left: -380px;
      justify-content: center;
    }
    .chip {
      padding: 17px 22px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,.16);
      background: rgba(7,16,22,.76);
      color: #f8fafc;
      font: 900 17px/1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      box-shadow: 0 18px 56px rgba(0,0,0,.38);
    }
    .chip.active { color: #03070a; background: #ffd21f; border-color: #ffd21f; }
    .assembly-slice {
      position: absolute;
      left: 392px;
      top: 206px;
      width: 1136px;
      height: 638px;
      border: 1px solid rgba(255, 210, 31, .18);
      border-radius: 24px;
      background-size: cover;
      background-position: center;
      box-shadow: 0 30px 80px rgba(0,0,0,.4);
      opacity: 0;
      transform-style: preserve-3d;
    }
    .light-swatches {
      position: absolute;
      right: 122px;
      bottom: 148px;
      z-index: 16;
      display: flex;
      gap: 14px;
    }
    .swatch {
      width: 86px;
      height: 86px;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,.18);
      box-shadow: 0 24px 60px rgba(0,0,0,.38);
    }
    .swatch:nth-child(1) { background: linear-gradient(135deg, #67e8f9, #2563eb); }
    .swatch:nth-child(2) { background: linear-gradient(135deg, #ffd21f, #f59e0b); }
    .swatch:nth-child(3) { background: linear-gradient(135deg, #ef4444, #111827); }
    .swatch:nth-child(4) { background: linear-gradient(135deg, #f8fafc, #94a3b8); }
    .final-lockup {
      position: absolute;
      inset: 0;
      z-index: 18;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px;
      opacity: 0;
    }
    .final-root { z-index: 30; }
    .final-lockup .badge {
      width: 88px;
      height: 88px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffd21f;
      color: #03070a;
      font-weight: 950;
      font-size: 44px;
      box-shadow: 0 0 80px rgba(255, 210, 31, .45);
    }
    .final-lockup h2 {
      margin-top: 34px;
      width: 1180px;
      font-size: 96px;
      line-height: .94;
    }
    .final-lockup p {
      margin: 30px auto 0;
      width: 1040px;
      color: #cbd5e1;
      font-size: 30px;
      line-height: 1.35;
    }
    .transition-bar {
      position: absolute;
      inset: -10% -120%;
      z-index: 17;
      background: linear-gradient(100deg, rgba(255,210,31,0), rgba(255,210,31,.82) 45%, rgba(103,232,249,.78) 52%, rgba(3,7,10,0) 62%);
      transform: translateX(-80%) skewX(-14deg);
      filter: blur(8px);
      opacity: 0;
    }
    .s1 { animation: sceneOne 34s linear both; }
    .s2 { animation: sceneTwo 34s linear both; }
    .s3 { animation: sceneThree 34s linear both; }
    .s4 { animation: sceneFour 34s linear both; }
    .s5 { animation: sceneFive 34s linear both; }
    .landing-photo { background-image: url("${shot('01-landing.png')}"); animation: landingMove 5s cubic-bezier(.2, .7, .14, 1) both; }
    .orbit-card { left: 186px; top: 138px; width: 1548px; height: 872px; animation: consoleMove 34s cubic-bezier(.19,1,.22,1) both; }
    .section-card { left: 206px; top: 130px; width: 1508px; height: 848px; animation: sectionMove 34s cubic-bezier(.2,.78,.14,1) both; }
    .assembly-card { left: 202px; top: 130px; width: 1516px; height: 852px; animation: assemblyMove 34s cubic-bezier(.2,.78,.14,1) both; }
    .night-card { left: 232px; top: 128px; width: 1456px; height: 820px; animation: nightMove 34s cubic-bezier(.2,.78,.14,1) both; }
    .title-one { left: 0; right: 0; bottom: 150px; width: auto; text-align: center; animation: titleOne 34s both; }
    .title-one .copy { margin-left: auto; margin-right: auto; }
    .title-two { animation: textSweepTwo 34s both; }
    .title-three { animation: textSweepThree 34s both; }
    .title-four { animation: textSweepFour 34s both; }
    .title-five { animation: textSweepFive 34s both; }
    .panel-two { animation: panelTwo 34s both; }
    .chips-three { animation: chipsThree 34s both; }
    .chips-five { animation: chipsFive 34s both; }
    .scan-beam {
      position: absolute;
      left: 560px;
      top: 160px;
      width: 760px;
      height: 42px;
      z-index: 15;
      background: linear-gradient(180deg, rgba(103,232,249,0), rgba(103,232,249,.45), rgba(255,210,31,.22), rgba(103,232,249,0));
      filter: blur(2px);
      opacity: 0;
      animation: scanBeam 34s linear both;
    }
    .transition-bar.t1 { animation: transitionOne 34s both; }
    .transition-bar.t2 { animation: transitionTwo 34s both; }
    .transition-bar.t3 { animation: transitionThree 34s both; }
    .transition-bar.t4 { animation: transitionFour 34s both; }
    .transition-bar.t5 { animation: transitionFive 34s both; }
    @keyframes atmosphere {
      from { transform: scale(1) rotate(0deg); filter: saturate(1); }
      to { transform: scale(1.08) rotate(1.5deg); filter: saturate(1.18); }
    }
    @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    @keyframes sceneOne { 0%, 14.2% { opacity: 1; } 16%, 100% { opacity: 0; } }
    @keyframes sceneTwo { 0%, 13.2% { opacity: 0; } 15.2%, 29.5% { opacity: 1; } 31.5%, 100% { opacity: 0; } }
    @keyframes sceneThree { 0%, 28.8% { opacity: 0; } 31%, 46.2% { opacity: 1; } 48%, 100% { opacity: 0; } }
    @keyframes sceneFour { 0%, 45.5% { opacity: 0; } 48%, 64.8% { opacity: 1; } 67%, 100% { opacity: 0; } }
    @keyframes sceneFive { 0%, 64.2% { opacity: 0; } 67%, 100% { opacity: 1; } }
    @keyframes landingMove {
      0% { transform: scale(1.08) translateY(16px); filter: blur(6px) saturate(.9); }
      24% { transform: scale(1.03) translateY(0); filter: blur(0) saturate(1.08); }
      100% { transform: scale(1.16) translateY(-38px); filter: blur(0) saturate(1.2); }
    }
    @keyframes wireOrbit {
      0% { opacity: 0; transform: rotateY(-54deg) rotateX(18deg) scale(.82); }
      20%, 72% { opacity: 1; transform: rotateY(0deg) rotateX(0deg) scale(1); }
      100% { opacity: .35; transform: rotateY(36deg) rotateX(-10deg) scale(.94); }
    }
    @keyframes buttonPush {
      0%, 30% { opacity: 0; transform: translateY(22px) scale(.94); }
      42%, 78% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-14px) scale(1.12); }
    }
    @keyframes titleOne {
      0% { opacity: 0; transform: translateY(28px) scale(.98); filter: blur(10px); }
      10%, 82% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      100% { opacity: 0; transform: translateY(-22px) scale(1.03); filter: blur(8px); }
    }
    @keyframes consoleMove {
      0%, 13% { opacity: 0; transform: rotateY(-22deg) rotateX(8deg) translateX(-170px) translateY(30px) scale(.82); filter: blur(18px); }
      16%, 29% { opacity: 1; transform: rotateY(-7deg) rotateX(4deg) translateX(0) translateY(0) scale(.92); filter: blur(0); }
      32%, 100% { opacity: 1; transform: rotateY(5deg) rotateX(1deg) translateX(26px) translateY(-12px) scale(.98); filter: blur(0); }
    }
    @keyframes textSweepTwo {
      0%, 15% { opacity: 0; transform: translateX(-70px); filter: blur(10px); }
      18%, 29% { opacity: 1; transform: translateX(0); filter: blur(0); }
      31%, 100% { opacity: 0; transform: translateX(-44px); filter: blur(12px); }
    }
    @keyframes panelTwo {
      0%, 17% { opacity: 0; transform: translateX(66px) rotateY(-10deg); filter: blur(10px); }
      20%, 29% { opacity: 1; transform: translateX(0) rotateY(0); filter: blur(0); }
      31%, 100% { opacity: 0; transform: translateX(70px); filter: blur(14px); }
    }
    @keyframes ringSpin {
      from { transform: rotateX(72deg) rotateZ(-16deg); }
      to { transform: rotateX(72deg) rotateZ(344deg); }
    }
    @keyframes sectionMove {
      0%, 29% { opacity: 0; transform: rotateY(16deg) rotateX(6deg) translateX(120px) scale(.88); filter: blur(18px); }
      33%, 45% { opacity: 1; transform: rotateY(4deg) rotateX(2deg) translateX(0) scale(.94); filter: blur(0); }
      48%, 100% { opacity: 1; transform: rotateY(-5deg) rotateX(2deg) translateX(-26px) scale(1); filter: blur(0); }
    }
    @keyframes textSweepThree {
      0%, 31% { opacity: 0; transform: translateY(54px); filter: blur(12px); }
      35%, 45% { opacity: 1; transform: translateY(0); filter: blur(0); }
      48%, 100% { opacity: 0; transform: translateY(-36px); filter: blur(14px); }
    }
    @keyframes chipsThree {
      0%, 33% { opacity: 0; transform: translateY(48px) rotateX(18deg); }
      38%, 46% { opacity: 1; transform: translateY(0) rotateX(0); }
      49%, 100% { opacity: 0; transform: translateY(28px); }
    }
    @keyframes scanBeam {
      0%, 45% { opacity: 0; transform: translateY(-80px); }
      48%, 61% { opacity: .95; transform: translateY(700px); }
      64%, 100% { opacity: 0; transform: translateY(760px); }
    }
    @keyframes assemblyMove {
      0%, 46% { opacity: 0; transform: rotateY(-18deg) rotateX(8deg) translateX(-120px) scale(.88); filter: blur(18px); }
      50%, 64% { opacity: 1; transform: rotateY(-6deg) rotateX(4deg) translateX(0) scale(.94); filter: blur(0); }
      67%, 100% { opacity: 1; transform: rotateY(5deg) rotateX(2deg) translateX(20px) scale(1); filter: blur(0); }
    }
    @keyframes textSweepFour {
      0%, 50% { opacity: 0; transform: translateX(-60px); filter: blur(14px); }
      54%, 64% { opacity: 1; transform: translateX(0); filter: blur(0); }
      67%, 100% { opacity: 0; transform: translateX(-44px); filter: blur(14px); }
    }
    @keyframes nightMove {
      0%, 65% { opacity: 0; transform: rotateY(20deg) rotateX(6deg) translateX(150px) scale(.88); filter: blur(18px) saturate(.9); }
      72%, 92% { opacity: 1; transform: rotateY(4deg) rotateX(2deg) translateX(0) scale(.94); filter: blur(0) saturate(1.1); }
      100% { opacity: .45; transform: rotateY(-4deg) rotateX(1deg) translateX(-20px) scale(1.04); filter: blur(5px) saturate(1.25); }
    }
    @keyframes textSweepFive {
      0%, 68% { opacity: 0; transform: translateY(54px); filter: blur(12px); }
      72%, 83% { opacity: 1; transform: translateY(0); filter: blur(0); }
      89%, 100% { opacity: 0; transform: translateY(-40px); filter: blur(14px); }
    }
    @keyframes chipsFive {
      0%, 70% { opacity: 0; transform: translateY(44px) rotateY(-28deg); }
      75%, 88% { opacity: 1; transform: translateY(0) rotateY(0); }
      94%, 100% { opacity: 0; transform: translateY(36px); }
    }
    @keyframes transitionOne {
      0%, 13.5% { opacity: 0; transform: translateX(-80%) skewX(-14deg); }
      14.7% { opacity: 1; transform: translateX(10%) skewX(-14deg); }
      16.2%, 100% { opacity: 0; transform: translateX(90%) skewX(-14deg); }
    }
    @keyframes transitionTwo {
      0%, 29.4% { opacity: 0; transform: translateX(-80%) skewX(-14deg); }
      30.5% { opacity: .9; transform: translateX(10%) skewX(-14deg); }
      32%, 100% { opacity: 0; transform: translateX(90%) skewX(-14deg); }
    }
    @keyframes transitionThree {
      0%, 46% { opacity: 0; transform: translateX(-80%) skewX(-14deg); }
      47.2% { opacity: .95; transform: translateX(10%) skewX(-14deg); }
      48.8%, 100% { opacity: 0; transform: translateX(90%) skewX(-14deg); }
    }
    @keyframes transitionFour {
      0%, 64.8% { opacity: 0; transform: translateX(-80%) skewX(-14deg); }
      66% { opacity: .9; transform: translateX(10%) skewX(-14deg); }
      67.8%, 100% { opacity: 0; transform: translateX(90%) skewX(-14deg); }
    }
    @keyframes transitionFive {
      0%, 88% { opacity: 0; transform: translateX(-80%) skewX(-14deg); }
      90% { opacity: .8; transform: translateX(10%) skewX(-14deg); }
      92%, 100% { opacity: 0; transform: translateX(90%) skewX(-14deg); }
    }
    @keyframes finalIn {
      0%, 88% { opacity: 0; transform: scale(.94); filter: blur(18px); }
      92%, 100% { opacity: 1; transform: scale(1); filter: blur(0); }
    }
    .final-lockup { animation: finalIn 34s both; }
  </style>
</head>
<body>
  <main class="stage">
    <div class="hud-top"><span>Eric's Youth Daily</span><span>Architecture Field Museum</span></div>

    <section class="scene s1">
      <div class="photo landing-photo"></div>
      <div class="wire-mark" aria-hidden="true">
        <div class="w1"></div><div class="w2"></div><div class="w3"></div><div class="w4"></div><span class="spike"></span>
      </div>
      <div class="enter-beam"></div>
      <div class="scene-title title-one">
        <p class="kicker">A cinematic 3D learning museum</p>
        <h1>Architecture becomes explorable.</h1>
        <p class="copy">A premium field-research tool for kids to study landmarks through rotation, cutaways, and real-world reference.</p>
      </div>
    </section>

    <section class="scene s2">
      <div class="shot-card orbit-card"><img src="${shot('02-orbit.png')}" alt=""></div>
      <div class="scene-title title-two">
        <p class="kicker">Three-column research console</p>
        <h2>Archive, 3D model, live reference.</h2>
        <p class="copy">The interface keeps landmark data, real photography, and the interactive building visible in one cinematic workspace.</p>
      </div>
      <aside class="data-panel panel-two">
        <div class="label">Featured Building</div>
        <div class="metric"><span>Location</span><strong>New York</strong></div>
        <div class="metric"><span>Completed</span><strong>1931</strong></div>
        <div class="metric"><span>Floors</span><strong>102</strong></div>
      </aside>
    </section>

    <section class="scene s3">
      <div class="shot-card section-card"><img src="${shot('03-section.png')}" alt=""></div>
      <div class="orbit-ring"></div>
      <div class="scene-title title-three">
        <p class="kicker">Orbit and dissect</p>
        <h2>Rotate the icon. Then open it.</h2>
        <p class="copy">Section mode turns the Empire State Building into visible systems: frame, core, floors, and bracing.</p>
      </div>
      <div class="chip-row chips-three">
        <div class="chip">01 Orbit</div><div class="chip active">02 Section</div><div class="chip">03 Assembly</div><div class="chip">04 Night</div>
      </div>
      <div class="callout cyan" style="left: 1040px; top: 474px;">Elevator Core</div>
      <div class="callout gold" style="left: 1080px; top: 638px;">Floor Plates</div>
      <div class="callout red" style="left: 790px; top: 356px;">Cross Bracing</div>
      <div class="scan-beam"></div>
    </section>

    <section class="scene s4">
      <div class="shot-card assembly-card"><img src="${shot('04-assembly.png')}" alt=""></div>
      <div class="assembly-slice" style="background-image:url('${shot('04-assembly.png')}'); animation: sliceA 34s both;"></div>
      <div class="assembly-slice" style="background-image:url('${shot('04-assembly.png')}'); animation: sliceB 34s both;"></div>
      <div class="assembly-slice" style="background-image:url('${shot('04-assembly.png')}'); animation: sliceC 34s both;"></div>
      <div class="scene-title title-four">
        <p class="kicker">Exploded assembly view</p>
        <h2>Structure becomes understandable.</h2>
        <p class="copy">Layers separate so young learners can see how a skyscraper stacks, supports, and lights itself at night.</p>
      </div>
      <div class="callout gold" style="right: 210px; top: 276px;">Exploded Floors</div>
      <div class="callout cyan" style="right: 260px; top: 740px;">Steel Frame</div>
    </section>

    <section class="scene s5">
      <div class="shot-card night-card"><img src="${shot('05-night.png')}" alt=""></div>
      <div class="scene-title title-five">
        <p class="kicker">Light study presets</p>
        <h2>See design through changing city light.</h2>
        <p class="copy">Amber, cyan, red, and silver studies help kids compare how materials and silhouettes change after dark.</p>
      </div>
      <div class="light-swatches chips-five"><div class="swatch"></div><div class="swatch"></div><div class="swatch"></div><div class="swatch"></div></div>
      <div class="final-lockup">
        <div class="badge">E</div>
        <h2>Rotate the landmark. Peel back the layers.</h2>
        <p>Eric's Youth Daily turns world architecture into a premium interactive field museum for young explorers.</p>
      </div>
    </section>

    <div class="final-lockup final-root">
      <div class="badge">E</div>
      <h2>Rotate the landmark. Peel back the layers.</h2>
      <p>Eric's Youth Daily turns world architecture into a premium interactive field museum for young explorers.</p>
    </div>

    <div class="transition-bar t1"></div>
    <div class="transition-bar t2"></div>
    <div class="transition-bar t3"></div>
    <div class="transition-bar t4"></div>
    <div class="transition-bar t5"></div>
    <div class="progress"></div>
    <div class="grain"></div>
    <div class="scanlines"></div>
  </main>
  <style>
    @keyframes sliceA {
      0%, 68% { opacity: 0; transform: rotateY(-7deg) rotateX(4deg) translate3d(0, 0, -80px) scale(.91); }
      72%, 84% { opacity: .18; transform: rotateY(-12deg) rotateX(7deg) translate3d(-128px, -72px, -160px) scale(.86); }
      88%, 100% { opacity: 0; transform: rotateY(-16deg) rotateX(9deg) translate3d(-220px, -120px, -220px) scale(.82); }
    }
    @keyframes sliceB {
      0%, 69% { opacity: 0; transform: rotateY(-7deg) rotateX(4deg) translate3d(0, 0, -80px) scale(.91); }
      73%, 84% { opacity: .22; transform: rotateY(0deg) rotateX(6deg) translate3d(0, 0, -90px) scale(.89); }
      88%, 100% { opacity: 0; transform: rotateY(2deg) rotateX(7deg) translate3d(0, -30px, -180px) scale(.86); }
    }
    @keyframes sliceC {
      0%, 70% { opacity: 0; transform: rotateY(-7deg) rotateX(4deg) translate3d(0, 0, -80px) scale(.91); }
      74%, 84% { opacity: .18; transform: rotateY(12deg) rotateX(5deg) translate3d(128px, 72px, -160px) scale(.86); }
      88%, 100% { opacity: 0; transform: rotateY(16deg) rotateX(9deg) translate3d(220px, 120px, -220px) scale(.82); }
    }
  </style>
</body>
</html>`
  await fs.writeFile(stagePath, html, 'utf8')
}

async function recordStage() {
  await fs.rm(videoDir, { recursive: true, force: true })
  await fs.mkdir(videoDir, { recursive: true })
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    recordVideo: { dir: videoDir, size: viewport },
  })
  const page = await context.newPage()
  await page.goto(`file://${stagePath.replaceAll(path.sep, '/')}`, { waitUntil: 'load' })
  await page.waitForTimeout(34500)
  await context.close()

  const videos = await fs.readdir(videoDir)
  const webm = videos.find((name) => name.endsWith('.webm'))
  if (!webm) {
    throw new Error('No WebM video was produced by Playwright.')
  }
  await fs.rm(webmPath, { force: true })
  await fs.rename(path.join(videoDir, webm), webmPath)
}

async function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} exited with ${code}`))
    })
  })
}

async function convertToMp4() {
  const ffmpeg = process.env.FFMPEG_PATH || 'C:/Users/北北/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.0.1-full_build/bin/ffmpeg.exe'
  if (!(await exists(ffmpeg))) {
    console.warn('FFmpeg not found; leaving WebM only.')
    return
  }
  await fs.rm(mp4Path, { force: true })
  await run(ffmpeg, [
    '-y',
    '-i', webmPath,
    '-f', 'lavfi',
    '-t', '34.5',
    '-i', 'sine=frequency=55:sample_rate=48000',
    '-f', 'lavfi',
    '-t', '34.5',
    '-i', 'sine=frequency=220:sample_rate=48000',
    '-filter_complex',
    '[1:a]volume=0.055[a1];[2:a]volume=0.014[a2];[a1][a2]amix=inputs=2:duration=first,afade=t=in:st=0:d=1.2,afade=t=out:st=33:d=1.2[a]',
    '-map', '0:v',
    '-map', '[a]',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-profile:v', 'high',
    '-crf', '18',
    '-preset', 'medium',
    '-c:a', 'aac',
    '-b:a', '160k',
    '-shortest',
    mp4Path,
  ])
}

await captureAppShots()
await writeReferenceDocs()
await writeStage()
await recordStage()
await browser.close()
await convertToMp4()

console.log(JSON.stringify({ stagePath, webmPath, mp4Path }, null, 2))
