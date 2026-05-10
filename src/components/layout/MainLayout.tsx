import { TopBar } from './TopBar'
import { LandmarkSidebar } from '@/components/sidebar/LandmarkSidebar'
import { ArchitectureCanvas } from '@/components/viewer/ArchitectureCanvas'
import { ViewerControls } from '@/components/viewer/ViewerControls'
import { InfoPanel } from '@/components/panel/InfoPanel'

export function MainLayout() {
  return (
    <div className="relative w-full h-full">
      <ArchitectureCanvas />
      <TopBar />
      <LandmarkSidebar />
      <ViewerControls />
      <InfoPanel />
    </div>
  )
}
