import { Billboard } from "@react-three/drei";

export function Sun() {
  return (
    <group>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[8, 64, 64]} />
        <meshBasicMaterial color="#FFD86B" />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[9.5, 64, 64]} />
        <meshBasicMaterial
          color="#FFD86B"
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[12.5, 64, 64]} />
        <meshBasicMaterial
          color="#FFE9A6"
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Fake corona */}
      <Billboard>
        <mesh>
          <circleGeometry args={[20, 64]} />
          <meshBasicMaterial
            color="#FFD86B"
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* Lighting */}
      <pointLight
        color="#FFD86B"
        intensity={12}
        distance={1000}
        decay={1.6}
      />

      <ambientLight intensity={0.03} />
    </group>
  );
}
