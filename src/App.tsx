import { useEffect } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useDeviceType } from '@/hooks/useDeviceType'
import { useAppStore } from '@/store/useAppStore'

export default function App() {
  const device = useDeviceType()
  const theme = useAppStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <div className={`w-full h-full ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
      {device === 'mobile' ? <MobileLayout /> : <MainLayout />}
    </div>
  )
}
