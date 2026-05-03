import { LocalBusiness } from '../types';

export const mockBusinesses: LocalBusiness[] = [
  {
    id: 'b-1',
    name: 'Crystal Clear Windows',
    category: 'Home & Garden',
    locationLabel: 'Wokingham',
    description: 'Professional window cleaning services using pure water pole systems.',
    verified: true,
    rating: 4.8,
    completedJobs: 142,
    responseCount: 28,
    tags: ['Window Cleaning', 'Gutter Clearing', 'Conservatory Cleaning']
  },
  {
    id: 'b-2',
    name: 'Green Thumb Landscaping',
    category: 'Home & Garden',
    locationLabel: 'Crowthorne',
    description: 'Local garden maintenance, from regular mowing to complete overhauls.',
    verified: true,
    rating: 4.9,
    completedJobs: 87,
    responseCount: 15,
    tags: ['Gardening', 'Landscaping', 'Fencing']
  },
  {
    id: 'b-3',
    name: 'VoltTech EV Installations',
    category: 'Trades & Services',
    locationLabel: 'Winnersh',
    description: 'OZEV approved installers for home and commercial electric vehicle chargers.',
    verified: true,
    rating: 5.0,
    completedJobs: 215,
    responseCount: 42,
    tags: ['EV Chargers', 'Electrical', 'Smart Home']
  },
  {
    id: 'b-4',
    name: 'Achieve Tutoring Centre',
    category: 'Education & Tutoring',
    locationLabel: 'Wokingham',
    description: 'Qualified teachers providing maths, English and science tuition for all ages.',
    verified: false,
    rating: 4.5,
    completedJobs: 34,
    responseCount: 8,
    tags: ['Maths', 'English', 'GCSE', 'A-Level']
  },
  {
    id: 'b-5',
    name: 'Happy Paws Sitting',
    category: 'Pets & Animals',
    locationLabel: 'Crowthorne',
    description: 'Fully insured and DBS checked pet sitting and dog walking service.',
    verified: true,
    rating: 4.9,
    completedJobs: 412,
    responseCount: 63,
    tags: ['Dog Walking', 'Pet Sitting', 'Boarding']
  }
];
