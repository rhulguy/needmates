import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Users, List, Building2, Tag,
  Flag, ArrowLeft, Menu, X, ChevronRight
} from 'lucide-react';

const navSections = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/needs', label: 'Needs', icon: List },
      { href: '/admin/businesses', label: 'Businesses', icon: Building2 },
      { href: '/admin/categories', label: 'Categories', icon: Tag },
    ],
  },
  {
    title: 'People',
    items: [
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/reports', label: 'Reports', icon: Flag },
    ],
  },
];

interface AdminShellProps {
  children: ReactNode;
  pageTitle: string;
}

export function AdminShell({ children, pageTitle }: AdminShellProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location === href;
    return location === href || location.startsWith(href + '/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-xl">N</span>
          </div>
          <div>
            <div className="text-white font-black text-lg leading-none">NeedMates</div>
            <div className="text-white/50 text-xs font-bold uppercase tracking-widest mt-0.5">Admin</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-6 overflow-auto">
        {navSections.map(section => (
          <div key={section.title}>
            <div className="text-white/40 text-xs font-black uppercase tracking-widest mb-2 px-3">
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map(item => (
                <Link key={item.href} href={item.href}>
                  <div
                    data-testid={`admin-nav-${item.label.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer',
                      isActive(item.href, item.exact)
                        ? 'bg-white text-primary'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {isActive(item.href, item.exact) && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link href="/">
          <div className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] flex bg-background font-sans">
      <aside className="hidden md:flex flex-col w-64 bg-primary shrink-0">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-primary h-full">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 border-b-2 border-border bg-card flex items-center px-6 gap-4 shrink-0">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileOpen(true)}
            data-testid="admin-mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-black flex-1">{pageTitle}</h1>
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-black">
              SC
            </div>
            <span className="hidden sm:inline">Admin</span>
          </div>
        </div>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
