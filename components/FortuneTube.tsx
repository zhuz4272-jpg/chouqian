import React from 'react';

interface FortuneTubeProps {
  isShaking: boolean;
}

export const FortuneTube: React.FC<FortuneTubeProps> = ({ isShaking }) => {
  return (
    <div className="relative w-64 h-80 flex flex-col items-center justify-end">
      
      {/* Sticks Container */}
      <div className="absolute top-8 w-40 h-full flex justify-center items-end space-x-2 z-10 pointer-events-none">
        
        {/* Stick 1 (Red) */}
        <div className={`
             w-4 h-32 bg-crayon-red rounded-t-full border-2 border-crayon-black transform origin-bottom transition-transform duration-300
             ${isShaking ? 'animate-jostle' : '-rotate-12 translate-y-16'}
             `} 
             style={{ animationDelay: '0s' }}
        ></div>

        {/* Stick 2 (Green - Tall) */}
        <div className={`
             w-4 h-40 bg-crayon-green rounded-t-full border-2 border-crayon-black transform origin-bottom transition-transform duration-300
             ${isShaking ? 'animate-jostle' : '-rotate-3 translate-y-12'}
             `}
             style={{ animationDelay: '0.1s' }}
        ></div>

        {/* Stick 3 (Blue) */}
        <div className={`
             w-4 h-36 bg-crayon-blue rounded-t-full border-2 border-crayon-black transform origin-bottom transition-transform duration-300
             ${isShaking ? 'animate-jostle' : 'rotate-6 translate-y-14'}
             `}
             style={{ animationDelay: '0.2s' }}
        ></div>
        
        {/* Stick 4 (Purple) */}
        <div className={`
             w-4 h-28 bg-crayon-purple rounded-t-full border-2 border-crayon-black transform origin-bottom transition-transform duration-300
             ${isShaking ? 'animate-jostle' : 'rotate-12 translate-y-20'}
             `}
             style={{ animationDelay: '0.15s' }}
        ></div>
      </div>

      {/* The Cup */}
      <div className={`
            relative z-20 w-48 h-56 bg-white border-[3px] border-crayon-black hand-border 
            flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)] overflow-hidden origin-bottom
            ${isShaking ? 'animate-shake' : ''}
          `}>
        
        {/* Cup Texture */}
        <div className="absolute inset-0 bg-paper-texture opacity-50"></div>
        
        {/* Decorative Strip */}
        <div className="absolute bottom-4 w-full h-16 bg-crayon-green/20 transform -skew-y-3 border-y-2 border-crayon-black/10"></div>
        
        {/* Center Badge */}
        <div className="relative w-24 h-24 bg-red-100 rounded-full border-2 border-dashed border-red-300 flex items-center justify-center transform rotate-3 shadow-inner">
           <div className="absolute inset-0 rounded-full border-2 border-white opacity-50"></div>
           <span className="font-hand text-4xl text-crayon-red select-none">福</span>
        </div>

      </div>

      {/* Mascot / Decoration (Peeking Character) */}
      <div className="absolute -right-8 bottom-4 z-30 w-24 h-24 transform rotate-12 transition-transform duration-300 hover:rotate-6 origin-bottom-left">
          {/* Simple CSS Mascot: Horse Head */}
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-amber-700 rounded-full border-4 border-white shadow-lg overflow-hidden">
                {/* Face */}
                <div className="w-full h-full bg-[#D2691E] relative">
                    <div className="absolute top-4 left-4 w-3 h-3 bg-black rounded-full"></div>
                    <div className="absolute top-4 left-10 w-3 h-3 bg-black rounded-full"></div>
                    <div className="absolute top-8 left-7 w-6 h-4 bg-pink-300 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 left-6 w-8 h-4 border-b-2 border-black rounded-full"></div>
                </div>
            </div>
            {/* Binoculars */}
            <div className="absolute bottom-4 right-8 w-8 h-8 rounded-full border-4 border-crayon-black bg-white/20 backdrop-blur-sm z-10"></div>
            <div className="absolute bottom-4 right-1 w-8 h-8 rounded-full border-4 border-crayon-black bg-white/20 backdrop-blur-sm z-10"></div>
            <div className="absolute bottom-7 right-4 w-6 h-1 bg-crayon-black transform rotate-12 z-10"></div>
          </div>
      </div>

    </div>
  );
};