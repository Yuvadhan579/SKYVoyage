import React, { createContext, useContext, useState, useEffect } from 'react';
import { Flight, CabinClass, Airport } from '../types/flight';
import {
  SearchQuery,
  PassengerInfo,
  Seat,
  AddonItem,
  BookingRecord,
  FareBreakdown,
  PassengerCount
} from '../types/booking';
import { calculateFare } from '../utils/fareCalculator';
import { generatePNR, getTomorrowDateString } from '../utils/formatters';
import { findAirport } from '../data/sampleAirports';
import { apiRequest } from '../utils/api';
import { useAuth } from './AuthContext';

interface BookingContextType {
  searchQuery: SearchQuery;
  setSearchQuery: (query: Partial<SearchQuery>) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
  returnFlight: Flight | null;
  setReturnFlight: (flight: Flight | null) => void;
  passengers: PassengerInfo[];
  setPassengers: (passengers: PassengerInfo[]) => void;
  updatePassenger: (index: number, data: Partial<PassengerInfo>) => void;
  selectedSeats: Record<string, Seat>;
  assignSeat: (passengerId: string, seat: Seat | null) => void;
  selectedAddons: AddonItem[];
  toggleAddon: (addon: AddonItem) => void;
  fareBreakdown: FareBreakdown;
  currentBooking: BookingRecord | null;
  savedBookings: BookingRecord[];
  completeBooking: (paymentMethod: string, cardLast4?: string) => Promise<BookingRecord>;
  cancelBooking: (pnr: string) => Promise<boolean>;
  getBookingByPnr: (pnr: string) => BookingRecord | undefined;
  resetBookingFlow: () => void;
  preselectDestination: (destinationCode: string) => void;
}

const defaultOrigin = findAirport('BLR') || null;
const defaultDestination = findAirport('DXB') || null;

