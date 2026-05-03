import { NeedResponse } from '../types';
import { subHours, subDays } from 'date-fns';

const now = new Date();

export const mockResponses: NeedResponse[] = [
  {
    id: 'r-1',
    needId: 'n-1',
    responderType: 'business',
    responderId: 'b-1',
    responseType: 'business',
    message: 'We are Crystal Clear Windows. If you can get 5+ houses on the same estate, we can offer a 20% discount on regular monthly cleans. Let us know!',
    createdAt: subHours(now, 1).toISOString()
  },
  {
    id: 'r-2',
    needId: 'n-2',
    responderType: 'user',
    responderId: 'u-2',
    responseType: 'help',
    message: 'I have a RugDoctor you can borrow! I am in Crowthorne near the station.',
    createdAt: subHours(now, 4).toISOString()
  },
  {
    id: 'r-3',
    needId: 'n-3',
    responderType: 'business',
    responderId: 'b-4',
    responseType: 'business',
    message: 'We have availability for GCSE maths on Tuesday evenings. Happy to do a free trial session.',
    createdAt: subHours(now, 20).toISOString()
  },
  {
    id: 'r-4',
    needId: 'n-5',
    responderType: 'business',
    responderId: 'b-3',
    responseType: 'business',
    message: 'VoltTech here! We can definitely do a block discount. If you hit 4 confirmed installs, we will waive the standard call-out fee and discount the hardware by 10%.',
    createdAt: subDays(now, 2).toISOString()
  },
  {
    id: 'r-5',
    needId: 'n-6',
    responderType: 'user',
    responderId: 'u-2',
    responseType: 'recommend',
    message: 'I highly recommend Happy Paws! Emma is fantastic with our anxious collie.',
    createdAt: subDays(now, 3).toISOString()
  },
  {
    id: 'r-6',
    needId: 'n-6',
    responderType: 'business',
    responderId: 'b-5',
    responseType: 'business',
    message: 'Hi there, we have experience with rescue dogs and would love to help. Happy to meet up beforehand to see if we are a good fit.',
    createdAt: subDays(now, 3).toISOString()
  },
  {
    id: 'r-7',
    needId: 'n-8',
    responderType: 'user',
    responderId: 'u-4',
    responseType: 'help',
    message: 'I can pop round in about 30 mins to give you a lift with that. Keep your money!',
    createdAt: subHours(now, 0.5).toISOString()
  },
  {
    id: 'r-8',
    needId: 'n-9',
    responderType: 'business',
    responderId: 'b-2',
    responseType: 'business',
    message: 'Green Thumb Landscaping here. We already service two properties on your road. If you add 3 more, we can offer a competitive rate for the block.',
    createdAt: subDays(now, 5).toISOString()
  }
];
