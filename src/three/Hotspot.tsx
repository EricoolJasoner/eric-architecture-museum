import { useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore, type HotspotId } from '@/store/useAppStore'

interface Props {
  id: NonNullable<HotspotId>
  position: [number, number, number]
  label: string
  accentColor?: string
}

export function Hotspot({ id, position, label, accentColor = '#fbbf24' }: Props) {
  const [hovered, setHovered] = useState(false)
  const activeHotspot = useAppStore((s) => s.activeHotspot)
  const setActiveHotspot = useAppStore((s) => s.setActiveHotspot)
  const viewMode = useAppStore((s) => s.viewMode)
  const hidden = viewMode === 'exploded' || viewMode === 'crossSection'

  const sphereRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const isActive = activeHotspot === id

  useFrame(({ clock }) => {
    if (hidden) return
    const t = clock.elapsedTime
    const breath = 1 + Math.sin(t * 3) * 0.15
    const target = (hovered ? 1.7 : isActive ? 1.45 : 1.0) * breath
    if (sphereRef.current) {
      const cur = sphereRef.current.scale.x
      sphereRef.current.scale.setScalar(THREE.MathUtils.lerp(cur, target, 0.15))
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = (hovered || isActive ? 5 : 2.5) + Math.sin(t * 4) * 0.4
    }
    if (ringRef.current && isActive) {
      ringRef.current.rotation.z = t * 0.6
      const ringScale = 1.0 + Math.sin(t * 2) * 0.18
      ringRef.current.scale.setScalar(ringScale)
    }
  })

  if (hidden) return null

  return (
    <group position={position}>
      {isActive && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.24, 48]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.55} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      )}

      <mesh
        ref={sphereRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          setActiveHotspot(isActive ? null : id)
        }}
      >
        <sphereGeometry args={[0.085, 24, 24]} />
        <meshStandardMaterial
          ref={matRef}
          color={accentColor}
          emissive={new THREE.Color(accentColor)}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {(hovered || isActive) && (
        <Html
          center
          position={[0, 0.32, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          zIndexRange={[10, 0]}
        >
          <div className="bg-slate-950/85 backdrop-blur-md border border-amber-300/50 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-amber-200 whitespace-nowrap shadow-2xl shadow-amber-500/20">
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}
