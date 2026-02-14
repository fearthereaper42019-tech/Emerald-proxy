
import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [activeBackend, setActiveBackend] = useState('Ultraviolet');

  useEffect(() => {
    const savedBackend = localStorage.getItem('emerald_proxy_backend');
    if (savedBackend) setActiveBackend(savedBackend);
  }, []);

  const cloaks = [
    { 
      name: "Google Classroom", 
      title: "Classes", 
      icon: "https://ssl.gstatic.com/classroom/favicon.png" 
    },
    { 
      name: "Clever", 
      title: "Clever | Portal", 
      // High-quality Blue C icon matching the user's request
      icon: "https://assets.clever.com/launchpad/f08027b/favicon.ico" 
    },
    { 
      name: "PowerSchool", 
      title: "Grades and Attendance", 
      // The specific stylized rainbow 'P' logo as requested
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/6e/8f/64/6e8f6424-640a-6e9f-640a-6e9f640a6e9f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/256x256bb.jpg" 
    },
    { 
      name: "Reset Tab", 
      title: "EMERALD - PROXY", 
      icon: "/favicon.ico" 
    }
  ];

  const backends = [
    { name: 'Ultraviolet', desc: 'Standard industry-leading proxy engine.' },
    { name: 'Scramjet', desc: 'Lightweight and high-speed alternative.' },
    { name: 'Aero', desc: 'Experimental low-latency network protocol.' }
  ];

  const applyCloak = (title: string, iconUrl: string) => {
    document.title = title;
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = iconUrl;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = iconUrl;
      document.head.appendChild(newLink);
    }
    localStorage.setItem('emerald_cloak_title', title);
    localStorage.setItem('emerald_cloak_icon', iconUrl);
  };

  const changeBackend = (name: string) => {
    setActiveBackend(name);
    localStorage.setItem('emerald_proxy_backend', name);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 animate-fade-in pb-20">
      <div className="glass-panel p-8 rounded-3xl border-white/10 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Configuration</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Portal settings & Identity</p>
          </div>
        </div>

        {/* Engine Selection */}
        <section>
          <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Network Engine
          </h3>
          <p className="text-zinc-600 text-xs mb-6 leading-relaxed">
            Choose the backend technology for handling proxy requests. Each offers different compatibility.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {backends.map((b) => (
              <button
                key={b.name}
                onClick={() => changeBackend(b.name)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left ${
                  activeBackend === b.name 
                  ? 'bg-white/10 border-white/40' 
                  : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`font-bold text-sm ${activeBackend === b.name ? 'text-white' : 'text-zinc-400'}`}>
                    {b.name}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono mt-1">{b.desc}</span>
                </div>
                {activeBackend === b.name && (
                  <div className="w-2 h-2 rounded-full bg-white white-glow animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Cloaking */}
        <section>
          <h3 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Tab Cloaking (WIP)
          </h3>
          <p className="text-zinc-600 text-xs mb-6 leading-relaxed">
            Currently work in progress coming soon
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-50 pointer-events-none">
            {cloaks.map((cloak, idx) => (
              <button
                key={idx}
                onClick={() => applyCloak(cloak.title, cloak.icon)}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all text-left group"
              >
                {/* Scaled down preview icon container (w-6 h-6) as requested */}
                <div className="w-6 h-6 rounded bg-black/40 flex items-center justify-center overflow-hidden border border-white/5 p-0.5">
                  <img 
                    src={cloak.icon} 
                    alt="" 
                    className="w-full h-full object-contain pointer-events-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://www.google.com/favicon.ico";
                    }}
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-sm group-hover:white-glow transition-all">{cloak.name}</div>
                  <div className="text-zinc-600 text-[10px] font-mono truncate max-w-[140px]">{cloak.title}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="pt-6 border-t border-white/5 space-y-3">
           {/* Discord Invite Section */}
           <div className="flex items-center justify-between p-4 bg-zinc-950/40 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
                </svg>
                <span className="text-white font-mono text-xs">discord.gg/emeraldproxy</span>
              </div>
              <span className="text-zinc-600 text-[10px] font-mono italic uppercase">(server coming soon)</span>
           </div>

           {/* Active Backend Indicator */}
           <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-white/5">
              <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Active Backend</span>
              <span className="text-white font-mono text-xs uppercase">{activeBackend} v4.2-EMERALD</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
