import { useAppStore } from '@/store/useAppStore'

export function TopBar() {
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  const titleClass = theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
  const subClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-4 md:px-6 py-3 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-lg">
          E
        </div>
        <div>
          <div className={`text-sm font-bold tracking-tight ${titleClass}`}>
            Eric's Youth Daily
          </div>
          <div className={`text-xs ${subClass}`}>
            World Architecture Museum
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleTheme}
          className={`w-9 h-9 rounded-xl backdrop-blur-xl border flex items-center justify-center transition-colors ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
              : 'bg-white/70 border-slate-200/60 hover:bg-white text-slate-700'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  )
}
