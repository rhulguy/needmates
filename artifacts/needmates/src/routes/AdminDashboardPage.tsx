import { AdminShell } from '@/components/admin/AdminShell';
import { mockUsers } from '@/data/mockUsers';
import { mockNeeds } from '@/data/mockNeeds';
import { mockResponses } from '@/data/mockResponses';
import { mockBusinesses } from '@/data/mockBusinesses';
import { mockCategories } from '@/data/mockCategories';
import { NeedTypeBadge } from '@/components/needs/NeedTypeBadge';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'wouter';
import { formatTimeAgo } from '@/lib/utils';
import {
  Users, List, MessageSquare, Building2, Tag,
  CheckCircle, AlertTriangle, ArrowUpRight, Clock
} from 'lucide-react';

const recentActivity = [
  { id: 'ra1', type: 'need_posted', text: 'Sarah Chen posted a new need', detail: 'Window cleaner group', time: new Date(Date.now() - 7200000).toISOString() },
  { id: 'ra2', type: 'user_joined', text: 'Tom Blackwood joined the platform', detail: 'Wokingham RG40', time: new Date(Date.now() - 86400000).toISOString() },
  { id: 'ra3', type: 'business_responded', text: 'Crystal Clear Windows responded to a need', detail: 'Window cleaner group', time: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'ra4', type: 'need_fulfilled', text: 'Need fulfilled: carpet cleaner borrowed', detail: 'Crowthorne RG45', time: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'ra5', type: 'user_vouched', text: 'Marcus Webb vouched for Sarah Chen', detail: 'Trust signal added', time: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: 'ra6', type: 'need_posted', text: 'Raj Sharma posted a new need', detail: 'EV charger group quote', time: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'ra7', type: 'business_joined', text: 'Happy Paws Sitting joined as a business', detail: 'Pets & Animals', time: new Date(Date.now() - 86400000 * 6).toISOString() },
  { id: 'ra8', type: 'report_filed', text: 'Content report filed by Priya Patel', detail: 'Awaiting review', time: new Date(Date.now() - 18000000).toISOString() },
];

const activityBadgeConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'info' | 'destructive' }> = {
  need_posted: { label: 'Need', variant: 'default' },
  user_joined: { label: 'User', variant: 'success' },
  business_responded: { label: 'Business', variant: 'info' },
  need_fulfilled: { label: 'Fulfilled', variant: 'success' },
  user_vouched: { label: 'Vouch', variant: 'default' },
  business_joined: { label: 'Business', variant: 'info' },
  report_filed: { label: 'Report', variant: 'warning' },
};

export default function AdminDashboardPage() {
  const activeNeeds = mockNeeds.filter(n => n.status === 'active').length;
  const fulfilledNeeds = mockNeeds.filter(n => n.status === 'fulfilled').length;

  const stats = [
    { label: 'Total Users', value: mockUsers.length, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active Needs', value: activeNeeds, icon: List, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Responses', value: mockResponses.length, icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Businesses', value: mockBusinesses.length, icon: Building2, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Categories', value: mockCategories.length, icon: Tag, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Fulfilled', value: fulfilledNeeds, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  const maxCount = Math.max(...mockCategories.map(c => c.count));

  const colourMap: Record<string, string> = {
    'bg-orange-500': 'bg-orange-500',
    'bg-blue-500': 'bg-blue-500',
    'bg-purple-500': 'bg-purple-500',
    'bg-pink-500': 'bg-pink-500',
    'bg-emerald-500': 'bg-emerald-500',
    'bg-red-500': 'bg-red-500',
    'bg-yellow-500': 'bg-yellow-500',
    'bg-teal-500': 'bg-teal-500',
  };

  return (
    <AdminShell pageTitle="Platform Overview">
      <div className="space-y-8">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex items-center gap-3" data-testid="reports-banner">
          <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
          <span className="font-bold text-orange-700 text-sm">4 items flagged for review.</span>
          <Link href="/admin/reports">
            <span className="text-orange-600 font-black text-sm hover:underline flex items-center gap-1 ml-auto cursor-pointer">
              View Reports <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-card border-2 border-border rounded-2xl p-5" data-testid={`admin-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-sm font-bold text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border-2 border-border rounded-2xl p-6">
            <h2 className="text-xl font-black mb-5">Needs by Category</h2>
            <div className="space-y-3">
              {mockCategories.map(cat => (
                <div key={cat.id} data-testid={`category-bar-${cat.id}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold">{cat.label}</span>
                    <span className="text-sm font-black text-muted-foreground">{cat.count}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colourMap[cat.colour] ?? 'bg-primary'} transition-all`}
                      style={{ width: `${(cat.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black">New Users</h2>
              <Link href="/admin/users">
                <span className="text-primary text-sm font-bold hover:underline cursor-pointer">View all</span>
              </Link>
            </div>
            <div className="space-y-4">
              {mockUsers.slice(0, 3).map(user => (
                <div key={user.id} className="flex items-center gap-3" data-testid={`new-user-${user.id}`}>
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black shrink-0">
                    {user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.locationLabel} · {user.completedInteractions} interactions</div>
                  </div>
                  <Badge variant="success" className="shrink-0">Active</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border-2 border-border rounded-2xl p-6">
          <h2 className="text-xl font-black mb-5">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-testid="activity-table">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left font-black pb-3 text-muted-foreground">Type</th>
                  <th className="text-left font-black pb-3 text-muted-foreground">Event</th>
                  <th className="text-left font-black pb-3 text-muted-foreground">Detail</th>
                  <th className="text-right font-black pb-3 text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item, i) => {
                  const cfg = activityBadgeConfig[item.type] ?? { label: item.type, variant: 'default' as const };
                  return (
                    <tr key={item.id} className={i % 2 === 0 ? '' : 'bg-muted/30'}>
                      <td className="py-3 pr-4">
                        <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      </td>
                      <td className="py-3 pr-4 font-semibold">{item.text}</td>
                      <td className="py-3 pr-4 text-muted-foreground font-semibold">{item.detail}</td>
                      <td className="py-3 text-right text-muted-foreground font-semibold whitespace-nowrap">
                        <span className="flex items-center justify-end gap-1"><Clock className="w-3 h-3" />{formatTimeAgo(item.time)}</span>
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