const initialSearchQuery: SearchQuery = {
  tripType: 'round-trip',
  origin: defaultOrigin,
  destination: defaultDestination,
  departureDate: getTomorrowDateString(),
  returnDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
  passengers: { adults: 1, children: 0, infants: 0 },
  cabinClass: 'Economy',
  multiCitySegments: [
    { origin: defaultOrigin, destination: defaultDestination, date: getTomorrowDateString() }
  ]
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  // Load state from localStorage if exists
  const [searchQuery, setSearchQueryState] = useState<SearchQuery>(() => {
    try {
      const saved = localStorage.getItem('skyvoyage_search_query');
      return saved ? JSON.parse(saved) : initialSearchQuery;
    } catch {
      return initialSearchQuery;
    }
  });

  const [selectedFlight, setSelectedFlightState] = useState<Flight | null>(() => {
    try {
      const saved = localStorage.getItem('skyvoyage_selected_flight');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [returnFlight, setReturnFlight] = useState<Flight | null>(null);

  const [passengers, setPassengersState] = useState<PassengerInfo[]>(() => {
    try {
      const saved = localStorage.getItem('skyvoyage_passengers');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'p-1',
        type: 'adult',
        title: 'Mr',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        nationality: 'India',
        email: '',
        phone: '',
      }
    ];
  });

  const [selectedSeats, setSelectedSeatsState] = useState<Record<string, Seat>>(() => {
    try {
      const saved = localStorage.getItem('skyvoyage_selected_seats');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [selectedAddons, setSelectedAddonsState] = useState<AddonItem[]>(() => {
    try {
      const saved = localStorage.getItem('skyvoyage_selected_addons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentBooking, setCurrentBooking] = useState<BookingRecord | null>(null);

  const [savedBookings, setSavedBookings] = useState<BookingRecord[]>([]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('skyvoyage_search_query', JSON.stringify(searchQuery));
    } catch {}
  }, [searchQuery]);

  useEffect(() => {
    try {
      if (selectedFlight) {
        localStorage.setItem('skyvoyage_selected_flight', JSON.stringify(selectedFlight));
      } else {
        localStorage.removeItem('skyvoyage_selected_flight');
      }
    } catch {}
  }, [selectedFlight]);

  useEffect(() => {
    try {
      localStorage.setItem('skyvoyage_passengers', JSON.stringify(passengers));
    } catch {}
  }, [passengers]);

  useEffect(() => {
    try {
      localStorage.setItem('skyvoyage_selected_seats', JSON.stringify(selectedSeats));
    } catch {}
  }, [selectedSeats]);

  useEffect(() => {
    try {
      localStorage.setItem('skyvoyage_selected_addons', JSON.stringify(selectedAddons));
    } catch {}
  }, [selectedAddons]);

  useEffect(() => {
    if (!user) { setSavedBookings([]); return; }
    apiRequest<{ bookings: BookingRecord[] }>('/bookings')
      .then(data => setSavedBookings(data.bookings))
      .catch(error => console.error('Unable to load bookings:', error));
  }, [user?.id]);

  const setSearchQuery = (newQuery: Partial<SearchQuery>) => {
    setSearchQueryState(prev => {
      const updated = { ...prev, ...newQuery };
      // Sync passengers array length to adult + child + infant count
      const totalCount = updated.passengers.adults + updated.passengers.children + updated.passengers.infants;
      if (passengers.length !== totalCount) {
        const nextPassengers: PassengerInfo[] = [];
        let pIndex = 1;
        for (let i = 0; i < updated.passengers.adults; i++) {
          nextPassengers.push({
            id: `p-${pIndex++}`,
            type: 'adult',
            title: 'Mr',
            firstName: passengers[i]?.firstName || '',
            lastName: passengers[i]?.lastName || '',
            dateOfBirth: passengers[i]?.dateOfBirth || '',
            nationality: passengers[i]?.nationality || 'India',
            email: passengers[0]?.email || '',
            phone: passengers[0]?.phone || ''
          });
        }
        for (let i = 0; i < updated.passengers.children; i++) {
          nextPassengers.push({
            id: `p-${pIndex++}`,
            type: 'child',
            title: 'Master',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            nationality: 'India',
            email: '',
            phone: ''
          });
        }
        for (let i = 0; i < updated.passengers.infants; i++) {
          nextPassengers.push({
            id: `p-${pIndex++}`,
            type: 'infant',
            title: 'Infant',
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            nationality: 'India',
            email: '',
            phone: ''
          });
        }
        setPassengersState(nextPassengers);
      }
      return updated;
    });
  };

  const setSelectedFlight = (flight: Flight | null) => {
    setSelectedFlightState(flight);
  };

  const setPassengers = (pList: PassengerInfo[]) => {
    setPassengersState(pList);
  };

  const updatePassenger = (index: number, data: Partial<PassengerInfo>) => {
    setPassengersState(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], ...data };
      }
      return next;
    });
  };

  const assignSeat = (passengerId: string, seat: Seat | null) => {
    setSelectedSeatsState(prev => {
      const next = { ...prev };
      if (!seat) {
        delete next[passengerId];
      } else {
        // Also ensure no other passenger holds this exact seat code
        for (const pid of Object.keys(next)) {
          if (next[pid].code === seat.code && pid !== passengerId) {
            delete next[pid];
          }
        }
        next[passengerId] = seat;
      }
      return next;
    });
  };

  const toggleAddon = (addon: AddonItem) => {
    setSelectedAddonsState(prev => {
      const exists = prev.some(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const preselectDestination = (destCode: string) => {
    const apt = findAirport(destCode);
    if (apt) {
      setSearchQuery({ destination: apt });
    }
  };

  const fareBreakdown = calculateFare(
    selectedFlight,
    searchQuery.passengers,
    selectedSeats,
    selectedAddons
  );

  const completeBooking = async (paymentMethod: string, cardLast4 = '8821'): Promise<BookingRecord> => {
    if (!selectedFlight) {
      throw new Error('No flight selected');
    }

    const newRecord: BookingRecord = {
      pnr: generatePNR(),
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      flight: selectedFlight,
      returnFlight: returnFlight || undefined,
      searchQuery,
      passengers,
      seats: selectedSeats,
      addons: selectedAddons,
      fareBreakdown,
      paymentDetails: {
        method: paymentMethod,
        cardLast4
      }
    };

    if (!user) throw new Error('Please sign in before completing a booking.');
    await apiRequest('/bookings', { method: 'POST', body: JSON.stringify({ booking: newRecord }) });
    setCurrentBooking(newRecord);
    setSavedBookings(prev => [newRecord, ...prev]);
    return newRecord;
  };

  const cancelBooking = async (pnr: string): Promise<boolean> => {
    const exists = savedBookings.some(b => b.pnr === pnr);
    if (!exists) return false;
    await apiRequest(`/bookings/${encodeURIComponent(pnr)}`, { method: 'PATCH' });
    setSavedBookings(prev => prev.map(b => b.pnr === pnr ? { ...b, status: 'Cancelled' } : b));
    if (currentBooking?.pnr === pnr) {
      setCurrentBooking(prev => prev ? { ...prev, status: 'Cancelled' } : null);
    }
    return true;
  };

  const getBookingByPnr = (pnr: string): BookingRecord | undefined => {
    return savedBookings.find(b => b.pnr.toUpperCase() === pnr.trim().toUpperCase());
  };

  const resetBookingFlow = () => {
    setSelectedFlightState(null);
    setReturnFlight(null);
    setSelectedSeatsState({});
    setSelectedAddonsState([]);
    setCurrentBooking(null);
    localStorage.removeItem('skyvoyage_selected_flight');
    localStorage.removeItem('skyvoyage_selected_seats');
    localStorage.removeItem('skyvoyage_selected_addons');
    localStorage.removeItem('skyvoyage_current_booking');
  };

  return (
    <BookingContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedFlight,
        setSelectedFlight,
        returnFlight,
        setReturnFlight,
        passengers,
        setPassengers,
        updatePassenger,
        selectedSeats,
        assignSeat,
        selectedAddons,
        toggleAddon,
        fareBreakdown,
        currentBooking,
        savedBookings,
        completeBooking,
        cancelBooking,
        getBookingByPnr,
        resetBookingFlow,
        preselectDestination
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
