import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Clock, Luggage, Shield, ChevronDown, ChevronUp, ArrowRight, Check } from 'lucide-react';
import { Flight } from '../types/flight';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/fareCalculator';
import { formatTime } from '../utils/formatters';

interface FlightCardProps {
  flight: Flight;
  onSelect?: () => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const navigate = useNavigate();
  const { setSelectedFlight, searchQuery } = useBooking();
  const [showDetails, setShowDetails] = useState(false);

  const passengerTotal =
    (searchQuery.passengers.adults || 1) +
    (searchQuery.passengers.children || 0) +
    (searchQuery.passengers.infants || 0);

  const totalFareEstimate = flight.basePrice * passengerTotal;

  const handleBookFlight = () => {
    setSelectedFlight(flight);
    if (onSelect) {
      onSelect();
    } else {
      navigate('/passengers');
    }
  };

  const handleViewDetails = () => {
    setSelectedFlight(flight);
    navigate(`/flight/${flight.id}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-floating hover:border-aviation/40 transition-all duration-300 overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Airline & Route Details */}
          <div className="flex-1 space-y-4">
            {/* Airline Header */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {flight.airline.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900 leading-tight">
                    {flight.airline}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {flight.flightNumber} • {flight.aircraft}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {flight.cabinClass}
                </span>
                {flight.refundable && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Refundable
                  </span>
                )}
              </div>
            </div>

            {/* Times & Route Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2">
              {/* Departure */}
              <div className="sm:col-span-4">
                <div className="text-2xl sm:text-3xl font-bold text-navy-900 font-display">
                  {formatTime(flight.departureTime)}
                </div>
                <div className="text-sm font-semibold text-navy-800">
                  {flight.origin.city} ({flight.origin.code})
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {flight.origin.name}
                </div>
              </div>

              {/* Duration & Stops Indicator */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center px-2">
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                  <Clock className="w-3.5 h-3.5 text-aviation" />
                  <span>{flight.duration}</span>
                </div>

                <div className="relative w-full flex items-center justify-center">
                  <div className="h-0.5 w-full bg-slate-200" />
                  <div
                    className={`absolute w-2 h-2 rounded-full ${
                      flight.stops === 0 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <Plane className="w-3.5 h-3.5 text-aviation absolute right-0 -mr-1" />
                </div>

                <div className="mt-1 text-[11px] font-semibold">
                  {flight.stops === 0 ? (
                    <span className="text-emerald-600">Non-stop Direct</span>
                  ) : (
                    <span className="text-amber-600 font-medium">
                      {flight.stops} Stop • {flight.stopDetails?.split('in ')[1] || 'Transit'}
                    </span>
                  )}
                </div>
              </div>

              {/* Arrival */}
              <div className="sm:col-span-4 text-left sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold text-navy-900 font-display">
                  {formatTime(flight.arrivalTime)}
                </div>
                <div className="text-sm font-semibold text-navy-800">
                  {flight.destination.city} ({flight.destination.code})
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {flight.destination.name}
                </div>
              </div>
            </div>

            {/* Badges / Included Amenities Summary */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Luggage className="w-3.5 h-3.5 text-slate-400" />
                <span>Cabin {flight.baggage.cabin}</span>
              </span>
              <span className="flex items-center gap-1">
                <Luggage className="w-3.5 h-3.5 text-slate-400" />
                <span>Checked {flight.baggage.checked}</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{flight.availableSeats} seats left</span>
              </span>
            </div>
          </div>

          {/* Right: Demonstration Price & Actions */}
          <div className="lg:w-56 lg:border-l lg:border-slate-100 lg:pl-6 flex flex-row lg:flex-col justify-between items-end lg:items-end gap-3 pt-4 lg:pt-0 border-t border-slate-100 lg:border-t-0">
            <div className="text-left lg:text-right">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Demonstration Fare
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-navy-900 font-display">
                {formatCurrency(flight.basePrice)}
              </div>
              <div className="text-[11px] text-slate-500">
                per passenger (est. {formatCurrency(totalFareEstimate)} total)
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-[170px]">
              <button
                onClick={handleBookFlight}
                className="w-full py-2.5 px-4 bg-aviation hover:bg-aviation-dark text-white rounded-xl font-semibold text-xs shadow-md shadow-aviation/20 transition-all flex items-center justify-center gap-1.5 group"
              >
                <span>Book Flight</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full py-1.5 px-3 text-slate-600 hover:text-navy-900 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 hover:bg-slate-50"
              >
                <span>{showDetails ? 'Hide Details' : 'Flight Details'}</span>
                {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Flight Details Panel */}
      {showDetails && (
        <div className="border-t border-slate-100 bg-slate-50/80 p-5 sm:p-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div>
              <h5 className="font-bold text-navy-900 mb-2 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-aviation" />
                Aircraft & Flight Info
              </h5>
              <ul className="space-y-1 text-slate-600">
                <li><strong className="text-navy-900">Operator:</strong> {flight.airline}</li>
                <li><strong className="text-navy-900">Model:</strong> {flight.aircraft}</li>
                <li><strong className="text-navy-900">Cabin Zone:</strong> {flight.cabinClass}</li>
                <li><strong className="text-navy-900">Total Duration:</strong> {flight.duration}</li>
                {flight.stopDetails && (
                  <li className="text-amber-700 font-medium">
                    <strong>Stopover:</strong> {flight.stopDetails}
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-navy-900 mb-2 flex items-center gap-1.5">
                <Luggage className="w-3.5 h-3.5 text-aviation" />
                Baggage & Amenities
              </h5>
              <ul className="space-y-1 text-slate-600">
                <li><strong className="text-navy-900">Carry-on:</strong> {flight.baggage.cabin}</li>
                <li><strong className="text-navy-900">Check-in:</strong> {flight.baggage.checked}</li>
                {flight.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-center gap-1 text-slate-700">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-navy-900 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-aviation" />
                Fare Conditions
              </h5>
              <p className="text-slate-600 leading-relaxed mb-3">
                {flight.refundPolicy}
              </p>
              <button
                onClick={handleViewDetails}
                className="text-aviation hover:text-aviation-dark font-semibold underline flex items-center gap-1"
              >
                <span>View Full Flight Page</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
