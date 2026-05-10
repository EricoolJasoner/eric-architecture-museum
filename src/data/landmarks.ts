import type { LandmarkId } from '@/store/useAppStore'

export interface Landmark {
  id: LandmarkId
  name: string
  countryFlag: string
  era: string
  type: string
  unlocked: boolean
}

export const landmarks: Landmark[] = [
  { id: 'empire-state', name: 'Empire State Building', countryFlag: '🇺🇸', era: '1931', type: 'Skyscraper', unlocked: true },
  { id: 'louvre', name: 'Louvre Museum', countryFlag: '🇫🇷', era: '1793', type: 'Museum', unlocked: false },
  { id: 'tower-bridge', name: 'Tower Bridge', countryFlag: '🇬🇧', era: '1894', type: 'Bridge', unlocked: false },
  { id: 'notre-dame', name: 'Notre-Dame de Paris', countryFlag: '🇫🇷', era: '1345', type: 'Cathedral', unlocked: false },
  { id: 'colosseum', name: 'Colosseum', countryFlag: '🇮🇹', era: '80 AD', type: 'Amphitheatre', unlocked: false },
  { id: 'great-wall', name: 'Great Wall of China', countryFlag: '🇨🇳', era: '700 BC', type: 'Fortification', unlocked: false },
  { id: 'niagara', name: 'Niagara Falls', countryFlag: '🇨🇦', era: 'Natural', type: 'Waterfall', unlocked: false },
]
