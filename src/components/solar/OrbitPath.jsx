import { useMemo } from 'react'
import * as THREE from 'three'

export function OrbitPath({ distance, dashed = false }) {
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
      {dashed ? (
        <lineDashedMaterial
          color="#ffffff"
          transparent
          opacity={0.07}
          dashSize={1.5}
          gapSize={1.0}
        />
      ) : (
        <lineBasicMaterial color="#ffffff" transparent opacity={0.07} />
      )}
    </line>
  )
}
