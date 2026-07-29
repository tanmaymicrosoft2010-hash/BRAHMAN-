import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Fog } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Sun } from './Sun'
import { Planet } from './Planet'
import { Stars } from './Stars'
import { DustParticles } from './DustParticles'
import { CameraController } from './CameraController'
import { OrbitPath } from './OrbitPath'
import { AsteroidBelt } from './AsteroidBelt'
import { OrbitTrail } from './OrbitTrail'
import { SolarProvider } from './SolarContext'

const PLANETS = [
  { name: 'Mercury', radius: 0.20, distance: 18, color: '#b5b5b5', orbitSpeed: 4.15, rotSpeed: 0.005, phase: 0.5, mass: '3.30e23 kg' },
  { name: 'Venus', radius: 0.35, distance: 28, color: '#e8d5a3', orbitSpeed: 1.62, rotSpeed: -0.002, phase: 2.3, mass: '4.87e24 kg' },
  { name: 'Earth', radius: 0.40, distance: 38, color: '#4a8bc2', orbitSpeed: 1.0, rotSpeed: 0.02, phase: 4.1, hasMoon: true, hasAtmosphere: true, mass: '5.97e24 kg' },
  { name: 'Mars', radius: 0.25, distance: 46, color: '#c4713b', orbitSpeed: 0.53, rotSpeed: 0.018, phase: 5.8, mass: '6.42e23 kg' },
  { name: 'Jupiter', radius: 1.20, distance: 65, color: '#c8a87c', orbitSpeed: 0.084, rotSpeed: 0.04, phase: 1.7, mass: '1.90e27 kg' },
  { name: 'Saturn', radius: 0.90, distance: 84, color: '#e0cfa5', orbitSpeed: 0.034, rotSpeed: 0.038, phase: 3.4, hasRings: true, mass: '5.68e26 kg' },
  { name: 'Uranus', radius: 0.55, distance: 102, color: '#7ec8e3', orbitSpeed: 0.012, rotSpeed: -0.03, phase: 0.9, mass: '8.68e25 kg' },
  { name: 'Neptune', radius: 0.50, distance: 120, color: '#3b5c9e', orbitSpeed: 0.006, rotSpeed: 0.032, phase: 2.8, mass: '1.02e26 kg' },
]

export function SolarSystem() {
  return (
    <Canvas
      camera={{ position: [0, 240, 0], fov: 45, near: 0.1, far: 3000 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.2]}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#040508']} />
      <fog attach="fog" args={['#040508', 200, 800]} />

      <ambientLight intensity={0.06} />

      <group rotation={[THREE.MathUtils.degToRad(12), 0, 0]}>
        <Sun />

        {PLANETS.map((p) => (
          <OrbitPath key={`orbit-${p.name}`} distance={p.distance} />
        ))}

        {PLANETS.map((p) => (
          <OrbitTrail
            key={`trail-${p.name}`}
            distance={p.distance}
            color={p.color}
            speed={p.orbitSpeed}
            phase={p.phase}
          />
        ))}

        {PLANETS.map((p) => (
          <Planet key={p.name} {...p} />
        ))}

        <AsteroidBelt />
      </group>

      <Stars />
      <DustParticles />
      <CameraController />

      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
