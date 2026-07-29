import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function CameraController() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 30))

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.003
    const offset = 20
    const desiredX = Math.sin(t) * offset
    const desiredZ = Math.cos(t) * offset

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, 0.02)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, 0.02)
    camera.position.y = 240
    camera.lookAt(target.current)
  })

  return null
}
