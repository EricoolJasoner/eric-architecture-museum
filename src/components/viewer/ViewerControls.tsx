import { motion } from 'framer-motion'
import { useAppStore, type ViewMode } from '@/store/useAppStore'

const modes: { id: ViewMode; label: string; icon: string }[] = [
  { id: 'free', label: 'Orbit', icon: '01' },
  { id: 'crossSection', label: 'Section', icon: '02' },
  { id: 'exploded', label: 'Assembly', icon: '03' },
  { id: 'nightLight', label: 'Night', icon: '04' },
]

export function ViewerControls() {
  const theme = useAppStore((s) => s.theme)
  const viewMode = useAppStore((s) => s.viewMode)
  const setViewMode = useAppStore((s) => s.setViewMode)
  const resetView = useAppStore((s) => s.resetView)

  const containerClass =
    theme === 'dark'
      ? 'bg-[#071016]/72 border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.42)]'
      : 'bg-white/82 border-slate-200/70 shadow-[0_20px_60px_rgba(15,23,42,0.14)]'

  const inactiveClass =
    theme === 'dark'
      ? 'text-slate-300 hover:bg-white/7'
      : 'text-slate-700 hover:bg-slate-100'

  const activeClass =
    theme === 'dark'
      ? 'bg-amber-300 text-slate-950'
      : 'bg-slate-950 text-white'

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[calc(100vw-24px)]">
      <div className={`backdrop-blur-2xl border rounded-lg p-1.5 flex items-center gap-1 overflow-x-auto ${containerClass}`}>
        {modes.map((m) => (
          <motion.button
            key={m.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(m.id)}
            className={`min-w-fit px-3 py-2 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${
              viewMode === m.id ? activeClass : inactiveClass
            }`}
          >
            <span className={`text-[9px] leading-none tracking-[0.16em] ${
              viewMode === m.id ? 'text-inherit' : theme === 'dark' ? 'text-amber-200/70' : 'text-slate-400'
            }`}>{m.icon}</span>
            <span>{m.label}</span>
          </motion.button>
        ))}
        <div className={`w-px h-6 mx-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-300'}`} />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={resetView}
          className={`min-w-fit px-3 py-2 rounded-md text-xs font-medium ${inactiveClass}`}
        >
          Reset
        </motion.button>
      </div>
    </div>
  )
}
