import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Atmosphere({ radius = 0.42, color = '#4a8bc2' }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.12 + Math.sin(clock.getElapsedTime() * 0.5) * 0.03
    }
  })

  return (
    <mesh ref={ref} scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}
