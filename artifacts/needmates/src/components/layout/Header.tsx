import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MapPin, Search, Plus, Menu } from "lucide-react";
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

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4 text-primary" />
            Wokingham (RG40)
          </div>
          
          <Link href="/create">
            <Button className="hidden md:flex gap-2 rounded-full">
              <Plus className="w-5 h-5" />
              Post a Need
            </Button>
          </Link>

          <Button variant="outline" size="icon" className="md:hidden rounded-full">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
