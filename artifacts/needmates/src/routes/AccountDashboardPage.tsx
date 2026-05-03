import { Link } from 'wouter';
import { AccountShell } from '@/components/account/AccountShell';
import { mockUsers } from '@/data/mockUsers';
import { mockNeeds } from '@/data/mockNeeds';
import { mockResponses } from '@/data/mockResponses';
import { NeedCard } from '@/components/needs/NeedCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTimeAgo } from '@/lib/utils';
import {
  List, MessageSquare, ShieldCheck, CheckCircle,
  Plus, Search, User, Clock, Users, HandHeart, Star
} from 'lucide-react';

const currentUser = mockUsers[0];

const activityFeed = [
  { id: 'a1', text: 'You joined the window cleaner group need', time: '2h ago', icon: Users, color: 'text-emerald-500' },
  { id: 'a2', text: 'Tom Blackwood vouched for you', time: '1d ago', icon: ShieldCheck, color: 'text-primary' },
  { id: 'a3', text: 'Marcus Webb offered to help with carpet cleaner', time: '2d ago', icon: HandHeart, color: 'text-orange-500' },
  { id: 'a4', text: 'Your garden maintenance need reached 7 people', time: '3d ago', icon: Star, color: 'text-yellow-500' },
  { id: 'a5', text: 'You posted a new need: dog sitter recommendation', time: '4d ago', icon: Plus, color: 'text-blue-500' },
];

export default function AccountDashboardPage() {
  const myNeeds = mockNeeds.filter(n => n.postedByUserId === currentUser.id);
  const responsesReceived = mockResponses.filter(r =>
    myNeeds.some(n => n.id === r.needId)
  );

  const stats = [
    { label: 'Active Needs', value: myNeeds.filter(n => n.status === 'active').length, icon: List, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Responses In', value: responsesReceived.length, icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Vouches', value: currentUser.vouchCount, icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Helped', value: currentUser.completedInteractions, icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <AccountShell>
      <div className="p-6 md:p-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-1">Hello, {currentUser.name.split(' ')[0]}.</h1>
          <div className="flex items-center gap-2 text-muted-foreground font-semibold">
            <Badge variant="outline" className="font-bold">{currentUser.postcodeArea}</Badge>
            <span>{currentUser.locationLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(stat => (
            <div key={stat.label} className="bg-card border-2 border-border rounded-2xl p-5" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-bold text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/create">
            <Button className="rounded-full gap-2" data-testid="btn-post-need">
              <Plus className="w-4 h-4" /> Post a New Need
            </Button>
          </Link>
          <Link href="/feed">
            <Button variant="outline" className="rounded-full gap-2" data-testid="btn-browse-feed">
              <Search className="w-4 h-4" /> Browse Feed
            </Button>
          </Link>
          <Link href="/account/edit-profile">
            <Button variant="outline" className="rounded-full gap-2" data-testid="btn-edit-profile">
              <User className="w-4 h-4" /> Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-black mb-4">My Recent Needs</h2>
            <div className="space-y-4">
              {myNeeds.slice(0, 3).map(need => (
                <NeedCard key={need.id} need={need} />
              ))}
              {myNeeds.length === 0 && (
                <div className="text-center py-10 text-muted-foreground font-semibold border-2 border-dashed border-border rounded-2xl">
                  No needs posted yet.
                </div>
              )}
              {myNeeds.length > 3 && (
                <Link href="/account/needs">
                  <Button variant="outline" className="w-full rounded-xl" data-testid="btn-view-all-needs">View all {myNeeds.length} needs</Button>
                </Link>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black mb-4">Recent Responses</h2>
            <div className="space-y-3">
              {responsesReceived.slice(0, 4).map(r => {
                const need = myNeeds.find(n => n.id === r.needId);
                return (
                  <div key={r.id} className="bg-card border-2 border-border rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant={r.responderType === 'business' ? 'info' : 'secondary'} className="text-xs shrink-0">
                        {r.responseType}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />{formatTimeAgo(r.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold line-clamp-2 mb-1">{r.message}</p>
                    {need && (
                      <Link href={`/need/${need.id}`}>
                        <span className="text-xs text-primary font-bold hover:underline">{need.title}</span>
                      </Link>
                    )}
                  </div>
                );
              })}
              {responsesReceived.length === 0 && (
                <div className="text-center py-10 text-muted-foreground font-semibold border-2 border-dashed border-border rounded-2xl">
                  No responses yet.
                </div>
              )}
            </div>

            <h2 className="text-2xl font-black mb-4 mt-8">Activity</h2>
            <div className="space-y-3">
              {activityFeed.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
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
