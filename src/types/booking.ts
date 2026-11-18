import { Flight, CabinClass, TripType, Airport } from './flight';

export interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

export interface SearchQuery {
  tripType: TripType;
  origin: Airport | null;
  destination: Airport | null;
  departureDate: string;
  returnDate?: string;
  passengers: PassengerCount;
  cabinClass: CabinClass;
  multiCitySegments?: Array<{
    origin: Airport | null;
    destination: Airport | null;
    date: string;
  }>;
}

export interface PassengerInfo {
  id: string;
  type: 'adult' | 'child' | 'infant';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  email: string;
  phone: string;
  frequentFlyer?: string;
}

export type SeatStatus = 'available' | 'selected' | 'occupied';
export type SeatZone = 'business' | 'premium' | 'economy';
export type SeatFeature = 'standard' | 'extra-legroom' | 'window' | 'aisle' | 'exit-row';

export interface Seat {
  id: string;
  row: number;
  col: string;
  code: string; // e.g. "4A"
  zone: SeatZone;
  features: SeatFeature[];
  price: number;
  status: SeatStatus;
  assignedPassengerId?: string;
}

export interface AddonItem {
  id: string;
  category: 'baggage' | 'meal' | 'insurance' | 'assistance';
  title: string;
  description: string;
  price: number;
  unit: string;
  selected?: boolean;
}

export interface FareBreakdown {
  baseFarePerPassenger: number;
  passengerCount: number;
  totalBaseFare: number;
  taxesAndFees: number;
  seatSelectionFee: number;
  addonsFee: number;
  totalDemonstrationFare: number;
}

export interface BookingRecord {
  pnr: string;
  bookingDate: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  flight: Flight;
  returnFlight?: Flight;
  searchQuery: SearchQuery;
  passengers: PassengerInfo[];
  seats: Record<string, Seat>; // passengerId -> Seat
  addons: AddonItem[];
  fareBreakdown: FareBreakdown;
  paymentDetails: {
    method: string;
    cardLast4?: string;
  };
}
