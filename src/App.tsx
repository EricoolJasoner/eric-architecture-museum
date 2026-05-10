import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MainLayout } from '@/components/layout/MainLayout'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { IntroScreen } from '@/components/viewer/IntroScreen'
import { useDeviceType } from '@/hooks/useDeviceType'
import { useAppStore } from '@/store/useAppStore'

export default function App() {
  const device = useDeviceType()
  const theme = useAppStore((s) => s.theme)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <div className={`w-full h-full ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
      {device === 'mobile' ? <MobileLayout /> : <MainLayout />}
      <AnimatePresence>
        {showIntro && <IntroScreen onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>
    </div>
  )
}
