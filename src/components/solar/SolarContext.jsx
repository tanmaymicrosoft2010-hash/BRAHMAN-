import { createContext, useContext, useState, useCallback } from 'react'

const SolarContext = createContext(null)

export function SolarProvider({ children }) {
  const [selectedPlanet, setSelectedPlanet] = useState(null)

  const selectPlanet = useCallback((name) => {
    setSelectedPlanet((prev) => (prev === name ? null : name))
  }, [])

  return (
    <SolarContext.Provider value={{ selectedPlanet, selectPlanet }}>
      {children}
    </SolarContext.Provider>
  )
}

export function useSolar() {
  return useContext(SolarContext)
}
