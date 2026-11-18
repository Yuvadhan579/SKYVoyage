export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Booking & Reservations',
    question: 'How do I modify or cancel my SkyVoyage flight booking?',
    answer: 'You can easily retrieve, modify, or cancel your booking through the "My Trips" portal using your 6-character PNR reference code and primary passenger last name. Depending on your chosen fare class (Economy Saver, Flexible, or Business Suite), refunds and rebooking fee waivers are processed automatically.'
  },
  {
    category: 'Baggage',
    question: 'What is the standard checked and cabin baggage allowance?',
    answer: 'Standard Economy tickets include one 7 kg carry-on bag plus a small personal item (handbag or laptop bag) and 23 kg to 30 kg checked luggage depending on route. Premium Economy and Business Class tickets permit up to two 32 kg checked bags and two cabin bags.'
  },
  {
    category: 'Check-in & Boarding',
    question: 'When does online check-in open and close?',
    answer: 'Online web check-in opens 48 hours prior to scheduled flight departure and closes 90 minutes before international flights (60 minutes before domestic flights). You can select your seats and download mobile boarding passes directly.'
  },
  {
    category: 'Demonstration System',
    question: 'Is this an actual commercial ticket reservation platform?',
    answer: 'SkyVoyage is an advanced, fully interactive demonstration airline booking application developed for frontend presentation. All flight schedules, prices, PNR codes, and transactions are simulated demonstration data designed to showcase real-world airline web experiences.'
  },
  {
    category: 'Special Assistance',
    question: 'Can I request wheelchair or dietary assistance?',
    answer: 'Yes! During passenger information entry or via our Add-ons screen, you can select special dietary meals (Asian Vegetarian, Halal, Kosher, Gluten-Free) as well as airport wheelchair assistance free of charge.'
  }
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  route: string;
  avatarText: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Alexandra Vance',
    role: 'Global Design Director',
    location: 'London, UK',
    quote: 'The booking experience on SkyVoyage was seamless from start to finish. The intuitive seat map and transparent fare breakdown felt like a true premium first-class service.',
    rating: 5,
    route: 'London (LHR) to Dubai (DXB)',
    avatarText: 'AV'
  },
  {
    id: '2',
    name: 'Rajesh Subramanian',
    role: 'Technology Executive',
    location: 'Bengaluru, India',
    quote: 'Flying frequently between Bengaluru and Singapore, finding quick non-stop flights with transparent baggage policies used to be painful. SkyVoyage made it effortless in under 2 minutes.',
    rating: 5,
    route: 'Bengaluru (BLR) to Singapore (SIN)',
    avatarText: 'RS'
  },
  {
    id: '3',
    name: 'Camille Laurent',
    role: 'Architectural Consultant',
    location: 'Paris, France',
    quote: 'The cabin preview photos and accurate seat configuration details gave me complete peace of mind when booking long-haul flights to Tokyo. Absolutely top-tier UI.',
    rating: 5,
    route: 'Paris (CDG) to Tokyo (HND)',
    avatarText: 'CL'
  }
];
