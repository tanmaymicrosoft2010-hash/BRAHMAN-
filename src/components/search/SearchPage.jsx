import { useState, useEffect } from 'react';
import { fetchWikipediaSummary } from '../../api/wikipedia';
import { fetchSearchResults } from '../../api/search';
import { fetchAIOverview } from '../../api/ai';
import '../../styles/SearchPage.css';

const SparklesIcon = () => (
  <svg className="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" /><path d="M3 12h18" />
    <path d="M16.5 7.5l-9 9" /><path d="M7.5 7.5l9 9" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="source-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function TopBar({ onBack }) {
  return (
    <header className="top-bar">
      <button className="brand-btn" onClick={onBack}>BRAHMAN</button>
      <nav className="nav-actions">
        <button className="nav-item">Search</button>
        <button className="nav-item">Settings</button>
        <button className="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

function QueryHeader({ query, sourceCount }) {
  return (
    <div className="query-header">
      <h1 className="query-title">{query}</h1>
      <div className="query-meta">
        <span>Wikipedia Verified</span>
        <div className="query-meta-dot" />
        <span>{sourceCount} Sources</span>
        <div className="query-meta-dot" />
        <span>AI Generated</span>
      </div>
    </div>
  );
}

function AIOverview({ text, loading }) {
  return (
    <div className="ai-overview">
      <div className="ai-header">
        <SparklesIcon />
        <span className="ai-heading">AI Overview</span>
      </div>
      {loading ? (
        <div className="ai-loading">Generating overview...</div>
      ) : text ? (
        <div className="ai-content">
          {text.split('\n\n').filter(Boolean).map((p, i) => (
            <p key={i}>{p.trim()}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function getBadge(domain, index) {
  if (domain?.includes('wikipedia')) return { label: 'Knowledge', className: 'source-badge--knowledge' };
  if (index === 0) return { label: 'Official', className: 'source-badge--official' };
  if (domain?.includes('news') || domain?.includes('reuters') || domain?.includes('bbc')) return { label: 'News', className: 'source-badge--news' };
  return null;
}

function SourceCard({ source, index }) {
  const domain = source.website || source.source || '';
  const badge = getBadge(domain, index);
  const initial = source.initial || domain?.[0]?.toUpperCase() || '?';

  return (
    <a href={source.url || source.link} target="_blank" rel="noopener noreferrer"
      className="source-card"
      style={{ '--i': index }}>
      <div className="source-favicon">{initial}</div>
      <div className="source-body">
        <div className="source-top">
          <span className="source-domain">{domain}</span>
          {badge && <span className={`source-badge ${badge.className}`}>{badge.label}</span>}
        </div>
        <span className="source-title">{source.title}</span>
        <span className="source-snippet">{source.snippet || source.description}</span>
      </div>
      <ExternalIcon />
    </a>
  );
}

function Sources({ sources }) {
  if (!sources?.length) return null;
  return (
    <div className="sources-section">
      {sources.map((s, i) => (
        <SourceCard key={i} source={s} index={i} />
      ))}
    </div>
  );
}

/* â”€â”€â”€ Planet Viewport with Stars â”€â”€â”€ */

function generateStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 0.5 + Math.random() * 1.5;
    const opacity = 0.1 + Math.random() * 0.4;
    stars.push({ x, y, size, opacity });
  }
  return stars;
}

function Stars() {
  const stars = generateStars(60);
  return (
    <div className="space-stars">
      {stars.map((s, i) => (
        <div key={i} className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

function PlanetViewport() {
  return (
    <div className="planet-viewport">
      <Stars />
      <div className="planet-ring" />
      <div className="planet-core" />
      <div className="planet-atmosphere" />
      <div className="moon-orbit">
        <div className="moon" />
      </div>
    </div>
  );
}

export function SearchPage({ query, onBack }) {
  return (
    <main className="brahman-layout">
      <TopBar onBack={onBack} />

      <section className="panel-left">
        <QueryHeader query={query} sourceCount={3} />
        <AIOverview text={null} loading={true} />
        <Sources sources={[]} />
      </section>

      <section className="panel-right">
        <PlanetViewport />
      </section>
    </main>
  );
}