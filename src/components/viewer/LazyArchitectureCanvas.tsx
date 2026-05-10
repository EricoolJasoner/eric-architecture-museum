import { lazy, Suspense } from 'react'
import { LoadingScreen } from './LoadingScreen'

const ArchitectureCanvas = lazy(async () => {
  const m = await import('./ArchitectureCanvas')
  return { default: m.ArchitectureCanvas }
})

export function LazyArchitectureCanvas() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ArchitectureCanvas />
    </Suspense>
  )
}
