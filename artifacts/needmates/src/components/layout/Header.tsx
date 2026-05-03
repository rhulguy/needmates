import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MapPin, Plus, Menu, LayoutGrid } from "lucide-react";
import { Button } from "../ui/Button";

export function Header() {
  const [location] = useLocation();

  const navItems = [
    { href: "/feed", label: "Local Needs" },
    { href: "/offers", label: "Offers" },
    { href: "/business", label: "For Business" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform rotate-3">
              <span className="text-white font-black text-xl">N</span>
            </div>
            <span className="font-black text-2xl tracking-tight text-primary">NeedMates</span>
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

        <div className="flex items-center gap-3">
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
                "w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all border-2 cursor-pointer",
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

          <Button variant="outline" size="icon" className="md:hidden rounded-full">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
