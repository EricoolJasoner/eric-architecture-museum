import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useAppStore } from '@/store/useAppStore'

function PlaceholderBuilding() {
  return (
    <group>
      {/* base block */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.3} roughness={0.45} />
      </mesh>
      {/* main shaft */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 2, 1.4]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.35} roughness={0.4} />
      </mesh>
      {/* upper section */}
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1, 0.9]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.35} roughness={0.4} />
      </mesh>
      {/* tower top */}
      <mesh position={[0, 4.4, 0]} castShadow>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* spire */}
      <mesh position={[0, 5.1, 0]}>
        <cylinderGeometry args={[0.04, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} emissive="#fbbf24" emissiveIntensity={0.15} />
      </mesh>
      {/* ground */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

export function ArchitectureCanvas() {
  const theme = useAppStore((s) => s.theme)
  const top = theme === 'dark' ? '#0f172a' : '#e2e8f0'
  const bottom = theme === 'dark' ? '#020617' : '#f8fafc'

  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [7, 5, 7], fov: 45 }}>
        <ambientLight intensity={theme === 'dark' ? 0.4 : 0.7} />
        <directionalLight
          position={[6, 9, 4]}
          intensity={theme === 'dark' ? 1.1 : 1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <PlaceholderBuilding />
        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={4}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2 - 0.05}
          target={[0, 2, 0]}
        />
      </Canvas>
    </div>
  )
}
