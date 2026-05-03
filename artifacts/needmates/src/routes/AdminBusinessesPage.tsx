import { useState } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { mockBusinesses } from '@/data/mockBusinesses';
import { LocalBusiness } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CheckCircle, Star, Briefcase, Plus, X } from 'lucide-react';

type Tab = 'all' | 'verified' | 'unverified';

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<LocalBusiness[]>(mockBusinesses);
  const [tab, setTab] = useState<Tab>('all');
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', locationLabel: '', description: '' });

  const filtered = businesses.filter(b => {
    if (tab === 'verified') return b.verified;
    if (tab === 'unverified') return !b.verified;
    return true;
  });

  const toggleVerify = (id: string) => setBusinesses(prev => prev.map(b => b.id === id ? { ...b, verified: !b.verified } : b));
  const removeBusiness = (id: string) => { setBusinesses(prev => prev.filter(b => b.id !== id)); setConfirmRemove(null); };

  const addBusiness = () => {
    if (!form.name.trim()) return;
    setBusinesses(prev => [{
      id: `b-new-${Date.now()}`,
      name: form.name,
      category: form.category || 'Trades & Services',
      locationLabel: form.locationLabel || 'Unknown',
      description: form.description,
      verified: false,
      rating: 0,
      completedJobs: 0,
      responseCount: 0,
      tags: [],
    }, ...prev]);
    setForm({ name: '', category: '', locationLabel: '', description: '' });
    setShowAdd(false);
  };

  return (
    <AdminShell pageTitle="Business Management">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-muted border-2 border-border rounded-xl p-1">
            {(['all', 'verified', 'unverified'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'px-4 py-1.5 rounded-lg text-sm font-bold transition-all capitalize',
                  tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
                data-testid={`tab-${t}`}
              >
                {t} ({t === 'all' ? businesses.length : businesses.filter(b => t === 'verified' ? b.verified : !b.verified).length})
              </button>
            ))}
          </div>
          <Button className="rounded-full gap-2" onClick={() => setShowAdd(v => !v)} data-testid="btn-add-business">
            <Plus className="w-4 h-4" /> Add Business
          </Button>
        </div>

        {showAdd && (
          <div className="bg-card border-2 border-border rounded-2xl p-5">
            <h3 className="font-black text-lg mb-4">Add New Business</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold mb-1">Business Name *</label>
                <input
                  className="w-full border-2 border-border rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Bright Sparkle Cleaning"
                  data-testid="input-business-name"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Category</label>
                <input
                  className="w-full border-2 border-border rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  placeholder="e.g. Home & Garden"
                  data-testid="input-business-category"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Location</label>
                <input
                  className="w-full border-2 border-border rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  value={form.locationLabel}
                  onChange={e => setForm(p => ({ ...p, locationLabel: e.target.value }))}
                  placeholder="e.g. Wokingham"
                  data-testid="input-business-location"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Description</label>
                <input
                  className="w-full border-2 border-border rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Brief description..."
                  data-testid="input-business-description"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="rounded-xl" onClick={addBusiness} data-testid="btn-submit-business">Add Business</Button>
              <Button variant="outline" className="rounded-xl" onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></Button>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {filtered.map(biz => (
            <div key={biz.id} className="bg-card border-2 border-border rounded-2xl p-5 flex flex-wrap items-start gap-4" data-testid={`business-card-${biz.id}`}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-black text-lg">{biz.name}</h3>
                  {biz.verified
                    ? <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</Badge>
                    : <Badge variant="outline">Unverified</Badge>
                  }
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground font-semibold mb-2">
                  <span>{biz.category}</span>
                  <span>·</span>
                  <span>{biz.locationLabel}</span>
                  {biz.rating > 0 && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" />{biz.rating}</span>
                    </>
                  )}
                  <span>· {biz.completedJobs} jobs</span>
                </div>
                <p className="text-sm text-muted-foreground">{biz.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <Button
                  size="sm"
                  variant="outline"
                  className={cn('rounded-xl', biz.verified ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50')}
                  onClick={() => toggleVerify(biz.id)}
                  data-testid={`btn-toggle-verify-${biz.id}`}
                >
                  {biz.verified ? 'Unverify' : 'Verify'}
                </Button>
                {confirmRemove === biz.id ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-xs font-bold text-destructive">Sure?</span>
                    <Button size="sm" variant="destructive" className="rounded-xl" onClick={() => removeBusiness(biz.id)} data-testid={`btn-confirm-remove-biz-${biz.id}`}>Remove</Button>
                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setConfirmRemove(null)}>Cancel</Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="rounded-xl border-red-200 text-red-500 hover:bg-red-50" onClick={() => setConfirmRemove(biz.id)} data-testid={`btn-remove-biz-${biz.id}`}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
