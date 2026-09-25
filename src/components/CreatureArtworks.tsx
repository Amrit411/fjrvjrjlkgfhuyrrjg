import React from 'react';

interface CreatureSVGProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Procedural Vector Artworks for:
 * 1. Dragon (Norse/Global Wyrm & Primordial Fire Drake)
 * 2. Phoenix (Solar Firebird of Rebirth & Heliopolis Bennu)
 * 3. Kitsune (Nine-Tailed Celestial Fox Spirit of Inari)
 * 4. Garuda (Golden-Winged King of Birds & Mount of Vishnu)
 */

export const DragonSVG: React.FC<CreatureSVGProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dragon Vector Illustration"
    >
      <defs>
        {/* Background Radial Glow */}
        <radialGradient id="dragonBgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#450A0A" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#1C0A0A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#080B12" stopOpacity="1" />
        </radialGradient>

        {/* Dragon Flame Gradient */}
        <linearGradient id="dragonFireGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="40%" stopColor="#F97316" />
          <stop offset="80%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Dragon Scaled Body Gradient */}
        <linearGradient id="dragonScaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="45%" stopColor="#991B1B" />
          <stop offset="85%" stopColor="#450A0A" />
          <stop offset="100%" stopColor="#180505" />
        </linearGradient>

        {/* Dragon Horns & Claws Gold */}
        <linearGradient id="dragonGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>

        {/* Belly Plates */}
        <linearGradient id="dragonBelly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <filter id="dragonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Realm */}
      <rect width="500" height="500" fill="url(#dragonBgGrad)" />

      {/* Runic Sacred Ring */}
      <circle cx="250" cy="250" r="225" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.3" />
      <circle cx="250" cy="250" r="215" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.25" />
      <circle cx="250" cy="250" r="190" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="4 8" opacity="0.2" />

      {/* Primordial Cavern Smoke & Fire Embers in background */}
      <g opacity="0.4">
        <circle cx="120" cy="180" r="12" fill="#F97316" filter="url(#dragonGlow)" />
        <circle cx="380" cy="140" r="8" fill="#FDE047" filter="url(#dragonGlow)" />
        <circle cx="100" cy="340" r="6" fill="#EF4444" filter="url(#dragonGlow)" />
        <circle cx="410" cy="320" r="10" fill="#F97316" filter="url(#dragonGlow)" />
        <circle cx="320" cy="80" r="5" fill="#FDE047" filter="url(#dragonGlow)" />
      </g>

      {/* Great Coiled Dragon Wings (Back Wing) */}
      <g opacity="0.85">
        <path
          d="M 230 180 C 180 80, 110 90, 80 140 C 95 180, 140 210, 190 220 C 130 230, 90 270, 85 300 C 120 300, 160 270, 210 240 Z"
          fill="#7F1D1D"
          stroke="#B91C1C"
          strokeWidth="2"
        />
        {/* Wing struts */}
        <path d="M 230 180 Q 150 120 80 140" stroke="#F59E0B" strokeWidth="2.5" fill="none" opacity="0.6" />
        <path d="M 230 180 Q 140 220 85 300" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.5" />
      </g>

      {/* Sinuous Dragon Body (Coiling serpent wyrm) */}
      <path
        d="M 120 400 C 80 320, 120 220, 200 240 C 270 255, 330 200, 310 130 C 290 70, 220 70, 180 110 C 150 140, 170 190, 230 180 C 310 165, 370 240, 340 330 C 310 420, 190 440, 120 400 Z"
        fill="url(#dragonScaleGrad)"
        stroke="#EF4444"
        strokeWidth="3"
        filter="drop-shadow(0 10px 15px rgba(0,0,0,0.6))"
      />

      {/* Dragon Ventral Belly Plates */}
      <path
        d="M 200 240 C 250 250, 290 210, 280 150 C 270 110, 230 100, 200 120 C 180 135, 190 160, 220 160"
        stroke="url(#dragonBelly)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M 270 290 C 290 340, 250 390, 180 400 C 140 405, 110 380, 115 350"
        stroke="url(#dragonBelly)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* Dorsal Spikes & Ridges */}
      <g fill="url(#dragonGold)" opacity="0.9">
        <polygon points="175,95 185,70 195,92" />
        <polygon points="210,80 225,55 235,78" />
        <polygon points="255,75 275,50 280,75" />
        <polygon points="295,95 320,70 315,100" />
        <polygon points="325,130 355,115 335,145" />
        <polygon points="335,170 365,165 340,190" />
        <polygon points="345,220 375,225 345,245" />
        <polygon points="335,280 360,295 330,305" />
        <polygon points="295,360 310,385 280,380" />
      </g>

      {/* Front Foreground Wing */}
      <g>
        <path
          d="M 250 220 C 310 130, 410 100, 440 140 C 400 180, 360 210, 320 230 C 390 240, 430 280, 420 330 C 360 300, 310 270, 250 250 Z"
          fill="url(#dragonScaleGrad)"
          stroke="#F97316"
          strokeWidth="3"
        />
        {/* Bone talons on wing */}
        <polygon points="440,140 455,130 438,150" fill="url(#dragonGold)" />
        <path d="M 250 220 Q 360 140 440 140" stroke="url(#dragonGold)" strokeWidth="3.5" fill="none" />
        <path d="M 270 235 Q 360 240 420 330" stroke="url(#dragonGold)" strokeWidth="2.5" fill="none" opacity="0.7" />
      </g>

      {/* Dragon Head (Menacing, Horned, Ancient Wyrm) */}
      <g transform="translate(140, 90)">
        {/* Crown Horns */}
        <path d="M 20 20 C 0 -30, -30 -50, -50 -60 C -30 -30, -10 -10, 10 10 Z" fill="url(#dragonGold)" stroke="#B45309" strokeWidth="1.5" />
        <path d="M 35 15 C 25 -25, 10 -55, 0 -75 C 15 -45, 30 -20, 35 10 Z" fill="url(#dragonGold)" stroke="#B45309" strokeWidth="1.5" />
        <path d="M 45 25 C 60 -10, 75 -30, 95 -45 C 75 -15, 60 5, 45 25 Z" fill="url(#dragonGold)" stroke="#B45309" strokeWidth="1.5" />

        {/* Head Jaw Structure */}
        <path
          d="M 0 30 C 20 10, 60 20, 90 40 C 60 50, 40 70, 10 65 C -10 60, -15 45, 0 30 Z"
          fill="#7F1D1D"
          stroke="#EF4444"
          strokeWidth="2.5"
        />
        {/* Snout & Upper Jaw */}
        <path
          d="M 30 25 C 60 15, 110 30, 130 50 C 90 60, 60 55, 30 45 Z"
          fill="url(#dragonScaleGrad)"
          stroke="#F97316"
          strokeWidth="2"
        />
        {/* Lower Jaw */}
        <path
          d="M 40 48 C 70 52, 105 60, 115 75 C 80 78, 50 70, 35 55 Z"
          fill="#991B1B"
          stroke="#EF4444"
          strokeWidth="2"
        />

        {/* Serrated Dragon Teeth */}
        <polygon points="60,45 65,54 70,46" fill="#FEF08A" />
        <polygon points="75,47 80,56 85,48" fill="#FEF08A" />
        <polygon points="90,49 96,59 102,50" fill="#FEF08A" />
        <polygon points="105,51 112,62 118,52" fill="#FEF08A" />
        <polygon points="68,54 73,46 78,54" fill="#FEF08A" />
        <polygon points="85,55 90,47 95,55" fill="#FEF08A" />

        {/* Piercing Glowing Dragon Eye */}
        <path d="M 38 28 Q 50 20 62 28 Q 50 36 38 28 Z" fill="#1C1917" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="50" cy="28" r="4.5" fill="#FDE047" filter="url(#dragonGlow)" />
        <line x1="50" y1="23" x2="50" y2="33" stroke="#000" strokeWidth="2" strokeLinecap="round" />

        {/* Nostril Smoldering Ember */}
        <ellipse cx="112" cy="48" rx="4" ry="2.5" fill="#180505" stroke="#F97316" strokeWidth="1" />
        <circle cx="112" cy="48" r="2" fill="#FDE047" />

        {/* Blazing Breath Weapon (Fire Torrent bursting forward) */}
        <g filter="url(#dragonGlow)">
          <path
            d="M 120 55 Q 160 40 220 50 Q 280 30 330 65 Q 260 85 200 75 Q 150 90 120 65 Z"
            fill="url(#dragonFireGrad)"
            opacity="0.9"
          />
          <path
            d="M 130 58 Q 180 50 240 58 Q 210 72 160 68 Z"
            fill="#FFFFFF"
            opacity="0.8"
          />
          <circle cx="250" cy="50" r="10" fill="#FDE047" opacity="0.8" />
          <circle cx="310" cy="65" r="14" fill="#EF4444" opacity="0.6" />
          <circle cx="190" cy="45" r="8" fill="#FFF" />
        </g>
      </g>

      {/* Dragon Talons clutching the hoard */}
      <g transform="translate(180, 310)" fill="url(#dragonGold)" stroke="#78350F" strokeWidth="1.5">
        <path d="M 10 10 C 20 -10, 40 -15, 60 0 C 45 15, 25 25, 10 10 Z" />
        {/* Razor Claws */}
        <path d="M 55 -5 C 75 -10, 90 10, 95 30 C 80 20, 65 15, 55 -5 Z" fill="#FDE047" />
        <path d="M 45 10 C 65 10, 80 30, 80 50 C 65 35, 55 30, 45 10 Z" fill="#FDE047" />
        <path d="M 30 20 C 45 25, 55 50, 50 70 C 40 50, 35 40, 30 20 Z" fill="#FDE047" />
      </g>

      {/* Foreground Fire Sparks and Inscription Banner */}
      <g>
        <circle cx="210" cy="440" r="16" fill="#F59E0B" opacity="0.15" filter="url(#dragonGlow)" />
        <text
          x="250"
          y="472"
          textAnchor="middle"
          fill="#D4AF37"
          fontFamily="Cinzel, serif"
          fontSize="13"
          letterSpacing="6"
          opacity="0.9"
        >
          ᛞᚱᚨᚲᛁ • PRIMORDIAL WYRM
        </text>
      </g>
    </svg>
  );
};

