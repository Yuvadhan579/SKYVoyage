export type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First Class';

export type TripType = 'round-trip' | 'one-way' | 'multi-city';

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export interface FlightSegment {
  origin: Airport;
  destination: Airport;
  date: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  aircraft: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  arrivalDate: string;
  duration: string; // e.g. "7h 15m"
  durationMinutes: number;
  stops: number; // 0 = non-stop, 1 = 1 stop
  stopDetails?: string;
  cabinClass: CabinClass;
  basePrice: number;
  availableSeats: number;
  baggage: {
    cabin: string;
    checked: string;
  };
  amenities: string[];
  refundable: boolean;
  refundPolicy: string;
  aircraftImage?: string;
  cabinImage?: string;
}

export interface FlightStatusInfo {
  flightNumber: string;
  airline: string;
  origin: Airport;
  destination: Airport;
  scheduledDeparture: string;
  actualDeparture?: string;
  scheduledArrival: string;
  actualArrival?: string;
  date: string;
  status: 'Scheduled' | 'Boarding' | 'Departed' | 'In Flight' | 'Delayed' | 'Arrived' | 'Cancelled';
  gate: string;
  terminal: string;
  baggageBelt: string;
  aircraft: string;
  delayMinutes?: number;
}
