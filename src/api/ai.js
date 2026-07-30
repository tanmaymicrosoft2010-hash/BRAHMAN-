export async function fetchAIOverview(query, wikiContext = '', searchResults = []) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    console.warn('Groq API key not found in env');
    return null;
  }

  const systemPrompt = `You are a precise, scientific search assistant. You receive a search query along with context from Wikipedia and top web search results. Synthesize this information into a concise 2-3 paragraph overview. Use clear, authoritative language. Reference key facts from the sources.`;

  let contextBlock = '';

  if (wikiContext) {
    contextBlock += `Wikipedia:\n${wikiContext}\n\n`;
  }

  if (searchResults.length > 0) {
    contextBlock += 'Search Results:\n';
    searchResults.slice(0, 3).forEach((r, i) => {
      contextBlock += `[${i + 1}] ${r.title} (${r.source || r.website}): ${r.snippet || ''}\n`;
    });
  }

  const userPrompt = `Query: ${query}\n\n${contextBlock}\nProvide a concise 2-3 paragraph overview based on this context.`;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 600,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn(`Groq API error (${res.status}): ${text}`);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.warn('Groq API failed:', err.message);
    return null;
  }
}