import { useState, useEffect } from 'react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 400)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#040507',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: progress >= 100 ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
        pointerEvents: progress >= 100 ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          fontFamily: "'Geist', -apple-system, sans-serif",
          fontSize: '36px',
          fontWeight: 200,
          letterSpacing: '0.4em',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '40px',
          textTransform: 'uppercase',
          paddingLeft: '0.4em',
        }}
      >
        BRAHMAN
      </div>

      <div
        style={{
          width: '200px',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '1px',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: `${Math.min(progress, 100)}%`,
            height: '100%',
            background: 'rgba(255,255,255,0.4)',
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "'SF Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        INITIALIZING SOLAR SYSTEM
      </div>
    </div>
  )
}
