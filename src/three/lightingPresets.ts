export type LightPreset = 'tonight' | 'classic' | 'pride' | 'holiday' | 'liberty' | 'sunset'

export interface PresetColors {
  id: LightPreset
  label: string
  emoji: string
  /** edge accent colors for each tier, indexed bottom→top; cycles if shorter */
  tierColors: string[]
  /** per-tier window glow color, indexed bottom→top; falls back to windowGlow */
  tierWindowGlow?: string[]
  spire: string
  spireGlow: string
  /** default window glow used as fallback when tierWindowGlow is absent */
  windowGlow: string
  ambient: string
  fogColor: string
  /** LED column colors that wrap the upper spire mast bottom→top */
  spireColumns?: string[]
  /** subtle horizon tint added to the sky gradient (light-pollution glow) */
  skyTint?: string
}

export const presets: Record<LightPreset, PresetColors> = {
  tonight: {
    id: 'tonight',
    label: 'Tonight Live',
    emoji: '🗽',
    // Edge trim: warm shaft, blue observation deck levels, amber Art Deco crown
    tierColors: ['#fbbf24', '#fbbf24', '#fbbf24', '#fbbf24', '#3b82f6', '#3b82f6', '#fb923c', '#fb923c'],
    // Window glow per tier: warm yellow office floors, blue observation, amber crown
    tierWindowGlow: ['#fde68a', '#fde68a', '#fde68a', '#fde68a', '#60a5fa', '#60a5fa', '#fb923c', '#fb923c'],
    spire: '#3b82f6',
    spireGlow: '#ef4444',
    windowGlow: '#fde68a',
    ambient: '#1e1b4b',
    fogColor: '#3a2a1e',
    spireColumns: ['#3b82f6', '#06b6d4', '#22c55e', '#facc15', '#ef4444'],
    skyTint: '#4a3520',
  },
  classic: {
    id: 'classic',
    label: 'Classic',
    emoji: '🌆',
    tierColors: ['#fbbf24', '#fcd34d', '#fbbf24', '#facc15', '#fbbf24', '#f59e0b', '#fbbf24', '#fbbf24'],
    spire: '#fbbf24',
    spireGlow: '#fef3c7',
    windowGlow: '#fde68a',
    ambient: '#1e293b',
    fogColor: '#0f172a',
  },
  pride: {
    id: 'pride',
    label: 'Pride',
    emoji: '🌈',
    tierColors: ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#f43f5e'],
    spire: '#a855f7',
    spireGlow: '#f0abfc',
    windowGlow: '#fde68a',
    ambient: '#1e1b4b',
    fogColor: '#1e1b4b',
    spireColumns: ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7'],
  },
  holiday: {
    id: 'holiday',
    label: 'Holiday',
    emoji: '🎄',
    tierColors: ['#dc2626', '#16a34a', '#dc2626', '#16a34a', '#dc2626', '#16a34a', '#dc2626', '#16a34a'],
    spire: '#dc2626',
    spireGlow: '#fecaca',
    windowGlow: '#fef3c7',
    ambient: '#0a0e1a',
    fogColor: '#0a0e1a',
    spireColumns: ['#dc2626', '#16a34a', '#dc2626', '#16a34a', '#dc2626'],
  },
  liberty: {
    id: 'liberty',
    label: 'Liberty',
    emoji: '🇺🇸',
    tierColors: ['#2563eb', '#f8fafc', '#dc2626', '#2563eb', '#f8fafc', '#dc2626', '#2563eb', '#f8fafc'],
    spire: '#dc2626',
    spireGlow: '#fecaca',
    windowGlow: '#dbeafe',
    ambient: '#0c1830',
    fogColor: '#0c1830',
    spireColumns: ['#2563eb', '#f8fafc', '#dc2626', '#2563eb', '#f8fafc'],
  },
  sunset: {
    id: 'sunset',
    label: 'Sunset',
    emoji: '🌇',
    tierColors: ['#f97316', '#f59e0b', '#fb7185', '#ec4899', '#a855f7', '#7c3aed', '#6366f1', '#3b82f6'],
    spire: '#f59e0b',
    spireGlow: '#fef3c7',
    windowGlow: '#fed7aa',
    ambient: '#3b0764',
    fogColor: '#1e1b4b',
    skyTint: '#7c2d12',
  },
}

export const presetList: PresetColors[] = [
  presets.tonight,
  presets.classic,
  presets.pride,
  presets.holiday,
  presets.liberty,
  presets.sunset,
]
