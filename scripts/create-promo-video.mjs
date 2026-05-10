import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('C:/Users/北北/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')

const root = process.cwd()
const outDir = path.join(root, 'promo-output')
const shotsDir = path.join(outDir, 'shots')
const stagePath = path.join(outDir, 'promo-stage.html')
const videoDir = path.join(outDir, 'video')

await fs.mkdir(shotsDir, { recursive: true })
await fs.mkdir(videoDir, { recursive: true })

const appUrl = process.env.APP_URL || 'http://localhost:5173'
const viewport = { width: 1280, height: 720 }

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
})

async function captureAppShots() {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const page = await context.newPage()
  await page.goto(appUrl, { waitUntil: 'load' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: path.join(shotsDir, '01-intro.png') })

  await page.getByRole('button', { name: 'Enter architecture museum' }).click()
  await page.waitForTimeout(3600)
  await page.screenshot({ path: path.join(shotsDir, '02-museum.png') })

  await page.getByText('Section', { exact: true }).click()
  await page.waitForTimeout(1800)
  await page.screenshot({ path: path.join(shotsDir, '03-section.png') })

  await page.getByText('Assembly', { exact: true }).click()
  await page.waitForTimeout(2200)
  await page.screenshot({ path: path.join(shotsDir, '04-assembly.png') })

  await page.getByText('Night', { exact: true }).click()
  await page.waitForTimeout(1400)
  await page.screenshot({ path: path.join(shotsDir, '05-night.png') })

  await context.close()
}

function asset(name) {
  return `shots/${name}`
}

