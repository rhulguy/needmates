import { useState } from 'react';
import { AccountShell } from '@/components/account/AccountShell';
import { mockUsers } from '@/data/mockUsers';
import { Button } from '@/components/ui/Button';
import { formatTimeAgo } from '@/lib/utils';
import { ShieldCheck, MapPin, Plus, X, Check } from 'lucide-react';

const currentUser = mockUsers[0];

interface Vouch {
  id: string;
  name: string;
  initials: string;
  location: string;
  message: string;
  date: string;
}

const initialReceived: Vouch[] = [
  { id: 'v1', name: 'Tom Blackwood', initials: 'TB', location: 'Wokingham', message: 'Sarah is incredibly helpful. She organised the whole reading group for local kids — an absolute gem.', date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'v2', name: 'Marcus Webb', initials: 'MW', location: 'Crowthorne', message: 'Brilliant at tutoring. My niece improved two grades with Sarah\'s help.', date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'v3', name: 'Raj Sharma', initials: 'RS', location: 'Winnersh', message: 'Very trustworthy. Helped us out during the community clean-up day without being asked.', date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: 'v4', name: 'Emma Richardson', initials: 'ER', location: 'Crowthorne', message: 'Always there when the community needs her. Real neighbour of the year material.', date: new Date(Date.now() - 86400000 * 18).toISOString() },
];

const initialGiven: Vouch[] = [
  { id: 'g1', name: 'Tom Blackwood', initials: 'TB', location: 'Wokingham', message: 'Tom helped me move a heavy piece of furniture without a second thought. A truly kind person.', date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: 'g2', name: 'Raj Sharma', initials: 'RS', location: 'Winnersh', message: 'Did our EV charger installation — professional, tidy, and half an hour faster than quoted.', date: new Date(Date.now() - 86400000 * 12).toISOString() },
  { id: 'g3', name: 'Marcus Webb', initials: 'MW', location: 'Crowthorne', message: 'Fixed our wifi router setup for free on a Saturday morning. Absolute legend.', date: new Date(Date.now() - 86400000 * 22).toISOString() },
];

export default function AccountVouchesPage() {
  const [received] = useState<Vouch[]>(initialReceived);
  const [given, setGiven] = useState<Vouch[]>(initialGiven);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', message: '' });
  const [saved, setSaved] = useState(false);

  const handleSubmit = () => {
    if (!form.name.trim() || !form.message.trim()) return;
    const initials = form.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    setGiven(prev => [{
      id: `g-new-${Date.now()}`,
      name: form.name.trim(),
      initials,
      location: form.location.trim() || 'Unknown',
      message: form.message.trim(),
      date: new Date().toISOString(),
    }, ...prev]);
    setForm({ name: '', location: '', message: '' });
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AccountShell>
      <div className="p-6 md:p-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black">Vouches</h1>
            <p className="text-muted-foreground font-semibold mt-1">{received.length} received · {given.length} given</p>
          </div>
          <Button className="rounded-full gap-2" onClick={() => setShowForm(v => !v)} data-testid="btn-give-vouch">
            <Plus className="w-4 h-4" /> Give a Vouch
          </Button>
        </div>

        {saved && (
          <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 flex items-center gap-2 font-bold mb-4">
            <Check className="w-5 h-5" /> Vouch submitted!
          </div>
        )}

        {showForm && (
          <div className="bg-card border-2 border-border rounded-2xl p-5 mb-6">
            <h3 className="font-black text-lg mb-4">Give a Vouch</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Person's name *</label>
                <input
                  className="w-full border-2 border-border rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Tom Blackwood"
                  data-testid="input-vouch-name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Their location</label>
                <input
                  className="w-full border-2 border-border rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  value={form.location}
                  onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                  placeholder="e.g. Wokingham"
                  data-testid="input-vouch-location"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Your message *</label>
                <textarea
                  className="w-full border-2 border-border rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:border-primary min-h-[80px] resize-none"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Why are you vouching for this person?"
                  data-testid="input-vouch-message"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSubmit} className="rounded-xl" data-testid="btn-submit-vouch">Submit Vouch</Button>
                <Button variant="outline" className="rounded-xl" onClick={() => setShowForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" /> Vouches Received
            </h2>
            <div className="space-y-4">
              {received.map(v => (
                <div key={v.id} className="bg-card border-2 border-border rounded-2xl p-5 flex gap-4" data-testid={`vouch-received-${v.id}`}>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shrink-0">
                    {v.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-black">{v.name}</span>
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground font-semibold">
                        <MapPin className="w-3 h-3" />{v.location}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(v.date)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">"{v.message}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">Vouches Given</h2>
            <div className="space-y-4">
              {given.map(v => (
                <div key={v.id} className="bg-card border-2 border-border rounded-2xl p-5 flex gap-4" data-testid={`vouch-given-${v.id}`}>
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm shrink-0">
                    {v.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-black">{v.name}</span>
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground font-semibold">
                        <MapPin className="w-3 h-3" />{v.location}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(v.date)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">"{v.message}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AccountShell>
  );
}
