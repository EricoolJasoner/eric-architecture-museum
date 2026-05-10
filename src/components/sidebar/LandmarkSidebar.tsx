import { GlassPanel } from '@/components/common/GlassPanel'
import { LandmarkCard } from './LandmarkCard'
import { landmarks } from '@/data/landmarks'
import { useAppStore } from '@/store/useAppStore'

export function LandmarkSidebar() {
  const theme = useAppStore((s) => s.theme)
  const labelClass =
    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <aside className="absolute top-20 left-4 bottom-4 w-64 z-20 pointer-events-auto">
      <GlassPanel className="h-full p-4 overflow-hidden flex flex-col">
        <div className={`text-[10px] font-semibold uppercase tracking-[0.24em] mb-1.5 ${labelClass}`}>
          Collection
        </div>
        <div className={theme === 'dark' ? 'text-slate-100' : 'text-slate-950'}>
          <div className="text-lg font-semibold leading-tight">World Icons</div>
          <div className={`mt-1 text-xs leading-relaxed ${labelClass}`}>
            Night-view studies, structural views, and guided architectural details.
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className={`rounded-md border px-2.5 py-2 ${theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white/70'}`}>
            <div className={labelClass}>Open</div>
            <div className="mt-0.5 font-semibold">1</div>
          </div>
          <div className={`rounded-md border px-2.5 py-2 ${theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200 bg-white/70'}`}>
            <div className={labelClass}>Archive</div>
            <div className="mt-0.5 font-semibold">7</div>
          </div>
        </div>
        <div className="mt-4 flex-1 overflow-y-auto space-y-2 -mr-2 pr-2">
          {landmarks.map((l) => (
            <LandmarkCard key={l.id} landmark={l} />
          ))}
        </div>
      </GlassPanel>
    </aside>
  )
}
