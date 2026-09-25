import React from 'react';
import { Element } from '../types/mythology';

interface VisualArtifactProps {
  iconType: string;
  element: Element;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

const ELEMENT_COLORS: Record<Element, { primary: string; secondary: string; glow: string; bg: string }> = {
  Fire: { primary: '#F59E0B', secondary: '#EF4444', glow: 'rgba(245, 158, 11, 0.4)', bg: '#2A1208' },
  Water: { primary: '#06B6D4', secondary: '#3B82F6', glow: 'rgba(6, 182, 212, 0.4)', bg: '#081C2E' },
  Earth: { primary: '#10B981', secondary: '#84CC16', glow: 'rgba(16, 185, 129, 0.4)', bg: '#0D2418' },
  Air: { primary: '#93C5FD', secondary: '#C4B5FD', glow: 'rgba(147, 197, 253, 0.4)', bg: '#101B33' },
  Lightning: { primary: '#FCD34D', secondary: '#F59E0B', glow: 'rgba(252, 211, 77, 0.5)', bg: '#28230B' },
  Shadow: { primary: '#A855F7', secondary: '#6366F1', glow: 'rgba(168, 85, 247, 0.4)', bg: '#1B0F2E' },
  Light: { primary: '#FDE047', secondary: '#F4D58D', glow: 'rgba(253, 224, 71, 0.5)', bg: '#292410' },
};

export const VisualArtifact: React.FC<VisualArtifactProps> = ({
  iconType,
  element,
  name,
  className = '',
  size = 'md'
}) => {
  const ec = ELEMENT_COLORS[element] || ELEMENT_COLORS.Light;

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-full h-48',
    lg: 'w-full h-64 md:h-80',
    hero: 'w-full h-96'
  }[size];

