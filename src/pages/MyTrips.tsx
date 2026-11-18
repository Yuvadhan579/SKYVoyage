import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Luggage,
  Search,
  Plane,
  FileText,
  Trash2,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/fareCalculator';
import { formatDate, formatTime } from '../utils/formatters';

export const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const { savedBookings, cancelBooking } = useBooking();

  const [pnrSearch, setPnrSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'cancelled'>('all');
  const [cancellingPnr, setCancellingPnr] = useState<string | null>(null);

  const filteredBookings = savedBookings.filter((b) => {
    if (activeTab === 'cancelled' && b.status !== 'Cancelled') return false;
    if (activeTab === 'upcoming' && b.status === 'Cancelled') return false;

    if (pnrSearch.trim()) {
      const term = pnrSearch.trim().toLowerCase();
      const matchPnr = b.pnr.toLowerCase().includes(term);
      const matchName = b.passengers.some(
        (p) =>
          p.firstName.toLowerCase().includes(term) ||
          p.lastName.toLowerCase().includes(term)
      );
      return matchPnr || matchName;
    }

    return true;
  });

  const handleConfirmCancel = async () => {
    if (cancellingPnr) {
      try { await cancelBooking(cancellingPnr); setCancellingPnr(null); }
      catch (error) { window.alert(error instanceof Error ? error.message : 'Unable to cancel booking.'); }
    }
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-aviation mb-1">
              Manage Bookings & E-Tickets
            </div>
            <h1 className="text-3xl font-extrabold text-navy-900 font-display">
              My Trips & Reservations
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Your reservations are saved to your SkyVoyage account.
            </p>
          </div>

          <Link
            to="/flights"
            className="px-5 py-2.5 bg-aviation hover:bg-aviation-dark text-white text-xs font-semibold rounded-xl transition-all self-start md:self-auto flex items-center gap-2 shadow-sm"
          >
            <Plane className="w-4 h-4" />
            <span>Book a New Flight</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-card mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by PNR (e.g. SV-DEMO) or name..."
              value={pnrSearch}
              onChange={(e) => setPnrSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
            />
          </div>

          {/* Status Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-stretch sm:self-auto justify-center">
            {[
              { id: 'all', label: 'All Trips' },
              { id: 'upcoming', label: 'Active / Confirmed' },
              { id: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-aviation text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trips List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const { flight, pnr, status, passengers, seats, fareBreakdown, bookingDate } = booking;
              const isCancelled = status === 'Cancelled';

              return (
                <div
                  key={pnr}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-card ${
                    isCancelled ? 'border-slate-200 opacity-75' : 'border-slate-200/80 hover:shadow-floating'
                  }`}
                >
                  {/* Card Header Bar */}
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-aviation/10 text-aviation flex items-center justify-center font-bold text-xs">
                        <Plane className="w-4 h-4 transform -rotate-45" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-navy-900 text-sm tracking-wider font-mono">
                            PNR: {pnr}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                              isCancelled
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Booked on {formatDate(bookingDate)} • {flight.airline} {flight.flightNumber}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-500">
                        Fare Paid
                      </div>
                      <div className="text-base font-bold text-navy-900 font-display">
                        {formatCurrency(fareBreakdown.totalDemonstrationFare)}
                      </div>
                    </div>
                  </div>

                  {/* Flight Route Segment */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-8 grid grid-cols-3 gap-2 items-center">
                        {/* Origin */}
                        <div>
                          <div className="text-2xl font-bold text-navy-900 font-display">
                            {flight.origin.code}
                          </div>
                          <div className="text-xs font-semibold text-navy-800">
                            {flight.origin.city}
                          </div>
                          <div className="text-xs text-slate-500">
                            {formatTime(flight.departureTime)} • {formatDate(flight.departureDate)}
                          </div>
                        </div>

                        {/* Mid Indicator */}
                        <div className="text-center">
                          <div className="text-[11px] font-semibold text-slate-500">
                            {flight.duration}
                          </div>
                          <div className="relative w-24 mx-auto my-1 flex items-center">
                            <div className="h-0.5 w-full bg-slate-200" />
                            <Plane className="w-3.5 h-3.5 text-aviation absolute left-1/2 -translate-x-1/2 transform rotate-90" />
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {flight.stops === 0 ? 'Direct' : flight.stopDetails}
                          </div>
                        </div>

                        {/* Destination */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-navy-900 font-display">
                            {flight.destination.code}
                          </div>
                          <div className="text-xs font-semibold text-navy-800">
                            {flight.destination.city}
                          </div>
                          <div className="text-xs text-slate-500">
                            {formatTime(flight.arrivalTime)} • {formatDate(flight.arrivalDate)}
                          </div>
                        </div>
                      </div>

                      {/* Passenger & Actions */}
                      <div className="md:col-span-4 md:border-l md:border-slate-100 md:pl-6 space-y-3">
                        <div className="text-xs">
                          <span className="text-slate-500 block font-semibold uppercase text-[10px]">
                            Travelers ({passengers.length})
                          </span>
                          <span className="font-semibold text-navy-900">
                            {passengers.map((p) => `${p.firstName} ${p.lastName}`).join(', ')}
                          </span>
                        </div>

                        <div className="text-xs">
                          <span className="text-slate-500 block font-semibold uppercase text-[10px]">
                            Seat Assignments
                          </span>
                          <span className="font-bold text-aviation">
                            {Object.values(seats).length > 0
                              ? Object.values(seats).map((s) => s.code).join(', ')
                              : 'Standard Allocation'}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex items-center gap-2">
                          {!isCancelled && (
                            <button
                              type="button"
                              onClick={() => setCancellingPnr(pnr)}
                              className="px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Cancel Trip</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            <span>E-Ticket</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-card text-navy-900">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Luggage className="w-6 h-6 text-aviation" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">
              No trips found matching your filter
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your demonstration bookings remain stored in this browser session. Book a flight to see your itinerary here.
            </p>
            <Link
              to="/flights"
              className="px-5 py-2.5 bg-aviation hover:bg-aviation-dark text-white text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <span>Explore Flights</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {cancellingPnr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-floating space-y-4 text-navy-900">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-base">
                    Cancel Demonstration Booking?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Booking Reference: <strong className="text-navy-900">{cancellingPnr}</strong>
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to cancel this demonstration flight reservation? The status will update to Cancelled and the mock refund will be credited back to your demo balance.
              </p>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCancellingPnr(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