export const PhoenixSVG: React.FC<CreatureSVGProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Phoenix Vector Illustration"
    >
      <defs>
        {/* Background Radial Glow */}
        <radialGradient id="phoenixBgGrad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#451A03" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#1E0B04" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#080B12" stopOpacity="1" />
        </radialGradient>

        {/* Solar Disc Gradient */}
        <radialGradient id="phoenixSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#FDE047" />
          <stop offset="75%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" />
        </radialGradient>

        {/* Flaming Feather Gradient */}
        <linearGradient id="phoenixFeatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="75%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>

        <linearGradient id="phoenixGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <filter id="phoenixGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Realm */}
      <rect width="500" height="500" fill="url(#phoenixBgGrad)" />

      {/* Grand Celestial Solar Halo */}
      <circle cx="250" cy="200" r="140" fill="url(#phoenixSun)" opacity="0.3" filter="url(#phoenixGlow)" />
      <circle cx="250" cy="200" r="100" fill="url(#phoenixSun)" opacity="0.4" />
      <circle cx="250" cy="200" r="150" fill="none" stroke="#FDE047" strokeWidth="1" strokeDasharray="6 8" opacity="0.4" />
      <circle cx="250" cy="200" r="170" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 12" opacity="0.3" />

      {/* Solar Flare Rays emanating outward */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const x1 = 250 + Math.cos(angle) * 110;
        const y1 = 200 + Math.sin(angle) * 110;
        const x2 = 250 + Math.cos(angle) * 185;
        const y2 = 200 + Math.sin(angle) * 185;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#FDE047"
            strokeWidth={i % 2 === 0 ? '2' : '1'}
            opacity={i % 2 === 0 ? 0.6 : 0.3}
          />
        );
      })}

      {/* Pyre of Sacred Cinnamon & Myrrh Embers at bottom */}
      <g opacity="0.8">
        <path d="M 120 440 Q 250 380 380 440 Z" fill="#27110A" stroke="#78350F" strokeWidth="2" />
        {/* Burning Embers */}
        <polygon points="140,430 180,410 190,435" fill="#B45309" />
        <polygon points="210,435 240,405 270,430" fill="#991B1B" />
        <polygon points="290,432 320,412 350,435" fill="#B45309" />
        {/* Ash Sparks Rising */}
        <circle cx="160" cy="380" r="3" fill="#FDE047" filter="url(#phoenixGlow)" />
        <circle cx="220" cy="360" r="4" fill="#F97316" filter="url(#phoenixGlow)" />
        <circle cx="280" cy="370" r="3.5" fill="#EF4444" filter="url(#phoenixGlow)" />
        <circle cx="340" cy="350" r="2.5" fill="#FDE047" filter="url(#phoenixGlow)" />
      </g>

      {/* Flowing Radiant Tail Feathers (Plumes of liquid fire) */}
      <g filter="url(#phoenixGlow)" opacity="0.9">
        <path d="M 250 310 C 230 360, 160 390, 140 440 C 170 420, 220 380, 245 330 Z" fill="url(#phoenixFeatherGrad)" />
        <path d="M 250 310 C 270 360, 340 390, 360 440 C 330 420, 280 380, 255 330 Z" fill="url(#phoenixFeatherGrad)" />
        <path d="M 250 315 C 240 370, 200 410, 190 460 C 220 430, 245 390, 250 335 Z" fill="#F59E0B" />
        <path d="M 250 315 C 260 370, 300 410, 310 460 C 280 430, 255 390, 250 335 Z" fill="#F59E0B" />
        <path d="M 250 320 C 245 380, 240 430, 250 470 C 255 430, 255 380, 250 320 Z" fill="#FDE047" />
      </g>

      {/* Great Outspread Solar Wings (Left Wing) */}
      <g>
        {/* Outer Feather Layer */}
        <path
          d="M 230 220 C 180 140, 90 90, 40 80 C 60 120, 100 170, 140 210 C 80 180, 45 220, 50 250 C 90 250, 140 250, 190 260 C 120 280, 90 320, 105 340 C 150 330, 195 295, 230 270 Z"
          fill="url(#phoenixFeatherGrad)"
          stroke="#FDE047"
          strokeWidth="2"
        />
        {/* Secondary Inner Feather Highlights */}
        <path d="M 230 220 Q 140 140 70 100" stroke="#FFF" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M 210 240 Q 130 210 75 220" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M 200 260 Q 140 270 120 310" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.6" />
      </g>

      {/* Great Outspread Solar Wings (Right Wing) */}
      <g>
        {/* Outer Feather Layer */}
        <path
          d="M 270 220 C 320 140, 410 90, 460 80 C 440 120, 400 170, 360 210 C 420 180, 455 220, 450 250 C 410 250, 360 250, 310 260 C 380 280, 410 320, 395 340 C 350 330, 305 295, 270 270 Z"
          fill="url(#phoenixFeatherGrad)"
          stroke="#FDE047"
          strokeWidth="2"
        />
        {/* Secondary Inner Feather Highlights */}
        <path d="M 270 220 Q 360 140 430 100" stroke="#FFF" strokeWidth="2" fill="none" opacity="0.8" />
        <path d="M 290 240 Q 370 210 425 220" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M 300 260 Q 360 270 380 310" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.6" />
      </g>

      {/* Phoenix Radiant Torso & Heart of Rebirth */}
      <path
        d="M 250 170 C 230 200, 220 250, 235 310 C 245 320, 255 320, 265 310 C 280 250, 270 200, 250 170 Z"
        fill="url(#phoenixGold)"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      {/* Living Solar Core Gem in Heart */}
      <polygon points="250,225 240,245 250,265 260,245" fill="#EF4444" stroke="#FFF" strokeWidth="1.5" filter="url(#phoenixGlow)" />
      <circle cx="250" cy="245" r="4" fill="#FFF" />

      {/* Phoenix Graceful Avian Head & Majestic Crest */}
      <g>
        {/* Regal Flaming Crest */}
        <path d="M 250 135 C 240 90, 220 60, 205 45 C 225 65, 235 90, 245 130 Z" fill="#FDE047" filter="url(#phoenixGlow)" />
        <path d="M 250 135 C 250 85, 250 50, 250 35 C 255 60, 255 90, 252 130 Z" fill="#FFF" />
        <path d="M 250 135 C 260 90, 280 60, 295 45 C 275 65, 265 90, 255 130 Z" fill="#FDE047" filter="url(#phoenixGlow)" />

        {/* Head Silhouette */}
        <path
          d="M 250 130 C 240 140, 242 165, 250 180 C 258 165, 260 140, 250 130 Z"
          fill="url(#phoenixGold)"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        {/* Golden Curved Beak */}
        <polygon points="247,150 250,172 253,150" fill="#F97316" stroke="#78350F" strokeWidth="1" />
        {/* Piercing Solar Eyes */}
        <circle cx="244" cy="148" r="2.5" fill="#7F1D1D" />
        <circle cx="244" cy="148" r="1.2" fill="#FDE047" />
        <circle cx="256" cy="148" r="2.5" fill="#7F1D1D" />
        <circle cx="256" cy="148" r="1.2" fill="#FDE047" />
      </g>

      {/* Inscription Bottom Bar */}
      <text
        x="250"
        y="488"
        textAnchor="middle"
        fill="#FDE047"
        fontFamily="Cinzel, serif"
        fontSize="12"
        letterSpacing="5"
        opacity="0.95"
      >
        ΦΟΙΝΙΞ • IMMORTAL FIREBIRD
      </text>
    </svg>
  );
};

