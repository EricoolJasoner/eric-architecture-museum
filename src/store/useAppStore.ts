import { create } from 'zustand'
import type { LightPreset } from '@/three/lightingPresets'

export type ViewMode = 'free' | 'crossSection' | 'exploded' | 'nightLight'
export type Theme = 'dark' | 'light'
export type HotspotId =
  | 'spire'
  | 'steelFrame'
  | 'elevator'
  | 'facade'
  | 'foundation'
  | null
export type LandmarkId =
  | 'empire-state'
  | 'louvre'
  | 'tower-bridge'
  | 'notre-dame'
  | 'colosseum'
  | 'great-wall'
  | 'niagara'

interface AppState {
  activeHotspot: HotspotId
  viewMode: ViewMode
  theme: Theme
  activeLandmark: LandmarkId
  lightPreset: LightPreset

  setActiveHotspot: (id: HotspotId) => void
  setViewMode: (mode: ViewMode) => void
  toggleTheme: () => void
  setActiveLandmark: (id: LandmarkId) => void
  setLightPreset: (preset: LightPreset) => void
  resetView: () => void
}

export const useAppStore = create<AppState>((set) => ({
  activeHotspot: null,
  viewMode: 'free',
  theme: 'dark',
  activeLandmark: 'empire-state',
  lightPreset: 'tonight',

  setActiveHotspot: (id) => set({ activeHotspot: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  setActiveLandmark: (id) => set({ activeLandmark: id }),
  setLightPreset: (preset) => set({ lightPreset: preset }),
  resetView: () => set({ activeHotspot: null, viewMode: 'free' }),
}))
