import React from 'react';
import { Plane, Calendar, Users, Luggage, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/fareCalculator';
import { formatDate, formatTime } from '../utils/formatters';

interface BookingSummarySidebarProps {
  currentStep?: string;
  nextStepTitle?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
}

export const BookingSummarySidebar: React.FC<BookingSummarySidebarProps> = ({
  currentStep,
  nextStepTitle,
  onNext,
  nextDisabled = false,
}) => {
  const { selectedFlight, searchQuery, selectedSeats, selectedAddons, fareBreakdown, passengers } = useBooking();

  if (!selectedFlight) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card text-center text-slate-500">
        <Plane className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm">No flight selected.</p>
      </div>
    );
  }

  const assignedSeatCount = Object.keys(selectedSeats).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-6 space-y-5 sticky top-24 text-navy-900">
      {/* Header */}
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Booking Itinerary
          </span>
          <h3 className="font-bold text-navy-900 text-base leading-tight">
            Trip Summary
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {selectedFlight.cabinClass}
        </span>
      </div>

      {/* Flight Details */}
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between font-bold text-navy-900">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-aviation" />
            <span>{selectedFlight.airline} ({selectedFlight.flightNumber})</span>
          </div>
          <span className="text-slate-500 font-normal">{selectedFlight.aircraft}</span>
        </div>

        {/* Departure & Arrival Box */}
        <div className="bg-slate-50 rounded-xl p-3.5 space-y-3 border border-slate-200/60">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-bold text-navy-900 text-sm">
                {selectedFlight.origin.code} • {formatTime(selectedFlight.departureTime)}
              </div>
              <div className="text-slate-500 text-[11px]">
                {selectedFlight.origin.city} ({selectedFlight.origin.name})
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              {formatDate(selectedFlight.departureDate)}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 py-0.5">
            <div className="h-0.5 flex-1 bg-slate-200" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              {selectedFlight.duration} • {selectedFlight.stops === 0 ? 'Non-stop' : `${selectedFlight.stops} Stop`}
            </span>
            <div className="h-0.5 flex-1 bg-slate-200" />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="font-bold text-navy-900 text-sm">
                {selectedFlight.destination.code} • {formatTime(selectedFlight.arrivalTime)}
              </div>
              <div className="text-slate-500 text-[11px]">
                {selectedFlight.destination.city} ({selectedFlight.destination.name})
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              {formatDate(selectedFlight.arrivalDate)}
            </div>
          </div>
        </div>

        {/* Travelers & Baggage summary */}
        <div className="flex items-center justify-between text-slate-600 pt-1">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{fareBreakdown.passengerCount} Traveler{fareBreakdown.passengerCount > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Luggage className="w-3.5 h-3.5 text-slate-400" />
            <span>Cabin {selectedFlight.baggage.cabin}</span>
          </div>
        </div>

        {/* Seat assignment status */}
        {assignedSeatCount > 0 && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Assigned Seats:</span>
            <span className="font-bold text-aviation">
              {Object.values(selectedSeats).map((s) => s.code).join(', ')}
            </span>
          </div>
        )}

        {/* Add-ons status */}
        {selectedAddons.length > 0 && (
          <div className="pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium block mb-1">Add-ons:</span>
            <div className="space-y-1">
              {selectedAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between text-slate-600 text-[11px]">
                  <span className="truncate pr-2">{addon.title}</span>
                  <span className="font-semibold text-navy-900">{formatCurrency(addon.price)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Flight Base Fare ({fareBreakdown.passengerCount}x)</span>
          <span className="font-semibold text-navy-900">{formatCurrency(fareBreakdown.totalBaseFare)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Taxes, Carrier & Security Fees</span>
          <span className="font-semibold text-navy-900">{formatCurrency(fareBreakdown.taxesAndFees)}</span>
        </div>

        {fareBreakdown.seatSelectionFee > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Seat Selection Surcharges</span>
            <span className="font-semibold text-navy-900">{formatCurrency(fareBreakdown.seatSelectionFee)}</span>
          </div>
        )}

        {fareBreakdown.addonsFee > 0 && (
          <div className="flex justify-between text-slate-600">
            <span>Selected Travel Add-ons</span>
            <span className="font-semibold text-navy-900">{formatCurrency(fareBreakdown.addonsFee)}</span>
          </div>
        )}

        {/* Grand Demonstration Total */}
        <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Total Demonstration Fare</div>
            <div className="text-2xl font-bold text-navy-900 font-display">
              {formatCurrency(fareBreakdown.totalDemonstrationFare)}
            </div>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            All taxes included
          </span>
        </div>
      </div>

      {/* Action Button */}
      {nextStepTitle && onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="w-full py-3 bg-aviation hover:bg-aviation-dark text-white font-semibold text-sm rounded-xl shadow-md shadow-aviation/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{nextStepTitle}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* Demonstration Notice */}
      <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-start gap-2 border border-slate-200/80">
        <ShieldCheck className="w-4 h-4 text-aviation flex-shrink-0 mt-0.5" />
        <span>
          Sample demonstration booking. No actual payment will be charged to your account.
        </span>
      </div>
    </div>
  );
};
