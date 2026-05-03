import { Badge } from '../ui/Badge';
import { NeedType } from '@/types';
import { Users, HandHeart, Info, ThumbsUp, Wrench, Share2 } from 'lucide-react';

interface NeedTypeBadgeProps {
  type: NeedType;
  className?: string;
}

export function NeedTypeBadge({ type, className }: NeedTypeBadgeProps) {
  const config: Record<NeedType, { label: string; color: string; icon: React.ReactNode }> = {
    need: { label: 'Wanted', color: 'bg-violet-500', icon: <Info className="w-3 h-3 mr-1" /> },
    offer: { label: 'Offering', color: 'bg-orange-500', icon: <HandHeart className="w-3 h-3 mr-1" /> },
    group: { label: 'Group Buy', color: 'bg-emerald-500', icon: <Users className="w-3 h-3 mr-1" /> },
    recommend: { label: 'Recommendation', color: 'bg-blue-500', icon: <ThumbsUp className="w-3 h-3 mr-1" /> },
    lend: { label: 'Lending', color: 'bg-pink-500', icon: <Wrench className="w-3 h-3 mr-1" /> },
    connect: { label: 'Connect', color: 'bg-yellow-500', icon: <Share2 className="w-3 h-3 mr-1" /> },
  };

  const { label, color, icon } = config[type];

  return (
    <Badge className={`${color} text-white font-bold border-none shadow-sm ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

export function getNeedTypeColor(type: NeedType): string {
  const config: Record<NeedType, string> = {
    need: 'bg-violet-500',
    offer: 'bg-orange-500',
    group: 'bg-emerald-500',
    recommend: 'bg-blue-500',
    lend: 'bg-pink-500',
    connect: 'bg-yellow-500',
  };
  return config[type];
}
