
import React, { useState, useEffect } from 'react';

interface ProxyControlsProps {
  currentUrl: string;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onHome: () => void;
  onSettings: () => void;
  onInspect: () => void;
}

const ProxyControls: React.FC<ProxyControlsProps> = ({
  currentUrl,
  onNavigate,
  onBack,
  onForward,
  onHome,
  onSettings,
  onInspect
}) => {
  const [urlInput, setUrlInput] = useState(currentUrl);

  useEffect(() => {
    setUrlInput(currentUrl);
  }, [currentUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onNavigate(urlInput);
    }
  };

  return (
    <div className="h-16 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 flex items-center px-4 gap-4 animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-1">
        <button 
          onClick={onHome}
          className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all group"
          title="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:white-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <div className="w-px h-6 bg-white/10 mx-1"></div>
        <button 
          onClick={onBack}
          className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"
          title="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={onForward}
          className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"
          title="Forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="w-full bg-zinc-900/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm font-mono text-zinc-300 focus:outline-none focus:border-white/20 focus:text-white transition-all"
          placeholder="Enter destination..."
        />
      </form>

      <div className="flex items-center gap-1">
        <button 
          onClick={onInspect}
          className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all group"
          title="Inspect Element"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
        <button 
          onClick={onSettings}
          className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all group"
          title="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProxyControls;