export const KitsuneSVG: React.FC<CreatureSVGProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kitsune Vector Illustration"
    >
      <defs>
        {/* Background Night Mystical Realm */}
        <radialGradient id="kitsuneBgGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#2E1065" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#0F172A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#080B12" stopOpacity="1" />
        </radialGradient>

        {/* Kitsune Spirit Foxfire (Kitsunebi) Cyan-Purple Glow */}
        <radialGradient id="foxfireGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#38BDF8" />
          <stop offset="70%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
        </radialGradient>

        {/* Pure White Celestial Fur */}
        <linearGradient id="kitsuneFur" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Shinto Crimson Mask Paint */}
        <linearGradient id="shintoRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        {/* Spirit Jewel (Hoshi no Tama) */}
        <radialGradient id="hoshiTama" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FDE047" />
          <stop offset="85%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>

        <filter id="kitsuneGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Realm */}
      <rect width="500" height="500" fill="url(#kitsuneBgGrad)" />

      {/* Full Moon in Mist */}
      <circle cx="250" cy="180" r="115" fill="#F8FAFC" opacity="0.12" />
      <circle cx="250" cy="180" r="115" fill="none" stroke="#E2E8F0" strokeWidth="1.5" opacity="0.3" strokeDasharray="6 6" />

      {/* Shinto Torii Gate Silhouette in Background */}
      <g opacity="0.25" stroke="#EF4444" strokeWidth="3" fill="none">
        {/* Top Kasagi bar */}
        <path d="M 160 110 Q 250 100 340 110" strokeWidth="6" strokeLinecap="round" />
        <line x1="175" y1="125" x2="325" y2="125" strokeWidth="4" />
        {/* Pillars */}
        <line x1="200" y1="110" x2="195" y2="280" strokeWidth="5" />
        <line x1="300" y1="110" x2="305" y2="280" strokeWidth="5" />
      </g>

      {/* 9 CELESTIAL FOILS / TAILS (Kyūbi no Kitsune) */}
      <g filter="drop-shadow(0 0 10px rgba(129, 140, 248, 0.4))">
        {/* Tail 1 (Far Left) */}
        <path
          d="M 230 350 C 160 360, 50 320, 40 230 C 50 200, 110 240, 160 280 C 190 300, 220 330, 230 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        {/* Tail 2 */}
        <path
          d="M 235 350 C 170 330, 70 260, 80 170 C 105 160, 150 210, 185 260 C 205 290, 225 320, 235 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        {/* Tail 3 */}
        <path
          d="M 240 350 C 180 300, 110 200, 140 120 C 165 130, 190 190, 210 240 C 225 280, 235 320, 240 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        {/* Tail 4 */}
        <path
          d="M 245 350 C 200 270, 170 160, 205 90 C 225 110, 230 180, 235 240 C 240 280, 245 320, 245 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        {/* Tail 5 (Center Apex Tail) */}
        <path
          d="M 250 350 C 235 260, 230 140, 250 70 C 270 140, 265 260, 250 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#C084FC"
          strokeWidth="2"
        />
        {/* Tail 6 */}
        <path
          d="M 255 350 C 300 270, 330 160, 295 90 C 275 110, 270 180, 265 240 C 260 280, 255 320, 255 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        {/* Tail 7 */}
        <path
          d="M 260 350 C 320 300, 390 200, 360 120 C 335 130, 310 190, 290 240 C 275 280, 265 320, 260 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        {/* Tail 8 */}
        <path
          d="M 265 350 C 330 330, 430 260, 420 170 C 395 160, 350 210, 315 260 C 295 290, 275 320, 265 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        {/* Tail 9 (Far Right) */}
        <path
          d="M 270 350 C 340 360, 450 320, 460 230 C 450 200, 390 240, 340 280 C 310 300, 280 330, 270 350 Z"
          fill="url(#kitsuneFur)"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
      </g>

      {/* Tail Tips Crimson Shinto Blessing */}
      <g fill="#EF4444" opacity="0.85">
        <circle cx="45" cy="225" r="7" />
        <circle cx="85" cy="165" r="7" />
        <circle cx="145" cy="115" r="8" />
        <circle cx="205" cy="88" r="8" />
        <circle cx="250" cy="70" r="9" />
        <circle cx="295" cy="88" r="8" />
        <circle cx="355" cy="115" r="8" />
        <circle cx="415" cy="165" r="7" />
        <circle cx="455" cy="225" r="7" />
      </g>

      {/* Floating Kitsunebi (Foxfire Spirit Orbs) */}
      <g filter="url(#kitsuneGlow)">
        <circle cx="100" cy="280" r="16" fill="url(#foxfireGrad)" />
        <circle cx="140" cy="170" r="12" fill="url(#foxfireGrad)" />
        <circle cx="360" cy="170" r="12" fill="url(#foxfireGrad)" />
        <circle cx="400" cy="280" r="16" fill="url(#foxfireGrad)" />
        <circle cx="250" cy="30" r="14" fill="url(#foxfireGrad)" />
      </g>

      {/* Kitsune Body & Sitting Poise */}
      <g>
        {/* Main Body */}
        <path
          d="M 210 320 C 205 370, 215 420, 250 430 C 285 420, 295 370, 290 320 C 275 300, 225 300, 210 320 Z"
          fill="url(#kitsuneFur)"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        {/* Slender Chest & Neck */}
        <path
          d="M 230 260 C 220 280, 225 320, 250 330 C 275 320, 280 280, 270 260 Z"
          fill="#FFFFFF"
        />
        {/* Forepaws */}
        <ellipse cx="238" cy="425" rx="8" ry="12" fill="#E2E8F0" />
        <ellipse cx="262" cy="425" rx="8" ry="12" fill="#E2E8F0" />
      </g>

      {/* Kitsune Sacred Mask / Head */}
      <g transform="translate(250, 235)">
        {/* Sharp Fox Ears */}
        {/* Left Ear */}
        <polygon points="-12,-15 -35,-65 -5,-35" fill="url(#kitsuneFur)" stroke="#94A3B8" strokeWidth="1.5" />
        <polygon points="-15,-20 -30,-58 -8,-35" fill="url(#shintoRed)" />
        {/* Right Ear */}
        <polygon points="12,-15 35,-65 5,-35" fill="url(#kitsuneFur)" stroke="#94A3B8" strokeWidth="1.5" />
        <polygon points="15,-20 30,-58 8,-35" fill="url(#shintoRed)" />

        {/* Head Shape */}
        <polygon
          points="0,35 -30,-10 -25,-30 0,-20 25,-30 30,-10"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />

        {/* Shinto Kumadori Eye Markings */}
        <path d="M -22 -14 Q -10 -20 0 -12" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 22 -14 Q 10 -20 0 -12" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M -20 -8 Q -10 -4 0 5" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 20 -8 Q 10 -4 0 5" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Slender Fox Eyes */}
        <path d="M -18 -8 Q -10 -14 -4 -8 Q -10 -4 -18 -8 Z" fill="#1E1B4B" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="-11" cy="-8" r="2" fill="#FDE047" />
        <path d="M 18 -8 Q 10 -14 4 -8 Q 10 -4 18 -8 Z" fill="#1E1B4B" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="11" cy="-8" r="2" fill="#FDE047" />

        {/* Nose Tip */}
        <circle cx="0" cy="33" r="2.5" fill="#0F172A" />

        {/* Forehead Sacred Inari Mark (Wisdom Sigil) */}
        <polygon points="0,-18 -4,-8 0,0 4,-8" fill="#EF4444" />
        <circle cx="0" cy="-22" r="3" fill="#D4AF37" />
      </g>

      {/* Floating Sacred Hoshi no Tama (Spirit Pearl) hovering above paws */}
      <g filter="url(#kitsuneGlow)">
        <circle cx="250" cy="365" r="14" fill="url(#hoshiTama)" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="246" cy="361" r="4" fill="#FFF" opacity="0.8" />
      </g>

      {/* Inscription Bottom Bar */}
      <text
        x="250"
        y="476"
        textAnchor="middle"
        fill="#C084FC"
        fontFamily="Cinzel, serif"
        fontSize="12"
        letterSpacing="5"
        opacity="0.9"
      >
        九尾の狐 • CELESTIAL SPIRIT
      </text>
    </svg>
  );
};

