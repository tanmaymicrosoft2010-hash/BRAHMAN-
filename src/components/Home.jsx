import React, { useRef, useEffect, useCallback, useState } from 'react';
import '../styles/Home.css';
import { SolarSystem } from './solar/SolarSystem';
import { SolarProvider, useSolar } from './solar/SolarContext';
import { LoadingScreen } from './LoadingScreen';

const PLANET_NAMES = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

function SearchBar() {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const { selectPlanet } = useSolar();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputRef.current?.value) {
      const query = inputRef.current.value.toLowerCase();
      const match = PLANET_NAMES.find((p) => p.toLowerCase().startsWith(query));
      if (match) {
        selectPlanet(match);
        inputRef.current.value = match;
        setSuggestions([]);
      }
    }
    if (e.key === 'Escape') {
      inputRef.current?.blur();
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
      const matches = PLANET_NAMES.filter((p) => p.toLowerCase().startsWith(query));
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    selectPlanet(name);
    inputRef.current.value = name;
    setSuggestions([]);
  };

  const handleSearchShortcut = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleSearchShortcut);
    return () => window.removeEventListener('keydown', handleSearchShortcut);
  }, [handleSearchShortcut]);

  return (
    <div className="center-cluster">
      <h1 className="logo">Brahman</h1>
      
      <div className="search-bar">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search a planet... (Ctrl+K)"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          spellCheck="false"
          autoComplete="off"
          aria-label="Search planets"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((name) => (
            <button
              key={name}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <p className="helper-text">
        अहम् ब्रह्मास्मि<br />
        <span className="helper-ref">Shlok — 3.14.1 Chandogya Upanishad</span>
      </p>
    </div>
  );
}

const Home = () => {

  return (
    <SolarProvider>
      <div className="layout-wrapper">
        <LoadingScreen />

        {/* Layer 1: Three.js Solar System */}
        <div className="scene-layer">
          <SolarSystem />
        </div>

        {/* Layer 2: Vignette Overlay */}
        <div className="vignette-layer"></div>

        {/* Layer 3: Interactive UI */}
        <div className="ui-layer">
          <SearchBar />

          {/* Bottom Left Telemetry */}
          <div className="meta-info">
            <div className="meta-label">SOLAR SYSTEM</div>
            <div className="meta-divider"></div>
            <div className="meta-status">
              <span className="status-dot"></span>
              <span className="status-text">LIVE</span>
            </div>
            <div className="meta-line">Heliocentric Position</div>
            <div className="meta-divider"></div>
            <div className="meta-datetime">
              <div className="meta-date">29 JUL 2026</div>
              <div className="meta-time">10:42 UTC</div>
            </div>
            <div className="meta-divider"></div>
            <div className="meta-line">Objects: 8 Planets</div>
            <div className="meta-line">Reference Frame: Ecliptic</div>
          </div>

        </div>
      </div>
    </SolarProvider>
  );
};

export default Home;
