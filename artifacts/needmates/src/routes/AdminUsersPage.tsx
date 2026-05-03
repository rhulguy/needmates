import { useState } from 'react';
import { Link } from 'wouter';
import { AdminShell } from '@/components/admin/AdminShell';
import { mockUsers } from '@/data/mockUsers';
import { mockNeeds } from '@/data/mockNeeds';
import { User } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Search, ShieldCheck, MapPin, ArrowUpRight } from 'lucide-react';

type StatusFilter = 'all' | 'active' | 'suspended';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<(User & { status: 'active' | 'suspended' })[]>(
    mockUsers.map(u => ({ ...u, status: 'active' as const }))
  );
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [confirmSuspend, setConfirmSuspend] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 5;

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.postcodeArea.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const toggleSuspend = (id: string) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
    ));
    setConfirmSuspend(null);
  };

  const removeUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setConfirmRemove(null);
  };

  const activeCount = users.filter(u => u.status === 'active').length;
  const suspendedCount = users.filter(u => u.status === 'suspended').length;

  return (
    <AdminShell pageTitle="User Management">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-muted-foreground bg-card border-2 border-border rounded-2xl px-4 py-3">
          <span>{users.length} total users</span>
          <span className="text-emerald-600">{activeCount} active</span>
          <span className="text-red-500">{suspendedCount} suspended</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="w-full pl-9 pr-4 py-2.5 border-2 border-border rounded-xl font-medium text-sm focus:outline-none focus:border-primary"
              placeholder="Search by name or postcode..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0); }}
              data-testid="input-user-search"
            />
          </div>
          <div className="flex gap-1 bg-muted border-2 border-border rounded-xl p-1 w-fit">
            {(['all', 'active', 'suspended'] as StatusFilter[]).map(s => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(0); }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-bold transition-all capitalize',
                  statusFilter === s ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
                data-testid={`filter-${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: card list */}
        <div className="sm:hidden space-y-3">
          {paginated.map(user => {
            const needCount = mockNeeds.filter(n => n.postedByUserId === user.id).length;
            return (
              <div key={user.id} className="bg-card border-2 border-border rounded-2xl p-4" data-testid={`user-row-${user.id}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black shrink-0">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{user.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />{user.locationLabel}
                      <span>·</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />{user.vouchCount} vouches
                    </div>
                  </div>
                  <Badge variant={user.status === 'active' ? 'success' : 'destructive'} className="capitalize shrink-0">
                    {user.status}
                  </Badge>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Link href={`/profile/${user.id}`} className="flex-1">
                    <Button size="sm" variant="outline" className="rounded-lg gap-1 w-full" data-testid={`btn-view-user-${user.id}`}>
                      <ArrowUpRight className="w-3 h-3" /> View
                    </Button>
                  </Link>
                  {confirmSuspend === user.id ? (
                    <>
                      <Button size="sm" variant="destructive" className="rounded-lg text-xs flex-1" onClick={() => toggleSuspend(user.id)} data-testid={`btn-confirm-suspend-${user.id}`}>Confirm</Button>
                      <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={() => setConfirmSuspend(null)}>×</Button>
                    </>
                  ) : (
                    <Button
                      size="sm" variant="outline"
                      className={cn('rounded-lg flex-1', user.status === 'active' ? 'border-orange-200 text-orange-600' : 'border-emerald-200 text-emerald-600')}
                      onClick={() => setConfirmSuspend(user.id)}
                      data-testid={`btn-suspend-${user.id}`}
                    >
                      {user.status === 'active' ? 'Suspend' : 'Unsuspend'}
                    </Button>
                  )}
                  {confirmRemove === user.id ? (
                    <>
                      <Button size="sm" variant="destructive" className="rounded-lg text-xs flex-1" onClick={() => removeUser(user.id)} data-testid={`btn-confirm-remove-user-${user.id}`}>Remove</Button>
                      <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={() => setConfirmRemove(null)}>×</Button>
                    </>
                  ) : (
                    <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-500 flex-1" onClick={() => setConfirmRemove(user.id)} data-testid={`btn-remove-user-${user.id}`}>Remove</Button>
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
                  <th className="text-left font-black px-5 py-3 text-muted-foreground">User</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground hidden md:table-cell">Location</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground hidden lg:table-cell">Needs</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground hidden lg:table-cell">Vouches</th>
                  <th className="text-left font-black px-3 py-3 text-muted-foreground">Status</th>
                  <th className="text-right font-black px-5 py-3 text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user, i) => {
                  const needCount = mockNeeds.filter(n => n.postedByUserId === user.id).length;
                  return (
                    <tr key={user.id} className={cn('border-b border-border last:border-0', i % 2 === 1 && 'bg-muted/20')} data-testid={`user-row-${user.id}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black shrink-0">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.completedInteractions} interactions</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 hidden md:table-cell">
                        <span className="flex items-center gap-1 text-muted-foreground font-semibold">
                          <MapPin className="w-3 h-3" />{user.locationLabel}
                        </span>
                      </td>
                      <td className="px-3 py-4 font-bold hidden lg:table-cell">{needCount}</td>
                      <td className="px-3 py-4 hidden lg:table-cell">
                        <span className="flex items-center gap-1 font-bold">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />{user.vouchCount}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <Badge variant={user.status === 'active' ? 'success' : 'destructive'} className="capitalize">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/profile/${user.id}`}>
                            <Button size="sm" variant="outline" className="rounded-lg gap-1" data-testid={`btn-view-user-${user.id}`}>
                              <ArrowUpRight className="w-3 h-3" /> View
                            </Button>
                          </Link>
                          {confirmSuspend === user.id ? (
                            <div className="flex gap-1">
                              <Button size="sm" variant="destructive" className="rounded-lg text-xs" onClick={() => toggleSuspend(user.id)} data-testid={`btn-confirm-suspend-${user.id}`}>Confirm</Button>
                              <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={() => setConfirmSuspend(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <Button
                              size="sm" variant="outline"
                              className={cn('rounded-lg', user.status === 'active' ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50')}
                              onClick={() => setConfirmSuspend(user.id)}
                              data-testid={`btn-suspend-${user.id}`}
                            >
                              {user.status === 'active' ? 'Suspend' : 'Unsuspend'}
                            </Button>
                          )}
                          {confirmRemove === user.id ? (
                            <div className="flex gap-1">
                              <Button size="sm" variant="destructive" className="rounded-lg text-xs" onClick={() => removeUser(user.id)} data-testid={`btn-confirm-remove-user-${user.id}`}>Remove</Button>
                              <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={() => setConfirmRemove(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-500 hover:bg-red-50" onClick={() => setConfirmRemove(user.id)} data-testid={`btn-remove-user-${user.id}`}>Remove</Button>
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

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-muted-foreground">Page {page + 1} of {totalPages}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="rounded-xl" disabled={page === 0} onClick={() => setPage(p => p - 1)} data-testid="btn-prev-page">Previous</Button>
              <Button size="sm" variant="outline" className="rounded-xl" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} data-testid="btn-next-page">Next</Button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
