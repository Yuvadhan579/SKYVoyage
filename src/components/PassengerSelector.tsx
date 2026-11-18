import React, { useState, useRef, useEffect } from 'react';
import { Users, Plus, Minus, Check } from 'lucide-react';
import { PassengerCount } from '../types/booking';

interface PassengerSelectorProps {
  passengers: PassengerCount;
  onChange: (passengers: PassengerCount) => void;
}

export const PassengerSelector: React.FC<PassengerSelectorProps> = ({
  passengers,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const total = passengers.adults + passengers.children + passengers.infants;

  const handleUpdate = (type: keyof PassengerCount, delta: number) => {
    const updated = { ...passengers };
    const current = updated[type];
    const nextVal = current + delta;

    if (type === 'adults') {
      if (nextVal < 1 || nextVal > 9) return;
      updated.adults = nextVal;
      if (updated.infants > nextVal) {
        updated.infants = nextVal;
      }
    } else if (type === 'children') {
      if (nextVal < 0 || total + delta > 9) return;
      updated.children = nextVal;
    } else if (type === 'infants') {
      if (nextVal < 0 || nextVal > updated.adults || total + delta > 9) return;
      updated.infants = nextVal;
    }

    onChange(updated);
  };

  const getSummaryText = () => {
    const parts = [];
    if (passengers.adults === 1) parts.push('1 Adult');
    else parts.push(`${passengers.adults} Adults`);

    if (passengers.children === 1) parts.push('1 Child');
    else if (passengers.children > 1) parts.push(`${passengers.children} Children`);

    if (passengers.infants === 1) parts.push('1 Infant');
    else if (passengers.infants > 1) parts.push(`${passengers.infants} Infants`);

    return parts.join(', ');
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        Passengers
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-xl px-3.5 py-2.5 flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-aviation/30 text-navy-900"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-aviation/10 flex items-center justify-center text-aviation flex-shrink-0">
            <Users className="w-4 h-4 text-aviation" />
          </div>
          <div className="text-left min-w-0">
            <div className="font-semibold text-navy-900 text-xs sm:text-sm truncate">
              {getSummaryText()}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {total} Traveler{total > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 sm:right-0 sm:left-auto w-72 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-floating z-50 p-4 animate-fadeIn text-navy-900">
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="text-xs sm:text-sm font-semibold text-navy-900">Adults</div>
                <div className="text-[11px] text-slate-500">Age 12+ years</div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={passengers.adults <= 1}
                  onClick={() => handleUpdate('adults', -1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs sm:text-sm font-bold text-navy-900">
                  {passengers.adults}
                </span>
                <button
                  type="button"
                  disabled={total >= 9}
                  onClick={() => handleUpdate('adults', 1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="text-xs sm:text-sm font-semibold text-navy-900">Children</div>
                <div className="text-[11px] text-slate-500">Age 2–11 years</div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={passengers.children <= 0}
                  onClick={() => handleUpdate('children', -1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs sm:text-sm font-bold text-navy-900">
                  {passengers.children}
                </span>
                <button
                  type="button"
                  disabled={total >= 9}
                  onClick={() => handleUpdate('children', 1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="text-xs sm:text-sm font-semibold text-navy-900">Infants</div>
                <div className="text-[11px] text-slate-500">Under 2 years (lap)</div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  disabled={passengers.infants <= 0}
                  onClick={() => handleUpdate('infants', -1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs sm:text-sm font-bold text-navy-900">
                  {passengers.infants}
                </span>
                <button
                  type="button"
                  disabled={passengers.infants >= passengers.adults || total >= 9}
                  onClick={() => handleUpdate('infants', 1)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-aviation hover:bg-aviation-dark text-white text-xs font-semibold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
