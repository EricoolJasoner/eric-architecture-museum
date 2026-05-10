import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassPanel } from '@/components/common/GlassPanel'
import { useAppStore } from '@/store/useAppStore'
import { empireHotspots } from '@/three/empireHotspots'

type Tab = 'discover' | 'qa' | 'quiz'

const tabs: { id: Tab; label: string }[] = [
  { id: 'discover', label: 'Survey' },
  { id: 'qa', label: 'Details' },
  { id: 'quiz', label: 'Review' },
]

export function InfoPanel() {
  const [tab, setTab] = useState<Tab>('discover')
  const theme = useAppStore((s) => s.theme)
  const activeHotspot = useAppStore((s) => s.activeHotspot)

  const active = empireHotspots.find((h) => h.id === activeHotspot)
  const tabsBgClass = theme === 'dark' ? 'bg-black/24' : 'bg-slate-100'
  const titleClass = theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
  const bodyClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
  const hintClass = theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
  const lineClass = theme === 'dark' ? 'border-white/10' : 'border-slate-200'
  const statClass =
    theme === 'dark'
      ? 'border-white/10 bg-white/[0.04]'
      : 'border-slate-200 bg-white/72'

  return (
    <aside className="absolute top-20 right-4 bottom-4 w-[22rem] z-20 pointer-events-auto">
      <GlassPanel className="h-full flex flex-col overflow-hidden">
        <div className="relative h-36 shrink-0 overflow-hidden">
          <img
            src="/nyc-night-reference.jpg"
            alt=""
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071016] via-[#071016]/24 to-transparent" />
          <div className="absolute left-4 right-4 bottom-3 flex items-end justify-between gap-3">
            <div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-amber-200/78">
                Live Reference
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                Manhattan Night Elevation
              </div>
            </div>
            <div className="rounded-md border border-white/15 bg-black/28 px-2.5 py-1 text-[10px] font-medium text-slate-200 backdrop-blur-xl">
              3D + Field Photo
            </div>
          </div>
        </div>

        <div className={`flex p-1.5 m-3 mb-0 rounded-lg ${tabsBgClass}`}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                tab === t.id
                  ? theme === 'dark'
                    ? 'bg-amber-300 text-slate-950'
                    : 'bg-slate-950 text-white shadow-sm'
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
              {tab === 'discover' && (() => {
                return (
                  <div className="space-y-4">
                    <div className={`text-[10px] uppercase tracking-[0.18em] ${hintClass}`}>
                      New York · Completed 1931
                    </div>
                    <h2 className={`text-2xl font-semibold leading-tight ${titleClass}`}>
                      {active ? active.label : 'Empire State Building'}
                    </h2>
                    <p className={`text-sm leading-relaxed ${bodyClass}`}>
                      {active
                        ? 'The model is focused on this assembly zone. Use section or assembly mode to compare the visible tower skin with the internal structural diagram.'
                        : 'A field-photo guided study of the tower at night: rotate the model, isolate structural layers, and compare lighting zones with the real skyline view.'}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        ['Height', '1,454 ft'],
                        ['Floors', '102'],
                        ['Style', 'Art Deco'],
                      ].map(([label, value]) => (
                        <div key={label} className={`rounded-md border px-2.5 py-2 ${statClass}`}>
                          <div className={`text-[9px] uppercase tracking-[0.16em] ${hintClass}`}>{label}</div>
                          <div className={`mt-1 text-xs font-semibold ${titleClass}`}>{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t pt-4 ${lineClass}`}>
                      <div className={`mb-2 text-[10px] uppercase tracking-[0.18em] ${hintClass}`}>
                        Hotspot Index
                      </div>
                      {empireHotspots.map((h) => {
                        const isOn = activeHotspot === h.id
                        return (
                          <div
                            key={h.id}
                            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors ${
                              isOn
                                ? theme === 'dark'
                                  ? 'bg-amber-300 text-slate-950 border border-amber-200'
                                  : 'bg-slate-950 text-white border border-slate-950'
                                : theme === 'dark'
                                  ? 'text-slate-400 hover:bg-white/[0.04]'
                                  : 'text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isOn ? 'bg-slate-950' : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                            }`} />
                            <span className="font-medium">{h.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}
              {tab === 'qa' && (
                <div className={`space-y-4 text-sm ${bodyClass}`}>
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] ${hintClass}`}>Observation</div>
                    <h2 className={`mt-2 text-xl font-semibold ${titleClass}`}>Night lighting reveals the crown first.</h2>
                    <p className="mt-2 leading-relaxed">
                      In the reference photo, the spire and crown are the brightest read. The interface now treats those colors as the visual anchor, while the model exposes the quieter structural mass below.
                    </p>
                  </div>
                  <div className={`border-t pt-4 ${lineClass}`}>
                    <div className="grid gap-2">
                      {['Art Deco setbacks reduce visual bulk as the tower rises.', 'Dense window grids make the facade feel lighter at night.', 'The spire acts as both landmark signal and navigation point.'].map((item) => (
                        <div key={item} className={`rounded-md border px-3 py-2 ${statClass}`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {tab === 'quiz' && (
                <div className={`space-y-4 text-sm ${bodyClass}`}>
                  <div>
                    <div className={`text-[10px] uppercase tracking-[0.18em] ${hintClass}`}>Quick Check</div>
                    <h2 className={`mt-2 text-xl font-semibold ${titleClass}`}>Which mode best explains structure?</h2>
                    <p className="mt-2 leading-relaxed">
                      Use Section for the elevator core, Assembly for stacked massing, and Night for matching the skyline photo's illuminated crown.
                    </p>
                  </div>
                  <div className={`rounded-md border px-3 py-3 ${statClass}`}>
                    Rotate the tower until the spire matches the photo, then switch to Assembly to see why the crown reads as a separate architectural layer.
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassPanel>
    </aside>
  )
}
