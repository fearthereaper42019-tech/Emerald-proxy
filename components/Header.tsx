
import React from 'react';

interface HeaderProps {
  activeMode: 'ai' | 'games' | 'proxy' | 'settings';
  onModeChange: (mode: 'ai' | 'games' | 'proxy' | 'settings') => void;
}

const Header: React.FC<HeaderProps> = ({ activeMode, onModeChange }) => {
  const modes = [
    { id: 'ai', label: 'AI-MODE' },
    { id: 'games', label: 'GAMES' },
    { id: 'proxy', label: 'PROXY' },
    { id: 'settings', label: 'SETTINGS' }
  ] as const;

  return (
    <header className="py-12 text-center animate-fade-in">
      <div className="inline-block relative">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white white-glow mb-8 uppercase">
          -EMERALD-
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`px-4 py-2 font-mono text-sm tracking-[0.2em] transition-all duration-300 border-b-2 flex items-center gap-2 ${
                activeMode === mode.id 
                ? 'text-white border-white white-glow' 
                : 'text-zinc-600 border-transparent hover:text-zinc-300'
              }`}
            >
              <span>{mode.label}</span>
              {mode.id === 'games' && (
                <div className="relative group/warn">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ${activeMode === 'games' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-300'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {/* Tooltip for the warning sign */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-[8px] font-bold uppercase tracking-tighter rounded opacity-0 group-hover/warn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Work In Progress
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-lg"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-lg"></div>
      </div>
    </header>
  );
};

export default Header;
