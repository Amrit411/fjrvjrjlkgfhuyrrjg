import React, { useEffect, useRef } from 'react';
import { ArrowDown, Compass, Shield } from 'lucide-react';
import { NavView } from './Navbar';

interface HeroSectionProps {
  onNavigate: (view: NavView) => void;
  onExploreFilter?: (region: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = 90;
    const stars: { x: number; y: number; radius: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.005 + 0.002,
      });
    }

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rotationAngle);
      rotationAngle += 0.0004;

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 260, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([3, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      for (const star of stars) {
        star.alpha += star.speed;
        if (star.alpha > 0.8 || star.alpha < 0.2) star.speed = -star.speed;

        ctx.fillStyle = `rgba(244, 213, 141, ${Math.max(0, star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-12 pb-16">

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full opacity-60 z-0"
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.07) 0%, rgba(8, 11, 18, 0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
          <span className="text-xs sm:text-sm font-serif-ancient tracking-[0.35em] uppercase text-[#D4AF37] font-semibold">
            MYTHOS ATLAS
          </span>
          <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
        </div>

        <h1 className="font-serif-ancient text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F5F5F0] leading-[1.1] mb-6 max-w-4xl">
          EXPLORE THE LEGENDS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D58D] to-[#D4AF37]">
            DISCOVER THE UNKNOWN.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-2xl leading-relaxed mb-10 font-normal">
          “An interactive encyclopedia of mythology, folklore, gods and legendary creatures from cultures around the world.”
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('explore')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F4D58D] text-[#080B12] font-serif-ancient text-sm font-bold tracking-widest uppercase rounded shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE THE ATLAS</span>
          </button>

          <button
            onClick={() => onNavigate('creatures')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#161F30] hover:bg-[#1E293B] text-[#F5F5F0] hover:text-[#D4AF37] border border-[#243048] hover:border-[#D4AF37]/60 font-serif-ancient text-sm font-semibold tracking-widest uppercase rounded transition-all cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>DISCOVER CREATURES</span>
          </button>
        </div>

        <div className="mt-14 pt-8 border-t border-[#243048]/60 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 text-center w-full max-w-2xl">
          <div>
            <div className="font-serif-ancient text-2xl sm:text-3xl font-bold text-[#F4D58D] tabular-nums">7</div>
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-1">World Traditions</div>
          </div>
          <div>
            <div className="font-serif-ancient text-2xl sm:text-3xl font-bold text-[#F4D58D] tabular-nums">35+</div>
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-1">Archived Legends</div>
          </div>
          <div>
            <div className="font-serif-ancient text-2xl sm:text-3xl font-bold text-[#F4D58D] tabular-nums">17</div>
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-1">Legendary Beasts</div>
          </div>
          <div>
            <div className="font-serif-ancient text-2xl sm:text-3xl font-bold text-[#F4D58D] tabular-nums">100%</div>
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mt-1">Interactive Lore</div>
          </div>
        </div>
      </div>

      <div className="relative mt-12 flex flex-col items-center gap-2 text-xs text-[#9CA3AF] tracking-widest uppercase">
        <span className="font-serif-ancient text-[11px] text-[#D4AF37]/80">Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
      </div>
    </section>
  );
};

