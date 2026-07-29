import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PlanetLabel } from './PlanetLabel'
import { PlanetInfo } from './PlanetInfo'

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
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    orbitAngle.current += 0.003 * orbitSpeed
    groupRef.current.position.x = Math.cos(orbitAngle.current) * distance
    groupRef.current.position.z = Math.sin(orbitAngle.current) * distance
    meshRef.current.rotation.y += rotSpeed
    if (meshRef.current.material) {
      meshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        meshRef.current.material.emissiveIntensity,
        hovered ? 0.3 : 0,
        0.1
      )
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 14, 14]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.05}
          emissive={color}
          emissiveIntensity={0}
        />
      </mesh>
      {hasRings && <SaturnRings />}
      {hasMoon && <Moon />}
      <PlanetLabel name={name} />
      <PlanetInfo name={name} visible={hovered} />
    </group>
  )
}
