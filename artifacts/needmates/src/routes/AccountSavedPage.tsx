import { useState } from 'react';
import { AccountShell } from '@/components/account/AccountShell';
import { mockUsers } from '@/data/mockUsers';
import { mockNeeds } from '@/data/mockNeeds';
import { NeedPost } from '@/types';
import { NeedTypeBadge } from '@/components/needs/NeedTypeBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTimeAgo } from '@/lib/utils';
import { Link } from 'wouter';
import { Bookmark, MapPin, Clock, BookmarkX } from 'lucide-react';

const currentUser = mockUsers[0];

const initialSaved = mockNeeds
  .filter(n => n.postedByUserId !== currentUser.id)
  .slice(0, 4);

export default function AccountSavedPage() {
  const [saved, setSaved] = useState<NeedPost[]>(initialSaved);

  const unsave = (id: string) => {
    setSaved(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AccountShell>
      <div className="p-6 md:p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-black">Saved Needs</h1>
            <p className="text-muted-foreground font-semibold">{saved.length} saved</p>
          </div>
        </div>

        {saved.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
            <BookmarkX className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-bold">Nothing saved yet</p>
            <p className="text-muted-foreground font-semibold text-sm mt-1">Bookmark needs from the feed to find them easily later.</p>
            <Link href="/feed">
              <Button className="mt-6 rounded-full" data-testid="btn-browse-feed">Browse the Feed</Button>
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {saved.map(need => (
            <div key={need.id} className="bg-card border-2 border-border rounded-2xl p-5" data-testid={`saved-card-${need.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <NeedTypeBadge type={need.type} />
                <span className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                  <Clock className="w-3 h-3" />{formatTimeAgo(need.createdAt)}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">{need.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{need.description}</p>
              <div className="flex items-center gap-4 text-sm font-semibold text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{need.locationLabel}</span>
                <Badge variant="outline">{need.category}</Badge>
              </div>
              <div className="flex gap-2">
                <Link href={`/need/${need.id}`}>
                  <Button size="sm" variant="default" className="rounded-xl" data-testid={`btn-view-${need.id}`}>View Need</Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-red-200 text-red-500 hover:bg-red-50"
                  onClick={() => unsave(need.id)}
                  data-testid={`btn-unsave-${need.id}`}
                >
                  <BookmarkX className="w-3 h-3 mr-1" /> Unsave
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AccountShell>
  );
}
