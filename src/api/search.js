const SERPER_URL = 'https://google.serper.dev/search';

export async function fetchSearchResults(query) {
  const apiKey = import.meta.env.VITE_SERPER_API_KEY;

  if (!apiKey) {
    console.warn('Serper API key not found in env');
    return [];
  }

  const res = await fetch(SERPER_URL, {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query, num: 5 }),
  });

  if (!res.ok) {
    console.error('Serper API error:', res.status);
    return [];
  }

  const data = await res.json();
  const results = data.organic || [];

  return results.map((r) => ({
    title: r.title,
    link: r.link,
    snippet: r.snippet,
    source: new URL(r.link).hostname.replace('www.', ''),
    position: r.position,
  }));
}