import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

interface Props {
  intensity: number
}

export function Postprocessing({ intensity }: Props) {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.5}
        mipmapBlur
        radius={0.85}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.55} />
    </EffectComposer>
  )
}
