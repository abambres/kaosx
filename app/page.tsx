'use client';

import React, { useState, useEffect } from 'react';

// --- SUB-COMPONENT: COUNTDOWN ---
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date('2026-01-05T00:00:00');
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex justify-center items-center gap-4 md:gap-8 text-white font-mono">
      {Object.entries(timeLeft).map(([label, val]) => (
        <div key={label} className="flex flex-col items-center min-w-[50px] md:min-w-[70px]">
          <span className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tighter tabular-nums">
            {formatNum(val)}
          </span>
          <span className="text-[7px] md:text-[8px] tracking-[0.4em] opacity-40 font-bold mt-2 uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

// --- MAIN PAGE: THE DESIGN ---
export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`relative h-screen w-full flex flex-col items-center justify-between py-12 md:py-16 px-4 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'} bg-black font-mono tracking-[0.2em] z-10`}>
      
      {/* HEADER */}
      <header className="z-10 text-center opacity-60">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase">
          Play | Learn | Forge
        </span>
      </header>
      
      {/* MAIN CONTENT: The Isä Identity */}
      <section className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl z-10 text-center space-y-12 md:space-y-16">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white leading-none">
          [<span className="text-yellow-400 animate-pulse">Isä</span>] is coming<span className="animate-bounce inline-block">.</span>
        </h1>
        
        <div className="w-full flex justify-center scale-90 md:scale-100">
          <Countdown />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="z-10 w-full flex flex-col items-center space-y-6 md:space-y-8 px-4 text-center opacity-60">
        <div className="flex flex-col space-y-4 md:space-y-6">
          <p className="text-[10px] md:text-xs tracking-[0.4em] text-white uppercase">
            Infinite Screen Architecture
          </p>
          
          <p className="text-[10px] md:text-xs tracking-[0.3em]">
            <a 
              href="http://abambres.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-yellow-400 opacity-90 hover:opacity-100 transition-all duration-300 underline underline-offset-4 decoration-yellow-400/20 hover:decoration-yellow-400/60"
            >
              THE ABAMBRES IMAGINARIUM
            </a>
          </p>
          
          <p className="text-[10px] md:text-xs tracking-[0.8em]">
            2026
          </p>
        </div>
      </footer>
      
      {/* BACKGROUND VIBE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black -z-10"></div>
    </main>
  );
}
