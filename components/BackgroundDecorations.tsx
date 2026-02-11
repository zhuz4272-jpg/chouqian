import React from 'react';

export const BackgroundDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* --- Existing Elements --- */}

      {/* Sun - Top Right */}
      <div className="absolute -top-10 -right-10 w-40 h-40 animate-spin-slow opacity-80">
        <div className="absolute inset-0 bg-crayon-yellow rounded-full blur-xl opacity-20"></div>
        <svg viewBox="0 0 100 100" className="w-full h-full text-crayon-yellow fill-current drop-shadow-sm">
          <circle cx="50" cy="50" r="25" className="stroke-crayon-black stroke-2" />
          {/* Rays */}
          {[...Array(8)].map((_, i) => (
            <line 
              key={i}
              x1="50" y1="50" 
              x2="50" y2="10" 
              className="stroke-crayon-yellow stroke-[4px] hand-border"
              transform={`rotate(${i * 45} 50 50) translate(0 -30)`}
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      {/* Cloud - Left */}
      <div className="absolute top-32 -left-8 w-32 h-20 animate-float opacity-90" style={{ animationDelay: '1s' }}>
         <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-blue-50 rounded-full blur-md opacity-50"></div>
            <svg viewBox="0 0 100 60" className="w-full h-full fill-white stroke-blue-200 stroke-2 stroke-dashed">
               <path d="M10 40 Q20 20 40 30 T70 20 Q90 20 90 40 T70 55 T40 55 T10 40 Z" />
            </svg>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-300 font-hand text-sm rotate-6">Good Luck!</span>
         </div>
      </div>

      {/* Green Scribble - Bottom Left */}
      <div className="absolute bottom-20 -left-6 w-48 h-48 opacity-20 transform -rotate-12">
        <div className="w-full h-full animate-sway origin-bottom-left">
           <svg viewBox="0 0 200 200" className="w-full h-full stroke-crayon-green fill-none stroke-[3px]">
              <path d="M20 100 Q60 50 100 100 T180 100" strokeDasharray="10 5" strokeLinecap="round" />
              <path d="M20 120 Q60 70 100 120 T180 120" strokeDasharray="10 5" strokeLinecap="round" />
              <path d="M20 140 Q60 90 100 140 T180 140" strokeDasharray="10 5" strokeLinecap="round" />
           </svg>
        </div>
      </div>

       {/* Random Dots (Existing) */}
       <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-crayon-red rounded-full opacity-60 animate-breathe" style={{ animationDelay: '0s' }}></div>
       <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-crayon-blue rounded-full opacity-50 animate-breathe" style={{ animationDelay: '1.5s' }}></div>
       <div className="absolute top-1/2 right-10 w-2 h-2 bg-crayon-purple rounded-full opacity-70 animate-float" style={{ animationDelay: '0.5s' }}></div>

      {/* --- New Decorative Elements --- */}

      {/* Drawn Star - Top Left */}
      <div className="absolute top-24 left-6 w-12 h-12 opacity-60 animate-spin-slow" style={{ animationDuration: '20s' }}>
         <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-crayon-red stroke-[2px]">
            <path d="M25 2 L31 18 L48 18 L34 28 L39 44 L25 34 L11 44 L16 28 L2 18 L19 18 Z" strokeLinejoin="round" strokeLinecap="round" />
         </svg>
      </div>

      {/* Blue Spiral - Right Middle */}
      <div className="absolute top-1/3 -right-6 w-28 h-28 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
         <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-crayon-blue stroke-[3px]">
            {/* Hand-drawn spiral path approximation */}
            <path d="M50 50 C 55 45, 60 55, 50 60 C 35 65, 30 45, 50 35 C 75 25, 80 60, 50 80" strokeLinecap="round" />
         </svg>
      </div>

      {/* Confetti Triangles - Bottom Right */}
      <div className="absolute bottom-32 right-8 w-8 h-8 opacity-70 animate-sway">
         <svg viewBox="0 0 30 30" className="w-full h-full fill-crayon-purple stroke-crayon-black stroke-1">
            <path d="M15 5 L25 25 L5 25 Z" strokeLinejoin="round" />
         </svg>
      </div>
      <div className="absolute bottom-20 right-20 w-6 h-6 opacity-60 animate-sway" style={{ animationDelay: '1.5s' }}>
         <svg viewBox="0 0 30 30" className="w-full h-full fill-crayon-yellow stroke-crayon-black stroke-1">
            <circle cx="15" cy="15" r="10" />
         </svg>
      </div>

      {/* Small Doodles */}
      <div className="absolute top-1/2 left-8 text-crayon-black opacity-30 font-hand text-3xl animate-breathe font-bold select-none">+</div>
      <div className="absolute top-24 right-1/4 text-crayon-black opacity-20 font-hand text-xl animate-breathe select-none" style={{ animationDelay: '3s' }}>x</div>
      <div className="absolute bottom-10 left-1/3 text-crayon-red opacity-30 font-hand text-5xl animate-breathe select-none" style={{ animationDelay: '1s' }}>*</div>
      
      {/* Tiny Heart */}
      <div className="absolute top-40 right-1/3 w-6 h-6 opacity-40 animate-float" style={{ animationDelay: '4s' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full fill-crayon-red stroke-crayon-black stroke-1">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
      </div>

    </div>
  );
};