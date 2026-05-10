import * as THREE from 'three'

/**
 * Module-level clipping plane shared between CrossSection (writer) and
 * EmpireStateModel (reader). Plane normal points along -Z, so points where
 * z > -constant get clipped. Constant = 100 → effectively no clipping (plane
 * far behind the building); constant = 0 → clips the front half (z > 0).
 */
export const crossSectionPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 100)

/** Stable array reference to avoid reallocating per render. */
export const crossSectionPlanes: THREE.Plane[] = [crossSectionPlane]
