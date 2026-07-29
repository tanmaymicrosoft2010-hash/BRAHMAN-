import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PlanetLabel } from './PlanetLabel'

function SaturnRings() {
  return (
    <mesh rotation-x={Math.PI / 2.4}>
      <ringGeometry args={[1.15, 2.0, 32]} />
      <meshStandardMaterial
        color="#c8b88a"
        roughness={0.9}
        side={THREE.DoubleSide}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

function Moon() {
  const ref = useRef()
  const angle = useRef(Math.random() * Math.PI * 2)

  useFrame(() => {
    angle.current += 0.03
    ref.current.position.x = Math.cos(angle.current) * 0.8
    ref.current.position.z = Math.sin(angle.current) * 0.8
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshStandardMaterial color="#aaaaaa" roughness={0.9} />
    </mesh>
  )
}

export function Planet({ name, radius, distance, color, orbitSpeed, rotSpeed, hasRings, hasMoon, phase }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const orbitAngle = useRef(phase)

  useFrame(() => {
    orbitAngle.current += 0.003 * orbitSpeed
    groupRef.current.position.x = Math.cos(orbitAngle.current) * distance
    groupRef.current.position.z = Math.sin(orbitAngle.current) * distance
    meshRef.current.rotation.y += rotSpeed
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 14, 14]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
      </mesh>
      {hasRings && <SaturnRings />}
      {hasMoon && <Moon />}
      <PlanetLabel name={name} />
    </group>
  )
}
