import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useSolar } from './SolarContext'

export function CameraController() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 30))
  const { selectedPlanet } = useSolar()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.003

    if (selectedPlanet) {
      const angle = t * 3
      const offset = 15
      const desiredX = Math.sin(angle) * offset
      const desiredZ = Math.cos(angle) * offset

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, 0.03)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, 0.03)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 30, 0.03)
      camera.lookAt(target.current)
    } else {
      const offset = 20
      const desiredX = Math.sin(t) * offset
      const desiredZ = Math.cos(t) * offset

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, 0.02)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, 0.02)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 240, 0.02)
      camera.lookAt(target.current)
    }
  })

  return null
}