export const GarudaSVG: React.FC<CreatureSVGProps> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Garuda Vector Illustration"
    >
      <defs>
        {/* Background Celestial Sky of Mount Meru */}
        <radialGradient id="garudaBgGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#451A03" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#1E1B4B" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#080B12" stopOpacity="1" />
        </radialGradient>

        {/* Radiant Vedic Gold Wings */}
        <linearGradient id="garudaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Solar Halo */}
        <radialGradient id="garudaSun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="80%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
        </radialGradient>

        {/* Sacred Ruby Stones */}
        <radialGradient id="garudaRuby" cx="35%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="60%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </radialGradient>

        <filter id="garudaGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Realm */}
      <rect width="500" height="500" fill="url(#garudaBgGrad)" />

      {/* Vedic Mandala Solar Halo */}
      <circle cx="250" cy="180" r="130" fill="url(#garudaSun)" opacity="0.35" filter="url(#garudaGlow)" />
      <circle cx="250" cy="180" r="105" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
      <circle cx="250" cy="180" r="125" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 8" opacity="0.4" />

      {/* 12 Vedic Petal Ray Lotus around Halo */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const cx = 250 + Math.cos(angle) * 105;
        const cy = 180 + Math.sin(angle) * 105;
        return <circle key={i} cx={cx} cy={cy} r="4" fill="#FDE047" opacity="0.7" />;
      })}

      {/* EXPANSIVE GOLDEN WINGS (Span across entire heaven) */}
      {/* Left Wing */}
      <g>
        <path
          d="M 230 220 C 170 120, 80 80, 30 70 C 50 120, 80 170, 130 210 C 70 190, 40 230, 45 270 C 85 270, 135 260, 180 270 C 110 300, 80 350, 95 380 C 150 360, 195 315, 230 280 Z"
          fill="url(#garudaGold)"
          stroke="#FDE047"
          strokeWidth="2.5"
          filter="drop-shadow(0 8px 12px rgba(0,0,0,0.5))"
        />
        {/* Feather Quill Ridges */}
        <path d="M 230 220 Q 130 130 50 90" stroke="#FFF" strokeWidth="2" fill="none" opacity="0.75" />
        <path d="M 210 240 Q 120 220 65 240" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M 195 265 Q 130 290 110 340" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.5" />
      </g>

      {/* Right Wing */}
      <g>
        <path
          d="M 270 220 C 330 120, 420 80, 470 70 C 450 120, 420 170, 370 210 C 430 190, 460 230, 455 270 C 415 270, 365 260, 320 270 C 390 300, 420 350, 405 380 C 350 360, 305 315, 270 280 Z"
          fill="url(#garudaGold)"
          stroke="#FDE047"
          strokeWidth="2.5"
          filter="drop-shadow(0 8px 12px rgba(0,0,0,0.5))"
        />
        {/* Feather Quill Ridges */}
        <path d="M 270 220 Q 370 130 450 90" stroke="#FFF" strokeWidth="2" fill="none" opacity="0.75" />
        <path d="M 290 240 Q 380 220 435 240" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M 305 265 Q 370 290 390 340" stroke="#FDE047" strokeWidth="1.5" fill="none" opacity="0.5" />
      </g>

      {/* Amrita Nectar Pot (Golden Kalasha) held in triumph */}
      <g transform="translate(250, 395)" filter="url(#garudaGlow)">
        <ellipse cx="0" cy="0" rx="16" ry="14" fill="url(#garudaGold)" stroke="#FFF" strokeWidth="1.5" />
        <ellipse cx="0" cy="-14" rx="9" ry="3" fill="#FDE047" />
        <path d="M -6 -14 L 0 -22 L 6 -14 Z" fill="#22C55E" />
        {/* Amrita Nectar Sparkle */}
        <circle cx="0" cy="-2" r="3" fill="#FFF" />
      </g>

      {/* Heroic Torso (Vedic Warrior Stature) */}
      <g>
        {/* Golden Armored Chest */}
        <path
          d="M 225 210 C 220 270, 230 330, 250 345 C 270 330, 280 270, 275 210 Z"
          fill="url(#garudaGold)"
          stroke="#D4AF37"
          strokeWidth="2"
        />
        {/* Sacred Golden Torc & Necklace */}
        <path d="M 230 215 Q 250 235 270 215" stroke="#FDE047" strokeWidth="4" fill="none" />
        <circle cx="250" cy="228" r="4.5" fill="url(#garudaRuby)" stroke="#FFF" strokeWidth="1" />

        {/* Heroic Shoulders & Arms */}
        <circle cx="215" cy="235" r="14" fill="#D97706" stroke="#FDE047" strokeWidth="1.5" />
        <circle cx="285" cy="235" r="14" fill="#D97706" stroke="#FDE047" strokeWidth="1.5" />

        {/* Lower Talons & Golden Leg Armor */}
        <path d="M 235 345 L 225 410 L 210 425" stroke="url(#garudaGold)" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M 265 345 L 275 410 L 290 425" stroke="url(#garudaGold)" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Talons */}
        <polygon points="205,425 215,418 215,432" fill="#FDE047" stroke="#78350F" />
        <polygon points="295,425 285,418 285,432" fill="#FDE047" stroke="#78350F" />
      </g>

      {/* Head: Majestic Golden Eagle & Vedic Royal Crown (Kirita Mukuta) */}
      <g transform="translate(250, 160)">
        {/* Royal Crown (Kirita Mukuta) */}
        <polygon points="-24,-15 0,-65 24,-15 15,-10 0,-35 -15,-10" fill="url(#garudaGold)" stroke="#FDE047" strokeWidth="1.5" />
        <circle cx="0" cy="-40" r="4" fill="url(#garudaRuby)" />
        <circle cx="0" cy="-18" r="3" fill="#FFF" />

        {/* Avian Head Shape */}
        <path
          d="M -18 -10 C -22 15, -15 35, 0 45 C 15 35, 22 15, 18 -10 Z"
          fill="#FEF08A"
          stroke="#D97706"
          strokeWidth="1.5"
        />

        {/* Powerful Curved Golden Beak */}
        <path
          d="M -12 12 Q 0 10 12 12 C 16 28, 8 48, 0 54 C -8 48, -16 28, -12 12 Z"
          fill="#F59E0B"
          stroke="#78350F"
          strokeWidth="1.5"
        />
        <path d="M 0 10 L 0 54" stroke="#B45309" strokeWidth="1.5" />

        {/* Piercing Celestial Eagle Eyes */}
        <ellipse cx="-11" cy="6" rx="4.5" ry="3.5" fill="#180505" stroke="#FDE047" strokeWidth="1" />
        <circle cx="-10" cy="6" r="1.5" fill="#FDE047" />
        <ellipse cx="11" cy="6" rx="4.5" ry="3.5" fill="#180505" stroke="#FDE047" strokeWidth="1" />
        <circle cx="10" cy="6" r="1.5" fill="#FDE047" />

        {/* Tilak of Vishnu (Urdhva Pundra) on forehead */}
        <path d="M -4 -4 L 0 6 L 4 -4" stroke="#FFF" strokeWidth="1.8" fill="none" />
        <line x1="0" y1="-2" x2="0" y2="8" stroke="#DC2626" strokeWidth="1.5" />
      </g>

      {/* Inscription Bottom Bar */}
      <text
        x="250"
        y="476"
        textAnchor="middle"
        fill="#FDE047"
        fontFamily="Cinzel, serif"
        fontSize="12"
        letterSpacing="5"
        opacity="0.95"
      >
        ॐ गरुडाय • KING OF CELESTIAL BIRDS
      </text>
    </svg>
  );
};

export const CreatureArtworkSVG: React.FC<{
  id: string;
  className?: string;
}> = ({ id, className = 'w-full h-full' }) => {
  switch (id) {
    case 'creature-dragon':
      return <DragonSVG className={className} />;
    case 'creature-phoenix':
      return <PhoenixSVG className={className} />;
    case 'creature-kitsune':
      return <KitsuneSVG className={className} />;
    case 'creature-garuda':
      return <GarudaSVG className={className} />;
    default:
      return null;
  }
};
