import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 80

export function DustParticles() {
  const ref = useRef()

  const data = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 300
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
      const brightness = 0.7 + Math.random() * 0.3
      colors[i * 3] = brightness
      colors[i * 3 + 1] = brightness
      colors[i * 3 + 2] = brightness * (0.9 + Math.random() * 0.1)
    }
    return { positions, velocities, colors }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += data.velocities[i * 3]
      pos[i * 3 + 1] += data.velocities[i * 3 + 1]
      pos[i * 3 + 2] += data.velocities[i * 3 + 2]
      if (Math.abs(pos[i * 3]) > 150) data.velocities[i * 3] *= -1
      if (Math.abs(pos[i * 3 + 1]) > 150) data.velocities[i * 3 + 1] *= -1
      if (Math.abs(pos[i * 3 + 2]) > 150) data.velocities[i * 3 + 2] *= -1
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[data.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.15} sizeAttenuation depthWrite={false} />
    </points>
  )
}
