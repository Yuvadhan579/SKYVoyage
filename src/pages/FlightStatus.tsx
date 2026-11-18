import React, { useState } from 'react';
import {
  Search,
  Plane,
  Clock,
} from 'lucide-react';
import { SAMPLE_FLIGHT_STATUSES } from '../data/sampleFlights';
import { FlightStatusInfo } from '../types/flight';
import { formatTime } from '../utils/formatters';

export const FlightStatus: React.FC = () => {
  const [flightNumberQuery, setFlightNumberQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<FlightStatusInfo | null>(
    SAMPLE_FLIGHT_STATUSES[0]
  );
  const [filterMode, setFilterMode] = useState<'all' | 'delayed' | 'in-air'>('all');

  const filteredStatuses = SAMPLE_FLIGHT_STATUSES.filter((fs) => {
    if (filterMode === 'delayed' && fs.status !== 'Delayed') return false;
    if (filterMode === 'in-air' && fs.status !== 'In Flight') return false;
    if (flightNumberQuery.trim()) {
      const term = flightNumberQuery.trim().toLowerCase();
      const matchNum = fs.flightNumber.toLowerCase().includes(term);
      const matchCity =
        fs.origin.city.toLowerCase().includes(term) ||
        fs.destination.city.toLowerCase().includes(term);
      const matchAirline = fs.airline.toLowerCase().includes(term);
      return matchNum || matchCity || matchAirline;
    }
    return true;
  });

  const getStatusBadge = (status: FlightStatusInfo['status']) => {
    switch (status) {
      case 'Arrived':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Delayed':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'In Flight':
        return 'bg-aviation/10 text-aviation border-aviation/30';
      case 'Boarding':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Departed':
        return 'bg-aviation/10 text-aviation-dark border border-aviation/20';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-aviation">
            Real-Time Operations Tracker
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 font-display">
            Flight Status & Schedule
          </h1>
          <p className="text-xs text-slate-600">
            Check terminal gates, baggage belts, and live aircraft status across the SkyVoyage global network.
          </p>
        </div>

        {/* Search Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Flight Number, Route or Airline
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. SV-101, Emirates, Dubai, or Singapore..."
                  value={flightNumberQuery}
                  onChange={(e) => setFlightNumberQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Travel Date
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-aviation">
                <option value="today">Today, Oct 28</option>
                <option value="tomorrow">Tomorrow, Oct 29</option>
                <option value="yesterday">Yesterday, Oct 27</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold">Filter:</span>
              <button
                type="button"
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterMode === 'all' ? 'bg-aviation text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                All Flights
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('in-air')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterMode === 'in-air' ? 'bg-aviation text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                In Flight
              </button>
              <button
                type="button"
                onClick={() => setFilterMode('delayed')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterMode === 'delayed' ? 'bg-aviation text-white shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                Delayed
              </button>
            </div>

            <div className="text-[11px] text-slate-400 italic">
              *All tracking info is simulated demonstration operational data
            </div>
          </div>
        </div>

        {/* Selected Flight Detailed Operational Card */}
        {selectedStatus && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-card mb-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-aviation/10 text-aviation flex items-center justify-center font-bold">
                  <Plane className="w-5 h-5 text-aviation" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-navy-900 font-display">
                      {selectedStatus.airline} • {selectedStatus.flightNumber}
                    </h2>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        selectedStatus.status
                      )}`}
                    >
                      {selectedStatus.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Aircraft: <strong className="text-navy-900">{selectedStatus.aircraft}</strong> • Scheduled {selectedStatus.date}
                  </div>
                </div>
              </div>

              {selectedStatus.delayMinutes && (
                <div className="text-xs font-semibold text-rose-700 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200">
                  Delayed by {selectedStatus.delayMinutes} minutes due to air traffic control
                </div>
              )}
            </div>

            {/* Flight Milestones Timeline */}
            <div className="py-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div>
                  <div className="text-3xl font-bold text-navy-900 font-display">
                    {selectedStatus.origin.code}
                  </div>
                  <div className="text-sm font-semibold text-navy-800">
                    {selectedStatus.origin.city}
                  </div>
                  <div className="text-xs text-slate-500">
                    {selectedStatus.origin.name}
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    Scheduled Departure: <strong className="text-navy-900">{selectedStatus.scheduledDeparture}</strong>
                    {selectedStatus.actualDeparture && (
                      <div className="text-emerald-600 font-semibold">
                        Actual Off Block: {selectedStatus.actualDeparture}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-xs font-bold text-aviation uppercase tracking-wider">
                    {selectedStatus.status}
                  </div>
                  <div className="relative w-36 mx-auto flex items-center">
                    <div className="h-0.5 w-full bg-slate-200 rounded-full" />
                    <Plane className="w-5 h-5 text-aviation absolute left-1/2 -translate-x-1/2 transform rotate-90" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Terminal {selectedStatus.terminal} • {selectedStatus.gate}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-3xl font-bold text-navy-900 font-display">
                    {selectedStatus.destination.code}
                  </div>
                  <div className="text-sm font-semibold text-navy-800">
                    {selectedStatus.destination.city}
                  </div>
                  <div className="text-xs text-slate-500">
                    {selectedStatus.destination.name}
                  </div>
                  <div className="mt-2 text-xs text-slate-600">
                    Scheduled Arrival: <strong className="text-navy-900">{selectedStatus.scheduledArrival}</strong>
                    {selectedStatus.actualArrival && (
                      <div className="text-emerald-600 font-semibold">
                        Touchdown: {selectedStatus.actualArrival}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Airport Gate & Baggage Belt Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="text-slate-500 uppercase font-semibold text-[10px]">Terminal</div>
                <div className="text-base font-bold text-navy-900 mt-0.5">{selectedStatus.terminal}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="text-slate-500 uppercase font-semibold text-[10px]">Boarding Gate</div>
                <div className="text-base font-bold text-navy-900 mt-0.5">{selectedStatus.gate}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="text-slate-500 uppercase font-semibold text-[10px]">Baggage Claim</div>
                <div className="text-base font-bold text-navy-900 mt-0.5">{selectedStatus.baggageBelt}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="text-slate-500 uppercase font-semibold text-[10px]">Aircraft Type</div>
                <div className="text-base font-bold text-navy-900 mt-0.5">{selectedStatus.aircraft}</div>
              </div>
            </div>
          </div>
        )}

        {/* Flight Status Directory */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-navy-900 text-sm">
              Today's Flight Directory ({filteredStatuses.length})
            </h3>
            <span className="text-xs text-slate-500">Click any row to view operational metrics</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {filteredStatuses.map((fs) => {
              const isSelected = selectedStatus?.flightNumber === fs.flightNumber;
              return (
                <div
                  key={fs.flightNumber}
                  onClick={() => setSelectedStatus(fs)}
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-aviation/5 border-l-4 border-l-aviation' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="font-bold text-navy-900 text-sm w-20 font-mono">
                      {fs.flightNumber}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {fs.airline}
                    </div>
                    <div className="text-xs text-slate-500">
                      <strong className="text-navy-900">{fs.origin.code}</strong> → <strong className="text-navy-900">{fs.destination.code}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-xs text-right hidden sm:block">
                      <div className="text-navy-900 font-semibold">{fs.scheduledDeparture}</div>
                      <div className="text-slate-400 text-[10px]">Departure</div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        fs.status
                      )}`}
                    >
                      {fs.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
