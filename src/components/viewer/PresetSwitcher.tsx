import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { presetList } from '@/three/lightingPresets'

const presetMarks = {
  tonight: 'NY',
  classic: 'CL',
  pride: 'PR',
  holiday: 'HL',
  liberty: 'US',
  sunset: 'SN',
}

export function PresetSwitcher() {
  const theme = useAppStore((s) => s.theme)
  const active = useAppStore((s) => s.lightPreset)
  const setLightPreset = useAppStore((s) => s.setLightPreset)

  const containerClass =
    theme === 'dark'
      ? 'bg-[#071016]/70 border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.38)]'
      : 'bg-white/82 border-slate-200/70 shadow-[0_18px_55px_rgba(15,23,42,0.14)]'

  const labelClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[calc(100vw-24px)]">
      <div className={`backdrop-blur-2xl border rounded-lg px-3 py-1.5 flex items-center gap-1.5 ${containerClass}`}>
        <span className={`text-[10px] font-semibold uppercase tracking-wider mr-1 hidden sm:inline ${labelClass}`}>
          Light Study
        </span>
        {presetList.map((p) => {
          const isActive = active === p.id
          // gradient swatch from first → last tier color
          const a = p.tierColors[0]
          const b = p.tierColors[Math.floor(p.tierColors.length / 2)]
          const c = p.tierColors[p.tierColors.length - 1]
          const gradient = `linear-gradient(135deg, ${a}, ${b}, ${c})`
          return (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setLightPreset(p.id)}
              title={p.label}
              className={`relative w-8 h-8 rounded-md border transition-all flex items-center justify-center text-[10px] font-black tracking-[0.08em] ${
                isActive
                  ? 'border-white/80 ring-2 ring-amber-300/60'
                  : theme === 'dark'
                    ? 'border-white/15 hover:border-white/40'
                    : 'border-slate-300/60 hover:border-slate-500/60'
              }`}
              style={{ background: gradient }}
            >
              <span className="text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)]">{presetMarks[p.id]}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
