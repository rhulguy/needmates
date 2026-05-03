import { useState } from 'react';
import { Link } from 'wouter';
import { AdminShell } from '@/components/admin/AdminShell';
import { mockNeeds } from '@/data/mockNeeds';
import { mockUsers } from '@/data/mockUsers';
import { mockCategories } from '@/data/mockCategories';
import { NeedPost, NeedType } from '@/types';
import { NeedTypeBadge } from '@/components/needs/NeedTypeBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTimeAgo, cn } from '@/lib/utils';
import { Search, MapPin, Users, ArrowUpRight, Flag } from 'lucide-react';

type NeedWithFlag = NeedPost & { flagged?: boolean };

export default function AdminNeedsPage() {
  const [needs, setNeeds] = useState<NeedWithFlag[]>(mockNeeds);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<NeedType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'fulfilled' | 'closed'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const filtered = needs.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || n.type === typeFilter;
    const matchStatus = statusFilter === 'all' || n.status === statusFilter;
    const matchCat = categoryFilter === 'all' || n.category === categoryFilter;
    return matchSearch && matchType && matchStatus && matchCat;
  });

  const closeNeed = (id: string) => setNeeds(prev => prev.map(n => n.id === id ? { ...n, status: 'closed' as const } : n));
  const flagNeed = (id: string) => setNeeds(prev => prev.map(n => n.id === id ? { ...n, flagged: !n.flagged } : n));
  const removeNeed = (id: string) => { setNeeds(prev => prev.filter(n => n.id !== id)); setConfirmRemove(null); };

  const types: (NeedType | 'all')[] = ['all', 'need', 'offer', 'group', 'recommend', 'lend', 'connect'];

  return (
    <AdminShell pageTitle="Needs Management">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm font-bold text-muted-foreground bg-card border-2 border-border rounded-2xl px-4 py-3">
          <span>{needs.length} total</span>
          <span className="text-emerald-600">{needs.filter(n => n.status === 'active').length} active</span>
          <span className="text-muted-foreground">{needs.filter(n => n.status === 'closed').length} closed</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="w-full pl-9 pr-4 py-2.5 border-2 border-border rounded-xl font-medium text-sm focus:outline-none focus:border-primary"
              placeholder="Search needs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              data-testid="input-needs-search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as NeedType | 'all')}
              className="flex-1 min-w-[120px] border-2 border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-primary capitalize"
              data-testid="select-type-filter">
              {types.map(t => <option key={t} value={t}>{t === 'all' ? 'All types' : t}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as 'all' | 'active' | 'fulfilled' | 'closed')}
              className="flex-1 min-w-[120px] border-2 border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-primary"
              data-testid="select-status-filter">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="closed">Closed</option>
            </select>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
              className="flex-1 min-w-[120px] border-2 border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-primary"
              data-testid="select-category-filter">
              <option value="all">All categories</option>
              {mockCategories.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
            </select>
          </div>
        </div>

        {/* Mobile: card list */}
        <div className="sm:hidden space-y-3">
          {filtered.map(need => {
            const poster = mockUsers.find(u => u.id === need.postedByUserId);
            return (
              <div key={need.id} className={cn('bg-card border-2 border-border rounded-2xl p-4', need.flagged && 'border-orange-300 bg-orange-50/30')} data-testid={`need-row-${need.id}`}>
                <div className="flex items-start gap-2 mb-3">
                  {need.flagged && <Flag className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm mb-1 line-clamp-2">{need.title}</div>
                    <div className="flex flex-wrap items-center gap-2">
                      <NeedTypeBadge type={need.type} />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{need.locationLabel}
                      </span>
                      {poster && <span className="text-xs text-muted-foreground">by {poster.name}</span>}
                    </div>
                  </div>
                  <Badge variant={need.status === 'active' ? 'success' : 'outline'} className="capitalize shrink-0 text-xs">
                    {need.status}
                  </Badge>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/need/${need.id}`} className="shrink-0">
                    <Button size="sm" variant="outline" className="rounded-lg gap-1" data-testid={`btn-view-need-${need.id}`}>
                      <ArrowUpRight className="w-3 h-3" /> View
                    </Button>
                  </Link>
                  {need.status === 'active' && (
                    <Button size="sm" variant="outline" className="rounded-lg border-orange-200 text-orange-600 flex-1 text-xs" onClick={() => closeNeed(need.id)} data-testid={`btn-close-need-${need.id}`}>Close</Button>
                  )}
                  <Button size="sm" variant="outline" className={cn('rounded-lg shrink-0', need.flagged ? 'border-orange-300 bg-orange-50 text-orange-600' : 'border-orange-200 text-orange-500')} onClick={() => flagNeed(need.id)} data-testid={`btn-flag-need-${need.id}`}>
                    <Flag className="w-3 h-3" />
                  </Button>
                  {confirmRemove === need.id ? (
                    <>
                      <Button size="sm" variant="destructive" className="rounded-lg text-xs flex-1" onClick={() => removeNeed(need.id)} data-testid={`btn-confirm-remove-need-${need.id}`}>Delete</Button>
                      <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={() => setConfirmRemove(null)}>×</Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-500 flex-1 text-xs" onClick={() => setConfirmRemove(need.id)} data-testid={`btn-remove-need-${need.id}`}>Remove</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: table */}
        <div className="hidden sm:block bg-card border-2 border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b-2 border-border bg-muted/50">
                <tr>
                  <th className="text-left font-black px-5 py-3 text-muted-foreground">Need</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground hidden md:table-cell">Category</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground hidden lg:table-cell">Posted</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground hidden lg:table-cell">Interest</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground">Status</th>
                  <th className="text-right font-black px-5 py-3 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((need, i) => {
                  const poster = mockUsers.find(u => u.id === need.postedByUserId);
                  return (
                    <tr key={need.id} className={cn('border-b border-border last:border-0', i % 2 === 1 && 'bg-muted/20', need.flagged && 'bg-orange-50/50')} data-testid={`need-row-${need.id}`}>
                      <td className="px-5 py-4 max-w-[280px]">
                        <div className="flex items-start gap-2">
                          {need.flagged && <Flag className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />}
                          <div>
                            <div className="font-bold text-sm line-clamp-1">{need.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <NeedTypeBadge type={need.type} />
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />{need.locationLabel}
                              </span>
                            </div>
                            {poster && <div className="text-xs text-muted-foreground mt-0.5">by {poster.name}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 hidden md:table-cell">
                        <Badge variant="outline" className="text-xs">{need.category}</Badge>
                      </td>
                      <td className="px-3 py-4 text-muted-foreground font-semibold hidden lg:table-cell">{formatTimeAgo(need.createdAt)}</td>
                      <td className="px-3 py-4 hidden lg:table-cell">
                        <span className="flex items-center gap-1 font-bold text-primary">
                          <Users className="w-3 h-3" />{need.interestedCount}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <Badge variant={need.status === 'active' ? 'success' : 'outline'} className="capitalize">{need.status}</Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1 flex-wrap">
                          <Link href={`/need/${need.id}`}>
                            <Button size="sm" variant="outline" className="rounded-lg" data-testid={`btn-view-need-${need.id}`}>
                              <ArrowUpRight className="w-3 h-3" />
                            </Button>
                          </Link>
                          {need.status === 'active' && (
                            <Button size="sm" variant="outline" className="rounded-lg border-orange-200 text-orange-600 hover:bg-orange-50 text-xs" onClick={() => closeNeed(need.id)} data-testid={`btn-close-need-${need.id}`}>Close</Button>
                          )}
                          <Button size="sm" variant="outline" className={cn('rounded-lg text-xs', need.flagged ? 'border-orange-300 bg-orange-50 text-orange-600' : 'border-orange-200 text-orange-500 hover:bg-orange-50')} onClick={() => flagNeed(need.id)} data-testid={`btn-flag-need-${need.id}`}>
                            <Flag className="w-3 h-3" />
                          </Button>
                          {confirmRemove === need.id ? (
                            <div className="flex gap-1">
                              <Button size="sm" variant="destructive" className="rounded-lg text-xs" onClick={() => removeNeed(need.id)} data-testid={`btn-confirm-remove-need-${need.id}`}>Delete</Button>
                              <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={() => setConfirmRemove(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-500 hover:bg-red-50 text-xs" onClick={() => setConfirmRemove(need.id)} data-testid={`btn-remove-need-${need.id}`}>Remove</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
