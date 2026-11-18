import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { Airport } from '../types/flight';
import { SAMPLE_AIRPORTS } from '../data/sampleAirports';

interface AirportAutocompleteProps {
  label: string;
  placeholder?: string;
  value: Airport | null;
  onChange: (airport: Airport) => void;
  excludeCode?: string;
  error?: string;
  id?: string;
}

export const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({
  label,
  placeholder = 'City or Airport Code',
  value,
  onChange,
  excludeCode,
  error,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter airports
  const filteredAirports = SAMPLE_AIRPORTS.filter(airport => {
    if (excludeCode && airport.code === excludeCode) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      airport.code.toLowerCase().includes(term) ||
      airport.city.toLowerCase().includes(term) ||
      airport.name.toLowerCase().includes(term) ||
      airport.country.toLowerCase().includes(term)
    );
  });

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % filteredAirports.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filteredAirports.length) % filteredAirports.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredAirports[highlightedIndex]) {
        handleSelect(filteredAirports[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleSelect = (airport: Airport) => {
    onChange(airport);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {label}
      </label>

      {/* Input button / trigger */}
      <div
        className={`w-full bg-white border rounded-xl px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all ${
          error
            ? 'border-rose-400 ring-2 ring-rose-100'
            : isOpen
            ? 'border-aviation ring-2 ring-aviation/20 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        }`}
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-cloud flex items-center justify-center text-slate-500 flex-shrink-0">
            <MapPin className="w-4 h-4 text-aviation" />
          </div>
          <div className="min-w-0 text-left">
            {value ? (
              <div className="flex items-baseline gap-1.5 truncate">
                <span className="font-bold text-navy-900 text-sm tracking-wide">
                  {value.code}
                </span>
                <span className="text-sm font-medium text-slate-700 truncate">
                  {value.city}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline truncate">
                  ({value.country})
                </span>
              </div>
            ) : (
              <span className="text-sm text-slate-400 font-normal">
                {placeholder}
              </span>
            )}
            <div className="text-[11px] text-slate-500 truncate -mt-0.5">
              {value ? value.name : 'Select airport or city'}
            </div>
          </div>
        </div>

        <div className="text-slate-400 flex items-center">
          {value && (
            <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded uppercase">
              {value.code}
            </span>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>
      )}

      {/* Autocomplete Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-floating z-50 overflow-hidden animate-fadeIn">
          {/* Search box inside dropdown */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/70 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-1.5" />
            <input
              ref={inputRef}
              id={id}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type city, code or airport..."
              className="w-full bg-transparent text-sm text-navy-900 placeholder-slate-400 focus:outline-none py-1"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results list */}
          <div className="max-h-60 overflow-y-auto py-1 divide-y divide-slate-50">
            {filteredAirports.length > 0 ? (
              filteredAirports.map((airport, idx) => {
                const isSelected = value?.code === airport.code;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => handleSelect(airport)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors ${
                      isHighlighted
                        ? 'bg-aviation/10 text-aviation-dark'
                        : isSelected
                        ? 'bg-slate-50 font-medium'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                        {airport.code}
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-semibold text-navy-900">
                          {airport.city},{' '}
                          <span className="font-normal text-slate-500">
                            {airport.country}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {airport.name}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {airport.code}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-6 text-center text-xs text-slate-500">
                No matching commercial airports found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
