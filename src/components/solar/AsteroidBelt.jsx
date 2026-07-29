import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ASTEROID_COUNT = 2000
const INNER_RADIUS = 52
const OUTER_RADIUS = 62
const BELT_THICKNESS = 3

export function AsteroidBelt() {
  const ref = useRef()

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(ASTEROID_COUNT * 3)
    const sz = new Float32Array(ASTEROID_COUNT)
    for (let i = 0; i < ASTEROID_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = INNER_RADIUS + Math.random() * (OUTER_RADIUS - INNER_RADIUS)
      const y = (Math.random() - 0.5) * BELT_THICKNESS
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * r
      sz[i] = 0.05 + Math.random() * 0.15
    }
    return { positions: pos, sizes: sz }
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.00005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#a89070"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
