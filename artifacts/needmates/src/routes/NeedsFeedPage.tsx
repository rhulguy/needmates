import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { NeedCard } from '@/components/needs/NeedCard';
import { mockNeeds } from '@/data/mockNeeds';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { mockCategories } from '@/data/mockCategories';
import { Search } from 'lucide-react';
import { NeedType } from '@/types';

export default function NeedsFeedPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<NeedType | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'interest' | 'threshold'>('newest');

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

  return (
    <AppShell>
      <div className="bg-muted border-b-2 border-border pt-8 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black mb-6">Local Needs Feed</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search needs..."
                className="pl-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)}>
              <option value="all">All Types</option>
              <option value="need">Wanted</option>
              <option value="offer">Offering</option>
              <option value="group">Group Buy</option>
              <option value="recommend">Recommendation</option>
              <option value="lend">Lending</option>
              <option value="connect">Connect</option>
            </Select>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All Categories</option>
              {mockCategories.map(cat => (
                <option key={cat.id} value={cat.label}>{cat.label}</option>
              ))}
            </Select>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="newest">Newest First</option>
              <option value="interest">Most Interest</option>
              <option value="threshold">Closest to Goal</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeeds.map(need => (
            <NeedCard key={need.id} need={need} />
          ))}
        </div>
        {filteredNeeds.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-2xl font-bold mb-2">No needs found</h3>
            <p className="text-muted-foreground text-lg">Try adjusting your filters or post a new need yourself.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
