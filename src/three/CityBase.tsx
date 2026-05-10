import { useMemo } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface BuildingSpec {
  position: [number, number, number]
  size: [number, number, number]
  shade: number
  litColor: string
  brightness: number
}

const litPalette = ['#fde68a', '#fed7aa', '#fef3c7', '#dbeafe', '#bae6fd', '#fef9c3']

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/** Dense midtown-style cluster around the main building. */
function makeMidtown(seed: number, count: number): BuildingSpec[] {
  const rand = rng(seed)
  const out: BuildingSpec[] = []
  let attempts = 0
  while (out.length < count && attempts < count * 8) {
    attempts++
    const angle = rand() * Math.PI * 2
    const radius = 5 + rand() * 12
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    if (Math.abs(x) < 2.6 && Math.abs(z) < 2.6) continue
    const w = 0.5 + rand() * 1.4
    const d = 0.5 + rand() * 1.4
    // Heights weighted: most are short, occasional mid-rise
    const r = rand()
    const h = r < 0.65 ? 0.4 + rand() * 1.6 : r < 0.92 ? 1.6 + rand() * 2.5 : 3.5 + rand() * 3.5
    const litColor = litPalette[Math.floor(rand() * litPalette.length)]
    const brightness = 0.18 + rand() * 0.35
    out.push({ position: [x, h / 2, z], size: [w, h, d], shade: 0.55 + rand() * 0.4, litColor, brightness })
  }
  return out
}

/** Far-away skyline silhouette ring — distant Manhattan glow. */
function makeDistantSkyline(seed: number, count: number): BuildingSpec[] {
  const rand = rng(seed)
  const out: BuildingSpec[] = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + rand() * 0.04
    const radius = 26 + rand() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const w = 0.4 + rand() * 0.9
    const d = 0.4 + rand() * 0.9
    const h = 1.5 + rand() * 4
    const litColor = litPalette[Math.floor(rand() * litPalette.length)]
    out.push({
      position: [x, h / 2, z],
      size: [w, h, d],
      shade: 0.4 + rand() * 0.3,
      litColor,
      brightness: 0.35 + rand() * 0.25,
    })
  }
  return out
}

/**
 * Procedural emissive window-grid texture for tall neighbor towers.
 * Lit windows scatter at ~28% density, mimicking sparse occupied offices at night.
 */
function makeNeighborTexture(cols: number, rows: number, glow: string, seed: number) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#0b1220'
  ctx.fillRect(0, 0, size, size)
  const cellW = size / cols
  const cellH = size / rows
  const winW = cellW * 0.55
  const winH = cellH * 0.65
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cx = x * cellW + (cellW - winW) / 2
      const cy = y * cellH + (cellH - winH) / 2
      ctx.fillStyle = rand() < 0.28 ? glow : '#0f172a'
      ctx.fillRect(cx, cy, winW, winH)
    }
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

/** Two named "celebrity" neighbor towers (One Vanderbilt-style + Steinway-style). */
function NeighborTowers({ nightAmount }: { nightAmount: number }) {
  const oneVanderbiltTex = useMemo(() => makeNeighborTexture(10, 38, '#fde68a', 71), [])
  const steinwayTex = useMemo(() => makeNeighborTexture(6, 60, '#fef3c7', 113), [])

  return (
    <group>
      {/* One Vanderbilt-inspired: tall, slim, with red-orange spire at right side of view */}
      <group position={[7.5, 0, -2.5]}>
        <mesh castShadow receiveShadow position={[0, 5.5, 0]}>
          <boxGeometry args={[1.3, 11, 1.3]} />
          <meshStandardMaterial
            map={oneVanderbiltTex}
            emissiveMap={oneVanderbiltTex}
            emissive={new THREE.Color('#fde68a')}
            emissiveIntensity={0.4 + nightAmount * 1.4}
            metalness={0.5}
            roughness={0.45}
          />
        </mesh>
        {/* Tapered top */}
        <mesh position={[0, 11.3, 0]} castShadow>
          <boxGeometry args={[0.85, 0.6, 0.85]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Spire mast with red beacon */}
        <mesh position={[0, 12.4, 0]}>
          <cylinderGeometry args={[0.015, 0.06, 1.6, 10]} />
          <meshStandardMaterial
            color="#f97316"
            emissive={new THREE.Color('#f97316')}
            emissiveIntensity={1.5 + nightAmount * 2}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 13.3, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive={new THREE.Color('#ef4444')}
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Steinway-style super-thin tower on the left */}
      <group position={[-7.0, 0, 1.5]}>
        <mesh castShadow receiveShadow position={[0, 6.5, 0]}>
          <boxGeometry args={[0.85, 13, 0.85]} />
          <meshStandardMaterial
            map={steinwayTex}
            emissiveMap={steinwayTex}
            emissive={new THREE.Color('#fef3c7')}
            emissiveIntensity={0.35 + nightAmount * 1.3}
            metalness={0.4}
            roughness={0.55}
          />
        </mesh>
        <mesh position={[0, 13.2, 0]} castShadow>
          <boxGeometry args={[0.55, 0.4, 0.55]} />
          <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}

interface Props {
  themeDark: boolean
  nightAmount: number
}

export function CityBase({ themeDark, nightAmount }: Props) {
  const midtown = useMemo(() => makeMidtown(42, 90), [])
  const distant = useMemo(() => makeDistantSkyline(13, 64), [])

  return (
    <group>
      {/* Reflective ground */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        {themeDark ? (
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={0.9}
            roughness={0.88}
            depthScale={0.4}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#08101e"
            metalness={0.4}
            mirror={0.35}
          />
        ) : (
          <meshStandardMaterial color="#cbd5e1" roughness={0.95} />
        )}
      </mesh>

      {/* Subtle street grid */}
      <gridHelper
        args={[40, 20, themeDark ? '#1e293b' : '#94a3b8', themeDark ? '#1e293b' : '#94a3b8']}
        position={[0, 0.01, 0]}
      />

      {/* Dense midtown cluster */}
      {midtown.map((b, i) => {
        const v = Math.round((themeDark ? 20 : 150) + b.shade * (themeDark ? 24 : 50))
        const r = v.toString(16).padStart(2, '0')
        const g = Math.min(255, v + (themeDark ? 4 : 0)).toString(16).padStart(2, '0')
        const bl = Math.min(255, v + (themeDark ? 10 : 12)).toString(16).padStart(2, '0')
        const color = `#${r}${g}${bl}`
        return (
          <mesh key={`m-${i}`} position={b.position} castShadow receiveShadow>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color={color}
              metalness={themeDark ? 0.42 : 0.25}
              roughness={themeDark ? 0.68 : 0.75}
              emissive={new THREE.Color(b.litColor)}
              emissiveIntensity={nightAmount * b.brightness * (themeDark ? 1.35 : 1)}
            />
          </mesh>
        )
      })}

      {/* Celebrity neighbor towers */}
      <NeighborTowers nightAmount={nightAmount} />

      {/* Far-away skyline silhouette ring */}
      {distant.map((b, i) => (
        <mesh key={`d-${i}`} position={b.position}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={themeDark ? '#0a1426' : '#94a3b8'}
            emissive={new THREE.Color(b.litColor)}
            emissiveIntensity={nightAmount * b.brightness}
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}
