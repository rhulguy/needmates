import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u-1',
    name: 'Sarah Chen',
    avatar: 'SC',
    locationLabel: 'Wokingham',
    postcodeArea: 'RG40',
    bio: 'Local secondary school teacher. Always happy to lend a hand with reading or general community stuff.',
    trustSignals: ['ID Verified', 'Email Verified'],
    skills: ['Tutoring', 'Baking', 'Organising'],
    canLend: ['Folding chairs', 'Projector', 'Gazebo'],
    formerCompanies: ['Local School District'],
    completedInteractions: 14,
    vouchCount: 5
  },
  {
    id: 'u-2',
    name: 'Marcus Webb',
    avatar: 'MW',
    locationLabel: 'Crowthorne',
    postcodeArea: 'RG45',
    bio: 'Software engineer by day, DIY enthusiast by weekend. Have way too many tools I barely use.',
    trustSignals: ['ID Verified', 'Phone Verified'],
    skills: ['Web Design', 'Basic Plumbing', 'PC Repair'],
    canLend: ['Carpet cleaner', 'Power drill', 'Extension leads'],
    formerCompanies: ['Microsoft', 'Cisco'],
    completedInteractions: 28,
    vouchCount: 12
  },
  {
    id: 'u-3',
    name: 'Priya Patel',
    avatar: 'PP',
    locationLabel: 'Winnersh',
    postcodeArea: 'RG41',
    bio: 'Running enthusiast and mum of two. New to the area and looking to build a local network.',
    trustSignals: ['Email Verified'],
    skills: ['Event Planning', 'Accountancy', 'Running'],
    canLend: ['Camping gear'],
    formerCompanies: ['PwC'],
    completedInteractions: 3,
    vouchCount: 1
  },
  {
    id: 'u-4',
    name: 'Tom Blackwood',
    avatar: 'TB',
    locationLabel: 'Wokingham',
    postcodeArea: 'RG40',
    bio: 'Retired mechanic. Trying to keep busy and help the younger folks out.',
    trustSignals: ['ID Verified', 'Phone Verified', 'Address Verified'],
    skills: ['Car Repair', 'Woodworking', 'Gardening'],
    canLend: ['Pressure washer', 'Ladders', 'Tile cutter'],
    formerCompanies: ['Ford'],
    completedInteractions: 82,
    vouchCount: 34
  },
  {
    id: 'u-5',
    name: 'Emma Richardson',
    avatar: 'ER',
    locationLabel: 'Crowthorne',
    postcodeArea: 'RG45',
    bio: 'Dog walker and animal lover. Know all the best trails in the area.',
    trustSignals: ['Email Verified', 'Phone Verified'],
    skills: ['Pet Care', 'Photography', 'Social Media'],
    canLend: ['Dog crates', 'Pet carriers'],
    formerCompanies: [],
    completedInteractions: 41,
    vouchCount: 18
  },
  {
    id: 'u-6',
    name: 'Raj Sharma',
    avatar: 'RS',
    locationLabel: 'Winnersh',
    postcodeArea: 'RG41',
    bio: 'Electrician focusing on green tech and EV chargers. Want to help the neighbourhood go green.',
    trustSignals: ['ID Verified', 'Trade Certified', 'Phone Verified'],
    skills: ['Electrical Work', 'Solar Tech', 'Smart Home Setup'],
    canLend: ['Voltage tester', 'Cable snake'],
    formerCompanies: ['National Grid'],
    completedInteractions: 55,
    vouchCount: 22
  }
];