  const renderIconGraphic = () => {
    switch (iconType) {
      case 'dragon':
        return (
          <g transform="translate(100, 100) scale(0.9)">

            <path
              d="M-50,20 C-60,-20 -30,-60 10,-70 C40,-50 60,-20 70,20 C50,15 20,30 0,50 C-20,30 -40,25 -50,20 Z"
              fill="url(#goldGradient)"
              opacity="0.3"
            />
            <path
              d="M-40,40 Q-80,-10 -20,-50 Q40,-70 60,-30 Q30,-10 40,30 Q0,10 -40,40"
              stroke="#D4AF37"
              strokeWidth="2.5"
              fill="none"
            />

            <path d="M-15,-45 L-30,-75 L-10,-55 L0,-85 L10,-55 L30,-75 L15,-45 Z" fill="#F4D58D" />
            <circle cx="-12" cy="-30" r="4" fill="#EF4444" />
            <circle cx="12" cy="-30" r="4" fill="#EF4444" />

            <path d="M0,-15 Q-15,10 0,35 Q15,10 0,-15" fill="url(#fireGradient)" />
          </g>
        );

      case 'phoenix':
        return (
          <g transform="translate(100, 100) scale(0.9)">

            <path
              d="M0,45 C-50,20 -80,-30 -70,-65 C-50,-40 -30,-30 0,-20 C30,-30 50,-40 70,-65 C80,-30 50,20 0,45 Z"
              fill="url(#goldGradient)"
              opacity="0.4"
            />
            <path d="M0,50 Q-90,-10 -50,-70 Q-20,-40 0,-10 Q20,-40 50,-70 Q90,-10 0,50" stroke="#F4D58D" strokeWidth="2.5" fill="none" />

            <path d="M0,-25 L-10,-60 L0,-45 L10,-60 Z" fill="#FDE047" />
            <path d="M-12,-40 L-25,-75 L-8,-55 Z" fill="#F59E0B" />
            <path d="M12,-40 L25,-75 L8,-55 Z" fill="#F59E0B" />

            <path d="M-20,40 Q0,75 -15,90 M0,45 Q0,80 0,95 M20,40 Q0,75 15,90" stroke="#EF4444" strokeWidth="2" fill="none" />
            <circle cx="0" cy="-30" r="16" fill="url(#solarDisc)" opacity="0.6" />
          </g>
        );

      case 'fox':
      case 'kitsune':
        return (
          <g transform="translate(100, 100) scale(0.85)">

            <path d="M-70,30 Q-60,-50 -20,-70 Q0,-50 20,-70 Q60,-50 70,30 Q40,60 0,70 Q-40,60 -70,30 Z" stroke="#D4AF37" strokeWidth="2" fill="none" opacity="0.6" />

            {[-45, -30, -15, 0, 15, 30, 45].map((deg, i) => (
              <line
                key={i}
                x1="0"
                y1="30"
                x2={Math.sin((deg * Math.PI) / 180) * 80}
                y2={Math.cos((deg * Math.PI) / 180) * 80}
                stroke="#F4D58D"
                strokeWidth="1.5"
                opacity="0.7"
              />
            ))}

            <polygon points="0,35 -28,-15 -20,-55 -5,-25 5,-25 20,-55 28,-15" fill="#FAF5E8" />
            <polygon points="-16,-48 -24,-18 -10,-18" fill="#DC2626" />
            <polygon points="16,-48 24,-18 10,-18" fill="#DC2626" />
            <circle cx="0" cy="20" r="3" fill="#1C1917" />

            <circle cx="0" cy="-45" r="9" fill="url(#pearlGlow)" />
          </g>
        );

      case 'tentacle':
        return (
          <g transform="translate(100, 100) scale(0.9)">

            <circle cx="0" cy="0" r="65" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 6" fill="none" opacity="0.4" />
            <path d="M-45,50 Q-65,0 -30,-40 Q-5,-70 -35,-80 Q-40,-50 -10,-20 Q10,10 -45,50" fill="url(#goldGradient)" opacity="0.6" />
            <path d="M45,50 Q65,0 30,-40 Q5,-70 35,-80 Q40,-50 10,-20 Q-10,10 45,50" fill="url(#goldGradient)" opacity="0.6" />
            <path d="M0,60 Q-20,10 0,-40 Q20,-75 0,-85" stroke="#06B6D4" strokeWidth="3" fill="none" />

            <circle cx="-15" cy="15" r="5" fill="#FCD34D" />
            <circle cx="15" cy="15" r="5" fill="#FCD34D" />
          </g>
        );

      case 'eagle':
      case 'garuda':
        return (
          <g transform="translate(100, 100) scale(0.85)">

            <path d="M-80,-20 Q-40,-80 0,-30 Q40,-80 80,-20 Q40,30 0,60 Q-40,30 -80,-20 Z" fill="url(#goldGradient)" opacity="0.4" />
            <path d="M-75,-15 Q-30,-70 0,-25 Q30,-70 75,-15" stroke="#D4AF37" strokeWidth="3" fill="none" />

            <ellipse cx="0" cy="35" rx="14" ry="18" fill="#F59E0B" />
            <polygon points="-8,18 8,18 12,24 -12,24" fill="#FDE047" />

            <polygon points="0,-10 -12,-30 0,-42 12,-30" fill="#F4D58D" />
            <path d="M0,-30 L0,-12 L-6,-22 Z" fill="#D97706" />
          </g>
        );

      case 'lightning':
      case 'hammer':
        return (
          <g transform="translate(100, 100) scale(0.9)">

            <circle cx="0" cy="0" r="60" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
            <path
              d="M10,-65 L-25,-5 L5,-5 L-15,65 L35,-5 L5,-5 Z"
              fill="url(#lightningGlow)"
              stroke="#FDE047"
              strokeWidth="2"
            />
          </g>
        );

      case 'sun':
      case 'ankh':
        return (
          <g transform="translate(100, 100) scale(0.9)">

            <circle cx="0" cy="-20" r="30" fill="url(#solarDisc)" stroke="#D4AF37" strokeWidth="2" />

            <ellipse cx="0" cy="-5" rx="12" ry="16" fill="none" stroke="#F4D58D" strokeWidth="3" />
            <line x1="-25" y1="18" x2="25" y2="18" stroke="#F4D58D" strokeWidth="3" />
            <line x1="0" y1="18" x2="0" y2="65" stroke="#F4D58D" strokeWidth="3" />

            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1={Math.sin((deg * Math.PI) / 180) * 38}
                y1={-20 + Math.cos((deg * Math.PI) / 180) * 38}
                x2={Math.sin((deg * Math.PI) / 180) * 52}
                y2={-20 + Math.cos((deg * Math.PI) / 180) * 52}
                stroke="#D4AF37"
                strokeWidth="2"
              />
            ))}
          </g>
        );

      case 'trishula':
        return (
          <g transform="translate(100, 100) scale(0.9)">

            <path d="M-28,-40 C-30,-10 -5,10 0,15 C5,10 30,-10 28,-40" stroke="#F4D58D" strokeWidth="3" fill="none" />
            <line x1="0" y1="-65" x2="0" y2="70" stroke="#F4D58D" strokeWidth="3.5" />
            <path d="M-28,-40 L-28,-50 L-22,-45" stroke="#F4D58D" strokeWidth="3" fill="none" />
            <path d="M28,-40 L28,-50 L22,-45" stroke="#F4D58D" strokeWidth="3" fill="none" />
            <polygon points="0,-72 -6,-58 6,-58" fill="#D4AF37" />

            <polygon points="-12,30 12,30 0,40 -12,50 12,50" fill="#F59E0B" opacity="0.8" />

            <path d="M-15,-10 A15,15 0 0,0 15,-10 A10,10 0 0,1 -15,-10" fill="#FDE047" opacity="0.8" />
          </g>
        );

      case 'valknut':
        return (
          <g transform="translate(100, 100) scale(0.95)">

            <polygon points="0,-45 35,15 -35,15" stroke="#06B6D4" strokeWidth="2.5" fill="none" opacity="0.7" />
            <polygon points="-25,-25 35,-25 5,45" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
            <polygon points="25,-25 -5,45 -35,-25" stroke="#F4D58D" strokeWidth="2.5" fill="none" opacity="0.8" />

            <circle cx="0" cy="0" r="62" stroke="#D4AF37" strokeWidth="1" strokeDasharray="5 5" fill="none" />
          </g>
        );

      default:

        return (
          <g transform="translate(100, 100) scale(0.9)">
            <circle cx="0" cy="0" r="58" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
            <circle cx="0" cy="0" r="48" stroke="#F4D58D" strokeWidth="1" strokeDasharray="4 6" fill="none" opacity="0.7" />
            <circle cx="0" cy="0" r="32" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.5" />

            <line x1="-58" y1="0" x2="58" y2="0" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
            <line x1="0" y1="-58" x2="0" y2="58" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
            <polygon points="0,-24 24,0 0,24 -24,0" stroke="#FDE047" strokeWidth="2" fill="url(#goldGradient)" opacity="0.3" />
            <circle cx="0" cy="0" r="6" fill="#F4D58D" />
          </g>
        );
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-lg border border-[#243048] ${sizeClasses} ${className}`}
      style={{
        background: `radial-gradient(circle at center, ${ec.bg} 0%, #0A0F1A 85%)`,
      }}
    >

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4D58D" />
            <stop offset="100%" stopColor="#B8860B" />
          </radialGradient>
          <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" />
          </radialGradient>
          <radialGradient id="solarDisc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
          <radialGradient id="pearlGlow" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#0891B2" />
          </radialGradient>
          <linearGradient id="lightningGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="90" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="100" cy="100" r="78" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="68" stroke="rgba(212, 175, 55, 0.08)" strokeWidth="0.5" strokeDasharray="2 3" />

        {renderIconGraphic()}
      </svg>

      {size !== 'sm' && (
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] tracking-widest text-[#9CA3AF] pointer-events-none">
          <span className="font-mono uppercase opacity-70">ARCHIVE REF.</span>
          <span className="font-serif-ancient text-[#D4AF37] font-semibold truncate max-w-[60%]">{name}</span>
        </div>
      )}
    </div>
  );
};

