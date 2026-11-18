import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { searchFlights, SAMPLE_FLIGHTS } from '../data/sampleFlights';
import { FlightCard } from '../components/FlightCard';
import { FlightFilters, FilterState } from '../components/FlightFilters';
import { FlightSearch } from '../components/FlightSearch';
import { formatDate } from '../utils/formatters';

export const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery } = useBooking();
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'cheapest' | 'fastest'>('recommended');

  const availableAirlines = useMemo(() => {
    const list = Array.from(new Set(SAMPLE_FLIGHTS.map((f) => f.airline)));
    return list.sort();
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 3500,
    selectedAirlines: [],
    stops: null,
    departureTimeRange: 'all',
    cabinClass: searchQuery.cabinClass || 'all',
  });

  const handleResetFilters = () => {
    setFilters({
      maxPrice: 3500,
      selectedAirlines: [],
      stops: null,
      departureTimeRange: 'all',
      cabinClass: 'all',
    });
  };

  const flights = useMemo(() => {
    let result = searchFlights({
      originCode: searchQuery.origin?.code,
      destCode: searchQuery.destination?.code,
      cabinClass: filters.cabinClass === 'all' ? undefined : filters.cabinClass,
      maxPrice: filters.maxPrice,
      stops: filters.stops !== null ? filters.stops : undefined,
      airline: filters.selectedAirlines.length === 1 ? filters.selectedAirlines[0] : undefined,
      departureTimeRange: filters.departureTimeRange === 'all' ? undefined : filters.departureTimeRange,
      sortBy: sortBy,
    });

    if (filters.selectedAirlines.length > 1) {
      result = result.filter((f) => filters.selectedAirlines.includes(f.airline));
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const passengerTotal =
    searchQuery.passengers.adults +
    searchQuery.passengers.children +
    searchQuery.passengers.infants;

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      {/* Top Search Summary Bar */}
      <div className="bg-navy-900 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-sky-brand font-semibold flex items-center gap-2">
                <Plane className="w-3.5 h-3.5" />
                <span>
                  {searchQuery.tripType === 'round-trip' ? 'Round Trip Flight Search' : 'One Way Flight Search'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-display flex items-center gap-2">
                <span>{searchQuery.origin ? `${searchQuery.origin.city} (${searchQuery.origin.code})` : 'All Departures'}</span>
                <span className="text-sky-brand">→</span>
                <span>{searchQuery.destination ? `${searchQuery.destination.city} (${searchQuery.destination.code})` : 'All Destinations'}</span>
              </h1>
              <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3">
                <span>{formatDate(searchQuery.departureDate)}</span>
                {searchQuery.tripType === 'round-trip' && searchQuery.returnDate && (
                  <>
                    <span>•</span>
                    <span>Return: {formatDate(searchQuery.returnDate)}</span>
                  </>
                )}
                <span>•</span>
                <span>{passengerTotal} Traveler{passengerTotal > 1 ? 's' : ''}</span>
                <span>•</span>
                <span className="text-gold font-semibold">{searchQuery.cabinClass}</span>
              </div>
            </div>

            <button
              onClick={() => setIsModifyOpen(!isModifyOpen)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 self-start md:self-auto shadow-sm"
            >
              <Search className="w-3.5 h-3.5 text-sky-brand" />
              <span>{isModifyOpen ? 'Close Search' : 'Modify Search'}</span>
              {isModifyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Collapsible Modify Search Drawer */}
          {isModifyOpen && (
            <div className="mt-6 pt-6 border-t border-white/10 animate-fadeIn">
              <FlightSearch onSearchComplete={() => setIsModifyOpen(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Main Content: Filters + Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <FlightFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableAirlines={availableAirlines}
              minPrice={50}
              maxPossiblePrice={3500}
            />
          </aside>

          {/* Main Results Column */}
          <main className="lg:col-span-9 space-y-5">
            {/* Sorting & Result Counts Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-navy-900">
              <div className="text-xs text-slate-600 font-medium">
                Showing <strong className="text-navy-900 font-bold">{flights.length}</strong> available demonstration flights
              </div>

              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 rounded-xl bg-slate-100 text-navy-900 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200"
              >
                <SlidersHorizontal className="w-4 h-4 text-aviation" />
                <span>Filters & Options</span>
              </button>

              {/* Sort Tabs */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-end sm:self-auto">
                {(['recommended', 'cheapest', 'fastest'] as const).map((mode) => {
                  const isSelected = sortBy === mode;
                  const labels = {
                    recommended: 'Recommended',
                    cheapest: 'Cheapest',
                    fastest: 'Fastest',
                  };
                  return (
                    <button
                      key={mode}
                      onClick={() => setSortBy(mode)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-aviation text-white shadow-sm font-semibold'
                          : 'text-slate-600 hover:text-navy-900'
                      }`}
                    >
                      {labels[mode]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Flights List */}
            {flights.length > 0 ? (
              <div className="space-y-4">
                {flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-card text-navy-900">
                <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Plane className="w-6 h-6 text-aviation" />
                </div>
                <h3 className="text-lg font-bold text-navy-900">
                  No flights match your specific criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try widening your price range, clearing airline selections, or changing departure time slots.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-aviation text-white hover:bg-aviation-dark text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-t border-slate-200 rounded-t-2xl max-h-[85vh] overflow-y-auto p-6 space-y-4 text-navy-900 shadow-floating">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-bold text-navy-900 text-base">Filter Flight Results</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-xs text-slate-500 font-semibold p-1 hover:text-navy-900"
              >
                Close
              </button>
            </div>
            <FlightFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              availableAirlines={availableAirlines}
              minPrice={50}
              maxPossiblePrice={3500}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-aviation text-white text-xs font-semibold rounded-xl shadow-md"
            >
              Apply Filters ({flights.length} Flights)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
