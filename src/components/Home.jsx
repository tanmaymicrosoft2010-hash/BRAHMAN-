import '../styles/Home.css';
import { useRef, useEffect, useCallback } from 'react';

function SearchBar({ onSearch }) {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputRef.current?.value) {
      onSearch?.(inputRef.current.value);
    }
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
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
          placeholder="Search anything... (Ctrl+K)"
          onKeyDown={handleKeyDown}
          spellCheck="false"
          autoComplete="off"
          aria-label="Search"
        />
      </div>

      <p className="helper-text">
        अहम् ब्रह्मास्मि<br />
        <span className="helper-ref">Shlok — 3.14.1 Chandogya Upanishad</span>
      </p>
    </div>
  );
}

const Home = ({ onSearch }) => {
  return (
    <div className="layout-wrapper">
      <div className="ui-layer">
        <SearchBar onSearch={onSearch} />

        <div className="meta-info">
          <div className="meta-label">BRAHMAN</div>
          <div className="meta-divider"></div>
          <div className="meta-status">
            <span className="status-dot"></span>
            <span className="status-text">READY</span>
          </div>
          <div className="meta-line">Search to begin</div>
          <div className="meta-divider"></div>
          <div className="meta-datetime">
            <div className="meta-date">30 JUL 2026</div>
            <div className="meta-time">{(new Date()).toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })} UTC</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
