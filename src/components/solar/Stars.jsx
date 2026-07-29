import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BG_COUNT = 1500
const MW_COUNT = 3000

export function Stars() {
  const bgRef = useRef()
  const mwRef = useRef()

  const bgPositions = useMemo(() => {
    const pos = new Float32Array(BG_COUNT * 3)
    for (let i = 0; i < BG_COUNT; i++) {
      const radius = 200 + Math.random() * 1000
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [])

  const mwPositions = useMemo(() => {
    const pos = new Float32Array(MW_COUNT * 3)
    for (let i = 0; i < MW_COUNT; i++) {
      const radius = 300 + Math.random() * 800
      const angle = Math.random() * Math.PI * 2
      const thickness = (Math.random() - 0.5) * 20
      pos[i * 3] = radius * Math.cos(angle)
      pos[i * 3 + 1] = thickness
      pos[i * 3 + 2] = radius * Math.sin(angle)
    }
    return pos
  }, [])

  const mwSizes = useMemo(() => {
    const sizes = new Float32Array(MW_COUNT)
    for (let i = 0; i < MW_COUNT; i++) {
      sizes[i] = 0.15 + Math.random() * 0.3
    }
    return sizes
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (bgRef.current) {
      const material = bgRef.current.material
      material.opacity = 0.4 + Math.sin(t * 0.5) * 0.05
    }
    if (mwRef.current) {
      mwRef.current.rotation.y = t * 0.0002
    }
  })

  return (
    <>
      <points ref={bgRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[bgPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.35} color="#ffffff" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={mwRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[mwPositions, 3]} />
          <bufferAttribute attach="attributes-size" args={[mwSizes, 1]} />
        </bufferGeometry>
        <pointsMaterial size={0.25} color="#d4d0e0" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
      </points>
    </>
  )
}
