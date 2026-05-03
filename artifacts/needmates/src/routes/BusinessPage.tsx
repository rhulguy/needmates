import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Store, TrendingUp, Users, Target } from 'lucide-react';
import { Link } from 'wouter';

export default function BusinessPage() {
  const opportunities = [
    { title: "Window cleaning group buy", demand: 14, location: "Wokingham", category: "Cleaning" },
    { title: "Monthly garden maintenance", demand: 7, location: "Wokingham", category: "Landscaping" },
    { title: "Group EV charger quote", demand: 4, location: "Winnersh", category: "Electrical" },
    { title: "GCSE maths tutoring", demand: 5, location: "Crowthorne", category: "Education" },
    { title: "Trustworthy dog sitter", demand: 6, location: "Winnersh", category: "Pet Care" },
  ];

  return (
    <AppShell>
      <div className="bg-emerald-600 text-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Badge className="bg-emerald-500/30 text-emerald-100 hover:bg-emerald-500/40 mb-6 border-none px-4 py-1">
            NeedMates for Business
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            See what people near you already want.
          </h1>
          <p className="text-2xl text-emerald-100 font-medium mb-10 leading-relaxed">
            NeedMates helps local businesses respond to real local demand before customers scatter across Facebook groups, WhatsApp chats, and search results.
          </p>
          <Button size="lg" variant="secondary" className="text-xl h-16 px-10 rounded-2xl text-emerald-700 bg-white hover:bg-emerald-50 shadow-xl">
            Claim Your Business Profile
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Live Local Opportunities</h2>
          <p className="text-xl text-muted-foreground font-medium">Real people in your area looking for services right now.</p>
        </div>

        <div className="grid gap-6">
          {opportunities.map((opp, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow border-2 border-emerald-100 overflow-hidden relative group cursor-pointer">
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-emerald-500"></div>
              <CardContent className="p-6 pl-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <Badge variant="outline" className="mb-3 bg-emerald-50 text-emerald-700 border-emerald-200">{opp.category}</Badge>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">{opp.title}</h3>
                  <div className="flex items-center text-muted-foreground font-semibold">
                    <Store className="w-4 h-4 mr-2" /> {opp.location}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-2 bg-emerald-50 px-4 py-2 rounded-xl text-emerald-700">
                    <Users className="w-5 h-5" />
                    <span className="text-2xl font-black">{opp.demand}</span>
                    <span className="font-bold text-sm uppercase">Waiting</span>
                  </div>
                  <Button variant="outline" className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    Respond as Business
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/feed">
            <Button size="lg" className="rounded-full text-lg h-14">View all local opportunities</Button>
          </Link>
        </div>
      </div>

      <div className="bg-muted py-24 border-t-2 border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-black mb-12">How it works for businesses</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-card rounded-3xl border-2 border-border shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Spot Demand</h3>
              <p className="text-muted-foreground font-medium">See aggregated demand for your services in specific postcodes.</p>
            </div>
            <div className="p-6 bg-card rounded-3xl border-2 border-border shadow-sm">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Pitch the Group</h3>
              <p className="text-muted-foreground font-medium">Offer block-booking discounts to groups of neighbours at once.</p>
            </div>
            <div className="p-6 bg-card rounded-3xl border-2 border-border shadow-sm">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-500">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Grow Locally</h3>
              <p className="text-muted-foreground font-medium">Build a verified reputation and density in your local service area.</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
