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
      <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 md:w-2", colorClass)} />
      <CardContent className="p-4 md:p-6 pl-5 md:pl-8">
        <div className="flex justify-between items-start mb-3 gap-2">
          <NeedTypeBadge type={need.type} />
          <div className="flex items-center text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full shrink-0">
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeAgo(need.createdAt)}
          </div>
        </div>

        <Link href={`/need/${need.id}`}>
          <h3 className="text-lg md:text-2xl font-bold mb-2 leading-snug hover:text-primary transition-colors cursor-pointer">
            {need.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm md:text-base">
          {need.description}
        </p>

        {need.type === 'group' && (
          <div className="mb-4 bg-muted/50 p-3 rounded-xl border border-border">
            <div className="flex justify-between text-xs font-bold mb-1.5">
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

        <div className="flex flex-wrap gap-3 mb-4 text-xs md:text-sm font-semibold text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
            {need.locationLabel}
          </span>
          {author && (
            <span className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[9px] font-black shrink-0">
                {author.avatar}
              </div>
              {author.name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
            {need.recommendationCount + need.businessResponseCount} responses
          </span>
        </div>

        {/* Action buttons: responsive layout */}
        <div className="flex gap-2">
          {need.allowJoinInterest && (
            <Button
              variant={interested ? "secondary" : "outline"}
              size="sm"
              className={cn(
                "flex-1 rounded-xl text-xs md:text-sm",
                interested && "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600"
              )}
              onClick={handleInterest}
              disabled={interested}
              data-testid={`btn-interested-${need.id}`}
            >
              <Users className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 shrink-0" />
              <span className="hidden sm:inline">{interested ? "You're in!" : "I need this too"}</span>
              <span className="sm:hidden">{interested ? "In!" : "Me too"}</span>
            </Button>
          )}
          <Button
            variant={helping ? "secondary" : "outline"}
            size="sm"
            className={cn(
              "flex-1 rounded-xl text-xs md:text-sm",
              helping && "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600"
            )}
            onClick={handleHelp}
            disabled={helping}
            data-testid={`btn-help-${need.id}`}
          >
            <HandHeart className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 shrink-0" />
            <span className="hidden sm:inline">{helping ? "Offered!" : "I can help"}</span>
            <span className="sm:hidden">{helping ? "Done!" : "Help"}</span>
          </Button>
          <Link href={`/need/${need.id}`} className="shrink-0">
            <Button size="sm" variant="default" className="rounded-xl" data-testid={`btn-view-${need.id}`}>
              View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
