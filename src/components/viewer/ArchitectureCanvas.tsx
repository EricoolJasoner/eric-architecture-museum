import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useAppStore } from '@/store/useAppStore'
import { EmpireStateModel } from '@/three/EmpireStateModel'
import { CityBase } from '@/three/CityBase'
import { CrossSection } from '@/three/CrossSection'
import { Postprocessing } from '@/three/Postprocessing'
import { Hotspot } from '@/three/Hotspot'
import { CameraRig } from '@/three/CameraRig'
import { empireHotspots } from '@/three/empireHotspots'
import { presets } from '@/three/lightingPresets'

export function ArchitectureCanvas() {
  const theme = useAppStore((s) => s.theme)
  const lightPreset = useAppStore((s) => s.lightPreset)
  const viewMode = useAppStore((s) => s.viewMode)
  const isDark = theme === 'dark'
  const preset = presets[lightPreset]

  // nightLight viewMode forces night atmosphere regardless of theme
  const isNightMode = isDark || viewMode === 'nightLight'
  const nightAmount = isNightMode ? 1 : 0.15

  const isCrossSection = viewMode === 'crossSection'

  const photoOpacity = isNightMode ? 0.5 : 0.18
  const skylineTone = isNightMode
    ? 'linear-gradient(180deg, rgba(3,7,10,0.46) 0%, rgba(3,7,10,0.2) 42%, rgba(3,7,10,0.68) 100%)'
    : 'linear-gradient(180deg, rgba(248,250,252,0.55) 0%, rgba(248,250,252,0.2) 42%, rgba(226,232,240,0.62) 100%)'

  return (
    <div
      className="absolute inset-0 overflow-hidden transition-[background] duration-1000 ease-in-out"
      style={{
        background:
          theme === 'dark'
            ? `radial-gradient(ellipse at 50% 18%, ${preset.fogColor} 0%, #04070b 72%)`
            : 'radial-gradient(ellipse at 50% 18%, #dbeafe 0%, #f8fafc 72%)',
      }}
    >
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-center transition-opacity duration-1000"
        style={{
          opacity: photoOpacity,
          backgroundImage: `${skylineTone}, url('/nyc-night-reference.jpg')`,
          filter: isNightMode ? 'saturate(0.82) contrast(1.08)' : 'saturate(0.7)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(251,191,36,0.12),transparent_34%),linear-gradient(90deg,rgba(0,0,0,0.52),transparent_22%,transparent_78%,rgba(0,0,0,0.5))]" />
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [16, 9, 16], fov: 38 }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true
          gl.setClearAlpha(0)
        }}
      >
        {isNightMode && <Stars radius={80} depth={40} count={2500} factor={3} saturation={0} fade speed={0.6} />}

        <ambientLight intensity={isNightMode ? 0.25 : 0.55} color={preset.ambient} />
        <hemisphereLight
          args={[isNightMode ? '#475569' : '#bfdbfe', isNightMode ? '#0a0e1a' : '#cbd5e1', isNightMode ? 0.35 : 0.55]}
        />
        <directionalLight
          position={[12, 16, 8]}
          intensity={isNightMode ? 0.6 : 1.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={22}
          shadow-camera-bottom={-20}
          shadow-camera-near={0.5}
          shadow-camera-far={60}
          shadow-bias={-0.0005}
        />

        <EmpireStateModel preset={preset} nightAmount={nightAmount} />
        {!isCrossSection && <CityBase themeDark={isNightMode} nightAmount={nightAmount} />}
        <CrossSection />

        {empireHotspots.map((h) => (
          <Hotspot key={h.id} id={h.id} position={h.position} label={h.label} />
        ))}

        <CameraRig />

        <Postprocessing intensity={isNightMode ? 1.1 : 0.35} />
      </Canvas>
    </div>
  )
}
