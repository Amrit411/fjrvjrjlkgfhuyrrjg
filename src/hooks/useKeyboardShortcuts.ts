import { useEffect } from 'react';

interface ShortcutOptions {
  onSearch?: () => void;
  onRandom?: () => void;
  onEscape?: () => void;
  onToggleTheme?: () => void;
}

export function useKeyboardShortcuts({
  onSearch,
  onRandom,
  onEscape,
  onToggleTheme,
}: ShortcutOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onSearch?.();
        return;
      }

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        onSearch?.();
        return;
      }

      if (e.key === 'Escape') {
        onEscape?.();
        return;
      }

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (e.key.toLowerCase() === 'r') {
          e.preventDefault();
          onRandom?.();
        } else if (e.key.toLowerCase() === 't') {
          e.preventDefault();
          onToggleTheme?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onRandom, onEscape, onToggleTheme]);
}
