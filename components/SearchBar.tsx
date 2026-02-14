
import React, { useState, useEffect, useRef } from 'react';
import { getSmartSuggestions, sanitizeUrl } from '../services/geminiService';
import { SmartSuggestion } from '../types';

interface SearchBarProps {
  onProxy: (url: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onProxy }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SmartSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (query.length > 2) {
      debounceTimer.current = setTimeout(async () => {
        setIsLoading(true);
        const results = await getSmartSuggestions(query);
        setSuggestions(results);
        setIsLoading(false);
      }, 500);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onProxy(sanitizeUrl(query));
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 relative animate-fade-in">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-white/20 rounded-2xl blur-sm group-focus-within:bg-white/40 transition duration-300"></div>
        
        <div className="relative flex items-center bg-black border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 white-border-glow">
          <div className="pl-6 text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full bg-transparent border-none text-white py-5 px-4 focus:ring-0 text-xl font-light placeholder:text-zinc-700"
            placeholder="Enter URL or search term..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white hover:bg-zinc-200 text-black font-bold px-8 py-5 transition-colors duration-200"
          >
            PROXY
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-3 glass-panel rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-white/10">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onProxy(s.url);
                  setQuery('');
                  setSuggestions([]);
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left group/item"
              >
                <div>
                  <div className="text-zinc-100 font-medium group-hover/item:text-white">{s.title}</div>
                  <div className="text-zinc-500 text-xs font-mono">{s.url}</div>
                </div>
                <span className="text-[10px] uppercase tracking-tighter bg-white/5 text-zinc-400 px-2 py-1 rounded border border-white/10">
                  {s.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
