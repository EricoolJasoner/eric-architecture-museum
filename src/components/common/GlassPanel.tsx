import type { PropsWithChildren } from 'react'
import { useAppStore } from '@/store/useAppStore'

interface Props {
  className?: string
}

export function GlassPanel({ children, className = '' }: PropsWithChildren<Props>) {
  const theme = useAppStore((s) => s.theme)
  const base =
    theme === 'dark'
      ? 'bg-white/5 border-white/10'
      : 'bg-white/70 border-slate-200/60'
  return (
    <div className={`backdrop-blur-xl border rounded-2xl ${base} ${className}`}>
      {children}
    </div>
  )
}
