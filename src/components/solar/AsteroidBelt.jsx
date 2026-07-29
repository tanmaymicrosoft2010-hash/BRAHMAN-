import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ASTEROID_COUNT = 2500
const INNER_RADIUS = 52
const OUTER_RADIUS = 62
const BELT_THICKNESS = 4

export function AsteroidBelt() {
  const ref = useRef()

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(ASTEROID_COUNT * 3)
    const sz = new Float32Array(ASTEROID_COUNT)
    const col = new Float32Array(ASTEROID_COUNT * 3)
    for (let i = 0; i < ASTEROID_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = INNER_RADIUS + Math.random() * (OUTER_RADIUS - INNER_RADIUS)
      const y = (Math.random() - 0.5) * BELT_THICKNESS
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * r
      sz[i] = 0.03 + Math.random() * 0.18
      const tint = Math.random()
      col[i * 3] = 0.65 + tint * 0.2
      col[i * 3 + 1] = 0.56 + tint * 0.15
      col[i * 3 + 2] = 0.44 + tint * 0.1
    }
    return { positions: pos, sizes: sz, colors: col }
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.rotation.y = t * 0.00005
      ref.current.material.opacity = 0.3 + Math.sin(t * 0.3) * 0.05
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
