import { useState } from 'react'
import { TopBar } from './TopBar'
import { LazyArchitectureCanvas } from '@/components/viewer/LazyArchitectureCanvas'
import { ViewerControls } from '@/components/viewer/ViewerControls'
import { PresetSwitcher } from '@/components/viewer/PresetSwitcher'
import { LandmarkCard } from '@/components/sidebar/LandmarkCard'
import { landmarks } from '@/data/landmarks'
import { useAppStore } from '@/store/useAppStore'

type Tab = 'landmarks' | 'explore' | 'learn'

const tabs = [
  { id: 'landmarks' as const, label: 'Landmarks', icon: '🗺️' },
  { id: 'explore' as const, label: 'Explore', icon: '🏙️' },
  { id: 'learn' as const, label: 'Learn', icon: '📖' },
]

export function MobileLayout() {
  const [tab, setTab] = useState<Tab>('explore')
  const theme = useAppStore((s) => s.theme)

  const navContainerClass =
    theme === 'dark'
      ? 'bg-white/5 border-white/10'
      : 'bg-white/80 border-slate-200/60'

  return (
    <div className="relative w-full h-full">
      {tab === 'explore' && (
        <div className="absolute inset-0">
          <LazyArchitectureCanvas />
          <PresetSwitcher />
          <ViewerControls />
        </div>
      )}

      {tab === 'landmarks' && (
        <div className={`absolute inset-0 pt-20 pb-24 px-4 overflow-y-auto ${
          theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
        }`}>
          <div className="space-y-2">
            {landmarks.map((l) => (
              <LandmarkCard key={l.id} landmark={l} />
            ))}
          </div>
        </div>
      )}

      {tab === 'learn' && (
        <div className={`absolute inset-0 pt-20 pb-24 px-4 overflow-y-auto ${
          theme === 'dark' ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-700'
        }`}>
          <div className="text-sm">Learning content coming in step 4.</div>
        </div>
      )}

      <TopBar />

      <nav className="absolute bottom-0 left-0 right-0 z-30 pointer-events-auto">
        <div className={`mx-3 mb-3 backdrop-blur-2xl border rounded-lg flex p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] ${navContainerClass}`}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 rounded-md text-xs font-medium flex flex-col items-center gap-0.5 transition-colors ${
                tab === t.id
                  ? theme === 'dark'
                    ? 'bg-amber-400/15 text-amber-300'
                    : 'bg-amber-500/15 text-amber-700'
                  : theme === 'dark'
                    ? 'text-slate-400'
                    : 'text-slate-600'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
