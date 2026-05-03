import { useParams, Link } from 'wouter';
import { AppShell } from '@/components/layout/AppShell';
import { mockNeeds } from '@/data/mockNeeds';
import { mockUsers } from '@/data/mockUsers';
import { mockResponses } from '@/data/mockResponses';
import { mockBusinesses } from '@/data/mockBusinesses';
import { NeedTypeBadge, getNeedTypeColor } from '@/components/needs/NeedTypeBadge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatTimeAgo, cn } from '@/lib/utils';
import { MapPin, Clock, Users, MessageSquare, HandHeart, Share2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function NeedDetailPage() {
  const { id } = useParams();
  const need = mockNeeds.find(n => n.id === id);
  const [interested, setInterested] = useState(false);
  const [helping, setHelping] = useState(false);

  if (!need) return (
    <AppShell>
      <div className="p-10 text-center text-xl font-bold">Need not found</div>
    </AppShell>
  );

  const author = mockUsers.find(u => u.id === need.postedByUserId);
  const responses = mockResponses.filter(r => r.needId === need.id);
  const colorClass = getNeedTypeColor(need.type);
  const interestedTotal = need.interestedCount + (interested ? 1 : 0);
  const helpTotal = need.helpOfferCount + (helping ? 1 : 0);

  return (
    <AppShell>
      {/* Hero header */}
      <div className="bg-muted border-b-2 border-border">
        <div className="container mx-auto px-4 py-6 md:py-12 max-w-5xl">
          <Link href="/feed">
            <div className="flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground mb-4 cursor-pointer w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Feed
            </div>
          </Link>

          <div className="flex items-center justify-between mb-4">
            <NeedTypeBadge type={need.type} />
            <Button variant="outline" size="sm" className="rounded-full gap-1.5">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">{need.title}</h1>

          <div className="flex flex-wrap gap-3 md:gap-6 text-muted-foreground font-semibold text-sm md:text-base">
            {author && (
              <Link href={`/profile/${author.id}`}>
                <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black shrink-0">
                    {author.avatar}
                  </div>
                  {author.name}
                </div>
              </Link>
            )}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 shrink-0" />
              {need.locationLabel}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 shrink-0" />
              {formatTimeAgo(need.createdAt)}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6 md:gap-12">

          {/* Main content — order-2 on mobile so demand panel shows first */}
          <div className="md:col-span-2 order-2 md:order-1 space-y-8 md:space-y-12">
            <section>
              <h3 className="text-xl md:text-2xl font-bold mb-3">The Details</h3>
              <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap text-muted-foreground">{need.description}</p>
            </section>

            <section>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Responses
                {responses.length > 0 && (
                  <span className="ml-2 text-base font-black text-primary bg-primary/10 rounded-full px-3 py-0.5">{responses.length}</span>
                )}
              </h3>
              <div className="space-y-4">
                {responses.map(res => {
                  const responderName = res.responderType === 'user'
                    ? mockUsers.find(u => u.id === res.responderId)?.name
                    : mockBusinesses.find(b => b.id === res.responderId)?.name;

                  return (
                    <div key={res.id} className="bg-card border-2 border-border p-4 md:p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="font-bold text-base md:text-lg">{responderName}</div>
                        <div className="text-xs text-muted-foreground font-medium whitespace-nowrap shrink-0">{formatTimeAgo(res.createdAt)}</div>
                      </div>
                      <p className="text-sm md:text-base leading-relaxed">{res.message}</p>
                    </div>
                  );
                })}
                {responses.length === 0 && (
                  <div className="text-center py-10 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
                    <MessageSquare className="w-7 h-7 mx-auto text-muted-foreground mb-2" />
                    <p className="text-base font-medium text-muted-foreground">No responses yet. Be the first to reply!</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Demand panel — order-1 on mobile so it shows above content */}
          <div className="order-1 md:order-2">
            <div className="bg-card border-2 border-border p-5 md:p-6 rounded-2xl md:rounded-3xl md:sticky md:top-24 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Current Demand</h3>

              {need.type === 'group' && need.targetInterestCount && (
                <div className="mb-5">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>{interestedTotal} interested</span>
                    <span className="text-muted-foreground">Target: {need.targetInterestCount}</span>
                  </div>
                  <ProgressBar
                    value={interestedTotal}
                    max={need.targetInterestCount}
                    colorClass={colorClass}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-5 md:block md:space-y-3 md:mb-8">
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <Users className="w-4 h-4 text-primary shrink-0" />
                    <span className="hidden sm:inline md:hidden lg:inline">Interested</span>
                  </div>
                  <span className="font-black text-xl text-primary">{interestedTotal}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <HandHeart className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="hidden sm:inline md:hidden lg:inline">Helping</span>
                  </div>
                  <span className="font-black text-xl text-orange-500">{helpTotal}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {need.allowJoinInterest && (
                  <Button
                    size="lg"
                    variant={interested ? "secondary" : "default"}
                    className={cn("w-full rounded-xl h-12 md:h-14", interested && "bg-emerald-500 text-white")}
                    onClick={() => setInterested(true)}
                    disabled={interested}
                    data-testid="btn-i-need-this-too"
                  >
                    <Users className="w-5 h-5 mr-2 shrink-0" />
                    {interested ? "You're in!" : "I need this too"}
                  </Button>
                )}
                <Button
                  size="lg"
                  variant={helping ? "secondary" : "outline"}
                  className={cn("w-full rounded-xl h-12 md:h-14 border-2", helping && "bg-emerald-500 text-white border-none")}
                  onClick={() => setHelping(true)}
                  disabled={helping}
                  data-testid="btn-i-can-help"
                >
                  <HandHeart className="w-5 h-5 mr-2 shrink-0" />
                  {helping ? "Offer submitted" : "I can help"}
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
