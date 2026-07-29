import { useFrame, useThree } from '@react-three/fiber'

export function CameraController() {
  const { camera } = useThree()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.003
    const offset = 20
    camera.position.x = Math.sin(t) * offset
    camera.position.z = Math.cos(t) * offset
    camera.position.y = 240
    camera.lookAt(0, 0, 30)
  })

  return null
}
