import { Html } from '@react-three/drei'

const PLANET_DATA = {
  Mercury: { distance: '57.9M km', diameter: '4,879 km', dayLength: '59 Earth days', moons: 0 },
  Venus: { distance: '108.2M km', diameter: '12,104 km', dayLength: '243 Earth days', moons: 0 },
  Earth: { distance: '149.6M km', diameter: '12,756 km', dayLength: '24 hours', moons: 1 },
  Mars: { distance: '227.9M km', diameter: '6,792 km', dayLength: '24.6 hours', moons: 2 },
  Jupiter: { distance: '778.6M km', diameter: '142,984 km', dayLength: '9.9 hours', moons: 95 },
  Saturn: { distance: '1.43B km', diameter: '120,536 km', dayLength: '10.7 hours', moons: 146 },
  Uranus: { distance: '2.87B km', diameter: '51,118 km', dayLength: '17.2 hours', moons: 28 },
  Neptune: { distance: '4.50B km', diameter: '49,528 km', dayLength: '16.1 hours', moons: 16 },
}

export function PlanetInfo({ name, visible }) {
  const info = PLANET_DATA[name]
  if (!info) return null

  return (
    <Html position={[0, 0.9, 0]} center style={{ pointerEvents: 'none' }}>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          background: 'rgba(8, 10, 16, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '10px 14px',
          minWidth: '160px',
          fontFamily: "'SF Mono', 'Geist Mono', monospace",
          color: '#fff',
          fontSize: '9px',
          letterSpacing: '0.06em',
          lineHeight: '1.6',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '6px', color: 'rgba(255,255,255,0.9)' }}>
          {name.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>DIST <span style={{ color: 'rgba(255,255,255,0.8)' }}>{info.distance}</span></span>
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>DIA <span style={{ color: 'rgba(255,255,255,0.8)' }}>{info.diameter}</span></span>
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>DAY <span style={{ color: 'rgba(255,255,255,0.8)' }}>{info.dayLength}</span></span>
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>MOON <span style={{ color: 'rgba(255,255,255,0.8)' }}>{info.moons}</span></span>
        </div>
      </div>
    </Html>
  )
}
