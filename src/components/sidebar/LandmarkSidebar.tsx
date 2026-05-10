import { GlassPanel } from '@/components/common/GlassPanel'
import { LandmarkCard } from './LandmarkCard'
import { landmarks } from '@/data/landmarks'
import { useAppStore } from '@/store/useAppStore'

export function LandmarkSidebar() {
  const theme = useAppStore((s) => s.theme)
  const labelClass =
    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <aside className="absolute top-20 left-4 bottom-4 w-60 z-20 pointer-events-auto">
      <GlassPanel className="h-full p-4 overflow-hidden flex flex-col">
        <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${labelClass}`}>
          Landmarks
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 -mr-2 pr-2">
          {landmarks.map((l) => (
            <LandmarkCard key={l.id} landmark={l} />
          ))}
        </div>
      </GlassPanel>
    </aside>
  )
}
