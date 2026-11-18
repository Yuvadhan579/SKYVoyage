import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Luggage,
  Utensils,
  ShieldCheck,
  Award,
  Plus,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SAMPLE_ADDONS } from '../data/sampleAddons';
import { BookingSummarySidebar } from '../components/BookingSummarySidebar';
import { formatCurrency } from '../utils/fareCalculator';
import { AddonItem } from '../types/booking';

export const AddOns: React.FC = () => {
  const navigate = useNavigate();
  const { selectedFlight, selectedAddons, toggleAddon } = useBooking();

  if (!selectedFlight) {
    navigate('/flights');
    return null;
  }

  const handleContinue = () => {
    navigate('/booking-review');
  };

  const getCategoryIcon = (cat: AddonItem['category']) => {
    switch (cat) {
      case 'baggage':
        return Luggage;
      case 'meal':
        return Utensils;
      case 'insurance':
        return ShieldCheck;
      case 'assistance':
        return Award;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-aviation mb-1">
              Step 3 of 4 • Customize Your Journey
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              Add-ons & Optional Services
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Personalize your flight with extra baggage, gourmet dining, and priority airport privileges.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/seats')}
              className="text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors flex items-center gap-1 px-3 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Seats</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Add-ons List */}
          <div className="lg:col-span-8 space-y-4">
            {SAMPLE_ADDONS.map((addon) => {
              const isSelected = selectedAddons.some((a) => a.id === addon.id);
              const IconComponent = getCategoryIcon(addon.category);

              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon)}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all cursor-pointer shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'border-aviation bg-aviation/5 ring-2 ring-aviation/20'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-aviation text-white shadow-sm'
                          : 'bg-slate-100 text-aviation'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-navy-900 text-sm">
                          {addon.title}
                        </h3>
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {addon.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        {addon.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 flex-shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="text-base font-bold text-navy-900 font-display">
                        {formatCurrency(addon.price)}
                      </div>
                      <div className="text-[10px] text-slate-500">{addon.unit}</div>
                    </div>

                    <button
                      type="button"
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                        isSelected
                          ? 'bg-aviation text-white'
                          : 'bg-slate-100 text-navy-900 hover:bg-slate-200'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4">
            <BookingSummarySidebar
              currentStep="Add-ons"
              nextStepTitle="Proceed to Booking Review"
              onNext={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
