import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MapPin, Plus, Menu, LayoutGrid, X, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/feed", label: "Local Needs" },
    { href: "/offers", label: "Offers" },
    { href: "/business", label: "For Business" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  const close = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" onClick={close} className="flex items-center gap-2">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center transform rotate-3 shrink-0">
                <span className="text-white font-black text-lg md:text-xl">N</span>
              </div>
              <span className="font-black text-xl md:text-2xl tracking-tight text-primary">NeedMates</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-full border-2 border-border">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-bold transition-all",
                    location === item.href || location.startsWith(item.href + '/')
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
              Wokingham (RG40)
            </div>

            <Link href="/create">
              <Button className="hidden md:flex gap-2 rounded-full" data-testid="btn-header-post">
                <Plus className="w-5 h-5" />
                Post a Need
              </Button>
            </Link>

            <Link href="/account">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-black transition-all border-2 cursor-pointer",
                  location.startsWith('/account')
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-foreground border-border hover:border-primary hover:bg-primary/10"
                )}
                title="My Account"
                data-testid="btn-my-account"
              >
                SC
              </div>
            </Link>

            <Link href="/admin">
              <div
                className={cn(
                  "hidden md:flex w-9 h-9 rounded-xl items-center justify-center transition-all border-2 cursor-pointer",
                  location.startsWith('/admin')
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary hover:bg-primary/10 hover:text-primary"
                )}
                title="Admin"
                data-testid="btn-admin"
              >
                <LayoutGrid className="w-4 h-4" />
              </div>
            </Link>

            <button
              className="md:hidden w-9 h-9 rounded-xl border-2 border-border bg-muted flex items-center justify-center"
              onClick={() => setMobileOpen(true)}
              data-testid="btn-mobile-menu"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-card border-l-2 border-border flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b-2 border-border shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center rotate-3">
                  <span className="text-white font-black">N</span>
                </div>
                <span className="font-black text-lg text-primary">NeedMates</span>
              </div>
              <button
                onClick={close}
                className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"
                data-testid="btn-close-menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Location pill */}
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground bg-muted px-4 py-2.5 rounded-full w-fit">
                <MapPin className="w-4 h-4 text-primary" />
                Wokingham (RG40)
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-2 space-y-0.5 overflow-auto">
              {navItems.map(item => (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={close}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-base transition-all cursor-pointer",
                      location === item.href || location.startsWith(item.href + '/')
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </div>
                </Link>
              ))}

              <div className="h-px bg-border mx-2 my-2" />

              <Link href="/account">
                <div
                  onClick={close}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-base transition-all cursor-pointer",
                    location.startsWith('/account') ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-black">SC</div>
                    My Account
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
              </Link>

              <Link href="/admin">
                <div
                  onClick={close}
                  className={cn(
                    "flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-base transition-all cursor-pointer",
                    location.startsWith('/admin') ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5 text-muted-foreground" />
                    Admin
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </div>
              </Link>
            </nav>

            {/* CTA */}
            <div className="p-4 border-t-2 border-border shrink-0">
              <Link href="/create">
                <Button className="w-full rounded-xl gap-2" onClick={close} data-testid="btn-mobile-post">
                  <Plus className="w-4 h-4" /> Post a Need
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
