import { useMemo, useRef, type PropsWithChildren } from 'react'
import { Edges, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { PresetColors } from './lightingPresets'
import { useAppStore } from '@/store/useAppStore'
import { crossSectionPlanes } from './crossSectionPlane'

/** Procedurally generates a paired albedo + emissive texture for a tier. */
function makeFacadeTextures(cols: number, rows: number, windowGlow: string, seed: number) {
  const size = 512
  const baseCanvas = document.createElement('canvas')
  baseCanvas.width = size
  baseCanvas.height = size
  const baseCtx = baseCanvas.getContext('2d')!

  const emCanvas = document.createElement('canvas')
  emCanvas.width = size
  emCanvas.height = size
  const emCtx = emCanvas.getContext('2d')!

  baseCtx.fillStyle = '#cbd5e1'
  baseCtx.fillRect(0, 0, size, size)
  emCtx.fillStyle = '#000000'
  emCtx.fillRect(0, 0, size, size)

  baseCtx.fillStyle = '#94a3b8'
  for (let g = 0; g <= cols; g++) {
    const x = (g / cols) * size
    baseCtx.fillRect(x - 1, 0, 2, size)
  }

  const cellW = size / cols
  const cellH = size / rows
  const winW = cellW * 0.55
  const winH = cellH * 0.62

  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cx = x * cellW + (cellW - winW) / 2
      const cy = y * cellH + (cellH - winH) / 2
      const isLit = rand() < 0.32
      baseCtx.fillStyle = isLit ? windowGlow : '#1e293b'
      baseCtx.fillRect(cx, cy, winW, winH)
      if (isLit) {
        emCtx.fillStyle = windowGlow
        emCtx.fillRect(cx, cy, winW, winH)
      }
    }
  }

  const baseTex = new THREE.CanvasTexture(baseCanvas)
  baseTex.wrapS = baseTex.wrapT = THREE.RepeatWrapping
  baseTex.anisotropy = 8
  baseTex.colorSpace = THREE.SRGBColorSpace

  const emTex = new THREE.CanvasTexture(emCanvas)
  emTex.wrapS = emTex.wrapT = THREE.RepeatWrapping
  emTex.anisotropy = 8

  return { baseTex, emTex }
}

interface TierProps {
  position: [number, number, number]
  size: [number, number, number]
  cols: number
  rows: number
  edgeColor: string
  windowGlow: string
  seed: number
  emissiveIntensity: number
}

function Tier({ position, size, cols, rows, edgeColor, windowGlow, seed, emissiveIntensity }: TierProps) {
  const { baseTex, emTex } = useMemo(
    () => makeFacadeTextures(cols, rows, windowGlow, seed),
    [cols, rows, windowGlow, seed],
  )
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        map={baseTex}
        emissiveMap={emTex}
        emissive={new THREE.Color(windowGlow)}
        emissiveIntensity={emissiveIntensity}
        metalness={0.4}
        roughness={0.55}
        clippingPlanes={crossSectionPlanes}
        clipShadows
      />
      <Edges threshold={15} color={edgeColor} />
    </mesh>
  )
}

interface SectionProps {
  explodeOffset: number
  explodeAmount: number
  label?: string
  showLabel?: boolean
  labelOffset?: [number, number, number]
}

