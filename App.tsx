import React, { useState, useEffect } from 'react';
import { FortuneTube } from './components/FortuneTube';
import { ResultCard } from './components/ResultCard';
import { BackgroundDecorations } from './components/BackgroundDecorations';
import { ParticleBurst } from './components/ParticleBurst';
import { getFortune } from './services/fortuneService';
import { Fortune } from './types';

const App: React.FC = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  // Play sound effect (optional/simulated)
  const playShakeSound = () => {
    // In a real app, we'd play an audio file here
  };

  const handleDrawFortune = async () => {
    if (loading || isShaking) return;

    setIsShaking(true);
    setLoading(true);
    playShakeSound();

    try {
      // 1. Start Animation
      // 2. Fetch data in parallel
      // Drastically reduced wait time: 300ms minimum shake
      const [data] = await Promise.all([
        getFortune(),
        new Promise(resolve => setTimeout(resolve, 300)) 
      ]);

      setFortune(data);
      setIsShaking(false);
      setShowBurst(true); // Trigger particles
      
      // Reset burst after animation plays
      setTimeout(() => setShowBurst(false), 1200);
      
      // Immediate result display (50ms)
      setTimeout(() => {
        setShowResult(true);
        setLoading(false);
      }, 50);

    } catch (error) {
      console.error("Failed to draw fortune", error);
      setIsShaking(false);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setFortune(null);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between py-6 px-4 font-hand text-crayon-black">
      
      {/* Background Elements */}
      <BackgroundDecorations />

      {/* Header */}
      <header className="relative z-10 flex flex-col items-center mt-4 md:mt-10 animate-pop-in">
        <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight tracking-wider transform -rotate-2 drop-shadow-sm">
          <span className="text-crayon-red block md:inline mr-2">2026</span>
          <span className="text-crayon-black">愿望抽签</span>
        </h1>
        <div className="bg-crayon-green/20 px-4 py-1 rounded-full mt-2 transform rotate-1">
          <p className="text-lg md:text-xl text-crayon-greenDark font-bold tracking-wide">
            新年新气象 · 开启好运
          </p>
        </div>
      </header>

      {/* Main Interaction Area */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <FortuneTube isShaking={isShaking} />
        {showBurst && fortune && (
          <ParticleBurst color={fortune.luckyColor} count={40} />
        )}
      </main>

      {/* Footer / CTA */}
      <footer className="relative z-20 mb-8 md:mb-12 flex flex-col items-center gap-6">
        <button
          onClick={handleDrawFortune}
          disabled={loading || showResult}
          className={`
            group relative w-24 h-24 md:w-32 md:h-32 rounded-full focus:outline-none 
            transition-all duration-300 transform
            ${loading ? 'scale-95 cursor-wait opacity-90' : 'hover:scale-110 active:scale-95 cursor-pointer'}
          `}
        >
          {/* Animated Rings */}
          <div className="absolute inset-0 rounded-full border-4 border-crayon-green opacity-30 animate-ping" />
          <div className="absolute inset-0 rounded-full border-4 border-crayon-black bg-crayon-green shadow-[4px_4px_0px_rgba(45,52,54,1)] group-hover:shadow-[2px_2px_0px_rgba(45,52,54,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full" />
          </div>
          
          {/* Text */}
          <div className="relative z-10 text-white leading-none text-center transform -rotate-6">
            <span className="block text-xl md:text-2xl mb-1">开启</span>
            <span className="block text-2xl md:text-4xl font-bold">愿望</span>
          </div>
          
          {/* Sparkles */}
          <span className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</span>
          <span className="absolute -bottom-1 -left-4 text-xl animate-bounce delay-75">✨</span>
        </button>
      </footer>

      {/* Result Modal */}
      {showResult && fortune && (
        <ResultCard fortune={fortune} onClose={handleReset} />
      )}

    </div>
  );
};

export default App;