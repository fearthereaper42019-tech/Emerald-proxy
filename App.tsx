
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AppGrid from './components/AppGrid';
import AIChat from './components/AIChat';
import GamesGrid from './components/GamesGrid';
import Settings from './components/Settings';
import Features from './components/Features';
import ProxyControls from './components/ProxyControls';
import { ProxyHistoryItem } from './types';
import { sanitizeUrl } from './services/geminiService';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'ai' | 'games' | 'proxy' | 'settings'>('proxy');
  const [history, setHistory] = useState<ProxyHistoryItem[]>([]);
  const [isProxying, setIsProxying] = useState(false);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [backend, setBackend] = useState('Ultraviolet');

  useEffect(() => {
    // Apply saved cloak on load
    const savedTitle = localStorage.getItem('emerald_cloak_title');
    const savedIcon = localStorage.getItem('emerald_cloak_icon');
    if (savedTitle) document.title = savedTitle;
    if (savedIcon) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = savedIcon;
    }

    // Refresh backend selection
    const interval = setInterval(() => {
      const savedBackend = localStorage.getItem('emerald_proxy_backend');
      if (savedBackend && savedBackend !== backend) {
        setBackend(savedBackend);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [backend]);

  const handleProxy = (url: string) => {
    const sanitized = sanitizeUrl(url);
    setActiveUrl(sanitized);
    setIsProxying(true);
    
    setHistory(prev => [
      { id: Date.now().toString(), url: sanitized, timestamp: Date.now() },
      ...prev.slice(0, 9)
    ]);
  };

  const closeProxy = () => {
    setIsProxying(false);
    setActiveUrl(null);
  };

  const handleHome = () => {
    setActiveMode('proxy');
    closeProxy();
  };

  const handleGoToSettings = () => {
    setActiveMode('settings');
    closeProxy();
  };

  const handleInspect = () => {
    alert("Injecting Eruda Console... [DEMO]");
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-700">
      {/* Proxy View Modal/Overlay */}
      {isProxying && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-500">
          <div className="h-14 bg-zinc-950 border-b border-white/10 flex items-center justify-between px-4">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={closeProxy}
                className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="bg-zinc-900 border border-white/10 rounded-md px-3 py-1 text-xs font-mono text-zinc-400 truncate max-w-md uppercase tracking-tighter">
                {backend.toUpperCase()} ENGINE • {activeUrl}
              </div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[10px] text-zinc-500 font-mono tracking-widest hidden sm:block uppercase">Secure Tunneled Session</span>
               <div className="w-2 h-2 rounded-full bg-white animate-pulse white-glow"></div>
            </div>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
             <div className="text-center p-8 max-w-xl">
                <div className="w-24 h-24 border-[1px] border-white/10 border-t-white rounded-full animate-spin mx-auto mb-8 white-border-glow"></div>
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter white-glow italic">INITIALIZING</h2>
                <p className="text-zinc-500 mb-8 font-mono text-xs uppercase tracking-widest">{activeUrl}</p>
                
                <div className="glass-panel p-8 rounded-2xl text-left space-y-4 border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-black text-xs uppercase tracking-widest">Connection Log</h3>
                    <span className="text-[10px] font-mono text-zinc-500">v4.2.0-ULTRA</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-zinc-600">
                    <p className="">[INFO] REGISTERING {backend.toUpperCase()} SW...</p>
                    <p className="">[INFO] BINDING ASSET INTERCEPTORS...</p>
                    <p className="">[INFO] BYPASSING REGIONAL RESTRICTIONS...</p>
                    <p className="text-white animate-pulse">[READY] STARTING BROWSER INSTANCE</p>
                  </div>
                  <div className="pt-6 flex gap-4">
                    <button onClick={closeProxy} className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white py-3 rounded-lg text-xs font-bold transition-all border border-white/10 uppercase tracking-widest">Cancel</button>
                    <a href="https://github.com/titaniumnetwork-dev/Ultraviolet" target="_blank" className="flex-1 bg-white hover:bg-zinc-200 text-black py-3 rounded-lg text-xs font-black text-center uppercase tracking-widest transition-all">Report Issue</a>
                  </div>
                </div>
             </div>
          </div>

          <ProxyControls 
            currentUrl={activeUrl || ''}
            onNavigate={handleProxy}
            onBack={() => console.log('Proxy: Back')}
            onForward={() => console.log('Proxy: Forward')}
            onHome={handleHome}
            onSettings={handleGoToSettings}
            onInspect={handleInspect}
          />
        </div>
      )}

      {/* Main Landing View */}
      <main className="flex-1 flex flex-col justify-center py-10">
        <Header activeMode={activeMode} onModeChange={setActiveMode} />
        
        <div className="mt-8">
          {activeMode === 'proxy' && (
            <>
              <SearchBar onProxy={handleProxy} />
              <AppGrid onLaunch={handleProxy} />
            </>
          )}
          {activeMode === 'ai' && <AIChat />}
          {activeMode === 'games' && <GamesGrid onPlay={handleProxy} />}
          {activeMode === 'settings' && <Settings />}
        </div>
        
        {activeMode === 'proxy' && history.length > 0 && (
          <div className="max-w-3xl w-full mx-auto mt-12 px-4 animate-fade-in">
            <h3 className="text-zinc-800 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 text-center">Historical Access</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleProxy(item.url)}
                  className="bg-zinc-950/50 border border-white/5 hover:border-white/40 px-5 py-2 rounded-full text-zinc-500 hover:text-white text-xs transition-all truncate max-w-[220px] font-mono"
                >
                  {new URL(item.url).hostname}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeMode === 'proxy' && <Features />}
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 text-center bg-black/50 flex flex-col items-center">
        <div className="text-zinc-800 text-[9px] font-mono mb-6 tracking-[0.4em] uppercase">
          Emerald Operations Group &bull; Resilience &bull; Sovereignty &bull; Freedom
        </div>
        <div className="flex justify-center gap-10 mb-8">
          <a href="#" className="text-zinc-600 hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors">Docs</a>
          <a href="https://github.com/titaniumnetwork-dev/Ultraviolet" className="text-zinc-600 hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors">GitHub</a>
          <a href="#" className="text-zinc-600 hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors">Discord</a>
        </div>
        
        <div className="pt-8 border-t border-white/5 w-64">
           <p className="text-zinc-700 text-xs italic font-light opacity-50 hover:opacity-100 transition-opacity duration-500">
             Made with love by <span className="text-white font-medium not-italic">Ayden &lt;3</span>
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
