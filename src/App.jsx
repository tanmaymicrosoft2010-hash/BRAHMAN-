import { useState } from 'react';
import Home from './components/Home';
import { SearchPage } from './components/search/SearchPage';

function App() {
  const [query, setQuery] = useState(null);

  if (query) {
    return <SearchPage query={query} onBack={() => setQuery(null)} />;
  }

  return <Home onSearch={setQuery} />;
}

export default App;
