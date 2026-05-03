import { useParams } from 'wouter';
import { AppShell } from '@/components/layout/AppShell';
import { mockUsers } from '@/data/mockUsers';
import { mockNeeds } from '@/data/mockNeeds';
import { NeedCard } from '@/components/needs/NeedCard';
import { Badge } from '@/components/ui/Badge';
import { MapPin, CheckCircle, ShieldCheck, Star } from 'lucide-react';

export default function ProfilePage() {
  const { id } = useParams();
  const user = mockUsers.find(u => u.id === id);
  const userNeeds = mockNeeds.filter(n => n.postedByUserId === id);

  if (!user) return <AppShell><div className="p-20 text-center font-bold text-2xl">User not found</div></AppShell>;

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card border-2 border-border p-8 rounded-3xl text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-24 bg-primary/10"></div>
              <div className="w-32 h-32 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-4xl font-black mb-6 relative z-10 border-4 border-card shadow-md">
                {user.avatar}
              </div>
              <h1 className="text-3xl font-black mb-2">{user.name}</h1>
              <div className="flex items-center justify-center text-muted-foreground font-semibold mb-6">
                <MapPin className="w-4 h-4 mr-1" />
                {user.locationLabel} ({user.postcodeArea})
              </div>
              
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-primary">{user.vouchCount}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Vouches</div>
                </div>
                <div className="w-px bg-border"></div>
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-500">{user.completedInteractions}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Helped</div>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border p-6 rounded-3xl shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" /> Trust Signals
              </h3>
              <div className="space-y-3">
                {user.trustSignals.map(signal => (
                  <div key={signal} className="flex items-center text-sm font-semibold">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-black mb-4">About</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {user.bio}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">{skill}</Badge>
                ))}
              </div>
            </section>

            {user.canLend.length > 0 && (
              <section>
                <h2 className="text-2xl font-black mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-orange-500" /> Willing to lend
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user.canLend.map(item => (
                    <Badge key={item} variant="outline" className="px-4 py-2 text-sm border-orange-200 bg-orange-50 text-orange-700">{item}</Badge>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-black mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {userNeeds.length > 0 ? (
                  userNeeds.map(need => <NeedCard key={need.id} need={need} />)
                ) : (
                  <div className="text-muted-foreground font-medium p-8 bg-muted rounded-2xl border-2 border-dashed text-center">
                    No recent posts.
                  </div>
                )}
              </div>
            </section>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
