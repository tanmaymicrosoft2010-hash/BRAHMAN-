import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const TRAIL_LENGTH = 60

export function OrbitTrail({ distance, color, speed, phase }) {
  const ref = useRef()
  const positions = useRef(new Float32Array(TRAIL_LENGTH * 3))
  const index = useRef(0)

  useMemo(() => {
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const angle = phase + (i / TRAIL_LENGTH) * Math.PI * 0.5
      positions.current[i * 3] = Math.cos(angle) * distance
      positions.current[i * 3 + 1] = 0
      positions.current[i * 3 + 2] = Math.sin(angle) * distance
    }
  }, [distance, phase])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const angle = phase + t * 0.003 * speed

    positions.current.copyWithin(3, 0)
    const last = (TRAIL_LENGTH - 1) * 3
    positions.current[last] = Math.cos(angle) * distance
    positions.current[last + 1] = 0
    positions.current[last + 2] = Math.sin(angle) * distance

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
          count={TRAIL_LENGTH}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
