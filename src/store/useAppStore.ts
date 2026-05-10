import { create } from 'zustand'

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

  setActiveHotspot: (id: HotspotId) => void
  setViewMode: (mode: ViewMode) => void
  toggleTheme: () => void
  setActiveLandmark: (id: LandmarkId) => void
  resetView: () => void
}

export const useAppStore = create<AppState>((set) => ({
  activeHotspot: null,
  viewMode: 'free',
  theme: 'dark',
  activeLandmark: 'empire-state',

  setActiveHotspot: (id) => set({ activeHotspot: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  setActiveLandmark: (id) => set({ activeLandmark: id }),
  resetView: () => set({ activeHotspot: null, viewMode: 'free' }),
}))
