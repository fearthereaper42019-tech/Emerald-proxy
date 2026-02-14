
import React from 'react';

const Features: React.FC = () => {
  const cards = [
    {
      title: "Ultraviolet Engine",
      desc: "Powered by advanced proxy tech for maximum compatibility.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Encrypted Traffic",
      desc: "High-grade encryption for ISP-level privacy protection.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Global Reach",
      desc: "Access any content from anywhere in the world instantly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-24 px-4 pb-12">
      {cards.map((card, i) => (
        <div key={i} className="glass-panel p-8 rounded-3xl hover:border-white/40 transition-all group duration-500">
          <div className="text-white mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
            {card.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
          <p className="text-zinc-500 leading-relaxed text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
