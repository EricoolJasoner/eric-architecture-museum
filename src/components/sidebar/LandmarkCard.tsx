import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import type { Landmark } from '@/data/landmarks'

export function LandmarkCard({ landmark }: { landmark: Landmark }) {
  const theme = useAppStore((s) => s.theme)
  const activeLandmark = useAppStore((s) => s.activeLandmark)
  const setActiveLandmark = useAppStore((s) => s.setActiveLandmark)

  const isActive = activeLandmark === landmark.id
  const isLocked = !landmark.unlocked

  const baseClasses =
    theme === 'dark'
      ? 'bg-white/5 border-white/10 hover:bg-white/10'
      : 'bg-white/60 border-slate-200/60 hover:bg-white'

  const activeClasses =
    theme === 'dark'
      ? 'bg-amber-400/15 border-amber-400/40 hover:bg-amber-400/20'
      : 'bg-amber-500/10 border-amber-500/40 hover:bg-amber-500/15'

  const titleClass = theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
  const metaClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const lockClass =
    theme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-600'

  return (
    <motion.button
      whileHover={isLocked ? {} : { scale: 1.02 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
      onClick={() => !isLocked && setActiveLandmark(landmark.id)}
      disabled={isLocked}
      className={`w-full text-left p-3 rounded-xl border transition-colors ${
        isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${isActive ? activeClasses : baseClasses}`}
    >
      <div className="flex items-start gap-2.5">
        <span className="text-2xl leading-none">{landmark.countryFlag}</span>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-semibold truncate ${titleClass}`}>
            {landmark.name}
          </div>
          <div className={`text-xs mt-0.5 flex items-center gap-1.5 ${metaClass}`}>
            <span>{landmark.era}</span>
            <span>·</span>
            <span>{landmark.type}</span>
          </div>
          {isLocked && (
            <div className={`text-[10px] mt-1.5 inline-block px-2 py-0.5 rounded-full ${lockClass}`}>
              Coming Soon
            </div>
          )}
        </div>
      </div>
    </motion.button>
  )
}
