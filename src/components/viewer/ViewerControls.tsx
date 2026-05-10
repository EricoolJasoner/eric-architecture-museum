import { motion } from 'framer-motion'
import { useAppStore, type ViewMode } from '@/store/useAppStore'

const modes: { id: ViewMode; label: string; icon: string }[] = [
  { id: 'free', label: 'Free', icon: '◐' },
  { id: 'crossSection', label: 'Section', icon: '◑' },
  { id: 'exploded', label: 'Exploded', icon: '⊕' },
  { id: 'nightLight', label: 'Night', icon: '☾' },
]

export function ViewerControls() {
  const theme = useAppStore((s) => s.theme)
  const viewMode = useAppStore((s) => s.viewMode)
  const setViewMode = useAppStore((s) => s.setViewMode)
  const resetView = useAppStore((s) => s.resetView)

  const containerClass =
    theme === 'dark'
      ? 'bg-white/5 border-white/10'
      : 'bg-white/70 border-slate-200/60'

  const inactiveClass =
    theme === 'dark'
      ? 'text-slate-300 hover:bg-white/5'
      : 'text-slate-700 hover:bg-slate-100'

  const activeClass =
    theme === 'dark'
      ? 'bg-amber-400/20 text-amber-300'
      : 'bg-amber-500/15 text-amber-700'

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className={`backdrop-blur-xl border rounded-2xl p-1.5 flex items-center gap-1 ${containerClass}`}>
        {modes.map((m) => (
          <motion.button
            key={m.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode(m.id)}
            className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === m.id ? activeClass : inactiveClass
            }`}
          >
            <span className="text-base leading-none">{m.icon}</span>
            <span>{m.label}</span>
          </motion.button>
        ))}
        <div className={`w-px h-6 mx-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-300'}`} />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={resetView}
          className={`px-3 py-2 rounded-xl text-xs font-medium ${inactiveClass}`}
        >
          Reset
        </motion.button>
      </div>
    </div>
  )
}
