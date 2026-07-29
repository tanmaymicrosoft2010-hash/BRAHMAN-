import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";

export function Sun() {
  const innerRef = useRef();
  const coronaRef = useRef();

  const coreRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02);
    }
    if (coronaRef.current) {
      coronaRef.current.material.opacity = 0.06 + Math.sin(t * 0.5) * 0.02;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[8, 64, 64]} />
        <meshBasicMaterial color="#FFD86B" />
      </mesh>

      {/* Inner glow */}
      <mesh ref={innerRef}>
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
      <Billboard ref={coronaRef}>
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
