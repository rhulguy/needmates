import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
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
      <div className="bg-emerald-600 text-white pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Badge className="bg-emerald-500/30 text-emerald-100 hover:bg-emerald-500/40 mb-5 md:mb-6 border-none px-4 py-1 inline-flex">
            NeedMates for Business
          </Badge>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-5 md:mb-8 leading-tight">
            See what people near you already want.
          </h1>
          <p className="text-base md:text-2xl text-emerald-100 font-medium mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
            NeedMates helps local businesses respond to real local demand before customers scatter across Facebook groups, WhatsApp chats, and search results.
          </p>
          <Button size="lg" variant="secondary" className="text-base md:text-xl h-14 md:h-16 px-8 md:px-10 rounded-2xl text-emerald-700 bg-white hover:bg-emerald-50 shadow-xl w-full sm:w-auto">
            Claim Your Business Profile
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 md:py-24 max-w-5xl">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4">Live Local Opportunities</h2>
          <p className="text-sm md:text-xl text-muted-foreground font-medium">Real people in your area looking for services right now.</p>
        </div>

        <div className="grid gap-4 md:gap-6">
          {opportunities.map((opp, i) => (
            <div
              key={i}
              className="bg-card border-2 border-emerald-100 rounded-2xl overflow-hidden relative group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-emerald-500" />
              <div className="px-5 py-4 md:px-8 md:py-6 ml-2 md:ml-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Badge variant="outline" className="mb-2 bg-emerald-50 text-emerald-700 border-emerald-200">{opp.category}</Badge>
                  <h3 className="text-lg md:text-2xl font-bold mb-1 group-hover:text-emerald-600 transition-colors leading-snug">{opp.title}</h3>
                  <div className="flex items-center text-muted-foreground font-semibold text-sm">
                    <Store className="w-4 h-4 mr-1.5 shrink-0" /> {opp.location}
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-emerald-700">
                    <Users className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
                    <span className="text-xl md:text-2xl font-black">{opp.demand}</span>
                    <span className="font-bold text-xs md:text-sm uppercase">Waiting</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl whitespace-nowrap">
                    Respond
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <Link href="/feed">
            <Button size="lg" className="rounded-full text-base md:text-lg h-12 md:h-14 w-full sm:w-auto">View all local opportunities</Button>
          </Link>
        </div>
      </div>

      <div className="bg-muted py-14 md:py-24 border-t-2 border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-10 md:mb-12">How it works for businesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-10">
            {[
              { icon: Target, colour: 'bg-primary/10 text-primary', step: '1', title: 'Spot Demand', body: 'See aggregated demand for your services in specific postcodes.' },
              { icon: Store, colour: 'bg-emerald-500/10 text-emerald-500', step: '2', title: 'Pitch the Group', body: 'Offer block-booking discounts to groups of neighbours at once.' },
              { icon: TrendingUp, colour: 'bg-orange-500/10 text-orange-500', step: '3', title: 'Grow Locally', body: 'Build a verified reputation and density in your local service area.' },
            ].map((item, i) => (
              <div key={i} className="p-5 md:p-6 bg-card rounded-2xl md:rounded-3xl border-2 border-border shadow-sm">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${item.colour} rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6`}>
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{item.step}. {item.title}</h3>
                <p className="text-muted-foreground font-medium text-sm md:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
