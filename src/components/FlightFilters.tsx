import React from 'react';
import { RotateCcw, Filter } from 'lucide-react';
import { CabinClass } from '../types/flight';
import { formatCurrency } from '../utils/fareCalculator';

export interface FilterState {
  maxPrice: number;
  selectedAirlines: string[];
  stops: number | null;
  departureTimeRange: 'all' | 'morning' | 'afternoon' | 'evening';
  cabinClass: CabinClass | 'all';
}

interface FlightFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  availableAirlines: string[];
  minPrice: number;
  maxPossiblePrice: number;
}

export const FlightFilters: React.FC<FlightFiltersProps> = ({
  filters,
  onChange,
  onReset,
  availableAirlines,
  minPrice,
  maxPossiblePrice,
}) => {
  const handleAirlineToggle = (airline: string) => {
    const current = filters.selectedAirlines;
    const exists = current.includes(airline);
    const updated = exists ? current.filter((a) => a !== airline) : [...current, airline];
    onChange({ ...filters, selectedAirlines: updated });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-6 text-navy-900">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-aviation" />
          <h3 className="font-bold text-navy-900 text-sm">Filter Flights</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-aviation flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-slate-700">Max Demonstration Fare</span>
          <span className="text-xs font-extrabold text-aviation">
            {formatCurrency(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPossiblePrice}
          step={25}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-aviation"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>{formatCurrency(minPrice)}</span>
          <span>{formatCurrency(maxPossiblePrice)}</span>
        </div>
      </div>

      {/* Stops */}
      <div>
        <h4 className="text-xs font-semibold text-slate-700 mb-2">Stops</h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Any', value: null },
            { label: 'Non-stop', value: 0 },
            { label: '1 Stop', value: 1 },
          ].map((item) => {
            const isSelected = filters.stops === item.value;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onChange({ ...filters, stops: item.value })}
                className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-aviation text-white border-aviation shadow-sm font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Departure Time Slots */}
      <div>
        <h4 className="text-xs font-semibold text-slate-700 mb-2">Departure Time</h4>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'Any Time', sub: 'All 24 hours' },
            { id: 'morning', label: 'Morning', sub: '00:00 - 11:59' },
            { id: 'afternoon', label: 'Afternoon', sub: '12:00 - 17:59' },
            { id: 'evening', label: 'Evening', sub: '18:00 - 23:59' },
          ].map((slot) => {
            const isSelected = filters.departureTimeRange === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...filters,
                    departureTimeRange: slot.id as FilterState['departureTimeRange'],
                  })
                }
                className={`w-full py-2 px-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                  isSelected
                    ? 'bg-aviation/10 border-aviation text-aviation font-semibold'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{slot.label}</span>
                <span className="text-[11px] text-slate-400">{slot.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Airlines Checkbox List */}
      <div>
        <h4 className="text-xs font-semibold text-slate-700 mb-2">Airlines</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableAirlines.map((airline) => {
            const isChecked = filters.selectedAirlines.includes(airline);
            return (
              <label
                key={airline}
                className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-navy-900 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAirlineToggle(airline)}
                  className="w-4 h-4 rounded text-aviation border-slate-300 focus:ring-aviation"
                />
                <span>{airline}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
