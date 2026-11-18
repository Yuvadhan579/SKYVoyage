import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle,
  Plane,
  Printer,
  Users,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/fareCalculator';
import { formatDate, formatTime } from '../utils/formatters';

export const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { currentBooking, resetBookingFlow } = useBooking();

  useEffect(() => {
    if (!currentBooking) {
      const saved = localStorage.getItem('skyvoyage_current_booking');
      if (!saved) {
        navigate('/');
      }
    }
  }, [currentBooking, navigate]);

  if (!currentBooking) {
    return null;
  }

  const { flight, pnr, passengers, seats, fareBreakdown, bookingDate } = currentBooking;

  const handlePrint = () => {
    window.print();
  };

  const handleBookAnother = () => {
    resetBookingFlow();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20 print:bg-white print:text-black print:pt-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="bg-emerald-600 text-white rounded-2xl p-6 sm:p-8 shadow-card mb-8 text-center space-y-3 print:hidden">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-200">
            Booking Confirmed (Demonstration Mode)
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display">
            Your Journey is Reserved!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            A confirmation email has been simulated and dispatched to{' '}
            <strong>{passengers[0]?.email || 'your email'}</strong>. Your booking reference is saved.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-white text-emerald-900 rounded-xl text-xs font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Itinerary</span>
            </button>
            <Link
              to="/my-trips"
              className="px-5 py-2.5 bg-emerald-700/80 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-2 border border-emerald-400/40"
            >
              <Users className="w-4 h-4" />
              <span>View in My Trips</span>
            </Link>
          </div>
        </div>

        {/* Printable E-Ticket Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
          {/* Ticket Header Bar */}
          <div className="bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-aviation flex items-center justify-center text-white font-bold">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <div>
                <div className="text-lg font-bold font-display text-navy-900">
                  Sky<span className="text-aviation">Voyage</span> Airlines
                </div>
                <div className="text-xs text-slate-500">
                  Electronic Passenger Itinerary Receipt
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-white px-4 py-2 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Booking Reference (PNR)
              </div>
              <div className="text-2xl font-black tracking-widest text-aviation font-mono">
                {pnr}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Flight Segment Box */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-navy-900 text-sm">
                    {flight.airline}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-700">
                    Flight {flight.flightNumber}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {flight.aircraft}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  {flight.cabinClass}
                </span>
              </div>

              {/* Origin to Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div>
                  <div className="text-3xl font-bold text-navy-900 font-display">
                    {flight.origin.code}
                  </div>
                  <div className="text-sm font-semibold text-navy-800">
                    {flight.origin.city}
                  </div>
                  <div className="text-xs text-slate-500">
                    {flight.origin.name}
                  </div>
                  <div className="mt-2 text-xs font-semibold text-navy-900">
                    {formatTime(flight.departureTime)} • {formatDate(flight.departureDate)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    {flight.duration}
                  </div>
                  <div className="relative w-32 mx-auto my-2 flex items-center">
                    <div className="h-0.5 w-full bg-slate-300" />
                    <Plane className="w-4 h-4 text-aviation absolute left-1/2 -translate-x-1/2 transform rotate-90" />
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold">
                    {flight.stops === 0 ? 'Non-stop Flight' : flight.stopDetails}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-3xl font-bold text-navy-900 font-display">
                    {flight.destination.code}
                  </div>
                  <div className="text-sm font-semibold text-navy-800">
                    {flight.destination.city}
                  </div>
                  <div className="text-xs text-slate-500">
                    {flight.destination.name}
                  </div>
                  <div className="mt-2 text-xs font-semibold text-navy-900">
                    {formatTime(flight.arrivalTime)} • {formatDate(flight.arrivalDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger & Seat Assignment Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider text-slate-500">
                Passenger Details & Seat Assignments
              </h3>

              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {passengers.map((p, idx) => {
                  const seat = seats[p.id];
                  return (
                    <div key={p.id} className="p-4 flex items-center justify-between bg-white">
                      <div className="space-y-0.5">
                        <div className="font-bold text-navy-900 text-sm">
                          {p.title} {p.firstName} {p.lastName}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          E-Ticket: ETKT-SV-{9000 + idx} • Nationality: {p.nationality}{' '}
                          {p.passportNumber && `• Doc: ${p.passportNumber}`}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">
                          Assigned Seat
                        </div>
                        <div className="text-base font-bold text-aviation font-display">
                          {seat ? seat.code : 'Pending Check-in'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fare Summary & Payment Stamp */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
              <div className="space-y-1">
                <div className="text-slate-600">
                  Payment Status: <strong className="text-emerald-600 font-bold">Approved (Simulated)</strong>
                </div>
                <div className="text-slate-600">
                  Booking Date: <strong className="text-navy-900">{formatDate(bookingDate)}</strong>
                </div>
                <div className="text-slate-600">
                  Payment Method: <strong className="text-navy-900">{currentBooking.paymentDetails.method}</strong> (•••• {currentBooking.paymentDetails.cardLast4})
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-[10px] uppercase font-bold text-slate-500">
                  Total Demonstration Amount
                </div>
                <div className="text-2xl font-bold text-navy-900 font-display">
                  {formatCurrency(fareBreakdown.totalDemonstrationFare)}
                </div>
              </div>
            </div>

            {/* Disclaimer Footer on ticket */}
            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-200 space-y-1">
              <div className="font-bold text-navy-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-aviation" />
                Demonstration Notice
              </div>
              <p>
                This document is generated by the SkyVoyage frontend prototype application for demonstration and testing purposes only. No official airline contract of carriage exists.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <Link
            to="/my-trips"
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-navy-900 rounded-xl text-xs font-semibold transition-all text-center border border-slate-300 shadow-sm"
          >
            Manage Booking in My Trips
          </Link>

          <button
            onClick={handleBookAnother}
            className="w-full sm:w-auto px-5 py-2.5 bg-aviation hover:bg-aviation-dark text-white rounded-xl text-xs font-semibold transition-all text-center flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Book Another Flight</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
