import { useState } from 'react';
import { AccountShell } from '@/components/account/AccountShell';
import { mockUsers } from '@/data/mockUsers';
import { mockNeeds } from '@/data/mockNeeds';
import { NeedPost } from '@/types';
import { NeedTypeBadge } from '@/components/needs/NeedTypeBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTimeAgo, cn } from '@/lib/utils';
import { Link } from 'wouter';
import { MapPin, Clock, Users, Pencil, X, Trash2, Plus } from 'lucide-react';

const currentUser = mockUsers[0];
type StatusFilter = 'all' | 'active' | 'fulfilled' | 'closed';

export default function AccountNeedsPage() {
  const [needs, setNeeds] = useState<NeedPost[]>(
    mockNeeds.filter(n => n.postedByUserId === currentUser.id)
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = needs.filter(n => statusFilter === 'all' || n.status === statusFilter);

  const closeNeed = (id: string) => {
    setNeeds(prev => prev.map(n => n.id === id ? { ...n, status: 'closed' as const } : n));
  };

  const deleteNeed = (id: string) => {
    setNeeds(prev => prev.filter(n => n.id !== id));
    setConfirmDelete(null);
  };

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'fulfilled', label: 'Fulfilled' },
    { key: 'closed', label: 'Closed' },
  ];

  return (
    <AccountShell>
      <div className="p-6 md:p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black">My Needs</h1>
            <p className="text-muted-foreground font-semibold mt-1">{needs.length} total posts</p>
          </div>
          <Link href="/create">
            <Button className="rounded-full gap-2" data-testid="btn-new-need">
              <Plus className="w-4 h-4" /> New Need
            </Button>
          </Link>
        </div>

        <div className="flex gap-2 mb-6 border-2 border-border rounded-2xl p-1 bg-muted w-fit">
          {tabs.map(tab => (
            <button
              key={tab.key}
              data-testid={`tab-${tab.key}`}
              onClick={() => setStatusFilter(tab.key)}
              className={cn(
                'px-5 py-2 rounded-xl text-sm font-bold transition-all',
                statusFilter === tab.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-60">
                {tab.key === 'all' ? needs.length : needs.filter(n => n.status === tab.key).length}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground font-semibold">No needs in this category.</p>
            </div>
          )}
          {filtered.map(need => (
            <div key={need.id} className="bg-card border-2 border-border rounded-2xl p-5 relative overflow-hidden">
              <div className={cn(
                'absolute left-0 top-0 bottom-0 w-1.5',
                need.status === 'active' ? 'bg-emerald-500' :
                need.status === 'closed' ? 'bg-muted-foreground' : 'bg-blue-500'
              )} />
              <div className="pl-4">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <NeedTypeBadge type={need.type} />
                    <Badge
                      variant={need.status === 'active' ? 'success' : need.status === 'closed' ? 'outline' : 'info'}
                      className="capitalize"
                    >
                      {need.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground font-semibold gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(need.createdAt)}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-1">{need.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{need.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{need.locationLabel}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{need.interestedCount} interested</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href={`/need/${need.id}`}>
                    <Button size="sm" variant="outline" className="rounded-xl" data-testid={`btn-view-${need.id}`}>View</Button>
                  </Link>
                  {need.status === 'active' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
                      onClick={() => closeNeed(need.id)}
                      data-testid={`btn-close-${need.id}`}
                    >
                      <X className="w-3 h-3 mr-1" /> Close
                    </Button>
                  )}
                  {confirmDelete === need.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-destructive">Are you sure?</span>
                      <Button size="sm" variant="destructive" className="rounded-xl" onClick={() => deleteNeed(need.id)} data-testid={`btn-confirm-delete-${need.id}`}>
                        Delete
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setConfirmDelete(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-red-200 text-red-500 hover:bg-red-50"
                      onClick={() => setConfirmDelete(need.id)}
                      data-testid={`btn-delete-${need.id}`}
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountShell>
  );
}
