import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { NeedCard } from '@/components/needs/NeedCard';
import { mockNeeds } from '@/data/mockNeeds';
import { mockCategories } from '@/data/mockCategories';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { NeedType } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function NeedsFeedPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<NeedType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'interest' | 'threshold'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredNeeds = mockNeeds
    .filter(need => {
      if (search && !need.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== 'all' && need.type !== typeFilter) return false;
      if (categoryFilter !== 'all' && need.category !== categoryFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'interest') return b.interestedCount - a.interestedCount;
      if (sortBy === 'threshold') {
        const aProgress = a.targetInterestCount ? a.interestedCount / a.targetInterestCount : 0;
        const bProgress = b.targetInterestCount ? b.interestedCount / b.targetInterestCount : 0;
        return bProgress - aProgress;
      }
      return 0;
    });

  const hasActiveFilters = typeFilter !== 'all' || categoryFilter !== 'all' || sortBy !== 'newest';

  const clearFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('all');
    setSortBy('newest');
  };

  return (
    <AppShell>
      <div className="bg-muted border-b-2 border-border pt-6 pb-5 md:pt-8 md:pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black mb-4 md:mb-6">Local Needs Feed</h1>

          {/* Search + filter toggle row */}
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-background font-medium text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Search needs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="input-search"
              />
            </div>
            {/* Mobile: toggle filter panel */}
            <button
              className={cn(
                "md:hidden flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all",
                showFilters || hasActiveFilters
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-foreground"
              )}
              onClick={() => setShowFilters(v => !v)}
              data-testid="btn-toggle-filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-white text-primary rounded-full text-xs flex items-center justify-center font-black">!</span>
              )}
            </button>
          </div>

          {/* Desktop: always visible filters */}
          <div className="hidden md:grid md:grid-cols-3 gap-3">
            <select
              className="border-2 border-border rounded-xl px-4 py-3 bg-background font-bold text-sm focus:outline-none focus:border-primary"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as NeedType | 'all')}
              data-testid="select-type"
            >
              <option value="all">All Types</option>
              <option value="need">Wanted</option>
              <option value="offer">Offering</option>
              <option value="group">Group Buy</option>
              <option value="recommend">Recommendation</option>
              <option value="lend">Lending</option>
              <option value="connect">Connect</option>
            </select>
            <select
              className="border-2 border-border rounded-xl px-4 py-3 bg-background font-bold text-sm focus:outline-none focus:border-primary"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              data-testid="select-category"
            >
              <option value="all">All Categories</option>
              {mockCategories.map(cat => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
              ))}
            </select>
            <select
              className="border-2 border-border rounded-xl px-4 py-3 bg-background font-bold text-sm focus:outline-none focus:border-primary"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'interest' | 'threshold')}
              data-testid="select-sort"
            >
              <option value="newest">Newest First</option>
              <option value="interest">Most Interest</option>
              <option value="threshold">Closest to Goal</option>
            </select>
          </div>

          {/* Mobile: collapsible filter panel */}
          {showFilters && (
            <div className="md:hidden space-y-2 mt-2">
              <select
                className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background font-bold text-sm focus:outline-none focus:border-primary"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as NeedType | 'all')}
                data-testid="select-type-mobile"
              >
                <option value="all">All Types</option>
                <option value="need">Wanted</option>
                <option value="offer">Offering</option>
                <option value="group">Group Buy</option>
                <option value="recommend">Recommendation</option>
                <option value="lend">Lending</option>
                <option value="connect">Connect</option>
              </select>
              <select
                className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background font-bold text-sm focus:outline-none focus:border-primary"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                data-testid="select-category-mobile"
              >
                <option value="all">All Categories</option>
                {mockCategories.map(cat => (
                  <option key={cat.id} value={cat.label}>{cat.label}</option>
                ))}
              </select>
              <select
                className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background font-bold text-sm focus:outline-none focus:border-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'interest' | 'threshold')}
                data-testid="select-sort-mobile"
              >
                <option value="newest">Newest First</option>
                <option value="interest">Most Interest</option>
                <option value="threshold">Closest to Goal</option>
              </select>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Clear filters
                </button>
              )}
            </div>
          )}

          {hasActiveFilters && !showFilters && (
            <div className="md:hidden flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-primary">{filteredNeeds.length} results</span>
              <button onClick={clearFilters} className="text-xs font-bold text-muted-foreground hover:text-destructive flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="hidden md:flex items-center justify-between mb-6">
          <span className="font-bold text-muted-foreground">{filteredNeeds.length} need{filteredNeeds.length !== 1 ? 's' : ''} found</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground gap-1">
              <X className="w-3.5 h-3.5" /> Clear filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredNeeds.map(need => (
            <NeedCard key={need.id} need={need} />
          ))}
        </div>

        {filteredNeeds.length === 0 && (
          <div className="text-center py-16 md:py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">No needs found</h3>
            <p className="text-muted-foreground text-base md:text-lg">Try adjusting your filters or post a new need yourself.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
