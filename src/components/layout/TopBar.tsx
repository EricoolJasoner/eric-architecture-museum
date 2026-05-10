import { useAppStore } from '@/store/useAppStore'

export function TopBar() {
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  const shellClass =
    theme === 'dark'
      ? 'bg-[#071016]/62 border-white/10 text-slate-100 shadow-[0_18px_60px_rgba(0,0,0,0.28)]'
      : 'bg-white/78 border-slate-200/70 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)]'
  const mutedClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-3 md:px-6 py-3 flex items-center justify-between pointer-events-none">
      <div className={`pointer-events-auto h-12 px-3.5 border rounded-lg backdrop-blur-2xl flex items-center gap-3 ${shellClass}`}>
        <div className="w-8 h-8 rounded-md bg-amber-300 text-slate-950 flex items-center justify-center font-black text-sm">
          E
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">
            Eric's Youth Daily
          </div>
          <div className={`text-[10px] uppercase tracking-[0.22em] ${mutedClass}`}>
            Architecture Field Museum
          </div>
        </div>
      </div>

      <div className={`hidden md:flex pointer-events-auto h-12 px-4 border rounded-lg backdrop-blur-2xl items-center gap-5 ${shellClass}`}>
        <div>
          <div className={`text-[9px] uppercase tracking-[0.22em] ${mutedClass}`}>Location</div>
          <div className="text-xs font-medium">New York Night Study</div>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div>
          <div className={`text-[9px] uppercase tracking-[0.22em] ${mutedClass}`}>Focus</div>
          <div className="text-xs font-medium">Empire State Building</div>
        </div>
        <button
          onClick={toggleTheme}
          className={`w-8 h-8 rounded-md border flex items-center justify-center text-sm transition-colors ${
            theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-amber-200'
              : 'bg-white/70 border-slate-200/60 hover:bg-white text-slate-700'
          }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>

      <button
        onClick={toggleTheme}
        className={`md:hidden pointer-events-auto w-10 h-10 rounded-lg border backdrop-blur-2xl flex items-center justify-center ${shellClass}`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </header>
  )
}
