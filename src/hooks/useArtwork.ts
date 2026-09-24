import { useState, useEffect } from 'react';
import {
  CHARACTER_ARTWORKS,
  CharacterSpriteDef,
  getCharacterSprite,
  getCharacterPortraitUrl,
} from '../utils/artworkStore';

export function getCustomArtwork(id: string): string | null {
  try {
    return localStorage.getItem(`mythos_artwork_${id}`);
  } catch {
    return null;
  }
}

export function saveCustomArtwork(id: string, dataUrl: string) {
  try {
    localStorage.setItem(`mythos_artwork_${id}`, dataUrl);
    window.dispatchEvent(new CustomEvent('mythos-artwork-updated', { detail: { id } }));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

export function useArtwork(id: string) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.id === id) {
        setVersion((v) => v + 1);
      }
    };
    window.addEventListener('mythos-artwork-updated', handleUpdate);
    return () => window.removeEventListener('mythos-artwork-updated', handleUpdate);
  }, [id]);

  const customSrc = getCustomArtwork(id);
  if (customSrc) {
    return {
      hasArtwork: true,
      artworkType: 'custom' as const,
      src: customSrc,
      spriteDef: getCharacterSprite(id),
      style: {
        backgroundImage: `url(${customSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    };
  }

  const spriteDef = getCharacterSprite(id);

  if (spriteDef) {
    const fileUrl = `${getCharacterPortraitUrl(id)!}${version > 0 ? `?v=${version}` : ''}`;
    return {
      hasArtwork: true,
      artworkType: 'file' as const,
      src: fileUrl,
      spriteDef,
      style: {
        backgroundImage: `url(${fileUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    };
  }

  return {
    hasArtwork: false,
    artworkType: 'none' as const,
    src: undefined,
    spriteDef: undefined,
    style: {},
  };
}

export function useArtworkGallery() {
  return {
    characters: CHARACTER_ARTWORKS,
    totalCount: CHARACTER_ARTWORKS.length,
  };
}
