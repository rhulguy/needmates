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
import { MapPin, Clock, Users, MessageSquare, HandHeart, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function NeedDetailPage() {
  const { id } = useParams();
  const need = mockNeeds.find(n => n.id === id);
  const [interested, setInterested] = useState(false);
  const [helping, setHelping] = useState(false);

  if (!need) return <AppShell><div className="p-20 text-center text-2xl font-bold">Need not found</div></AppShell>;

  const author = mockUsers.find(u => u.id === need.postedByUserId);
  const responses = mockResponses.filter(r => r.needId === need.id);
  const colorClass = getNeedTypeColor(need.type);

  return (
    <AppShell>
      <div className="bg-muted border-b-2 border-border">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex justify-between items-start mb-6">
            <NeedTypeBadge type={need.type} />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">{need.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-muted-foreground font-semibold text-lg mb-8">
            {author && (
              <Link href={`/profile/${author.id}`} className="flex items-center hover:text-primary transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-3">
                  {author.avatar}
                </div>
                {author.name}
              </Link>
            )}
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {need.locationLabel}
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {formatTimeAgo(need.createdAt)}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <section>
            <h3 className="text-2xl font-bold mb-4">The Details</h3>
            <p className="text-xl leading-relaxed whitespace-pre-wrap">{need.description}</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6">Responses ({responses.length})</h3>
            <div className="space-y-6">
              {responses.map(res => {
                const responderName = res.responderType === 'user' 
                  ? mockUsers.find(u => u.id === res.responderId)?.name 
                  : mockBusinesses.find(b => b.id === res.responderId)?.name;
                
                return (
                  <div key={res.id} className="bg-card border-2 border-border p-6 rounded-2xl">
                    <div className="flex justify-between mb-3">
                      <div className="font-bold text-lg">{responderName}</div>
                      <div className="text-sm text-muted-foreground font-medium">{formatTimeAgo(res.createdAt)}</div>
                    </div>
                    <p className="text-lg">{res.message}</p>
                  </div>
                );
              })}
              {responses.length === 0 && (
                <div className="text-center py-12 bg-muted/30 rounded-2xl border-2 border-dashed border-border">
                  <MessageSquare className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                  <p className="text-lg font-medium text-muted-foreground">No responses yet. Be the first to reply!</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-card border-2 border-border p-6 rounded-3xl sticky top-24 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Current Demand</h3>
            
            {need.type === 'group' && need.targetInterestCount && (
              <div className="mb-8">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>{need.interestedCount + (interested ? 1 : 0)} interested</span>
                  <span className="text-muted-foreground">Target: {need.targetInterestCount}</span>
                </div>
                <ProgressBar 
                  value={need.interestedCount + (interested ? 1 : 0)} 
                  max={need.targetInterestCount} 
                  colorClass={colorClass} 
                />
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center font-semibold">
                  <Users className="w-5 h-5 mr-3 text-primary" /> Interested
                </div>
                <span className="font-black text-xl">{need.interestedCount + (interested ? 1 : 0)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center font-semibold">
                  <HandHeart className="w-5 h-5 mr-3 text-orange-500" /> Offers to help
                </div>
                <span className="font-black text-xl">{need.helpOfferCount + (helping ? 1 : 0)}</span>
              </div>
            </div>

            <div className="space-y-3">
              {need.allowJoinInterest && (
                <Button 
                  size="lg"
                  variant={interested ? "secondary" : "default"} 
                  className={cn("w-full text-lg rounded-2xl h-14", interested && "bg-emerald-500 text-white")}
                  onClick={() => setInterested(true)}
                  disabled={interested}
                >
                  <Users className="w-5 h-5 mr-2" />
                  {interested ? "You're in!" : "I need this too"}
                </Button>
              )}
              <Button 
                size="lg"
                variant={helping ? "secondary" : "outline"} 
                className={cn("w-full text-lg rounded-2xl h-14 border-2", helping && "bg-emerald-500 text-white border-none")}
                onClick={() => setHelping(true)}
                disabled={helping}
              >
                <HandHeart className="w-5 h-5 mr-2" />
                {helping ? "Offer submitted" : "I can help"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
