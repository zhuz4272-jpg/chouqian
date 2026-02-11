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
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleSaveImage = async () => {
    if (!cardRef.current || isSaving) return;
    setIsSaving(true);

    try {
      // 1. Generate Canvas
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Use 2x scale for better mobile performance/compatibility
        useCORS: true,
        backgroundColor: null, // Transparent background for the card cutout
        logging: false,
        // Add a bit of padding to ensure borders aren't cut off
        x: -4,
        y: -4,
        width: cardRef.current.offsetWidth + 8,
        height: cardRef.current.offsetHeight + 8,
      });

      // 2. Prepare Data
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));

      // 3. Try Native Web Share API (Best for Mobile)
      // This opens the system sheet with "Save Image" / "Share to WeChat" etc.
      if (blob && navigator.share) {
        const file = new File([blob], `2026-fortune-${fortune.id}.png`, { type: 'image/png' });
        const shareData = {
            title: '2026 愿望抽签',
            text: `我抽到了"${fortune.keyword}"！快来看看你的2026运势吧。`,
            files: [file]
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                setIsSaving(false);
                return; // Success!
            } catch (err) {
                console.log("Share cancelled or failed, falling back to preview", err);
                // Fall through to preview modal if user cancelled or it failed
            }
        }
      }

      // 4. Fallback: Show Preview Modal (If Share API not supported or failed)
      setGeneratedImage(dataUrl);

      // 5. Legacy Desktop Download (Only try if not on mobile to avoid weird behavior)
      if (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `2026-fortune-${fortune.id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }

    } catch (error) {
      console.error("Failed to generate image", error);
      alert("生成图片失败，请重试");
    } finally {
      setIsSaving(false);
    }
  };

  // Mobile Preview Modal (Fallback)
  if (generatedImage) {
      return (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-pop-in">
            <div className="text-center mb-6 space-y-2">
                <p className="text-crayon-green text-2xl font-hand font-bold tracking-widest animate-pulse">
                    ✨ 长按图片存储 ✨
                </p>
                <p className="text-white/60 text-sm">
                   也可以截图保存哦
                </p>
            </div>
            
            <div className="relative max-w-sm w-full rounded-2xl p-2 border-2 border-white/10 bg-white/5">
                <img src={generatedImage} alt="Fortune Result" className="w-full h-auto object-contain rounded-xl" />
            </div>

            <button 
                onClick={() => setGeneratedImage(null)}
                className="mt-8 px-10 py-3 bg-white text-crayon-black rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 active:scale-95 transition-all flex items-center gap-2"
            >
                <span className="material-icons-round">arrow_back</span>
                返回
            </button>
        </div>
      );
  }

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
        
        {/* Burst Effect (Ignored during capture) */}
        <div data-html2canvas-ignore>
            <ParticleBurst color={fortune.luckyColor} count={50} />
        </div>

        {/* Close Button (Ignored during capture) */}
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
          
          {/* Footer watermark (Visible in image) */}
          <div className="mt-4 pt-4 w-full border-t border-crayon-black/10 flex justify-between items-end opacity-50">
             <span className="text-xs font-hand text-crayon-black">2026 Wish Fortune</span>
             <span className="text-xs font-hand text-crayon-black">✨ Good Luck</span>
          </div>

          {/* Action Buttons (Ignored during capture) */}
          <div className="flex gap-3 mt-4 w-full" data-html2canvas-ignore>
             <button 
                onClick={handleSaveImage}
                disabled={isSaving}
                className={`flex-1 py-3 bg-white text-crayon-black font-bold text-lg rounded-full border-2 border-crayon-black shadow-[2px_2px_0px_#2D3436] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2 ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
             >
                {isSaving ? (
                    <span className="animate-spin material-icons-round text-sm">autorenew</span>
                ) : (
                    <span className="material-icons-round text-sm">ios_share</span>
                )}
                {isSaving ? '生成中...' : '分享/保存'}
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