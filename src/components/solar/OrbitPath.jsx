import { useMemo } from 'react'
import * as THREE from 'three'

export function OrbitPath({ distance }) {
  const geometry = useMemo(() => {
    const segments = 80
    const pts = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [distance])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.07} />
    </line>
  )
}
