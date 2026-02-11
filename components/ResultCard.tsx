import React, { useRef, useState } from 'react';
import { Fortune } from '../types';
import { ParticleBurst } from './ParticleBurst';
import html2canvas from 'html2canvas';

interface ResultCardProps {
  fortune: Fortune;
  onClose: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ fortune, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveImage = async () => {
    if (!cardRef.current || isSaving) return;
    setIsSaving(true);

    try {
      // Create canvas from the card element
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High resolution for Retina displays
        backgroundColor: null, // Preserve transparency/rounded corners
        useCORS: true, // Handle external images if any
        logging: false
      });

      // Convert to image URL
      const image = canvas.toDataURL("image/png");

      // Trigger download
      const link = document.createElement('a');
      link.href = image;
      link.download = `2026-fortune-${fortune.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Failed to generate image", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-crayon-black/60 backdrop-blur-sm animate-pop-in"
        onClick={onClose}
      ></div>

      {/* Card Wrapper for Screenshot */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-sm bg-paper border-4 border-crayon-black hand-border p-8 shadow-2xl animate-pop-in transform rotate-1"
      >
        
        {/* Burst Effect on Reveal (Not captured in screenshot usually as it fades, but looks nice live) */}
        <div data-html2canvas-ignore>
            <ParticleBurst color={fortune.luckyColor} count={50} />
        </div>

        {/* Close Button - Ignored in screenshot */}
        <button 
          onClick={onClose}
          data-html2canvas-ignore
          className="absolute -top-4 -right-4 w-10 h-10 bg-white border-2 border-crayon-black rounded-full flex items-center justify-center hover:bg-red-50 transition-colors z-20 shadow-md"
        >
          <span className="material-icons-round text-crayon-black">close</span>
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          
          {/* Top Stamp */}
          <div className="w-20 h-20 rounded-full border-4 border-crayon-red flex items-center justify-center mb-2 shadow-inner bg-white">
            <span className="font-hand text-5xl text-crayon-red">{fortune.title}</span>
          </div>

          {/* Main Keyword */}
          <h2 className="text-3xl font-bold text-crayon-black border-b-2 border-dashed border-crayon-black/20 pb-2 w-full">
            {fortune.keyword}
          </h2>

          {/* Description */}
          <p className="text-lg text-crayon-black/80 font-hand leading-relaxed min-h-[80px] flex items-center justify-center">
            "{fortune.description}"
          </p>

          {/* Lucky Items */}
          <div className="flex gap-4 mt-4 w-full justify-center">
             <div className="flex flex-col items-center bg-white p-2 rounded-xl border-2 border-gray-100 shadow-sm w-24">
                <span className="text-xs text-gray-400 font-sans uppercase">Color</span>
                <div 
                  className="w-8 h-8 rounded-full border-2 border-gray-200 mt-1" 
                  style={{ backgroundColor: fortune.luckyColor }}
                />
             </div>
             <div className="flex flex-col items-center bg-white p-2 rounded-xl border-2 border-gray-100 shadow-sm w-24">
                <span className="text-xs text-gray-400 font-sans uppercase">Number</span>
                <span className="text-2xl font-bold font-hand mt-1">{fortune.luckyNumber}</span>
             </div>
          </div>
          
          {/* Footer watermark for the image (Only visible in screenshot? No, make it visible always but subtle) */}
          <div className="mt-4 pt-4 w-full border-t border-crayon-black/10 flex justify-between items-end opacity-50">
             <span className="text-xs font-hand text-crayon-black">2026 Wish Fortune</span>
             <span className="text-xs font-hand text-crayon-black">✨ Good Luck</span>
          </div>

          {/* Action Buttons - Ignored in screenshot */}
          <div className="flex gap-3 mt-4 w-full" data-html2canvas-ignore>
             <button 
                onClick={handleSaveImage}
                disabled={isSaving}
                className={`flex-1 py-3 bg-white text-crayon-black font-bold text-lg rounded-full border-2 border-crayon-black shadow-[2px_2px_0px_#2D3436] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2 ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
             >
                <span className="material-icons-round text-sm">photo_camera</span>
                {isSaving ? '生成中...' : '保存图片'}
             </button>

             <button 
                onClick={onClose}
                className="flex-1 py-3 bg-crayon-green text-white font-bold text-lg rounded-full border-2 border-crayon-black shadow-[2px_2px_0px_#2D3436] hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
             >
                收下祝福
             </button>
          </div>

        </div>
        
        {/* Corner Decor */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-crayon-black/20"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-crayon-black/20"></div>

      </div>
    </div>
  );
};