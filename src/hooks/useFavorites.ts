import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'mythos_atlas_favorites';
const EVENT_KEY = 'mythos_favorites_updated';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const syncFavorites = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener(EVENT_KEY, syncFavorites);
    window.addEventListener('storage', syncFavorites);
    return () => {
      window.removeEventListener(EVENT_KEY, syncFavorites);
      window.removeEventListener('storage', syncFavorites);
    };
  }, [syncFavorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent(EVENT_KEY));
      } catch (err) {
        console.error('Failed to save favorite:', err);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const clearAllFavorites = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFavorites([]);
      window.dispatchEvent(new CustomEvent(EVENT_KEY));
    } catch (err) {
      console.error('Failed to clear favorites:', err);
    }
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
    favoriteCount: favorites.length,
  };
}
