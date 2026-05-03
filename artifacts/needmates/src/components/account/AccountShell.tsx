import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { mockUsers } from '@/data/mockUsers';
import {
  LayoutDashboard, List, MessageSquare, Bookmark,
  ShieldCheck, User, Settings, MapPin
} from 'lucide-react';

const currentUser = mockUsers[0];

const navItems = [
  { href: '/account', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/account/needs', label: 'My Needs', icon: List },
  { href: '/account/responses', label: 'Responses', icon: MessageSquare },
  { href: '/account/saved', label: 'Saved', icon: Bookmark },
  { href: '/account/vouches', label: 'Vouches', icon: ShieldCheck },
  { href: '/account/edit-profile', label: 'Edit Profile', icon: User },
  { href: '/account/settings', label: 'Settings', icon: Settings },
];

interface AccountShellProps {
  children: ReactNode;
}

export function AccountShell({ children }: AccountShellProps) {
  const [location] = useLocation();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location === href;
    return location === href || location.startsWith(href + '/');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background font-sans selection:bg-primary selection:text-white">
      <Header />
      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col w-64 border-r-2 border-border bg-card shrink-0">
          <div className="p-6 border-b-2 border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-black shrink-0">
                {currentUser.avatar}
              </div>
              <div className="min-w-0">
                <div className="font-black text-base truncate">{currentUser.name}</div>
                <div className="flex items-center text-xs text-muted-foreground font-semibold">
                  <MapPin className="w-3 h-3 mr-1 shrink-0" />
                  {currentUser.locationLabel}
                </div>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <div
                  data-testid={`account-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer',
                    isActive(item.href, item.exact)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-border flex">
          {navItems.slice(0, 5).map(item => (
            <Link key={item.href} href={item.href} className="flex-1">
              <div
                className={cn(
                  'flex flex-col items-center py-2 text-[10px] font-bold',
                  isActive(item.href, item.exact) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="w-5 h-5 mb-0.5" />
                {item.label.split(' ')[0]}
              </div>
            </Link>
          ))}
        </div>

        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
