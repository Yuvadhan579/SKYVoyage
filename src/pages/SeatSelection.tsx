import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SeatMap } from '../components/SeatMap';
import { BookingSummarySidebar } from '../components/BookingSummarySidebar';

export const SeatSelection: React.FC = () => {
  const navigate = useNavigate();
  const { selectedFlight, passengers, selectedSeats } = useBooking();

  if (!selectedFlight) {
    navigate('/flights');
    return null;
  }

  const handleContinue = () => {
    navigate('/addons');
  };

  const assignedCount = Object.keys(selectedSeats).length;

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-aviation mb-1">
              Step 2 of 4 • Aircraft Cabin Layout
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              Select Your Aircraft Seats
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Operating Aircraft: <strong className="text-navy-900">{selectedFlight.aircraft}</strong> • {selectedFlight.airline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/passengers')}
              className="text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors flex items-center gap-1 px-3 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Passengers</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Seat Map Column */}
          <div className="lg:col-span-8">
            <SeatMap onContinue={handleContinue} />
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4">
            <BookingSummarySidebar
              currentStep="Seat Selection"
              nextStepTitle={
                assignedCount === passengers.length
                  ? 'Confirm Seats & Continue'
                  : 'Continue to Add-ons'
              }
              onNext={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
