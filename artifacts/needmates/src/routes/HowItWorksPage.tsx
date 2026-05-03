import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Link } from 'wouter';
import { Users, HandHeart, MessageSquare, Megaphone } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <AppShell>
      <div className="bg-primary text-primary-foreground py-24 border-b-4 border-primary-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            How NeedMates Works
          </h1>
          <p className="text-2xl text-primary-foreground/90 font-medium leading-relaxed">
            Stop searching. Start posting. Let the local network do the rest.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-4xl space-y-32">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
              <Megaphone className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black mb-4">1. Post your need</h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Don't spend hours searching Google or asking in dead Facebook groups. Just post what you're looking for — whether it's a reliable plumber, a borrowed ladder, or a running buddy.
            </p>
          </div>
          <div className="bg-muted rounded-3xl p-8 border-2 border-border shadow-inner">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm mb-4">
              <div className="h-4 w-1/3 bg-muted rounded mb-4"></div>
              <div className="h-8 w-3/4 bg-primary/20 rounded mb-4"></div>
              <div className="h-4 w-full bg-muted rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-muted rounded"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-muted rounded-3xl p-8 border-2 border-border shadow-inner relative">
            <div className="absolute -right-4 -top-4 w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg transform rotate-12">+1</div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <Button className="w-full text-lg h-14 bg-emerald-500 hover:bg-emerald-600 border-none text-white rounded-xl">
                <Users className="w-6 h-6 mr-2" /> I need this too
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black mb-4">2. Build local demand</h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Other people in your neighbourhood can click "I need this too" on your post. Suddenly, it's not just you looking for a window cleaner — it's 15 houses on your street.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black mb-4">3. Get solutions</h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Neighbours offer help. Previous customers provide trusted recommendations. Local businesses respond directly to your group with better rates because you've brought them clustered business.
            </p>
          </div>
          <div className="bg-muted rounded-3xl p-8 border-2 border-border shadow-inner">
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 w-1/4 bg-muted rounded mb-2"></div>
                  <div className="h-3 w-full bg-muted rounded"></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4 ml-8">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 w-1/3 bg-muted rounded mb-2"></div>
                  <div className="h-3 w-5/6 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted py-24 border-t-2 border-border text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-black mb-8">Ready to try it?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="text-xl h-16 px-10 rounded-2xl shadow-xl w-full sm:w-auto">
                Post a Need
              </Button>
            </Link>
            <Link href="/feed">
              <Button size="lg" variant="outline" className="text-xl h-16 px-10 rounded-2xl bg-white w-full sm:w-auto">
                See Local Needs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
