import type { PropsWithChildren } from 'react'
import { useAppStore } from '@/store/useAppStore'

interface Props {
  className?: string
}

export function GlassPanel({ children, className = '' }: PropsWithChildren<Props>) {
  const theme = useAppStore((s) => s.theme)
  const base =
    theme === 'dark'
      ? 'bg-[#071016]/72 border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.42)]'
      : 'bg-white/82 border-slate-200/70 shadow-[0_24px_70px_rgba(15,23,42,0.14)]'
  return (
    <div className={`backdrop-blur-2xl border rounded-lg ${base} ${className}`}>
      {children}
    </div>
  )
}
