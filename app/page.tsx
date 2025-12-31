'use client';

import React, { useState, useEffect } from 'react';

// --- SUB-COMPONENT: COUNTDOWN ---
const Countdown = () => {
  const calculateTimeLeft = () => {
    // Target: Jan 5, 2026 midnight
    const target = new Date('2026-01-05T00:00:00');
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4 md:gap-6 lg:gap-8 text-white">
      <TimeUnit value={formatNum(timeLeft.days)} label="DAYS" />
      <Separator />
      <TimeUnit value={formatNum(timeLeft.hours)} label="HOURS" />
      <Separator />
      <TimeUnit value={formatNum(timeLeft.minutes)} label="MINS" />
      <Separator />
      <TimeUnit value={formatNum(timeLeft.seconds)} label="SECS" />
    </div>
  );
};

const Separator = () => (
  <div className="hidden md:block text-xl md:text-3xl opacity-20 font-light mt-1 select-none">:</div>
);

const TimeUnit: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center min-w-[60px] md:min-w-[80px] lg:min-w-[100px]">
    <span className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight tabular-nums">
      {value}
    </span>
    <span className="text-[7px] md:text-[9px] tracking-[0.4em] opacity-40 font-bold mt-3">
      {label}
    </span>
  </div>
);

// --- MAIN APPLICATION DESIGN ---
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
        <p className="text-[6px] md:text-xs tracking-[0.4em] text-white">
          INFINITE SCREEN ARCHITECTURE
        </p>
        <br/>
        <p className="text-[10px] md:text-xs font-bold tracking-[0.6em]">
          PLAY <span className="text-yellow-400">&bull;</span> LEARN <span className="text-yellow-400">&bull;</span> FORGE
        </p>
      </header>
      
      {/* MAIN */}
      <section className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl z-10 text-center space-y-12 md:space-y-16">
        <div className="w-full flex justify-center">
          <Countdown />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="z-10 w-full flex flex-col items-center space-y-6 md:space-y-8 px-4 text-center opacity-60">
        <div className="flex flex-col space-y-4 md:space-y-6">
          
          <p className="text-[8px] md:text-xs tracking-[0.4em] text-white">
            KAOS*
          </p>
          
          <p className="text-[8px] md:text-xs tracking-[0.3em]">
            <a 
              href="http://abambres.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-yellow-400 opacity-90 hover:opacity-100 transition-all duration-300 underline underline-offset-4 decoration-yellow-400/20 hover:decoration-yellow-400/60"
            >
              THE ABAMBRES IMAGINARIUM
            </a>
          </p>
          
          <p className="text-[8px] md:text-xs tracking-[0.8em]">
            2026
          </p>
          
        </div>
      </footer>
    </main>
  );
};