function ExplodableSection({
  explodeOffset,
  explodeAmount,
  label,
  showLabel,
  labelOffset = [3.0, 0, 0],
  children,
}: PropsWithChildren<SectionProps>) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    if (!ref.current) return
    const desired = explodeOffset * explodeAmount
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, desired, 0.1)
  })
  return (
    <group ref={ref}>
      {children}
      {showLabel && label && (
        <Html
          center
          position={labelOffset}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          zIndexRange={[10, 0]}
        >
          <div className="bg-slate-950/85 backdrop-blur-md border border-cyan-300/50 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-200 whitespace-nowrap shadow-2xl shadow-cyan-500/30">
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

export interface EmpireStateModelProps {
  preset: PresetColors
  nightAmount: number
}

export function EmpireStateModel({ preset, nightAmount }: EmpireStateModelProps) {
  const viewMode = useAppStore((s) => s.viewMode)
  const explodeAmount = viewMode === 'exploded' ? 1 : 0
  const showLabels = viewMode === 'exploded'

  const spireLightRef = useRef<THREE.PointLight>(null)
  const spireMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const beaconMatRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pulse = 1.4 + Math.sin(t * 1.6) * 0.6 + Math.sin(t * 4.1) * 0.2
    if (beaconMatRef.current) {
      beaconMatRef.current.emissiveIntensity = (1.5 + pulse) * (0.5 + nightAmount * 1.5)
    }
    if (spireLightRef.current) {
      spireLightRef.current.intensity = (0.4 + pulse * 0.5) * nightAmount
    }
    if (spireMatRef.current) {
      spireMatRef.current.emissiveIntensity = (0.3 + pulse * 0.4) * (0.4 + nightAmount)
    }
  })

  const c = preset.tierColors
  const pick = (i: number) => c[i % c.length]
  const win = (i: number) => preset.tierWindowGlow?.[i % (preset.tierWindowGlow?.length ?? 1)] ?? preset.windowGlow
  const glow = 0.2 + nightAmount * 1.6
  const columns = preset.spireColumns

  return (
    <group>
      {/* SECTION 1 — Foundation (sinks down when exploded) */}
      <ExplodableSection explodeOffset={-1.0} explodeAmount={explodeAmount} label="Foundation" showLabel={showLabels} labelOffset={[2.8, 0.5, 0]}>
        <Tier position={[0, 0.5, 0]} size={[4.0, 1.0, 3.6]} cols={20} rows={5}
          edgeColor={pick(0)} windowGlow={win(0)} seed={11} emissiveIntensity={glow} />
      </ExplodableSection>

      {/* SECTION 2 — Steel Frame (anchor, no offset) */}
      <ExplodableSection explodeOffset={0} explodeAmount={explodeAmount} label="Steel Frame" showLabel={showLabels} labelOffset={[2.6, 2.25, 0]}>
        <Tier position={[0, 2.25, 0]} size={[3.2, 2.5, 2.9]} cols={16} rows={14}
          edgeColor={pick(1)} windowGlow={win(1)} seed={47} emissiveIntensity={glow} />
      </ExplodableSection>

      {/* SECTION 3 — Floor Plates (setback band + main shaft) */}
      <ExplodableSection explodeOffset={1.5} explodeAmount={explodeAmount} label="Floor Plates" showLabel={showLabels} labelOffset={[2.4, 5.5, 0]}>
        <Tier position={[0, 3.75, 0]} size={[2.9, 0.5, 2.6]} cols={14} rows={3}
          edgeColor={pick(2)} windowGlow={win(2)} seed={91} emissiveIntensity={glow} />
        <Tier position={[0, 6.3, 0]} size={[2.4, 4.6, 2.2]} cols={12} rows={26}
          edgeColor={pick(3)} windowGlow={win(3)} seed={137} emissiveIntensity={glow} />
      </ExplodableSection>

      {/* SECTION 4 — Facade Shell (upper setback + Art Deco crown) */}
      <ExplodableSection explodeOffset={3.5} explodeAmount={explodeAmount} label="Facade Shell" showLabel={showLabels} labelOffset={[2.0, 9.4, 0]}>
        <Tier position={[0, 8.85, 0]} size={[2.0, 0.4, 1.85]} cols={10} rows={2}
          edgeColor={pick(4)} windowGlow={win(4)} seed={181} emissiveIntensity={glow} />
        <Tier position={[0, 9.25, 0]} size={[1.6, 0.4, 1.5]} cols={8} rows={2}
          edgeColor={pick(5)} windowGlow={win(5)} seed={211} emissiveIntensity={glow} />
        <Tier position={[0, 9.65, 0]} size={[1.2, 0.4, 1.1]} cols={6} rows={2}
          edgeColor={pick(6)} windowGlow={win(6)} seed={233} emissiveIntensity={glow} />
        <Tier position={[0, 10.0, 0]} size={[0.9, 0.3, 0.85]} cols={5} rows={1}
          edgeColor={pick(7)} windowGlow={win(7)} seed={257} emissiveIntensity={glow} />
      </ExplodableSection>

      {/* SECTION 5 — Spire (mast, pod, antenna, beacon) */}
      <ExplodableSection explodeOffset={5.5} explodeAmount={explodeAmount} label="Spire" showLabel={showLabels} labelOffset={[1.8, 12.0, 0]}>
        {/* Mooring mast */}
        <mesh position={[0, 10.7, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.5, 1.0, 20]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.55}
            roughness={0.35}
            emissive={new THREE.Color(preset.spire)}
            emissiveIntensity={0.15 + nightAmount * 0.6}
            clippingPlanes={crossSectionPlanes}
            clipShadows
          />
          <Edges threshold={15} color={preset.spire} />
        </mesh>

        {/* Top observatory pod */}
        <mesh position={[0, 11.4, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.36, 0.35, 20]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.6}
            roughness={0.3}
            emissive={new THREE.Color(preset.spire)}
            emissiveIntensity={0.2 + nightAmount * 0.8}
            clippingPlanes={crossSectionPlanes}
            clipShadows
          />
        </mesh>

        {/* Tapered spire base */}
        <mesh position={[0, 11.85, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.28, 0.55, 16]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.7}
            roughness={0.25}
            clippingPlanes={crossSectionPlanes}
            clipShadows
          />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 12.85, 0]}>
          <cylinderGeometry args={[0.025, 0.09, 1.5, 12]} />
          <meshStandardMaterial
            ref={spireMatRef}
            color={preset.spire}
            metalness={0.85}
            roughness={0.2}
            emissive={new THREE.Color(preset.spire)}
            emissiveIntensity={0.4}
            clippingPlanes={crossSectionPlanes}
          />
        </mesh>

        {/* LED column strips wrapping the upper spire mast — the iconic illuminated antenna */}
        {columns && columns.map((col, i) => {
          const angle = (i / columns.length) * Math.PI * 2
          const radius = 0.085
          return (
            <mesh
              key={`led-${i}`}
              position={[Math.cos(angle) * radius, 12.4, Math.sin(angle) * radius]}
            >
              <cylinderGeometry args={[0.012, 0.012, 1.5, 6]} />
              <meshStandardMaterial
                color={col}
                emissive={new THREE.Color(col)}
                emissiveIntensity={2.5 + nightAmount * 2}
                toneMapped={false}
                clippingPlanes={crossSectionPlanes}
              />
            </mesh>
          )
        })}

        {/* Lower spire base accent rings (the orange/blue Art Deco LED bands) */}
        {columns && (
          <>
            <mesh position={[0, 11.05, 0]}>
              <torusGeometry args={[0.36, 0.025, 8, 32]} />
              <meshStandardMaterial
                color={columns[0]}
                emissive={new THREE.Color(columns[0])}
                emissiveIntensity={2 + nightAmount * 1.5}
                toneMapped={false}
                clippingPlanes={crossSectionPlanes}
              />
            </mesh>
            <mesh position={[0, 11.55, 0]}>
              <torusGeometry args={[0.32, 0.022, 8, 32]} />
              <meshStandardMaterial
                color={columns[Math.min(2, columns.length - 1)]}
                emissive={new THREE.Color(columns[Math.min(2, columns.length - 1)])}
                emissiveIntensity={2 + nightAmount * 1.5}
                toneMapped={false}
                clippingPlanes={crossSectionPlanes}
              />
            </mesh>
          </>
        )}

        {/* Aviation beacon */}
        <mesh position={[0, 13.7, 0]}>
          <sphereGeometry args={[0.08, 20, 20]} />
          <meshStandardMaterial
            ref={beaconMatRef}
            color={preset.spireGlow}
            emissive={new THREE.Color(preset.spireGlow)}
            emissiveIntensity={3}
            toneMapped={false}
            clippingPlanes={crossSectionPlanes}
          />
        </mesh>
        <pointLight ref={spireLightRef} position={[0, 13.7, 0]} color={preset.spireGlow} intensity={0.8} distance={6} />
      </ExplodableSection>
    </group>
  )
}
