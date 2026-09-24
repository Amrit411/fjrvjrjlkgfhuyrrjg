import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Volume2, VolumeX, Swords, Menu, X, Bookmark, Archive, Sun, Moon } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { ambientSound } from '../utils/ambientAudio';

export type NavView = 'home' | 'explore' | 'creatures' | 'pantheons' | 'timeline' | 'connections' | 'about';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenSearch: () => void;
  onTriggerRandom: () => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
  onOpenArtworks?: () => void;
  onOpenOracle?: () => void;
  onOpenArena?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onTriggerRandom,
  isLightMode,
  onToggleTheme,
  onOpenArtworks,
  onOpenOracle,
  onOpenArena,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const { favoriteCount } = useFavorites();

  const handleToggleSound = () => {
    const active = ambientSound.toggleDrone();
    setIsAudioActive(active);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: NavView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'creatures', label: 'Creatures' },
    { id: 'pantheons', label: 'Pantheons' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'connections', label: 'Connections' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (view: NavView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#080B12]/90 dark:bg-[#080B12]/90 backdrop-blur-md border-[#243048]/80 py-3 shadow-lg'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          <button
            onClick={() => handleNavClick('home')}
            className="group flex flex-col items-start text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
            aria-label="Mythos Atlas Home"
          >
            <span className="font-serif-ancient text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors leading-none">
              MYTHOS
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] font-sans font-semibold mt-0.5">
              ATLAS
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm tracking-wider uppercase transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-[#9CA3AF] hover:text-[#F5F5F0]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Ambient Sound Drone Toggle */}
            <button
              onClick={handleToggleSound}
              title={isAudioActive ? 'Mute Sacred 432Hz Temple Drone' : 'Play Sacred 432Hz Temple Drone (Procedural Audio)'}
              aria-label="Toggle ambient sacred soundscape"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                isAudioActive
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FDE047] shadow-[0_0_12px_rgba(212,175,55,0.35)]'
                  : 'bg-[#161F30]/70 border-[#243048] text-[#9CA3AF] hover:text-[#F5F5F0] hover:border-[#D4AF37]/50'
              }`}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  <span className="hidden xl:inline text-[10px] text-[#D4AF37] font-semibold">CHIME</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline text-[10px]">SOUND</span>
                </>
              )}
            </button>

            {/* Fate's Oracle Tarot Draw */}
            {onOpenOracle && (
              <button
                onClick={onOpenOracle}
                title="Consult Fate's Oracle (Daily Tarot Divination)"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-serif-ancient tracking-wider uppercase text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-lg transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-bold">Oracle</span>
              </button>
            )}

            {/* Clash of Legends Arena */}
            {onOpenArena && (
              <button
                onClick={onOpenArena}
                title="Enter the Mythic Arena (Clash of Legends Showdown)"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-serif-ancient tracking-wider uppercase text-[#38BDF8] bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/40 rounded-lg transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]"
              >
                <Swords className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="font-bold">Arena</span>
              </button>
            )}

            {favoriteCount > 0 && (
              <button
                onClick={() => handleNavClick('explore')}
                title={`${favoriteCount} saved legend${favoriteCount === 1 ? '' : 's'} in your personal pantheon`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-[#F4D58D] bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-lg hover:bg-[#D4AF37]/25 transition-all cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="font-bold">{favoriteCount}</span>
              </button>
            )}

            {onOpenArtworks && (
              <button
                onClick={onOpenArtworks}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#D4AF37] hover:text-[#F4D58D] bg-[#161F30]/80 hover:bg-[#1E293B] border border-[#D4AF37]/50 rounded-lg transition-all cursor-pointer"
                title="Codex Icon & Lore Vault"
                aria-label="Codex Vault"
              >
                <Archive className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-mono text-[11px]">Vault</span>
              </button>
            )}

            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs text-[#9CA3AF] hover:text-[#F5F5F0] bg-[#161F30]/80 hover:bg-[#1E293B] border border-[#243048] rounded-lg transition-all cursor-pointer"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden md:inline font-sans">Search</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono text-[#9CA3AF] bg-[#080B12] border border-[#243048] rounded">
                ⌘K
              </kbd>
            </button>

            {/* Celestial Astral Mood Switcher */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-[#9CA3AF] hover:text-[#D4AF37] bg-[#161F30]/60 hover:bg-[#1E293B] border border-[#243048] rounded-lg transition-colors cursor-pointer"
              title={isLightMode ? 'Switch to Obsidian Night Realm' : 'Switch to Solar Temple Realm'}
              aria-label="Toggle Celestial Realm"
            >
              {isLightMode ? <Moon className="w-4 h-4 text-[#38BDF8]" /> : <Sun className="w-4 h-4 text-[#FDE047]" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F5F0] hover:text-[#D4AF37] bg-[#161F30] border border-[#243048] rounded-lg transition-colors cursor-pointer active:scale-95"
              aria-label="Toggle navigation drawer"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-4/5 max-w-sm h-full bg-[#080B12] border-l border-[#243048] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#243048]">
                <div className="flex flex-col">
                  <span className="font-serif-ancient text-xl font-bold tracking-[0.2em] text-[#D4AF37]">
                    MYTHOS ATLAS
                  </span>
                  <span className="text-[10px] tracking-widest text-[#9CA3AF]">
                    DIGITAL CODEX & BESTIARY
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#9CA3AF] hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 grid grid-cols-2 gap-2 border-b border-[#243048] mb-4">
                {onOpenOracle && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenOracle();
                    }}
                    className="flex items-center gap-1.5 p-2 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-xs font-serif-ancient text-[#D4AF37]"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Oracle Draw</span>
                  </button>
                )}
                {onOpenArena && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenArena();
                    }}
                    className="flex items-center gap-1.5 p-2 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/40 text-xs font-serif-ancient text-[#38BDF8]"
                  >
                    <Swords className="w-4 h-4" />
                    <span>Mythic Arena</span>
                  </button>
                )}
              </div>

              <nav className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => {
                  const isActive = currentView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-sm tracking-wider uppercase rounded transition-colors ${
                        isActive
                          ? 'bg-[#161F30] text-[#D4AF37] font-semibold border-l-2 border-[#D4AF37]'
                          : 'text-[#9CA3AF] hover:text-white hover:bg-[#111827]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="text-xs text-[#D4AF37]">Active</span>}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#243048] flex flex-col gap-3">
              {onOpenArtworks && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenArtworks();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-serif-ancient tracking-wider uppercase text-[#F5F5F0] bg-[#161F30] border border-[#D4AF37]/50 rounded flex items-center justify-center gap-2 hover:bg-[#D4AF37]/20"
                >
                  <Archive className="w-4 h-4 text-[#D4AF37]" />
                  <span>Codex Vault & Icons</span>
                </button>
              )}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onTriggerRandom();
                }}
                className="w-full py-2.5 px-4 text-xs font-serif-ancient tracking-wider uppercase text-[#D4AF37] border border-[#D4AF37] rounded flex items-center justify-center gap-2 hover:bg-[#D4AF37]/10"
              >
                <Sparkles className="w-4 h-4" />
                <span>Discover Random Legend</span>
              </button>
              <p className="text-[11px] text-[#9CA3AF] text-center mt-2">
                © 2026 Mythos Atlas Archive
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

