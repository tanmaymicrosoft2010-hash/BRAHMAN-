import { Html } from '@react-three/drei'

export function PlanetLabel({ name }) {
  return (
    <Html position={[0, 0.6, 0]} center>
      <span
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '10px',
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight: 300,
          letterSpacing: '0.2em',
          whiteSpace: 'nowrap',
          textShadow: '0 0 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.6)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {name.toUpperCase()}
      </span>
    </Html>
  )
}
