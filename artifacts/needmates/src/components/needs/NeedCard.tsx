import { useState } from 'react';
import { Link } from 'wouter';
import { NeedPost } from '@/types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { NeedTypeBadge, getNeedTypeColor } from './NeedTypeBadge';
import { Users, HandHeart, MessageSquare, MapPin, Clock } from 'lucide-react';
import { formatTimeAgo, cn } from '@/lib/utils';
import { mockUsers } from '@/data/mockUsers';

interface NeedCardProps {
  need: NeedPost;
}

export function NeedCard({ need }: NeedCardProps) {
  const [interested, setInterested] = useState(false);
  const [interestedCount, setInterestedCount] = useState(need.interestedCount);
  
  const [helping, setHelping] = useState(false);
  const [helpCount, setHelpCount] = useState(need.helpOfferCount);

  const author = mockUsers.find(u => u.id === need.postedByUserId);
  const colorClass = getNeedTypeColor(need.type);

  const handleInterest = () => {
    if (!interested) {
      setInterested(true);
      setInterestedCount(prev => prev + 1);
    }
  };

  const handleHelp = () => {
    if (!helping) {
      setHelping(true);
      setHelpCount(prev => prev + 1);
    }
  };

  return (
    <Card className="relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className={cn("absolute left-0 top-0 bottom-0 w-2", colorClass)} />
      <CardContent className="p-6 pl-8">
        <div className="flex justify-between items-start mb-4">
          <NeedTypeBadge type={need.type} />
          <div className="flex items-center text-sm text-muted-foreground font-medium bg-muted px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 mr-1" />
            {formatTimeAgo(need.createdAt)}
          </div>
        </div>

        <Link href={`/need/${need.id}`}>
          <h3 className="text-2xl font-bold mb-2 leading-tight hover:text-primary transition-colors cursor-pointer">
            {need.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-6 line-clamp-2 text-base">
          {need.description}
        </p>

        {need.type === 'group' && (
          <div className="mb-6 bg-muted/50 p-4 rounded-xl border border-border">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>{interestedCount} joined</span>
              <span className="text-muted-foreground">Target: {need.targetInterestCount}</span>
            </div>
            <ProgressBar 
              value={interestedCount} 
              max={need.targetInterestCount} 
              colorClass={colorClass} 
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center text-sm font-semibold text-foreground">
            <MapPin className="w-4 h-4 mr-1.5 text-muted-foreground" />
            {need.locationLabel}
          </div>
          {author && (
            <div className="flex items-center text-sm font-semibold text-foreground">
              <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] mr-1.5">
                {author.avatar}
              </div>
              {author.name}
            </div>
          )}
          <div className="flex items-center text-sm font-semibold text-muted-foreground">
            <MessageSquare className="w-4 h-4 mr-1.5" />
            {need.recommendationCount + need.businessResponseCount} responses
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {need.allowJoinInterest && (
            <Button 
              variant={interested ? "secondary" : "outline"} 
              className={cn("flex-1 rounded-xl", interested && "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600")}
              onClick={handleInterest}
              disabled={interested}
            >
              <Users className="w-5 h-5 mr-2" />
              {interested ? "You're in!" : "I need this too"}
            </Button>
          )}
          <Button 
            variant={helping ? "secondary" : "outline"} 
            className={cn("flex-1 rounded-xl", helping && "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600")}
            onClick={handleHelp}
            disabled={helping}
          >
            <HandHeart className="w-5 h-5 mr-2" />
            {helping ? "Offered to help" : "I can help"}
          </Button>
          <Link href={`/need/${need.id}`} className="flex-none">
            <Button variant="default" className="rounded-xl w-full">
              View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
