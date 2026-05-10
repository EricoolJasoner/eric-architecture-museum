import { useEffect, useRef, type ComponentRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '@/store/useAppStore'
import { empireHotspots, HOTSPOT_DEFAULT_TARGET } from './empireHotspots'

export function CameraRig() {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null)
  const activeHotspot = useAppStore((s) => s.activeHotspot)
  const viewMode = useAppStore((s) => s.viewMode)

  const desired = useRef(new THREE.Vector3(...HOTSPOT_DEFAULT_TARGET))

  useEffect(() => {
    if (viewMode === 'exploded') {
      desired.current.set(0, 7.5, 0)
      return
    }
    if (viewMode === 'crossSection') {
      desired.current.set(0, 5.5, 0)
      return
    }
    if (!activeHotspot) {
      desired.current.set(...HOTSPOT_DEFAULT_TARGET)
      return
    }
    const hp = empireHotspots.find((h) => h.id === activeHotspot)
    if (hp) {
      desired.current.set(...hp.position)
    }
  }, [activeHotspot, viewMode])

  useFrame(() => {
    const c = controlsRef.current
    if (!c) return
    c.target.lerp(desired.current, 0.07)
    c.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={7}
      maxDistance={32}
      maxPolarAngle={Math.PI / 2 - 0.05}
      target={HOTSPOT_DEFAULT_TARGET}
    />
  )
}
