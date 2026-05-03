export type NeedType = 'need' | 'offer' | 'group' | 'recommend' | 'lend' | 'connect';

export interface User {
  id: string;
  name: string;
  avatar: string; // initials or URL
  locationLabel: string;
  postcodeArea: string;
  bio: string;
  trustSignals: string[];
  skills: string[];
  canLend: string[];
  formerCompanies: string[];
  completedInteractions: number;
  vouchCount: number;
}

export interface NeedPost {
  id: string;
  type: NeedType;
  title: string;
  description: string;
  category: string;
  locationLabel: string;
  radiusKm: number;
  postedByUserId: string;
  createdAt: string; // ISO string
  urgency: 'low' | 'medium' | 'high';
  status: 'active' | 'fulfilled' | 'closed';
  interestedCount: number;
  helpOfferCount: number;
  recommendationCount: number;
  businessResponseCount: number;
  targetInterestCount: number;
  allowBusinessResponses: boolean;
  allowJoinInterest: boolean;
  tags: string[];
}

export interface NeedResponse {
  id: string;
  needId: string;
  responderType: 'user' | 'business';
  responderId: string;
  responseType: 'help' | 'recommend' | 'join' | 'business';
  message: string;
  createdAt: string;
}

export interface LocalBusiness {
  id: string;
  name: string;
  category: string;
  locationLabel: string;
  description: string;
  verified: boolean;
  rating: number;
  completedJobs: number;
  responseCount: number;
  tags: string[];
}

export interface Category {
  id: string;
  label: string;
  icon: string; // lucide icon name
  colour: string; // tailwind colour class
  count: number;
}
