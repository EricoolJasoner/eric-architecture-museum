import { TopBar } from './TopBar'
import { LandmarkSidebar } from '@/components/sidebar/LandmarkSidebar'
import { LazyArchitectureCanvas } from '@/components/viewer/LazyArchitectureCanvas'
import { ViewerControls } from '@/components/viewer/ViewerControls'
import { PresetSwitcher } from '@/components/viewer/PresetSwitcher'
import { InfoPanel } from '@/components/panel/InfoPanel'

export function MainLayout() {
  return (
    <div className="relative w-full h-full">
      <LazyArchitectureCanvas />
      <TopBar />
      <LandmarkSidebar />
      <PresetSwitcher />
      <ViewerControls />
      <InfoPanel />
    </div>
  )
}
