import React, { useState } from 'react';
import { LegendEntry } from '../types/mythology';
import { MythicTarotCard } from './MythicTarotCard';
import { useArtwork } from '../hooks/useArtwork';

interface LegendArtworkProps {
  legend: LegendEntry;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showOverlay?: boolean;
  forceFoilCard?: boolean;
}

export const LegendArtwork: React.FC<LegendArtworkProps> = ({
  legend,
  size = 'md',
  className = '',
  showOverlay = false,
  forceFoilCard = true,
}) => {
  const artwork = useArtwork(legend.id);
  const [imageError, setImageError] = useState(false);

  // If user has uploaded a custom image and NOT forcing the foil card
  if (!forceFoilCard && artwork.hasArtwork && !imageError && artwork.src) {
    return (
      <div className={`relative overflow-hidden bg-[#0A0E17] ${className}`}>
        <img
          src={artwork.src}
          alt={legend.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/20 pointer-events-none" />
        )}
      </div>
    );
  }

  // Option 3: Mythological Codex / RPG Tarot Foil Card
  return (
    <MythicTarotCard
      legend={legend}
      size={size}
      className={className}
      showOverlay={showOverlay}
      interactive={true}
    />
  );
};

