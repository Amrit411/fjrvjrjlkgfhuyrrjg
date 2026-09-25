import React, { useState, useMemo } from 'react';
import { Filter, X, RotateCcw, Search, SlidersHorizontal, ArrowUpDown, ChevronDown, Bookmark, BookmarkCheck } from 'lucide-react';
import { ALL_LEGENDS } from '../data/mythologyData';
import { LegendEntry, MythologyRegion, Element } from '../types/mythology';
import { VisualArtifact } from './VisualArtifact';
import { LegendArtwork } from './LegendArtwork';
import { useFavorites } from '../hooks/useFavorites';

interface ExploreViewProps {
  initialRegion?: string;
  initialType?: string;
  onSelectLegend: (legend: LegendEntry) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialRegion,
  initialType,
  onSelectLegend,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    initialRegion ? [initialRegion] : []
  );
  const [selectedClasses, setSelectedClasses] = useState<string[]>(
    initialType ? [initialType] : []
  );
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [minPower, setMinPower] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'alpha-asc' | 'alpha-desc' | 'power-desc' | 'power-asc' | 'recent'>('alpha-asc');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const { isFavorite, toggleFavorite, favoriteCount } = useFavorites();

  const regions: MythologyRegion[] = ['India', 'Greece', 'Egypt', 'Scandinavia', 'Japan', 'Celtic', 'Mesoamerica'];
  const classes = ['God', 'Goddess', 'Hero', 'Creature', 'Spirit', 'Monster', 'Object'];
  const elements: Element[] = ['Fire', 'Water', 'Earth', 'Air', 'Lightning', 'Shadow', 'Light'];

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const toggleClass = (cls: string) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const toggleElement = (elem: string) => {
    setSelectedElements((prev) =>
      prev.includes(elem) ? prev.filter((e) => e !== elem) : [...prev, elem]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedRegions([]);
    setSelectedClasses([]);
    setSelectedElements([]);
    setMinPower(0);
    setSortBy('alpha-asc');
    setShowSavedOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedRegions.length > 0 ||
    selectedClasses.length > 0 ||
    selectedElements.length > 0 ||
    minPower > 0 ||
    showSavedOnly;

  const filteredLegends = useMemo(() => {
    return ALL_LEGENDS.filter((item) => {
      if (showSavedOnly && !isFavorite(item.id)) {
        return false;
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesText =
          item.name.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.mythology.toLowerCase().includes(q) ||
          item.lore.toLowerCase().includes(q) ||
          item.symbols.some((s) => s.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      if (selectedRegions.length > 0) {
        const matchesRegion =
          selectedRegions.includes(item.region) ||
          selectedRegions.some((r) => item.mythology.toLowerCase() === r.toLowerCase());
        if (!matchesRegion) return false;
      }

      if (selectedClasses.length > 0) {
        const itemClassLower = item.class.toLowerCase();
        const matchesClass = selectedClasses.some((c) =>
          itemClassLower.includes(c.toLowerCase()) || item.type.toLowerCase() === c.toLowerCase()
        );
        if (!matchesClass) return false;
      }

      if (selectedElements.length > 0 && !selectedElements.includes(item.element)) {
        return false;
      }

      if (item.power < minPower) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'alpha-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'power-desc') return b.power - a.power;
      if (sortBy === 'power-asc') return a.power - b.power;
      return 0;
    });
  }, [searchQuery, selectedRegions, selectedClasses, selectedElements, minPower, sortBy, showSavedOnly, isFavorite]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">

      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-serif-ancient tracking-[0.25em] text-[#D4AF37] uppercase font-semibold mb-2 block">
          Comprehensive Catalog
        </span>
        <h1 className="font-serif-ancient text-3xl sm:text-5xl font-extrabold text-[#F5F5F0]">
          EXPLORE THE ATLAS
        </h1>
        <div className="w-16 h-[2px] bg-[#D4AF37] mt-3 mb-3" />
        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-2xl font-normal">
          Search, filter and discover legends from cultures around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <div className="lg:hidden flex items-center justify-between gap-4 mb-2">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 py-2.5 px-4 bg-[#111827] border border-[#243048] rounded-lg text-xs font-serif-ancient tracking-wider uppercase text-[#F5F5F0] flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4 text-[#D4AF37]" />
            <span>Filters ({selectedRegions.length + selectedClasses.length + selectedElements.length + (minPower > 0 ? 1 : 0)})</span>
          </button>
        </div>

        <aside className="hidden lg:block lg:col-span-3 bg-[#111827] rounded-xl border border-[#243048] p-5 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-[#243048] mb-5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-serif-ancient text-sm font-bold text-[#F5F5F0] uppercase tracking-wider">
                Atlas Filters
              </span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="space-y-6">

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] block font-semibold mb-2.5">
                REGION / CULTURE
              </span>
              <div className="flex flex-col gap-1.5">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => toggleRegion(region)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded text-xs transition-colors text-left cursor-pointer ${
                      selectedRegions.includes(region)
                        ? 'bg-[#D4AF37] text-[#080B12] font-semibold'
                        : 'text-[#9CA3AF] hover:text-[#F5F5F0] hover:bg-[#161F30]'
                    }`}
                  >
                    <span>{region}</span>
                    {selectedRegions.includes(region) && <span className="text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#243048]/60">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] block font-semibold mb-2.5">
                CLASS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {classes.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => toggleClass(cls)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedClasses.includes(cls)
                        ? 'bg-[#D4AF37] text-[#080B12] font-semibold'
                        : 'bg-[#161F30] text-[#9CA3AF] hover:text-[#F5F5F0] border border-[#243048]'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#243048]/60">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] block font-semibold mb-2.5">
                ELEMENT
              </span>
              <div className="flex flex-wrap gap-1.5">
                {elements.map((elem) => (
                  <button
                    key={elem}
                    onClick={() => toggleElement(elem)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedElements.includes(elem)
                        ? 'bg-[#D4AF37] text-[#080B12] font-semibold'
                        : 'bg-[#161F30] text-[#9CA3AF] hover:text-[#F5F5F0] border border-[#243048]'
                    }`}
                  >
                    {elem}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#243048]/60">
              <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] mb-2">
                <span className="uppercase tracking-wider">MIN POWER:</span>
                <span className="text-[#D4AF37] font-bold tabular-nums">{minPower} / 100</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={minPower}
                onChange={(e) => setMinPower(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9 flex flex-col gap-6">

          <div className="bg-[#111827] rounded-xl border border-[#243048] p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">

            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search filtered entries..."
                className="w-full pl-9 pr-3 py-2 bg-[#161F30] border border-[#243048] rounded text-xs text-[#F5F5F0] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
              {favoriteCount > 0 && (
                <button
                  onClick={() => setShowSavedOnly((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                    showSavedOnly
                      ? 'bg-[#D4AF37] text-[#080B12] font-bold shadow'
                      : 'bg-[#161F30] text-[#9CA3AF] hover:text-[#D4AF37] border border-[#243048]'
                  }`}
                  title="Filter to bookmarked legends"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-[#080B12]' : ''}`} />
                  <span>Saved ({favoriteCount})</span>
                </button>
              )}

              <div className="font-mono text-xs text-[#D4AF37] tabular-nums whitespace-nowrap">
                {filteredLegends.length} {filteredLegends.length === 1 ? 'legend' : 'legends'} discovered
              </div>

              <div className="relative flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#161F30] border border-[#243048] text-xs text-[#F5F5F0] py-1.5 pl-2.5 pr-7 rounded appearance-none cursor-pointer focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="alpha-asc">Alphabetical (A - Z)</option>
                  <option value="alpha-desc">Alphabetical (Z - A)</option>
                  <option value="power-desc">Power (Highest First)</option>
                  <option value="power-asc">Power (Lowest First)</option>
                  <option value="recent">Archival Reference</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-2 pointer-events-none" />
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#9CA3AF] uppercase">Active:</span>

              {showSavedOnly && (
                <button
                  onClick={() => setShowSavedOnly(false)}
                  className="px-2.5 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F4D58D] text-xs rounded-md flex items-center gap-1.5 hover:bg-[#D4AF37]/30"
                >
                  <span>Saved Bookmarks Only</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {selectedRegions.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleRegion(r)}
                  className="px-2.5 py-1 bg-[#161F30] border border-[#D4AF37]/50 text-[#F4D58D] text-xs rounded-md flex items-center gap-1.5 hover:bg-[#D4AF37]/10"
                >
                  <span>{r}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {selectedClasses.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleClass(c)}
                  className="px-2.5 py-1 bg-[#161F30] border border-[#D4AF37]/50 text-[#F4D58D] text-xs rounded-md flex items-center gap-1.5 hover:bg-[#D4AF37]/10"
                >
                  <span>{c}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {selectedElements.map((e) => (
                <button
                  key={e}
                  onClick={() => toggleElement(e)}
                  className="px-2.5 py-1 bg-[#161F30] border border-[#D4AF37]/50 text-[#F4D58D] text-xs rounded-md flex items-center gap-1.5 hover:bg-[#D4AF37]/10"
                >
                  <span>{e}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {minPower > 0 && (
                <button
                  onClick={() => setMinPower(0)}
                  className="px-2.5 py-1 bg-[#161F30] border border-[#D4AF37]/50 text-[#F4D58D] text-xs rounded-md flex items-center gap-1.5 hover:bg-[#D4AF37]/10"
                >
                  <span>Power ≥ {minPower}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              <button
                onClick={clearAllFilters}
                className="text-xs text-[#9CA3AF] hover:text-[#D4AF37] underline ml-2 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {filteredLegends.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredLegends.map((legend) => (
                <div
                  key={legend.id}
                  onClick={() => onSelectLegend(legend)}
                  className="group bg-[#111827] rounded-xl border border-[#243048] hover:border-[#D4AF37] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(212,175,55,0.12)]"
                >
                  <div className="relative bg-[#161F30] overflow-hidden h-48 sm:h-52">
                    <LegendArtwork legend={legend} size="md" />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#080B12]/85 backdrop-blur-sm border border-[#243048] rounded text-[10px] font-mono text-[#F4D58D] shadow">
                      {legend.element}
                    </div>
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#080B12]/85 backdrop-blur-sm border border-[#243048] rounded text-[10px] font-mono text-[#D4AF37] shadow">
                      {legend.mythology}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(legend.id);
                      }}
                      className={`absolute bottom-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all cursor-pointer ${
                        isFavorite(legend.id)
                          ? 'bg-[#D4AF37] text-[#080B12] border-[#D4AF37] shadow-lg'
                          : 'bg-[#080B12]/80 text-[#9CA3AF] hover:text-[#D4AF37] border-[#243048]'
                      }`}
                      title={isFavorite(legend.id) ? 'Remove bookmark' : 'Bookmark legend'}
                      aria-label="Toggle bookmark"
                    >
                      {isFavorite(legend.id) ? (
                        <BookmarkCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-serif-ancient text-lg font-bold text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors truncate">
                          {legend.name}
                        </h3>
                        <span className="text-[10px] font-mono text-[#9CA3AF] uppercase ml-2 shrink-0">
                          {legend.class}
                        </span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] italic mb-3 line-clamp-1">
                        {legend.title}
                      </p>
                      <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed mb-4">
                        {legend.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF] mb-1">
                        <span>POWER SCORE</span>
                        <span className="text-[#D4AF37] font-bold tabular-nums">
                          {legend.power}/100
                        </span>
                      </div>
                      <div className="w-full h-1 bg-[#161F30] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#B8860B] to-[#F4D58D]"
                          style={{ width: `${legend.power}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-[#111827] rounded-xl border border-[#243048] p-8 flex flex-col items-center">
              <h3 className="font-serif-ancient text-xl text-[#F5F5F0] mb-2">
                No legend found.
              </h3>
              <p className="text-sm text-[#9CA3AF] max-w-sm mb-6">
                Try loosening your filter criteria or searching for another ancient name.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#D4AF37] text-[#080B12] font-serif-ancient text-xs font-bold uppercase rounded"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm h-full bg-[#080B12] border-l border-[#243048] p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#243048] mb-6">
                <span className="font-serif-ancient text-base font-bold text-[#D4AF37]">
                  FILTER ATLAS
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-[#9CA3AF] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-[#9CA3AF] block font-semibold mb-2">
                    Region
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {regions.map((r) => (
                      <button
                        key={r}
                        onClick={() => toggleRegion(r)}
                        className={`px-2 py-1 text-xs rounded border text-left truncate ${
                          selectedRegions.includes(r)
                            ? 'bg-[#D4AF37] text-[#080B12] border-[#D4AF37] font-semibold'
                            : 'bg-[#111827] text-[#9CA3AF] border-[#243048]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-[#9CA3AF] block font-semibold mb-2">
                    Class
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {classes.map((c) => (
                      <button
                        key={c}
                        onClick={() => toggleClass(c)}
                        className={`px-2.5 py-1 text-xs rounded border ${
                          selectedClasses.includes(c)
                            ? 'bg-[#D4AF37] text-[#080B12] border-[#D4AF37] font-semibold'
                            : 'bg-[#111827] text-[#9CA3AF] border-[#243048]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-[#9CA3AF] block font-semibold mb-2">
                    Element
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {elements.map((e) => (
                      <button
                        key={e}
                        onClick={() => toggleElement(e)}
                        className={`px-2.5 py-1 text-xs rounded border ${
                          selectedElements.includes(e)
                            ? 'bg-[#D4AF37] text-[#080B12] border-[#D4AF37] font-semibold'
                            : 'bg-[#111827] text-[#9CA3AF] border-[#243048]'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-[#9CA3AF] mb-1">
                    <span>Min Power:</span>
                    <span className="text-[#D4AF37] font-bold">{minPower}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={minPower}
                    onChange={(e) => setMinPower(Number(e.target.value))}
                    className="w-full accent-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#243048] flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2 text-xs uppercase font-serif-ancient text-[#9CA3AF] border border-[#243048] rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 text-xs uppercase font-serif-ancient bg-[#D4AF37] text-[#080B12] font-bold rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

