import { Flight, CabinClass, FlightStatusInfo } from '../types/flight';
import { SAMPLE_AIRPORTS } from './sampleAirports';

const findApt = (code: string) => SAMPLE_AIRPORTS.find(a => a.code === code)!;

export const SAMPLE_FLIGHTS: Flight[] = [
  // BLR <-> DXB
  {
    id: 'SV-101',
    flightNumber: 'SV-101',
    airline: 'Emirates',
    aircraft: 'Boeing 777-300ER',
    origin: findApt('BLR'),
    destination: findApt('DXB'),
    departureTime: '04:30',
    arrivalTime: '07:15',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '4h 15m',
    durationMinutes: 255,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 340,
    availableSeats: 18,
    baggage: { cabin: '7 kg', checked: '30 kg (1 piece)' },
    amenities: ['High-speed Wi-Fi', 'Complimentary Hot Meal', 'Personal HD Screen (ice)', 'USB Charging Port'],
    refundable: true,
    refundPolicy: 'Refundable with standard $45 cancellation fee up to 24h prior to flight departure.',
    aircraftImage: '/images/aircraft-inflight.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },
  {
    id: 'SV-102',
    flightNumber: 'SV-102',
    airline: 'Emirates',
    aircraft: 'Airbus A380-800',
    origin: findApt('BLR'),
    destination: findApt('DXB'),
    departureTime: '10:15',
    arrivalTime: '13:05',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '4h 20m',
    durationMinutes: 260,
    stops: 0,
    cabinClass: 'Business',
    basePrice: 1120,
    availableSeats: 8,
    baggage: { cabin: '14 kg (2 bags)', checked: '40 kg' },
    amenities: ['Lie-Flat Bed Suite', 'Onboard Lounge & Bar', 'Multi-course Gourmet Dining', 'Noise-cancelling Headphones'],
    refundable: true,
    refundPolicy: 'Fully refundable without fee up to 2 hours before scheduled departure.',
    aircraftImage: '/images/aircraft-takeoff.jpg',
    cabinImage: '/images/cabin-business.jpg'
  },
  {
    id: 'SV-103',
    flightNumber: 'SV-103',
    airline: 'Air India',
    aircraft: 'Airbus A321neo',
    origin: findApt('BLR'),
    destination: findApt('DXB'),
    departureTime: '20:45',
    arrivalTime: '23:30',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '4h 15m',
    durationMinutes: 255,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 285,
    availableSeats: 24,
    baggage: { cabin: '7 kg', checked: '25 kg' },
    amenities: ['Warm Meals Included', 'USB Port', 'Free Baggage Allowance'],
    refundable: true,
    refundPolicy: 'Demonstration cancellation fee $35 applied if cancelled within 48h.',
    aircraftImage: '/images/aircraft-runway.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },

  // BLR <-> SIN
  {
    id: 'SV-201',
    flightNumber: 'SV-201',
    airline: 'Singapore Airlines',
    aircraft: 'Airbus A350-900',
    origin: findApt('BLR'),
    destination: findApt('SIN'),
    departureTime: '11:05',
    arrivalTime: '18:10',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '4h 35m',
    durationMinutes: 275,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 395,
    availableSeats: 14,
    baggage: { cabin: '7 kg', checked: '30 kg' },
    amenities: ['KrisWorld 1,800+ Entertainment Choices', 'Artisan Meals & Drinks', 'Quiet Cabin Climate', 'Ergonomic Headrest'],
    refundable: true,
    refundPolicy: 'Partially refundable demonstration ticket.',
    aircraftImage: '/images/aircraft-inflight.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },
  {
    id: 'SV-202',
    flightNumber: 'SV-202',
    airline: 'Singapore Airlines',
    aircraft: 'Airbus A350-900',
    origin: findApt('BLR'),
    destination: findApt('SIN'),
    departureTime: '23:10',
    arrivalTime: '06:10',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-16',
    duration: '4h 30m',
    durationMinutes: 270,
    stops: 0,
    cabinClass: 'Business',
    basePrice: 1250,
    availableSeats: 6,
    baggage: { cabin: '14 kg', checked: '40 kg' },
    amenities: ['Book the Cook Dining', 'Direct Aisle Access', 'Full Flat Bed', 'Champagne Welcome'],
    refundable: true,
    refundPolicy: 'Full refund anytime before flight check-in.',
    aircraftImage: '/images/aircraft-gate.jpg',
    cabinImage: '/images/cabin-business.jpg'
  },
  {
    id: 'SV-203',
    flightNumber: 'SV-203',
    airline: 'IndiGo',
    aircraft: 'Airbus A321neo',
    origin: findApt('BLR'),
    destination: findApt('SIN'),
    departureTime: '06:30',
    arrivalTime: '13:45',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '4h 45m',
    durationMinutes: 285,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 245,
    availableSeats: 32,
    baggage: { cabin: '7 kg', checked: '20 kg' },
    amenities: ['On-time Guarantee', 'Snack & Beverage Purchase', 'Pre-book Seat Selection'],
    refundable: false,
    refundPolicy: 'Non-refundable demonstration saver fare.',
    aircraftImage: '/images/aircraft-runway.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },

  // BLR <-> LHR (London)
  {
    id: 'SV-301',
    flightNumber: 'SV-301',
    airline: 'British Airways',
    aircraft: 'Boeing 787-9 Dreamliner',
    origin: findApt('BLR'),
    destination: findApt('LHR'),
    departureTime: '07:00',
    arrivalTime: '13:15',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '10h 45m',
    durationMinutes: 645,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 620,
    availableSeats: 22,
    baggage: { cabin: '10 kg', checked: '23 kg' },
    amenities: ['In-seat Power', 'Full Meal Service', 'Complimentary Bar Service', 'Large Dreamliner Windows'],
    refundable: true,
    refundPolicy: 'Demonstration fare refundable subject to airline terms.',
    aircraftImage: '/images/hero-plane.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },
  {
    id: 'SV-302',
    flightNumber: 'SV-302',
    airline: 'British Airways',
    aircraft: 'Boeing 787-9 Dreamliner',
    origin: findApt('BLR'),
    destination: findApt('LHR'),
    departureTime: '07:00',
    arrivalTime: '13:15',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '10h 45m',
    durationMinutes: 645,
    stops: 0,
    cabinClass: 'Premium Economy',
    basePrice: 980,
    availableSeats: 10,
    baggage: { cabin: '12 kg', checked: '2 x 23 kg' },
    amenities: ['Wider Seat & 38-inch Pitch', 'Priority Boarding', 'Glass of Sparkling Wine', 'Upgraded Multi-course Meal'],
    refundable: true,
    refundPolicy: 'Change date free of charge up to 72h before departure.',
    aircraftImage: '/images/aircraft-inflight.jpg',
    cabinImage: '/images/cabin-premium.jpg'
  },
  {
    id: 'SV-303',
    flightNumber: 'SV-303',
    airline: 'Qatar Airways',
    aircraft: 'Airbus A350-1000',
    origin: findApt('BLR'),
    destination: findApt('LHR'),
    departureTime: '03:40',
    arrivalTime: '13:55',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '14h 45m',
    durationMinutes: 885,
    stops: 1,
    stopDetails: '2h 10m stopover in Doha (DOH)',
    cabinClass: 'Business',
    basePrice: 1850,
    availableSeats: 4,
    baggage: { cabin: '15 kg', checked: '40 kg' },
    amenities: ['Award-winning Qsuite with Sliding Privacy Door', 'Dine on Demand', 'Diptyque Amenity Kit', 'Oryx One 5,000+ Media Channels'],
    refundable: true,
    refundPolicy: 'Full demonstration refund with zero penalty.',
    aircraftImage: '/images/aircraft-takeoff.jpg',
    cabinImage: '/images/cabin-business.jpg'
  },

  // BLR <-> CDG (Paris)
  {
    id: 'SV-401',
    flightNumber: 'SV-401',
    airline: 'Air France',
    aircraft: 'Airbus A350-900',
    origin: findApt('BLR'),
    destination: findApt('CDG'),
    departureTime: '01:45',
    arrivalTime: '08:20',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '11h 05m',
    durationMinutes: 665,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 580,
    availableSeats: 16,
    baggage: { cabin: '12 kg', checked: '23 kg' },
    amenities: ['French Gastronomy & Champagne in all cabins', 'Ultra-quiet A350 cabin', 'Onboard Wi-Fi'],
    refundable: true,
    refundPolicy: 'Standard demonstration refund conditions apply.',
    aircraftImage: '/images/aircraft-inflight.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },
  {
    id: 'SV-402',
    flightNumber: 'SV-402',
    airline: 'Emirates',
    aircraft: 'Airbus A380-800',
    origin: findApt('BLR'),
    destination: findApt('CDG'),
    departureTime: '04:30',
    arrivalTime: '13:30',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '13h 30m',
    durationMinutes: 810,
    stops: 1,
    stopDetails: '2h 00m transfer in Dubai (DXB)',
    cabinClass: 'First Class',
    basePrice: 3450,
    availableSeats: 2,
    baggage: { cabin: '14 kg', checked: '50 kg' },
    amenities: ['Private First Class Suite with motorized doors', 'Onboard Shower Spa', 'Caviar Service', 'Dom Pérignon Vintage'],
    refundable: true,
    refundPolicy: 'Full refund and complimentary chauffeur airport transfer demonstration service.',
    aircraftImage: '/images/aircraft-gate.jpg',
    cabinImage: '/images/cabin-first.jpg'
  },

  // BLR <-> HND (Tokyo)
  {
    id: 'SV-501',
    flightNumber: 'SV-501',
    airline: 'All Nippon Airways (ANA)',
    aircraft: 'Boeing 787-8 Dreamliner',
    origin: findApt('BLR'),
    destination: findApt('HND'),
    departureTime: '01:50',
    arrivalTime: '14:20',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '9h 00m',
    durationMinutes: 540,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 710,
    availableSeats: 19,
    baggage: { cabin: '10 kg', checked: '2 x 23 kg' },
    amenities: ['Authentic Japanese In-flight Bento', 'Bidet Lavatories', 'Extra Legroom Economy Seats'],
    refundable: true,
    refundPolicy: 'Refundable demonstration fare with $50 administrative fee.',
    aircraftImage: '/images/aircraft-inflight.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },
  {
    id: 'SV-502',
    flightNumber: 'SV-502',
    airline: 'Singapore Airlines',
    aircraft: 'Boeing 777-300ER',
    origin: findApt('BLR'),
    destination: findApt('HND'),
    departureTime: '11:05',
    arrivalTime: '22:30',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '11h 25m',
    durationMinutes: 685,
    stops: 1,
    stopDetails: '1h 45m transit in Singapore (SIN)',
    cabinClass: 'Business',
    basePrice: 1920,
    availableSeats: 5,
    baggage: { cabin: '14 kg', checked: '40 kg' },
    amenities: ['Direct Aisle Lie-Flat Seats', 'Artisan Kaiseki Dining', 'High-Speed Global Roaming Wi-Fi'],
    refundable: true,
    refundPolicy: 'Fully refundable up to 4 hours before departure.',
    aircraftImage: '/images/aircraft-takeoff.jpg',
    cabinImage: '/images/cabin-business.jpg'
  },

  // Domestic: BOM <-> BLR / DEL <-> BLR / BLR <-> GOI
  {
    id: 'SV-601',
    flightNumber: 'SV-601',
    airline: 'IndiGo',
    aircraft: 'Airbus A320neo',
    origin: findApt('BLR'),
    destination: findApt('BOM'),
    departureTime: '08:00',
    arrivalTime: '09:45',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '1h 45m',
    durationMinutes: 105,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 85,
    availableSeats: 42,
    baggage: { cabin: '7 kg', checked: '15 kg' },
    amenities: ['6E Prime Snack Option', 'Standard USB', 'On-time Flight Rating 94%'],
    refundable: false,
    refundPolicy: 'Non-refundable demonstration domestic saver.',
    aircraftImage: '/images/aircraft-runway.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },
  {
    id: 'SV-602',
    flightNumber: 'SV-602',
    airline: 'Air India',
    aircraft: 'Airbus A320neo',
    origin: findApt('BLR'),
    destination: findApt('BOM'),
    departureTime: '16:30',
    arrivalTime: '18:15',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '1h 45m',
    durationMinutes: 105,
    stops: 0,
    cabinClass: 'Business',
    basePrice: 240,
    availableSeats: 8,
    baggage: { cabin: '12 kg', checked: '30 kg' },
    amenities: ['Dedicated Check-in Counter', 'Lounge Invitation', 'Warm Plated Dinner', 'Reclining Leather Club Chairs'],
    refundable: true,
    refundPolicy: 'Demonstration refundable ticket.',
    aircraftImage: '/images/aircraft-inflight.jpg',
    cabinImage: '/images/cabin-business.jpg'
  },
  {
    id: 'SV-701',
    flightNumber: 'SV-701',
    airline: 'IndiGo',
    aircraft: 'ATR 72-600',
    origin: findApt('BLR'),
    destination: findApt('GOI'),
    departureTime: '13:10',
    arrivalTime: '14:25',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '1h 15m',
    durationMinutes: 75,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 65,
    availableSeats: 26,
    baggage: { cabin: '7 kg', checked: '15 kg' },
    amenities: ['Scenic Coastal Approach View', 'Express Boarding Available'],
    refundable: true,
    refundPolicy: 'Refundable with standard cancellation fee.',
    aircraftImage: '/images/promo-window-view.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },
  {
    id: 'SV-702',
    flightNumber: 'SV-702',
    airline: 'Air India',
    aircraft: 'Airbus A320neo',
    origin: findApt('BLR'),
    destination: findApt('GOI'),
    departureTime: '18:40',
    arrivalTime: '19:55',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '1h 15m',
    durationMinutes: 75,
    stops: 0,
    cabinClass: 'Economy',
    basePrice: 75,
    availableSeats: 30,
    baggage: { cabin: '7 kg', checked: '20 kg' },
    amenities: ['Complimentary Snack Box', 'Window & Aisle Seating Selection'],
    refundable: true,
    refundPolicy: 'Refundable up to 24h before travel.',
    aircraftImage: '/images/aircraft-gate.jpg',
    cabinImage: '/images/cabin-economy.jpg'
  },

  // US Routes: JFK <-> LHR / SFO <-> HND
  {
    id: 'SV-801',
    flightNumber: 'SV-801',
    airline: 'British Airways',
    aircraft: 'Boeing 777-200ER',
    origin: findApt('JFK'),
    destination: findApt('LHR'),
    departureTime: '19:30',
    arrivalTime: '07:20',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-16',
    duration: '6h 50m',
    durationMinutes: 410,
    stops: 0,
    cabinClass: 'Business',
    basePrice: 1750,
    availableSeats: 7,
    baggage: { cabin: '12 kg', checked: '2 x 32 kg' },
    amenities: ['Club Suite with Door', 'The White Company Bedding', 'Signature English Breakfast'],
    refundable: true,
    refundPolicy: 'Demonstration business class ticket, fully flexible.',
    aircraftImage: '/images/aircraft-inflight.jpg',
    cabinImage: '/images/cabin-business.jpg'
  },
  {
    id: 'SV-802',
    flightNumber: 'SV-802',
    airline: 'Qatar Airways',
    aircraft: 'Boeing 777-300ER',
    origin: findApt('DOH'),
    destination: findApt('JFK'),
    departureTime: '08:30',
    arrivalTime: '16:00',
    departureDate: '2026-11-15',
    arrivalDate: '2026-11-15',
    duration: '14h 30m',
    durationMinutes: 870,
    stops: 0,
    cabinClass: 'Business',
    basePrice: 2200,
    availableSeats: 6,
    baggage: { cabin: '15 kg', checked: '2 x 32 kg' },
    amenities: ['Double Bed Configuration Option in Qsuite', 'Ultra High Speed Super Wi-Fi', 'World Class Wine Cellar Selection'],
    refundable: true,
    refundPolicy: 'Flexible demonstration fare.',
    aircraftImage: '/images/aircraft-takeoff.jpg',
    cabinImage: '/images/cabin-business.jpg'
  }
];

// Sample Flight Statuses for tracking interface
export const SAMPLE_FLIGHT_STATUSES: FlightStatusInfo[] = [
  {
    flightNumber: 'SV-101',
    airline: 'Emirates',
    origin: findApt('BLR'),
    destination: findApt('DXB'),
    scheduledDeparture: '04:30',
    actualDeparture: '04:38',
    scheduledArrival: '07:15',
    actualArrival: '07:12',
    date: 'Today',
    status: 'Arrived',
    gate: 'Gate 22B',
    terminal: 'Terminal 2',
    baggageBelt: 'Carousel 4',
    aircraft: 'Boeing 777-300ER'
  },
  {
    flightNumber: 'SV-102',
    airline: 'Emirates',
    origin: findApt('BLR'),
    destination: findApt('DXB'),
    scheduledDeparture: '10:15',
    actualDeparture: '10:45',
    scheduledArrival: '13:05',
    actualArrival: '13:30',
    date: 'Today',
    status: 'Delayed',
    delayMinutes: 30,
    gate: 'Gate 18A',
    terminal: 'Terminal 2',
    baggageBelt: 'Carousel 7',
    aircraft: 'Airbus A380-800'
  },
  {
    flightNumber: 'SV-201',
    airline: 'Singapore Airlines',
    origin: findApt('BLR'),
    destination: findApt('SIN'),
    scheduledDeparture: '11:05',
    scheduledArrival: '18:10',
    date: 'Today',
    status: 'In Flight',
    gate: 'Gate 31',
    terminal: 'Terminal 2',
    baggageBelt: 'Carousel 12',
    aircraft: 'Airbus A350-900'
  },
  {
    flightNumber: 'SV-202',
    airline: 'Singapore Airlines',
    origin: findApt('BLR'),
    destination: findApt('SIN'),
    scheduledDeparture: '23:10',
    scheduledArrival: '06:10',
    date: 'Today',
    status: 'Scheduled',
    gate: 'Gate 28',
    terminal: 'Terminal 2',
    baggageBelt: 'Carousel 9',
    aircraft: 'Airbus A350-900'
  },
  {
    flightNumber: 'SV-601',
    airline: 'IndiGo',
    origin: findApt('BLR'),
    destination: findApt('BOM'),
    scheduledDeparture: '08:00',
    actualDeparture: '08:02',
    scheduledArrival: '09:45',
    actualArrival: '09:40',
    date: 'Today',
    status: 'Arrived',
    gate: 'Gate 4',
    terminal: 'Terminal 1',
    baggageBelt: 'Belt 3',
    aircraft: 'Airbus A320neo'
  },
  {
    flightNumber: 'SV-701',
    airline: 'IndiGo',
    origin: findApt('BLR'),
    destination: findApt('GOI'),
    scheduledDeparture: '13:10',
    scheduledArrival: '14:25',
    date: 'Today',
    status: 'Boarding',
    gate: 'Gate 11',
    terminal: 'Terminal 1',
    baggageBelt: 'Belt 1',
    aircraft: 'ATR 72-600'
  }
];

export function searchFlights(params: {
  originCode?: string;
  destCode?: string;
  cabinClass?: CabinClass;
  date?: string;
  maxPrice?: number;
  stops?: number;
  airline?: string;
  departureTimeRange?: 'morning' | 'afternoon' | 'evening';
  sortBy?: 'cheapest' | 'fastest' | 'recommended';
}): Flight[] {
  let results = [...SAMPLE_FLIGHTS];

  if (params.originCode) {
    results = results.filter(f => f.origin.code.toLowerCase() === params.originCode!.toLowerCase());
  }

  if (params.destCode) {
    results = results.filter(f => f.destination.code.toLowerCase() === params.destCode!.toLowerCase());
  }

  // If no exact match for this pair, provide all flights departing from origin or relevant available flights
  if (results.length === 0) {
    if (params.originCode) {
      results = SAMPLE_FLIGHTS.filter(f => f.origin.code.toLowerCase() === params.originCode!.toLowerCase());
    }
    if (results.length === 0 && params.destCode) {
      results = SAMPLE_FLIGHTS.filter(f => f.destination.code.toLowerCase() === params.destCode!.toLowerCase());
    }
    if (results.length === 0) {
      results = [...SAMPLE_FLIGHTS];
    }
  }

  if (params.cabinClass) {
    // If exact cabin class matches exist, filter or adapt price
    const hasCabin = results.some(f => f.cabinClass === params.cabinClass);
    if (hasCabin) {
      results = results.filter(f => f.cabinClass === params.cabinClass);
    }
  }

  if (params.airline && params.airline !== 'all') {
    results = results.filter(f => f.airline.toLowerCase() === params.airline!.toLowerCase());
  }

  if (params.stops !== undefined && params.stops >= 0) {
    results = results.filter(f => f.stops === params.stops);
  }

  if (params.maxPrice !== undefined) {
    results = results.filter(f => f.basePrice <= params.maxPrice!);
  }

  if (params.departureTimeRange) {
    results = results.filter(f => {
      const hour = parseInt(f.departureTime.split(':')[0], 10);
      if (params.departureTimeRange === 'morning') return hour < 12;
      if (params.departureTimeRange === 'afternoon') return hour >= 12 && hour < 18;
      if (params.departureTimeRange === 'evening') return hour >= 18;
      return true;
    });
  }

  // Sorting
  if (params.sortBy === 'cheapest') {
    results.sort((a, b) => a.basePrice - b.basePrice);
  } else if (params.sortBy === 'fastest') {
    results.sort((a, b) => a.durationMinutes - b.durationMinutes);
  } else {
    // Recommended: balance price, non-stop, seats
    results.sort((a, b) => {
      const scoreA = a.stops * 200 + a.basePrice;
      const scoreB = b.stops * 200 + b.basePrice;
      return scoreA - scoreB;
    });
  }

  return results;
}
