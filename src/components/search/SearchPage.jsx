import '../../styles/SearchPage.css';

const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconSparkles = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" /><path d="M3 12h18" />
    <path d="M16.5 7.5l-9 9" /><path d="M7.5 7.5l9 9" />
  </svg>
);

function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand">BRAHMAN</div>
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

function QueryHeader({ query }) {
  return (
    <div className="query-header">
      <h1 className="query-title">{query?.toUpperCase()}</h1>
      <div className="metadata-row">
        <span>Wikipedia Verified</span>
        <div className="dot" />
        <span>3 Sources</span>
        <div className="dot" />
        <span>AI Generated</span>
      </div>
    </div>
  );
}

function AIOverview() {
  return (
    <div className="ai-overview">
      <div className="overview-heading">
        <IconSparkles /> AI Overview
      </div>
      <div className="overview-content">
        <p>
          A black hole is a region of spacetime where gravity is so strong that nothing, including light or other electromagnetic waves, has enough energy to escape its event horizon.
        </p>
        <p>
          The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole. At the center lies a gravitational singularity, a region where spacetime curvature becomes infinite.
        </p>
      </div>
    </div>
  );
}

function SourceCard({ title, website, description, initial }) {
  return (
    <a href="#" className="source-card">
      <div className="source-favicon">{initial}</div>
      <div className="source-info">
        <h3 className="source-title">{title}</h3>
        <div className="source-meta">
          <span>{website}</span>
          <span style={{ opacity: 0.5 }}>— {description}</span>
        </div>
      </div>
      <div className="external-icon">
        <IconExternal />
      </div>
    </a>
  );
}

function Sources() {
  return (
    <div className="sources-container">
      <SourceCard
        title="Black hole"
        website="wikipedia.org"
        description="Overview and physics"
        initial="W"
      />
      <SourceCard
        title="What Is a Black Hole?"
        website="nasa.gov"
        description="Astrophysics division"
        initial="N"
      />
      <SourceCard
        title="Black hole | Definition & Facts"
        website="britannica.com"
        description="Encyclopedia entry"
        initial="B"
      />
    </div>
  );
}

function PlanetViewport() {
  return (
    <div className="planet-viewport">
      <div className="space-background" />
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
      <TopBar />

      <section className="panel-left">
        <QueryHeader query={query} />
        <AIOverview />
        <Sources />
      </section>

      <section className="panel-right">
        <PlanetViewport />
      </section>
    </main>
  );
}
