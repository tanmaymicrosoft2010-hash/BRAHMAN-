function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const SOURCES_DB = {
  wikipedia: {
    name: 'Wikipedia',
    favicon: 'W',
    url: 'https://en.wikipedia.org',
  },
  nasa: {
    name: 'NASA',
    favicon: 'N',
    url: 'https://nasa.gov',
  },
  britannica: {
    name: 'Britannica',
    favicon: 'B',
    url: 'https://britannica.com',
  },
  spacecom: {
    name: 'Space.com',
    favicon: 'S',
    url: 'https://space.com',
  },
  esa: {
    name: 'ESA',
    favicon: 'E',
    url: 'https://esa.int',
  },
};

const OVERVIEWS = {
  'black hole': {
    title: 'Black Hole',
    aiOverview: `A black hole is a region of spacetime where gravity is so intense that nothing—not even light—can escape. Formed when massive stars collapse under their own gravity at the end of their life cycle, black holes warp the fabric of space-time around them in ways that challenge our understanding of physics.

The event horizon marks the point of no return, beyond which all matter and energy are inexorably drawn toward the singularity—a point of infinite density at the core. Despite their reputation as cosmic vacuum cleaners, black holes play a fundamental role in galaxy formation and evolution.

Recent advances in observational astronomy, including the Event Horizon Telescope's direct imaging of M87* and Sagittarius A*, have opened a new era in black hole research, confirming predictions made by general relativity nearly a century ago.`,
    sources: [
      { id: 'wikipedia', title: 'Black hole - Wikipedia', snippet: 'A black hole is a massive, compact astronomical object whose gravitational pull is so strong that nothing can escape it.' },
      { id: 'nasa', title: 'What Is a Black Hole? | NASA', snippet: 'Black holes are among the most mysterious cosmic objects, much studied but not fully understood.' },
      { id: 'britannica', title: 'Black hole | Definition, Formation, Types, & Facts', snippet: 'Black hole, cosmic body of extremely intense gravity from which nothing, not even light, can escape.' },
    ],
  },
  default: {
    title: 'Search Result',
    aiOverview: `This is an AI-generated overview of the search topic. It synthesizes information from multiple authoritative sources to provide a comprehensive understanding of the subject matter.

The overview aims to capture the essential aspects of the topic, highlighting key concepts, recent developments, and areas of ongoing research or discussion. Information is drawn from verified academic and professional sources.`,
    sources: [
      { id: 'wikipedia', title: 'Topic - Wikipedia', snippet: 'A comprehensive overview of the topic from the free encyclopedia.' },
      { id: 'nasa', title: 'Topic Overview | NASA', snippet: 'Scientific overview and latest research findings from NASA.' },
      { id: 'spacecom', title: 'Topic: Latest News & Discoveries', snippet: 'Recent developments and expert analysis on the topic.' },
    ],
  },
};

export function getSearchData(query) {
  const key = query?.toLowerCase().trim();
  const data = OVERVIEWS[key] || OVERVIEWS.default;

  const seed = hashString(query || 'default');

  const sources = data.sources.map((s) => {
    const db = SOURCES_DB[s.id];
    return { ...s, ...db };
  });

  return {
    query,
    seed,
    title: data.title,
    aiOverview: data.aiOverview,
    sources,
  };
}

export function getPlanetConfig(seed) {
  const rng = seededRandom(seed);
  const r = () => rng();

  const palettes = [
    { base: '#6b8a9e', land: '#4a7c6f', atmos: '#8ab4d6', accent: '#c9a87c' },
    { base: '#c47a5a', land: '#8b5e3c', atmos: '#d4a88a', accent: '#e8cfa5' },
    { base: '#5a7a9a', land: '#3d6b5e', atmos: '#7aaec8', accent: '#b8a88a' },
    { base: '#9a7a5a', land: '#7a5a3a', atmos: '#c8a88a', accent: '#d4c4a4' },
    { base: '#7a8a9a', land: '#5a7a6a', atmos: '#9abed8', accent: '#c4b49a' },
    { base: '#b87a5a', land: '#7a4a3a', atmos: '#d4a88a', accent: '#e8d4b8' },
  ];

  const palette = palettes[Math.floor(r() * palettes.length)];

  const terrainRoughness = 0.4 + r() * 0.4;
  const hasRing = r() > 0.55;
  const ringColor = r() > 0.5 ? '#c8b89a' : '#8a9aa8';
  const ringSize = 1.6 + r() * 0.4;

  const hasMoon = true;
  const moonOrbitRadius = 2.2 + r() * 0.3;
  const moonSize = 0.08 + r() * 0.06;
  const moonColor = r() > 0.5 ? '#8a8a8a' : '#6a6a6a';
  const moonOrbitSpeed = 0.3 + r() * 0.2;

  const rotationSpeed = 0.05 + r() * 0.08;

  return {
    palette,
    terrainRoughness,
    hasRing,
    ringColor,
    ringSize,
    hasMoon,
    moonOrbitRadius,
    moonSize,
    moonColor,
    moonOrbitSpeed,
    rotationSpeed,
  };
}