async function writeStage() {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Architecture Field Museum Promo</title>
  <style>
    * { box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #03070a; font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif; }
    .stage { position: relative; width: 1280px; height: 720px; overflow: hidden; background: #03070a; color: white; }
    .shot { position: absolute; inset: 0; opacity: 0; background-size: cover; background-position: center; transform: scale(1.04); animation: shot 18s linear forwards; }
    .shot::after { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 44%, rgba(251,191,36,.16), transparent 34%), linear-gradient(90deg, rgba(3,7,10,.82), rgba(3,7,10,.2) 42%, rgba(3,7,10,.76)); }
    .s1 { background-image: url("${asset('01-intro.png')}"); animation-delay: 0s; }
    .s2 { background-image: url("${asset('02-museum.png')}"); animation-delay: 3.2s; }
    .s3 { background-image: url("${asset('03-section.png')}"); animation-delay: 6.8s; }
    .s4 { background-image: url("${asset('04-assembly.png')}"); animation-delay: 10.4s; }
    .s5 { background-image: url("${asset('05-night.png')}"); animation-delay: 14s; }
    @keyframes shot {
      0%, 18% { opacity: 0; transform: scale(1.08) translateY(10px); filter: blur(10px); }
      23%, 38% { opacity: 1; filter: blur(0); }
      52% { opacity: 1; transform: scale(1.01) translateY(0); }
      57%, 100% { opacity: 0; transform: scale(1) translateY(-8px); filter: blur(8px); }
    }
    .grain { position: absolute; inset: 0; opacity: .11; mix-blend-mode: overlay; background-image: repeating-linear-gradient(0deg, rgba(255,255,255,.15) 0 1px, transparent 1px 3px); pointer-events: none; }
    .hud { position: absolute; left: 48px; right: 48px; top: 36px; display: flex; justify-content: space-between; z-index: 3; color: rgba(226,232,240,.82); font-size: 11px; letter-spacing: .28em; text-transform: uppercase; }
    .brand { position: absolute; left: 58px; bottom: 62px; z-index: 4; width: 620px; }
    .kicker { color: rgba(253,230,138,.82); font-size: 11px; letter-spacing: .42em; text-transform: uppercase; font-weight: 800; animation: textIn 18s ease forwards; }
    h1 { margin: 16px 0 0; font-size: 56px; line-height: .94; letter-spacing: 0; font-weight: 760; text-wrap: balance; text-shadow: 0 24px 80px rgba(0,0,0,.65); animation: headline 18s ease forwards; }
    .sub { margin-top: 22px; width: 480px; color: rgba(226,232,240,.86); font-size: 17px; line-height: 1.55; animation: subline 18s ease forwards; }
    .feature { position: absolute; right: 58px; bottom: 62px; z-index: 4; width: 360px; border: 1px solid rgba(255,255,255,.13); background: rgba(7,16,22,.68); backdrop-filter: blur(22px); border-radius: 10px; padding: 20px; box-shadow: 0 30px 90px rgba(0,0,0,.38); animation: card 18s ease forwards; }
    .feature .label { color: rgba(253,230,138,.82); font-size: 10px; letter-spacing: .24em; text-transform: uppercase; font-weight: 800; }
    .feature .title { margin-top: 10px; font-size: 24px; line-height: 1.1; font-weight: 760; }
    .feature .body { margin-top: 12px; color: rgba(203,213,225,.86); font-size: 14px; line-height: 1.5; }
    .rail { position: absolute; left: 58px; right: 58px; bottom: 34px; z-index: 5; height: 2px; background: rgba(255,255,255,.12); overflow: hidden; }
    .rail::before { content: ""; display: block; height: 100%; width: 100%; background: linear-gradient(90deg, #fde68a, #60a5fa, #fb923c); transform-origin: left; animation: progress 18s linear forwards; }
    .pulse { position: absolute; top: 50%; left: 50%; z-index: 2; width: 520px; height: 520px; margin: -260px 0 0 -260px; border: 1px solid rgba(253,230,138,.16); border-radius: 999px; animation: pulse 5.5s ease-in-out infinite; }
    @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
    @keyframes pulse { 0%, 100% { transform: scale(.82); opacity: .16; } 50% { transform: scale(1.08); opacity: .04; } }
    @keyframes textIn {
      0%, 8% { opacity: 0; transform: translateY(12px); }
      12%, 100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes headline {
      0%, 8% { opacity: 0; transform: translateY(18px); }
      12%, 100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes subline {
      0%, 14% { opacity: 0; transform: translateY(14px); }
      18%, 100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes card {
      0%, 18% { opacity: 0; transform: translateY(18px); }
      22%, 100% { opacity: 1; transform: translateY(0); }
    }
    .word { display: inline-block; animation: swap 18s step-end forwards; }
    .word::after { content: "cinematic entry"; }
    @keyframes swap {
      0%, 22% { content: ""; }
    }
  </style>
</head>
<body>
  <main class="stage">
    <div class="shot s1"></div>
    <div class="shot s2"></div>
    <div class="shot s3"></div>
    <div class="shot s4"></div>
    <div class="shot s5"></div>
    <div class="pulse"></div>
    <div class="hud"><span>Architecture Field Museum</span><span>Interactive 3D Web Experience</span></div>
    <section class="brand">
      <div class="kicker">Eric's Youth Daily</div>
      <h1>Explore New York architecture like a living museum.</h1>
      <p class="sub">A real skyline photograph becomes the visual anchor for cinematic 3D study: rotate, isolate, light, and reveal the building's structure.</p>
    </section>
    <aside class="feature">
      <div class="label">Feature Highlights</div>
      <div class="title">Field photo + 3D model + guided analysis</div>
      <div class="body">Premium opening animation, real night reference, hotspot navigation, lighting presets, cross-section view, and exploded assembly mode.</div>
    </aside>
    <div class="rail"></div>
    <div class="grain"></div>
  </main>
</body>
</html>`
  await fs.writeFile(stagePath, html, 'utf8')
}

async function recordStage() {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    recordVideo: { dir: videoDir, size: viewport },
  })
  const page = await context.newPage()
  await page.goto(`file://${stagePath.replaceAll(path.sep, '/')}`, { waitUntil: 'load' })
  await page.waitForTimeout(18500)
  await context.close()
}

await captureAppShots()
await writeStage()
await recordStage()
await browser.close()

const videos = await fs.readdir(videoDir)
const webm = videos.find((name) => name.endsWith('.webm'))
if (!webm) {
  throw new Error('No WebM video was produced by Playwright.')
}
const finalPath = path.join(outDir, 'architecture-field-museum-promo.webm')
await fs.rename(path.join(videoDir, webm), finalPath)
console.log(finalPath)
