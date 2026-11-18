import React, { useState, useMemo } from 'react';
import { User, Check, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { Seat, SeatZone, SeatFeature } from '../types/booking';
import { formatCurrency } from '../utils/fareCalculator';
import { useBooking } from '../context/BookingContext';

interface SeatMapProps {
  onContinue?: () => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ onContinue }) => {
  const { passengers, selectedSeats, assignSeat } = useBooking();
  const [activePassengerIndex, setActivePassengerIndex] = useState(0);

  const activePassenger = passengers[activePassengerIndex] || passengers[0];

  const cabinSeats: Seat[] = useMemo(() => {
    const seats: Seat[] = [];

    const occupiedCodes = new Set([
      '1A', '1K', '2D', '3G', '4K',
      '6A', '6K', '7C', '8E', '9H',
      '12B', '12C', '14A', '14B', '15E', '16H', '16K', '18A', '18B', '19D', '19F',
      '20A', '21J', '21K', '22D', '23A', '23C', '24E',
    ]);

    // Zone 1: Business Class (Rows 1 to 4) - 1-2-1 layout: A _ D G _ K
    for (let r = 1; r <= 4; r++) {
      const cols = ['A', 'D', 'G', 'K'];
      cols.forEach((col) => {
        const code = `${r}${col}`;
        seats.push({
          id: `seat-${code}`,
          row: r,
          col,
          code,
          zone: 'business',
          features: ['extra-legroom', col === 'A' || col === 'K' ? 'window' : 'aisle'],
          price: 95,
          status: occupiedCodes.has(code) ? 'occupied' : 'available',
        });
      });
    }

    // Zone 2: Premium Economy (Rows 6 to 9) - 2-3-2 layout: A C _ D E F _ H K
    for (let r = 6; r <= 9; r++) {
      const cols = ['A', 'C', 'D', 'E', 'F', 'H', 'K'];
      cols.forEach((col) => {
        const code = `${r}${col}`;
        const isExit = r === 6;
        const features: SeatFeature[] = ['extra-legroom'];
        if (col === 'A' || col === 'K') features.push('window');
        if (col === 'C' || col === 'D' || col === 'F' || col === 'H') features.push('aisle');
        if (isExit) features.push('exit-row');

        seats.push({
          id: `seat-${code}`,
          row: r,
          col,
          code,
          zone: 'premium',
          features,
          price: isExit ? 45 : 35,
          status: occupiedCodes.has(code) ? 'occupied' : 'available',
        });
      });
    }

    // Zone 3: Economy (Rows 12 to 24) - 3-3-3 layout: A B C _ D E F _ H J K
    for (let r = 12; r <= 24; r++) {
      const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K'];
      cols.forEach((col) => {
        const code = `${r}${col}`;
        const isExit = r === 15;
        const isPreferred = r <= 14;
        const features: SeatFeature[] = [];
        if (col === 'A' || col === 'K') features.push('window');
        if (col === 'C' || col === 'D' || col === 'F' || col === 'H') features.push('aisle');
        if (isExit) features.push('exit-row');
        if (isExit || isPreferred) features.push('extra-legroom');

        const price = isExit ? 30 : isPreferred ? 18 : 0;

        seats.push({
          id: `seat-${code}`,
          row: r,
          col,
          code,
          zone: 'economy',
          features,
          price,
          status: occupiedCodes.has(code) ? 'occupied' : 'available',
        });
      });
    }

    return seats;
  }, []);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    if (!activePassenger) return;

    const currentAssignedToActive = selectedSeats[activePassenger.id];

    if (currentAssignedToActive?.code === seat.code) {
      assignSeat(activePassenger.id, null);
    } else {
      assignSeat(activePassenger.id, {
        ...seat,
        status: 'selected',
        assignedPassengerId: activePassenger.id,
      });

      const nextIndex = passengers.findIndex((p, idx) => idx > activePassengerIndex && !selectedSeats[p.id]);
      if (nextIndex !== -1) {
        setActivePassengerIndex(nextIndex);
      }
    }
  };

  const getSeatRenderState = (seat: Seat) => {
    for (const [pid, s] of Object.entries(selectedSeats)) {
      if (s.code === seat.code) {
        if (activePassenger && pid === activePassenger.id) {
          return { state: 'selected-active', passengerId: pid };
        }
        return { state: 'selected-other', passengerId: pid };
      }
    }
    return { state: seat.status, passengerId: null };
  };

  const assignedCount = Object.keys(selectedSeats).length;

  return (
    <div className="space-y-6 text-navy-900">
      {/* Passenger Selection Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-card">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Step 1: Select Traveler to Assign Seat ({assignedCount}/{passengers.length} Assigned)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {passengers.map((passenger, idx) => {
            const assigned = selectedSeats[passenger.id];
            const isActive = idx === activePassengerIndex;
            const displayName =
              passenger.firstName || passenger.lastName
                ? `${passenger.title} ${passenger.firstName} ${passenger.lastName}`
                : `Traveler ${idx + 1} (${passenger.type})`;

            return (
              <button
                key={passenger.id}
                type="button"
                onClick={() => setActivePassengerIndex(idx)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  isActive
                    ? 'border-aviation bg-aviation/5 ring-2 ring-aviation/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive ? 'bg-aviation text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-navy-900 truncate">
                      {displayName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {assigned ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Seat {assigned.code} ({formatCurrency(assigned.price)})
                        </span>
                      ) : (
                        <span className="text-amber-600">No seat assigned yet</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold text-navy-900">
                  {assigned?.code}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend & Seat Info */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-card flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-white border border-slate-300 shadow-sm" />
            <span className="text-slate-700">Standard ($0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-amber-50 border border-amber-300 text-amber-700 text-[10px] flex items-center justify-center font-bold">
              ★
            </div>
            <span className="text-slate-700">Extra Legroom</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-aviation text-white text-[10px] font-bold flex items-center justify-center">
              ✓
            </div>
            <span className="text-navy-900 font-semibold">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-slate-200 border border-slate-300 text-slate-400 text-[10px] flex items-center justify-center">
              ✕
            </div>
            <span className="text-slate-500">Occupied</span>
          </div>
        </div>

        <div className="text-slate-500 text-xs">
          Hover or tap any seat to inspect amenities & fare
        </div>
      </div>

      {/* Top-Down Aircraft Cabin Layout */}
      <div className="bg-slate-100 rounded-3xl p-4 sm:p-8 border border-slate-200/80 flex justify-center overflow-x-auto shadow-inner">
        {/* Fuselage Container */}
        <div className="relative w-[340px] sm:w-[440px] bg-white rounded-t-[120px] rounded-b-3xl border-4 border-slate-300 p-4 pt-12 shadow-floating">
          {/* Cockpit & Nosecone visualization */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-28 h-10 bg-slate-200 rounded-t-full flex items-center justify-center border-t border-slate-300">
            <div className="flex gap-2">
              <div className="w-6 h-3 bg-aviation/40 rounded-t-sm transform -skew-x-12" />
              <div className="w-6 h-3 bg-aviation/40 rounded-t-sm transform skew-x-12" />
            </div>
          </div>

          {/* Front Doors & Galley */}
          <div className="pb-4 pt-4 border-b border-dashed border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-400 px-2">
            <span>EXIT 1L</span>
            <span className="text-slate-400 tracking-widest uppercase">FRONT GALLEY</span>
            <span>EXIT 1R</span>
          </div>

          {/* Business Class Cabin Header */}
          <div className="my-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold tracking-wide border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Business Class Suites (1-2-1)
            </span>
          </div>

          {/* Business Class Grid (Rows 1 to 4) */}
          <div className="space-y-3 mb-6">
            {[1, 2, 3, 4].map((r) => {
              const rowSeats = cabinSeats.filter((s) => s.row === r);
              const seatA = rowSeats.find((s) => s.col === 'A')!;
              const seatD = rowSeats.find((s) => s.col === 'D')!;
              const seatG = rowSeats.find((s) => s.col === 'G')!;
              const seatK = rowSeats.find((s) => s.col === 'K')!;

              return (
                <div key={r} className="flex items-center justify-between gap-1 text-xs">
                  <SeatButton seat={seatA} stateInfo={getSeatRenderState(seatA)} onClick={handleSeatClick} />
                  <div className="w-6 text-center font-bold text-slate-400 text-xs">
                    {r}
                  </div>
                  <div className="flex gap-2">
                    <SeatButton seat={seatD} stateInfo={getSeatRenderState(seatD)} onClick={handleSeatClick} />
                    <SeatButton seat={seatG} stateInfo={getSeatRenderState(seatG)} onClick={handleSeatClick} />
                  </div>
                  <div className="w-6 text-center font-bold text-slate-400 text-xs">
                    {r}
                  </div>
                  <SeatButton seat={seatK} stateInfo={getSeatRenderState(seatK)} onClick={handleSeatClick} />
                </div>
              );
            })}
          </div>

          {/* Restrooms & Galley Divider */}
          <div className="py-2.5 my-4 border-y border-dashed border-slate-200 bg-slate-50 text-[10px] text-slate-400 font-bold flex items-center justify-around rounded-xl">
            <span>LAVATORY</span>
            <span className="text-slate-300">•</span>
            <span>MID GALLEY</span>
            <span className="text-slate-300">•</span>
            <span>LAVATORY</span>
          </div>

          {/* Premium Economy Header */}
          <div className="my-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-aviation/10 text-aviation-dark border border-aviation/20 rounded-full text-xs font-bold tracking-wide">
              Premium Economy (2-3-2)
            </span>
          </div>

          {/* Premium Economy Grid (Rows 6 to 9) */}
          <div className="space-y-2.5 mb-6">
            {[6, 7, 8, 9].map((r) => {
              const rowSeats = cabinSeats.filter((s) => s.row === r);
              return (
                <div key={r} className="flex items-center justify-between gap-1 text-xs">
                  <div className="flex gap-1.5">
                    {['A', 'C'].map((col) => {
                      const s = rowSeats.find((x) => x.col === col)!;
                      return <SeatButton key={col} seat={s} stateInfo={getSeatRenderState(s)} onClick={handleSeatClick} />;
                    })}
                  </div>

                  <div className="w-5 text-center font-bold text-slate-400 text-xs">
                    {r}
                  </div>

                  <div className="flex gap-1.5">
                    {['D', 'E', 'F'].map((col) => {
                      const s = rowSeats.find((x) => x.col === col)!;
                      return <SeatButton key={col} seat={s} stateInfo={getSeatRenderState(s)} onClick={handleSeatClick} />;
                    })}
                  </div>

                  <div className="w-5 text-center font-bold text-slate-400 text-xs">
                    {r}
                  </div>

                  <div className="flex gap-1.5">
                    {['H', 'K'].map((col) => {
                      const s = rowSeats.find((x) => x.col === col)!;
                      return <SeatButton key={col} seat={s} stateInfo={getSeatRenderState(s)} onClick={handleSeatClick} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Emergency Exit Row Divider */}
          <div className="py-2 my-4 bg-amber-50 border-y border-amber-200 text-[10px] text-amber-800 font-bold flex items-center justify-between px-3 rounded-xl">
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-amber-600" />
              EXIT 2L
            </span>
            <span className="text-[10px] uppercase font-semibold">OVERWING EMERGENCY EXITS</span>
            <span className="flex items-center gap-1">
              EXIT 2R
              <ShieldAlert className="w-3 h-3 text-amber-600" />
            </span>
          </div>

          {/* Economy Class Header */}
          <div className="my-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold tracking-wide border border-slate-200">
              Economy Class (3-3-3)
            </span>
          </div>

          {/* Economy Class Grid (Rows 12 to 24) */}
          <div className="space-y-2">
            {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((r) => {
              const rowSeats = cabinSeats.filter((s) => s.row === r);
              return (
                <div key={r} className="flex items-center justify-between gap-1 text-xs">
                  <div className="flex gap-1">
                    {['A', 'B', 'C'].map((col) => {
                      const s = rowSeats.find((x) => x.col === col)!;
                      return <SeatButton key={col} seat={s} stateInfo={getSeatRenderState(s)} onClick={handleSeatClick} compact />;
                    })}
                  </div>

                  <div className="w-4 text-center font-bold text-slate-400 text-[11px]">
                    {r}
                  </div>

                  <div className="flex gap-1">
                    {['D', 'E', 'F'].map((col) => {
                      const s = rowSeats.find((x) => x.col === col)!;
                      return <SeatButton key={col} seat={s} stateInfo={getSeatRenderState(s)} compact onClick={handleSeatClick} />;
                    })}
                  </div>

                  <div className="w-4 text-center font-bold text-slate-400 text-[11px]">
                    {r}
                  </div>

                  <div className="flex gap-1">
                    {['H', 'J', 'K'].map((col) => {
                      const s = rowSeats.find((x) => x.col === col)!;
                      return <SeatButton key={col} seat={s} stateInfo={getSeatRenderState(s)} compact onClick={handleSeatClick} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rear Aft Galley */}
          <div className="mt-8 pt-4 border-t-2 border-slate-200 text-center text-[10px] font-bold text-slate-400">
            AFT GALLEY & REAR EXIT DOORS
          </div>
        </div>
      </div>
    </div>
  );
};

interface SeatButtonProps {
  seat: Seat;
  stateInfo: { state: string; passengerId: string | null };
  onClick: (seat: Seat) => void;
  compact?: boolean;
}

const SeatButton: React.FC<SeatButtonProps> = ({ seat, stateInfo, onClick, compact }) => {
  const isOccupied = stateInfo.state === 'occupied';
  const isSelectedActive = stateInfo.state === 'selected-active';
  const isSelectedOther = stateInfo.state === 'selected-other';
  const isExtraLegroom = seat.features.includes('extra-legroom');

  let styleClasses = 'bg-white border-slate-300 hover:border-aviation text-navy-900 shadow-sm';

  if (isOccupied) {
    styleClasses = 'bg-slate-200 border-transparent text-slate-400 cursor-not-allowed';
  } else if (isSelectedActive) {
    styleClasses = 'bg-aviation border-aviation text-white font-bold shadow-md ring-2 ring-aviation/30';
  } else if (isSelectedOther) {
    styleClasses = 'bg-aviation-light border-aviation text-white font-bold';
  } else if (isExtraLegroom) {
    styleClasses = 'bg-amber-50/70 border-amber-300 text-amber-900 hover:border-amber-500';
  }

  const sizeClass = compact ? 'w-7 h-8 sm:w-8 sm:h-9' : 'w-8 h-9 sm:w-9 sm:h-10';

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={() => onClick(seat)}
      title={`${seat.code} (${seat.zone}) - ${seat.price > 0 ? formatCurrency(seat.price) : 'Complimentary'}`}
      className={`rounded-lg border text-[11px] font-semibold flex flex-col items-center justify-center transition-all ${sizeClass} ${styleClasses}`}
    >
      <span>{seat.code}</span>
      {seat.price > 0 && !isOccupied && !isSelectedActive && !isSelectedOther && (
        <span className="text-[8px] font-bold text-amber-700 -mt-0.5 leading-none">
          +${seat.price}
        </span>
      )}
      {isSelectedActive && (
        <span className="text-[8px] text-white -mt-0.5 font-bold leading-none">
          YOU
        </span>
      )}
    </button>
  );
};
