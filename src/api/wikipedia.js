export async function fetchWikipediaSummary(query) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
  });

  if (!res.ok) return null;

  const data = await res.json();

  return {
    title: data.title,
    extract: data.extract,
    url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
    thumbnail: data.thumbnail?.source || null,
  };
}