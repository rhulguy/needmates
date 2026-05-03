import { useState } from 'react';
import { Link } from 'wouter';
import { AccountShell } from '@/components/account/AccountShell';
import { mockUsers } from '@/data/mockUsers';
import { mockNeeds } from '@/data/mockNeeds';
import { mockResponses } from '@/data/mockResponses';
import { Badge } from '@/components/ui/Badge';
import { formatTimeAgo, cn } from '@/lib/utils';
import { Clock, ArrowUpRight, Building2, User } from 'lucide-react';

const currentUser = mockUsers[0];

type Tab = 'received' | 'given';

const responseTypeConfig: Record<string, { label: string; variant: 'default' | 'success' | 'info' | 'accent' | 'warning' }> = {
  help: { label: 'Offering Help', variant: 'success' },
  recommend: { label: 'Recommendation', variant: 'info' },
  join: { label: 'Joined', variant: 'accent' },
  business: { label: 'Business Response', variant: 'warning' },
};

export default function AccountResponsesPage() {
  const [tab, setTab] = useState<Tab>('received');

  const myNeeds = mockNeeds.filter(n => n.postedByUserId === currentUser.id);

  const received = mockResponses.filter(r =>
    myNeeds.some(n => n.id === r.needId)
  );

  const given = mockResponses.filter(r =>
    r.responderId === currentUser.id
  );

  const items = tab === 'received' ? received : given;

  return (
    <AccountShell>
      <div className="p-6 md:p-8 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black">Responses</h1>
          <p className="text-muted-foreground font-semibold mt-1">
            {received.length} received · {given.length} given
          </p>
        </div>

        <div className="flex gap-2 mb-6 border-2 border-border rounded-2xl p-1 bg-muted w-fit">
          {(['received', 'given'] as Tab[]).map(t => (
            <button
              key={t}
              data-testid={`tab-${t}`}
              onClick={() => setTab(t)}
              className={cn(
                'px-6 py-2 rounded-xl text-sm font-bold transition-all capitalize',
                tab === t
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'received' ? `Received (${received.length})` : `Given (${given.length})`}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {items.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground font-semibold">No responses here yet.</p>
            </div>
          )}
          {items.map(r => {
            const need = mockNeeds.find(n => n.id === r.needId);
            const responder = mockUsers.find(u => u.id === r.responderId);
            const config = responseTypeConfig[r.responseType] ?? { label: r.responseType, variant: 'default' as const };

            return (
              <div key={r.id} className="bg-card border-2 border-border rounded-2xl p-5" data-testid={`response-card-${r.id}`}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={config.variant}>{config.label}</Badge>
                    {r.responderType === 'business'
                      ? <span className="flex items-center gap-1 text-xs text-muted-foreground font-semibold"><Building2 className="w-3 h-3" /> Business</span>
                      : <span className="flex items-center gap-1 text-xs text-muted-foreground font-semibold"><User className="w-3 h-3" /> {responder?.name ?? 'User'}</span>
                    }
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                    <Clock className="w-3 h-3" />{formatTimeAgo(r.createdAt)}
                  </span>
                </div>

                <p className="text-sm font-semibold leading-relaxed mb-3">{r.message}</p>

                {need && (
                  <Link href={`/need/${need.id}`}>
                    <div className="flex items-center gap-1 text-sm text-primary font-bold hover:underline cursor-pointer" data-testid={`link-need-${need.id}`}>
                      <ArrowUpRight className="w-4 h-4" />
                      {need.title}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AccountShell>
  );
}
