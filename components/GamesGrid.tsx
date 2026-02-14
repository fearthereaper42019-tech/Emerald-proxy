
import React from 'react';

interface Game {
  name: string;
  tag: string;
  url: string;
  image: string;
  desc: string;
}

interface GamesGridProps {
  onPlay: (url: string) => void;
}

const GamesGrid: React.FC<GamesGridProps> = ({ onPlay }) => {
  const games: Game[] = [
    { 
      name: "Emerald Runner", 
      tag: "Original", 
      url: "https://classic.minecraft.net/",
      image: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1470&auto=format&fit=crop",
      desc: "Endless 2D blocky dash through pixelated landscapes chasing the ultimate data gem."
    },
    { 
      name: "Shadow Protocol", 
      tag: "Original", 
      url: "https://boxelrebound.com/",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1470&auto=format&fit=crop",
      desc: "Top-down stealth infiltration. Bypass terminal security and remain unseen."
    },
    { 
      name: "Void Descent", 
      tag: "Original", 
      url: "https://agar.io/",
      image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1472&auto=format&fit=crop",
      desc: "An atmospheric fall into the glitchy abyss. How deep can you survive?"
    },
    { 
      name: "Neon Pulse", 
      tag: "Original", 
      url: "https://geometry-dash.co/",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1470&auto=format&fit=crop",
      desc: "Rhythm-based survival in a 16-bit soundscape. Synchronize or perish."
    },
    { 
      name: "Crystal Clicker", 
      tag: "Original", 
      url: "https://cookieclicker.ee/",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1470&auto=format&fit=crop",
      desc: "Extract precious data gems from the cluster. Optimize your mining drones."
    },
    { 
      name: "Binary Breach", 
      tag: "Original", 
      url: "https://wordle.com/",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
      desc: "Logic puzzles designed to crack any firewall. Decrypt the source code."
    },
  ];

  return (
    <div className="max-w-5xl w-full mx-auto px-4 animate-fade-in pb-20">
      {/* WIP Hazard Banner */}
      <div className="flex flex-col items-center justify-center mb-12 p-8 glass-panel rounded-3xl border-yellow-500/20 bg-yellow-500/5">
        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 border border-yellow-500/40">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-yellow-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Coming soon</h2>
        <p className="text-yellow-500/80 font-mono text-xs uppercase tracking-[0.3em] font-bold">Work in progress</p>
      </div>

      {/* Grid - Disabled interaction */}
      <div className="relative group/grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-40 pointer-events-none filter grayscale transition-all duration-700">
          {games.map((game, i) => (
            <div
              key={i}
              className="group relative h-64 bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden text-left"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={game.image} 
                  alt={game.name} 
                  className="w-full h-full object-cover opacity-30 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">
                  {game.tag}
                </span>
                <h3 className="text-white font-black text-xl uppercase tracking-tight mb-2">
                  {game.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Absolute overlay to ensure no clicking even if styles are bypassed */}
        <div className="absolute inset-0 z-[20] cursor-not-allowed" title="Gaming mode is currently under construction."></div>
      </div>

      <p className="text-center mt-12 text-zinc-800 text-[10px] font-mono uppercase tracking-[0.4em] opacity-50">
        Emerald Entertainment &bull; Sovereignty Guaranteed
      </p>
    </div>
  );
};

export default GamesGrid;
