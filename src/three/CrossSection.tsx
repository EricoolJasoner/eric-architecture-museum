import { useMemo, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/store/useAppStore'
import { crossSectionPlane } from './crossSectionPlane'

/**
 * Internal structural skeleton revealed when in cross-section mode.
 * Models elevator core (center shaft), floor plates (tapering by height),
 * and diagonal wind bracing. Becomes visible only when viewMode === 'crossSection'.
 */
function InternalStructure({ visible }: { visible: boolean }) {
  const floorYs = useMemo(() => {
    const ys: number[] = []
    for (let i = 0; i < 14; i++) {
      ys.push(0.4 + i * 0.7)
    }
    return ys
  }, [])

  return (
    <group visible={visible}>
      {/* Elevator core — center shaft running full height */}
      <mesh position={[0, 5.0, 0]}>
        <boxGeometry args={[0.55, 9.6, 0.55]} />
        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.55}
          emissive={new THREE.Color('#06b6d4')}
          emissiveIntensity={0.6}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>

      {/* Floor plates — width tapers with height */}
      {floorYs.map((y, i) => {
        const w = y < 1.0 ? 3.6 : y < 6.5 ? 2.7 : y < 9.0 ? 2.2 : 1.6
        const d = w * 0.92
        return (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[w, 0.06, d]} />
            <meshStandardMaterial
              color="#fbbf24"
              transparent
              opacity={0.7}
              emissive={new THREE.Color('#f59e0b')}
              emissiveIntensity={0.45}
              metalness={0.4}
              roughness={0.45}
            />
          </mesh>
        )
      })}

      {/* Diagonal wind bracing — left + right */}
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 4.5, 0]} rotation={[0, 0, x < 0 ? Math.PI / 6 : -Math.PI / 6]}>
          <cylinderGeometry args={[0.04, 0.04, 9.5, 8]} />
          <meshStandardMaterial
            color="#f87171"
            emissive={new THREE.Color('#ef4444')}
            emissiveIntensity={0.6}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

export function CrossSection() {
  const viewMode = useAppStore((s) => s.viewMode)
  const isActive = viewMode === 'crossSection'
  const constantRef = useRef(100)

  useFrame(() => {
    const target = isActive ? 0 : 100
    constantRef.current = THREE.MathUtils.lerp(constantRef.current, target, 0.08)
    crossSectionPlane.constant = constantRef.current
  })

  return (
    <group>
      <InternalStructure visible={isActive} />

      {isActive && (
        <>
          <Html center position={[1.9, 5.0, 0]} style={{ pointerEvents: 'none', userSelect: 'none' }} zIndexRange={[10, 0]}>
            <div className="bg-slate-950/90 backdrop-blur-md border border-cyan-300/60 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-200 whitespace-nowrap shadow-2xl shadow-cyan-500/30">
              Elevator Core
            </div>
          </Html>
          <Html center position={[2.0, 2.5, 0]} style={{ pointerEvents: 'none', userSelect: 'none' }} zIndexRange={[10, 0]}>
            <div className="bg-slate-950/90 backdrop-blur-md border border-amber-300/60 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-200 whitespace-nowrap shadow-2xl shadow-amber-500/30">
              Floor Plate
            </div>
          </Html>
          <Html center position={[-2.1, 7.0, 0]} style={{ pointerEvents: 'none', userSelect: 'none' }} zIndexRange={[10, 0]}>
            <div className="bg-slate-950/90 backdrop-blur-md border border-rose-300/60 rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-200 whitespace-nowrap shadow-2xl shadow-rose-500/30">
              Cross Bracing
            </div>
          </Html>
        </>
      )}
    </group>
  )
}
