export interface Destination {
  id: string;
  city: string;
  country: string;
  airportCode: string;
  image: string;
  startingFare: number;
  currency: string;
  tag: string;
  description: string;
  flightTimeFromHub: string;
}

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    airportCode: 'DXB',
    image: '/images/dest-dubai.jpg',
    startingFare: 380,
    currency: 'USD',
    tag: 'Luxury & Skyline',
    description: 'Iconic architecture, world-class desert safaris, and high-end shopping in the jewel of the Gulf.',
    flightTimeFromHub: '3h 45m'
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    airportCode: 'SIN',
    image: '/images/dest-singapore.jpg',
    startingFare: 420,
    currency: 'USD',
    tag: 'Garden Metropolis',
    description: 'A futuristic city in nature renowned for Changi, Marina Bay Sands, and vibrant culinary culture.',
    flightTimeFromHub: '4h 30m'
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    airportCode: 'LHR',
    image: '/images/dest-london.jpg',
    startingFare: 590,
    currency: 'USD',
    tag: 'Heritage & Royalty',
    description: 'Centuries of history along the Thames, West End theatre, and rich cultural museums.',
    flightTimeFromHub: '9h 10m'
  },
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    airportCode: 'CDG',
    image: '/images/dest-paris.jpg',
    startingFare: 560,
    currency: 'USD',
    tag: 'Art & Romance',
    description: 'The city of lights, haute cuisine, iconic boulevards, and the romantic Seine riverbank.',
    flightTimeFromHub: '8h 50m'
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    airportCode: 'HND',
    image: '/images/dest-tokyo.jpg',
    startingFare: 680,
    currency: 'USD',
    tag: 'Neon & Tradition',
    description: 'Where ancient temples stand alongside neon-lit skyscrapers and world-renowned gastronomy.',
    flightTimeFromHub: '7h 20m'
  },
  {
    id: 'mumbai',
    city: 'Mumbai',
    country: 'India',
    airportCode: 'BOM',
    image: '/images/dest-mumbai.jpg',
    startingFare: 190,
    currency: 'USD',
    tag: 'Financial Capital',
    description: 'The vibrant heart of Bollywood, historic colonial architecture, and the breezy Marine Drive promenade.',
    flightTimeFromHub: '1h 50m'
  },
  {
    id: 'bengaluru',
    city: 'Bengaluru',
    country: 'India',
    airportCode: 'BLR',
    image: '/images/dest-bengaluru.jpg',
    startingFare: 160,
    currency: 'USD',
    tag: 'Silicon Valley of India',
    description: 'India’s tech capital boasting lush public gardens, historic palaces, and buzzing craft breweries.',
    flightTimeFromHub: 'Direct Hub'
  },
  {
    id: 'goa',
    city: 'Goa',
    country: 'India',
    airportCode: 'GOI',
    image: '/images/dest-goa.jpg',
    startingFare: 110,
    currency: 'USD',
    tag: 'Tropical Coastal Escape',
    description: 'Sun-drenched golden beaches, Portuguese heritage architecture, and relaxed coastal living.',
    flightTimeFromHub: '1h 15m'
  }
];
