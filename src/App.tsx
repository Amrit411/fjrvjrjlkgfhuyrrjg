import React, { useState } from 'react';
import { Navbar, NavView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroductionSection } from './components/IntroductionSection';
import { InteractiveWorldMap } from './components/InteractiveWorldMap';
import { FeaturedMythologies } from './components/FeaturedMythologies';
import { CreatureSpotlight } from './components/CreatureSpotlight';
import { FeaturedCreatures } from './components/FeaturedCreatures';
import { RandomLegendSection } from './components/RandomLegendSection';
import { LegendOfTheDay } from './components/LegendOfTheDay';
import { HomeConnectionsPreview } from './components/HomeConnectionsPreview';
import { HomeTimelinePreview } from './components/HomeTimelinePreview';
import { DidYouKnowSection } from './components/DidYouKnowSection';
import { CallToExploreSection } from './components/CallToExploreSection';
import { ExploreView } from './components/ExploreView';
import { CreaturesView } from './components/CreaturesView';
import { PantheonsView } from './components/PantheonsView';
import { TimelineView } from './components/TimelineView';
import { ConnectionsView } from './components/ConnectionsView';
import { AboutView } from './components/AboutView';
import { DetailModal } from './components/DetailModal';
import { SearchOverlay } from './components/SearchOverlay';
import { RandomLegendModal } from './components/RandomLegendModal';
import { PortraitsManagerModal } from './components/PortraitsManagerModal';
import { OracleModal } from './components/OracleModal';
import { MythicArenaModal } from './components/MythicArenaModal';
import { MythicCosmicCanvas } from './components/MythicCosmicCanvas';
import { Footer } from './components/Footer';
import { ALL_LEGENDS } from './data/mythologyData';
import { LegendEntry, MythologySystem, MythologyRegion } from './types/mythology';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export function App() {
  const initialView = (window.__INITIAL_PAGE__ as NavView) || 'home';
  const [currentView, setCurrentView] = useState<NavView>(initialView);
  const [selectedLegend, setSelectedLegend] = useState<LegendEntry | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRandomOpen, setIsRandomOpen] = useState(false);
  const [isArtworksOpen, setIsArtworksOpen] = useState(false);
  const [isOracleOpen, setIsOracleOpen] = useState(false);
  const [isArenaOpen, setIsArenaOpen] = useState(false);

  const [exploreRegion, setExploreRegion] = useState<string | undefined>(undefined);
  const [exploreType, setExploreType] = useState<string | undefined>(undefined);

  useKeyboardShortcuts({
    onSearch: () => setIsSearchOpen((prev) => !prev),
    onRandom: () => setIsRandomOpen(true),
    onEscape: () => {
      setSelectedLegend(null);
      setIsSearchOpen(false);
      setIsRandomOpen(false);
    },
  });

  const handleSelectCultureFromHome = (culture: MythologySystem) => {
    setExploreRegion(culture);
    setExploreType(undefined);
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRegionFromFooter = (region: MythologyRegion) => {
    setExploreRegion(region);
    setExploreType(undefined);
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: NavView) => {
    if (view === 'explore') {

      setExploreRegion(undefined);
      setExploreType(undefined);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F5F5F0] flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#F4D58D] font-sans antialiased relative w-full max-w-full overflow-x-hidden">
      {/* Background Animated Stardust & Constellations */}
      <MythicCosmicCanvas />

      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onTriggerRandom={() => setIsRandomOpen(true)}
        onOpenArtworks={() => setIsArtworksOpen(true)}
        onOpenOracle={() => setIsOracleOpen(true)}
        onOpenArena={() => setIsArenaOpen(true)}
      />

      <div className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentView === 'home' && (
          <main className="space-y-6 w-full max-w-full overflow-x-hidden">

            <HeroSection
              onNavigate={handleNavigate}
              onExploreFilter={(region) => {
                setExploreRegion(region);
                setCurrentView('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <IntroductionSection onNavigate={handleNavigate} />

            <InteractiveWorldMap
              onSelectRegion={(region) => {
                setExploreRegion(region);
                setCurrentView('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <FeaturedMythologies
              onSelectCulture={handleSelectCultureFromHome}
            />

            <CreatureSpotlight
              onSelectLegend={(legend) => setSelectedLegend(legend)}
            />

            <FeaturedCreatures
              onSelectCreature={(creature) => setSelectedLegend(creature)}
              onViewAllCreatures={() => {
                setCurrentView('creatures');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <RandomLegendSection
              onSelectLegend={(legend) => setSelectedLegend(legend)}
            />

            <LegendOfTheDay
              onSelectLegend={(legend) => setSelectedLegend(legend)}
              onExploreAtlas={() => {
                setCurrentView('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <HomeConnectionsPreview onNavigate={handleNavigate} />

            <HomeTimelinePreview onNavigate={handleNavigate} />

            <DidYouKnowSection />

            <CallToExploreSection onNavigate={handleNavigate} />
          </main>
        )}

        {currentView === 'explore' && (
          <ExploreView
            key={`${exploreRegion}-${exploreType}`}
            initialRegion={exploreRegion}
            initialType={exploreType}
            onSelectLegend={(legend) => setSelectedLegend(legend)}
          />
        )}

        {currentView === 'creatures' && (
          <CreaturesView
            onSelectCreature={(creature) => setSelectedLegend(creature)}
          />
        )}

        {currentView === 'pantheons' && (
          <PantheonsView
            onSelectLegend={(legend) => setSelectedLegend(legend)}
          />
        )}

        {currentView === 'timeline' && (
          <TimelineView
            onSelectLegend={(legend) => setSelectedLegend(legend)}
          />
        )}

        {currentView === 'connections' && (
          <ConnectionsView
            onSelectLegend={(legend) => setSelectedLegend(legend)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenRandom={() => setIsRandomOpen(true)}
          />
        )}
      </div>

      <DetailModal
        legend={selectedLegend}
        onClose={() => setSelectedLegend(null)}
        onSelectRelated={(related) => setSelectedLegend(related)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLegend={(legend) => {
          setIsSearchOpen(false);
          setSelectedLegend(legend);
        }}
      />

      <RandomLegendModal
        isOpen={isRandomOpen}
        onClose={() => setIsRandomOpen(false)}
        onSelectLegend={(legend) => {
          setIsRandomOpen(false);
          setSelectedLegend(legend);
        }}
      />

      <PortraitsManagerModal
        isOpen={isArtworksOpen}
        onClose={() => setIsArtworksOpen(false)}
        onSelectLegend={(legendId) => {
          setIsArtworksOpen(false);
          const found = ALL_LEGENDS.find((l) => l.id === legendId);
          if (found) setSelectedLegend(found);
        }}
      />

      <OracleModal
        isOpen={isOracleOpen}
        onClose={() => setIsOracleOpen(false)}
        onSelectLegend={(legend) => setSelectedLegend(legend)}
      />

      <MythicArenaModal
        isOpen={isArenaOpen}
        onClose={() => setIsArenaOpen(false)}
        onSelectLegend={(legend) => setSelectedLegend(legend)}
      />

      <Footer
        onNavigate={handleNavigate}
        onSelectRegion={handleSelectRegionFromFooter}
      />
    </div>
  );
}
export default App;

