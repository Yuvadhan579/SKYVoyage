import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Calendar, Search, Sparkles, Plus, Trash2, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AirportAutocomplete } from './AirportAutocomplete';
import { PassengerSelector } from './PassengerSelector';
import { TripType, CabinClass, Airport } from '../types/flight';
import { getTodayDateString, getTomorrowDateString } from '../utils/formatters';
import { SAMPLE_AIRPORTS } from '../data/sampleAirports';

interface FlightSearchProps {
  className?: string;
  onSearchComplete?: () => void;
}

export const FlightSearch: React.FC<FlightSearchProps> = ({ className = '', onSearchComplete }) => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const todayStr = getTodayDateString();

  const handleTripTypeChange = (type: TripType) => {
    setSearchQuery({ tripType: type });
    setErrorMessage(null);
  };

  const handleSwapAirports = () => {
    const tempOrigin = searchQuery.origin;
    setSearchQuery({
      origin: searchQuery.destination,
      destination: tempOrigin,
    });
  };

  const handleCabinChange = (cabin: CabinClass) => {
    setSearchQuery({ cabinClass: cabin });
  };

  const handleMultiCityAdd = () => {
    const segments = searchQuery.multiCitySegments || [];
    if (segments.length >= 4) return;
    const lastSeg = segments[segments.length - 1];
    setSearchQuery({
      multiCitySegments: [
        ...segments,
        {
          origin: lastSeg?.destination || SAMPLE_AIRPORTS[0],
          destination: SAMPLE_AIRPORTS[1],
          date: getTomorrowDateString(),
        }
      ]
    });
  };

  const handleMultiCityRemove = (index: number) => {
    const segments = searchQuery.multiCitySegments || [];
    if (segments.length <= 1) return;
    setSearchQuery({
      multiCitySegments: segments.filter((_, i) => i !== index),
    });
  };

  const handleMultiCityChange = (
    index: number,
    field: 'origin' | 'destination' | 'date',
    value: Airport | string | null
  ) => {
    const segments = [...(searchQuery.multiCitySegments || [])];
    if (segments[index]) {
      segments[index] = { ...segments[index], [field]: value };
      setSearchQuery({ multiCitySegments: segments });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (searchQuery.tripType !== 'multi-city') {
      if (!searchQuery.origin) {
        setErrorMessage('Please select a departure airport or city.');
        return;
      }
      if (!searchQuery.destination) {
        setErrorMessage('Please select an arrival destination.');
        return;
      }
      if (searchQuery.origin.code === searchQuery.destination.code) {
        setErrorMessage('Departure and destination cannot be the same airport.');
        return;
      }
      if (!searchQuery.departureDate) {
        setErrorMessage('Please select a valid departure date.');
        return;
      }
      if (searchQuery.tripType === 'round-trip') {
        if (!searchQuery.returnDate) {
          setErrorMessage('Please choose a return date for your round trip.');
          return;
        }
        if (new Date(searchQuery.returnDate) < new Date(searchQuery.departureDate)) {
          setErrorMessage('Return date cannot be earlier than your departure date.');
          return;
        }
      }
    } else {
      // Validate multi-city
      const segments = searchQuery.multiCitySegments || [];
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        if (!seg.origin || !seg.destination) {
          setErrorMessage(`Please select origin and destination for Flight ${i + 1}.`);
          return;
        }
        if (seg.origin.code === seg.destination.code) {
          setErrorMessage(`Flight ${i + 1} departure and destination cannot be the same.`);
          return;
        }
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSearchComplete) onSearchComplete();
      navigate('/flights');
    }, 450);
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-floating border border-slate-200/80 p-4 sm:p-6 lg:p-7 relative z-30 transition-all ${className}`}
    >
      {/* Search Header: Trip Type Tabs & Cabin Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
        {/* Trip Types */}
        <div className="inline-flex p-1 bg-slate-100/90 rounded-xl">
          {(['round-trip', 'one-way', 'multi-city'] as TripType[]).map((type) => {
            const isSelected = searchQuery.tripType === type;
            const labels: Record<TripType, string> = {
              'round-trip': 'Round Trip',
              'one-way': 'One Way',
              'multi-city': 'Multi-City',
            };
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleTripTypeChange(type)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>

        {/* Cabin Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
            Cabin:
          </span>
          <select
            value={searchQuery.cabinClass}
            onChange={(e) => handleCabinChange(e.target.value as CabinClass)}
            className="text-xs sm:text-sm font-semibold text-navy-900 bg-slate-100/90 border-0 rounded-lg px-3 py-1.5 cursor-pointer focus:ring-2 focus:ring-aviation focus:outline-none"
          >
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business Class</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSearchSubmit} className="mt-5 space-y-4">
        {searchQuery.tripType !== 'multi-city' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Origin */}
            <div className="md:col-span-3">
              <AirportAutocomplete
                id="origin-input"
                label="From (Departure)"
                placeholder="Origin City / Code"
                value={searchQuery.origin}
                onChange={(apt) => setSearchQuery({ origin: apt })}
                excludeCode={searchQuery.destination?.code}
              />
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center -my-2 md:my-0 md:pt-5">
              <button
                type="button"
                onClick={handleSwapAirports}
                className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-aviation hover:text-white hover:border-aviation text-slate-600 flex items-center justify-center transition-all shadow-sm active:scale-90"
                title="Swap departure and destination"
                aria-label="Swap departure and destination"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination */}
            <div className="md:col-span-3">
              <AirportAutocomplete
                id="destination-input"
                label="To (Destination)"
                placeholder="Destination City / Code"
                value={searchQuery.destination}
                onChange={(apt) => setSearchQuery({ destination: apt })}
                excludeCode={searchQuery.origin?.code}
              />
            </div>

            {/* Departure Date */}
            <div className="md:col-span-2">
              <label htmlFor="dep-date" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                Departure
              </label>
              <div className="relative">
                <input
                  id="dep-date"
                  type="date"
                  min={todayStr}
                  value={searchQuery.departureDate}
                  onChange={(e) => setSearchQuery({ departureDate: e.target.value })}
                  className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Return Date (only if Round Trip) */}
            <div className="md:col-span-3">
              {searchQuery.tripType === 'round-trip' ? (
                <div>
                  <label htmlFor="ret-date" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Return Date
                  </label>
                  <input
                    id="ret-date"
                    type="date"
                    min={searchQuery.departureDate || todayStr}
                    value={searchQuery.returnDate || ''}
                    onChange={(e) => setSearchQuery({ returnDate: e.target.value })}
                    className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation/20 cursor-pointer"
                  />
                </div>
              ) : (
                <PassengerSelector
                  passengers={searchQuery.passengers}
                  onChange={(passengers) => setSearchQuery({ passengers })}
                />
              )}
            </div>
          </div>
        ) : (
          /* Multi-City Form */
          <div className="space-y-3">
            {(searchQuery.multiCitySegments || []).map((seg, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-slate-50/70 p-3 rounded-xl border border-slate-200/70"
              >
                <div className="md:col-span-1 text-xs font-bold text-slate-400">
                  Flight {idx + 1}
                </div>
                <div className="md:col-span-4">
                  <AirportAutocomplete
                    label={`Segment ${idx + 1} From`}
                    value={seg.origin}
                    onChange={(apt) => handleMultiCityChange(idx, 'origin', apt)}
                  />
                </div>
                <div className="md:col-span-4">
                  <AirportAutocomplete
                    label={`Segment ${idx + 1} To`}
                    value={seg.destination}
                    onChange={(apt) => handleMultiCityChange(idx, 'destination', apt)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={seg.date}
                    onChange={(e) => handleMultiCityChange(idx, 'date', e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-2.5 text-sm font-semibold text-navy-900"
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  {(searchQuery.multiCitySegments || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleMultiCityRemove(idx)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove segment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleMultiCityAdd}
              className="text-xs font-semibold text-aviation hover:text-aviation-dark flex items-center gap-1.5 py-1 px-2 rounded hover:bg-aviation/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Another Flight Segment
            </button>
          </div>
        )}

        {/* Lower Row: Passengers (if round trip) & Search Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
          {searchQuery.tripType === 'round-trip' ? (
            <div className="sm:w-72">
              <PassengerSelector
                passengers={searchQuery.passengers}
                onChange={(passengers) => setSearchQuery({ passengers })}
              />
            </div>
          ) : (
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Direct fares guaranteed • Real commercial flight schedules
            </div>
          )}

          {/* Error Notice */}
          {errorMessage && (
            <div className="flex items-center gap-2 text-xs font-medium text-rose-600 bg-rose-50 px-3 py-2 rounded-lg border border-rose-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3.5 bg-aviation hover:bg-aviation-hover text-white font-bold text-base rounded-xl shadow-lg hover:shadow-aviation/40 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-70 flex-shrink-0"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Searching Flights...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search Flights</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
