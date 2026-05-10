import type { HotspotId } from '@/store/useAppStore'

export interface HotspotData {
  id: NonNullable<HotspotId>
  label: string
  /** 3D world position on/near the building surface */
  position: [number, number, number]
}

export const empireHotspots: HotspotData[] = [
  { id: 'spire',       label: 'Spire & Antenna',     position: [0.25, 12.6, 0.25] },
  { id: 'steelFrame',  label: 'Steel Frame',         position: [1.4,  8.0,  0.0] },
  { id: 'elevator',    label: 'Elevator Core',       position: [0.0,  5.5,  1.25] },
  { id: 'facade',      label: 'Art Deco Facade',     position: [-1.55, 3.0, 0.4] },
  { id: 'foundation',  label: 'Foundation',          position: [1.85, 0.55, 1.5] },
]

export const HOTSPOT_DEFAULT_TARGET: [number, number, number] = [0, 5.5, 0]
