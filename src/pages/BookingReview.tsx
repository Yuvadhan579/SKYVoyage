import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Users,
  Luggage,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BookingSummarySidebar } from '../components/BookingSummarySidebar';
import { formatCurrency } from '../utils/fareCalculator';
import { formatDate, formatTime } from '../utils/formatters';

export const BookingReview: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedFlight,
    passengers,
    selectedSeats,
    selectedAddons,
    completeBooking,
  } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'net-banking'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 8821');
  const [cardHolder, setCardHolder] = useState(
    passengers[0]?.firstName
      ? `${passengers[0].firstName} ${passengers[0].lastName}`
      : 'Alexander Sterling'
  );
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('882');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedFlight) {
    navigate('/flights');
    return null;
  }

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await completeBooking('Demo Credit Card (Visa)', '8821');
      navigate('/confirmation');
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to complete booking.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-aviation mb-1">
              Final Step 4 of 4 • Booking Review
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              Review & Demonstration Confirmation
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Please verify all traveler details and flight itinerary before completing your demonstration booking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/addons')}
              className="text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors flex items-center gap-1 px-3 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Add-ons</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Review Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Flight Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-aviation" />
                  <h3 className="font-bold text-navy-900 text-sm">
                    {selectedFlight.airline} • {selectedFlight.flightNumber}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {selectedFlight.cabinClass}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-slate-50 p-5 rounded-xl border border-slate-200/60">
                <div>
                  <div className="text-xl font-bold text-navy-900 font-display">
                    {formatTime(selectedFlight.departureTime)}
                  </div>
                  <div className="text-xs font-semibold text-navy-800">
                    {selectedFlight.origin.city} ({selectedFlight.origin.code})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {formatDate(selectedFlight.departureDate)}
                  </div>
                </div>

                <div className="text-center text-xs text-slate-500">
                  <div className="font-semibold text-navy-900">{selectedFlight.duration}</div>
                  <div className="relative w-28 mx-auto my-1 flex items-center">
                    <div className="h-0.5 w-full bg-slate-200" />
                    <Plane className="w-3.5 h-3.5 text-aviation absolute left-1/2 -translate-x-1/2 transform rotate-90" />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {selectedFlight.stops === 0 ? 'Non-stop' : selectedFlight.stopDetails}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xl font-bold text-navy-900 font-display">
                    {formatTime(selectedFlight.arrivalTime)}
                  </div>
                  <div className="text-xs font-semibold text-navy-800">
                    {selectedFlight.destination.city} ({selectedFlight.destination.code})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {formatDate(selectedFlight.arrivalDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Travelers & Assigned Seats */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card space-y-4">
              <h3 className="font-bold text-navy-900 text-sm pb-3 border-b border-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-aviation" />
                <span>Travelers & Seating Roster</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {passengers.map((p, idx) => {
                  const assignedSeat = selectedSeats[p.id];
                  return (
                    <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-navy-900 text-sm">
                          {p.title} {p.firstName || 'Traveler'} {p.lastName || `${idx + 1}`}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {p.nationality} • Born {formatDate(p.dateOfBirth) || 'N/A'}{' '}
                          {p.passportNumber && `• Doc: ${p.passportNumber}`}
                        </div>
                      </div>

                      <div className="text-right">
                        {assignedSeat ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aviation/10 text-aviation font-semibold text-xs border border-aviation/20">
                            Seat {assignedSeat.code} ({assignedSeat.zone})
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs italic">
                            Auto-assigned at gate
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Add-ons */}
            {selectedAddons.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card space-y-3">
                <h3 className="font-bold text-navy-900 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-aviation" />
                  <span>Selected Optional Add-ons</span>
                </h3>
                <div className="space-y-2">
                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between text-xs py-1">
                      <span className="font-medium text-slate-700">{addon.title}</span>
                      <span className="font-bold text-navy-900">{formatCurrency(addon.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Demonstration Payment Section */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-aviation" />
                  <h3 className="font-bold text-navy-900 text-sm">
                    Demonstration Payment Details
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-bit Simulated SSL</span>
                </div>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card' },
                  { id: 'apple-pay', label: 'Apple Pay' },
                  { id: 'net-banking', label: 'Net Banking' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      paymentMethod === m.id
                        ? 'bg-aviation text-white border-aviation shadow-sm font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Mock Card Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Card Number (Sample Only)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono text-navy-900 font-bold focus:ring-aviation"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-navy-900 font-semibold focus:ring-aviation"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-navy-900 font-mono focus:ring-aviation"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-navy-900 font-mono focus:ring-aviation"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Simulation:</strong> Clicking "Confirm & Complete Booking" will create a mock reservation with simulated PNR and persist it into your browser's local trips. No real funds are transferred.
                </span>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4">
            <BookingSummarySidebar
              currentStep="Review"
              nextStepTitle={isProcessing ? 'Issuing E-Ticket...' : 'Confirm & Complete Booking'}
              onNext={handleConfirm}
              nextDisabled={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
