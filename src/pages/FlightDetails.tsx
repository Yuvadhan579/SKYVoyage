import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plane,
  Clock,
  Luggage,
  ShieldCheck,
  CheckCircle,
  Utensils,
  ArrowLeft,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SAMPLE_FLIGHTS } from '../data/sampleFlights';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { BookingSummarySidebar } from '../components/BookingSummarySidebar';
import { formatDate, formatTime } from '../utils/formatters';

export const FlightDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedFlight, setSelectedFlight } = useBooking();

  const flight =
    SAMPLE_FLIGHTS.find((f) => f.id === id) ||
    selectedFlight ||
    SAMPLE_FLIGHTS[0];

  const handleContinue = () => {
    setSelectedFlight(flight);
    navigate('/passengers');
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb / Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-aviation mb-1">
              Flight Details & Cabin Specifications
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              {flight.airline} • Flight {flight.flightNumber}
            </h1>
          </div>

          <button
            onClick={() => navigate('/flights')}
            className="text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Results</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Details Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Real Aircraft & Cabin Photo Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-card h-64 bg-slate-100 border border-slate-200/80">
                <ImageWithFallback
                  src={flight.aircraftImage || '/images/aircraft-inflight.jpg'}
                  alt={`Commercial airliner ${flight.aircraft} in flight`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-navy-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                  {flight.aircraft}
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-card h-64 bg-slate-100 border border-slate-200/80">
                <ImageWithFallback
                  src={flight.cabinImage || '/images/cabin-business.jpg'}
                  alt={`Authentic cabin interior for ${flight.cabinClass}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-navy-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                  {flight.cabinClass} Cabin Interior
                </div>
              </div>
            </div>

            {/* Flight Itinerary Timeline Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card space-y-6">
              <h2 className="text-base font-bold text-navy-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Plane className="w-4 h-4 text-aviation" />
                <span>Flight Itinerary & Airport Terminals</span>
              </h2>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8 my-2">
                {/* Departure point */}
                <div className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-aviation ring-4 ring-white" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <div className="text-xl font-bold text-navy-900 font-display">
                        {formatTime(flight.departureTime)} • {flight.origin.city} ({flight.origin.code})
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {flight.origin.name}, {flight.origin.country}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      {formatDate(flight.departureDate)}
                    </div>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    Terminal 2 • Gate Scheduled
                  </div>
                </div>

                {/* In Flight info */}
                <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2 border border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-aviation" />
                    <span>Flight Duration: <strong className="text-navy-900">{flight.duration}</strong></span>
                  </div>
                  <span>Aircraft: <strong className="text-navy-900">{flight.aircraft}</strong></span>
                  {flight.stops === 0 ? (
                    <span className="text-emerald-600 font-semibold">Non-stop Direct Flight</span>
                  ) : (
                    <span className="text-amber-700 font-semibold">{flight.stopDetails}</span>
                  )}
                </div>

                {/* Arrival point */}
                <div className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <div className="text-xl font-bold text-navy-900 font-display">
                        {formatTime(flight.arrivalTime)} • {flight.destination.city} ({flight.destination.code})
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {flight.destination.name}, {flight.destination.country}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      {formatDate(flight.arrivalDate)}
                    </div>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    International Arrivals Terminal
                  </div>
                </div>
              </div>
            </div>

            {/* Cabin Features & Amenities */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card space-y-4">
              <h2 className="text-base font-bold text-navy-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-aviation" />
                <span>Included Onboard Amenities ({flight.cabinClass})</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {flight.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-navy-900 font-medium"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baggage & Fare Policy */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card space-y-4">
              <h2 className="text-base font-bold text-navy-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Luggage className="w-4 h-4 text-aviation" />
                <span>Baggage Allowance & Refund Conditions</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-navy-900">Cabin Carry-on Baggage</div>
                  <div className="text-slate-600">{flight.baggage.cabin}</div>
                  <div className="text-[11px] text-slate-400">Must fit in overhead bin or under seat</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-navy-900">Checked Baggage Allowance</div>
                  <div className="text-slate-600">{flight.baggage.checked}</div>
                  <div className="text-[11px] text-slate-400">Included free of charge in this ticket tier</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-aviation/5 border border-aviation/20 text-xs text-navy-900 space-y-1">
                <div className="font-bold text-navy-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-aviation" />
                  <span>Demonstration Fare Rules</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {flight.refundPolicy} All reservations on SkyVoyage are demonstration prototypes and can be cancelled or simulated anytime in "My Trips".
                </p>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4">
            <BookingSummarySidebar
              currentStep="Flight Details"
              nextStepTitle="Select & Continue to Passengers"
              onNext={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
