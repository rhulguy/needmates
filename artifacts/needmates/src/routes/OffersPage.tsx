import { AppShell } from '@/components/layout/AppShell';
import { NeedCard } from '@/components/needs/NeedCard';
import { mockNeeds } from '@/data/mockNeeds';

export default function OffersPage() {
  const offers = mockNeeds.filter(n => n.type === 'offer');

  return (
    <AppShell>
      <div className="bg-orange-500 text-white pt-16 pb-16 border-b-4 border-orange-600">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-5xl font-black mb-6">Local Offers</h1>
          <p className="text-2xl font-medium text-white/90">
            See what your neighbours are offering. Skills, time, and items available to the community.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map(offer => (
            <NeedCard key={offer.id} need={offer} />
          ))}
        </div>
        
        {offers.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl font-bold">No active offers right now.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
