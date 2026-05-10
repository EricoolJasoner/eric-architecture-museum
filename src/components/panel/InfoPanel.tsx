import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassPanel } from '@/components/common/GlassPanel'
import { useAppStore } from '@/store/useAppStore'

type Tab = 'discover' | 'qa' | 'quiz'

const tabs: { id: Tab; label: string }[] = [
  { id: 'discover', label: 'Discover' },
  { id: 'qa', label: 'Q&A' },
  { id: 'quiz', label: 'Quiz' },
]

export function InfoPanel() {
  const [tab, setTab] = useState<Tab>('discover')
  const theme = useAppStore((s) => s.theme)
  const activeHotspot = useAppStore((s) => s.activeHotspot)

  const tabsBgClass = theme === 'dark' ? 'bg-black/20' : 'bg-slate-100'
  const titleClass = theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
  const bodyClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
  const hintClass = theme === 'dark' ? 'text-slate-500' : 'text-slate-400'

  return (
    <aside className="absolute top-20 right-4 bottom-4 w-80 z-20 pointer-events-auto">
      <GlassPanel className="h-full flex flex-col overflow-hidden">
        <div className={`flex p-1.5 m-3 mb-0 rounded-xl ${tabsBgClass}`}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tab === t.id
                  ? theme === 'dark'
                    ? 'bg-white/10 text-slate-100'
                    : 'bg-white text-slate-900 shadow-sm'
                  : theme === 'dark'
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'discover' && (
                <div className="space-y-3">
                  <h2 className={`text-lg font-bold ${titleClass}`}>
                    Empire State Building
                  </h2>
                  <p className={`text-sm leading-relaxed ${bodyClass}`}>
                    {activeHotspot
                      ? `Selected: ${activeHotspot}. (Knowledge cards will fill in at step 4.)`
                      : 'Click a glowing point on the building to learn how it stands, lights up, and houses people. Try rotating the model!'}
                  </p>
                  <div className={`text-xs uppercase tracking-wider mt-4 ${hintClass}`}>
                    Step 1 placeholder · cards land in step 4
                  </div>
                </div>
              )}
              {tab === 'qa' && (
                <div className={`text-sm ${bodyClass}`}>
                  Engineering Q&A — coming in step 4.
                </div>
              )}
              {tab === 'quiz' && (
                <div className={`text-sm ${bodyClass}`}>
                  Quiz — coming in step 4.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassPanel>
    </aside>
  )
}
