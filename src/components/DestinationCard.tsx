import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, ArrowUpRight } from 'lucide-react';
import { Destination } from '../data/destinations';
import { ImageWithFallback } from './ImageWithFallback';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/fareCalculator';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const navigate = useNavigate();
  const { preselectDestination } = useBooking();

  const handleExplore = () => {
    preselectDestination(destination.airportCode);
    navigate('/flights');
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-floating border border-slate-200/80 hover:border-aviation/40 transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Real Destination Photograph with Zoom on Hover */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <ImageWithFallback
          src={destination.image}
          alt={`Authentic photograph of ${destination.city}, ${destination.country}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Subtle dark gradient overlay on bottom of image for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/30 to-transparent" />

        {/* Airport Code Pill */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-md text-white border border-white/20 text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-sm">
          <Plane className="w-3 h-3 text-sky-brand" />
          <span>{destination.airportCode}</span>
        </div>

        {/* Tag Pill */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy-900 text-[11px] font-semibold shadow-sm">
          {destination.tag}
        </div>

        {/* City and Country over Image */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-xl font-bold font-display tracking-tight text-white leading-tight">
            {destination.city}
          </h3>
          <p className="text-xs text-slate-200 font-medium">{destination.country}</p>
        </div>
      </div>

      {/* Card Content & Action */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {destination.description}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
              Sample Demonstration Fare
            </div>
            <div className="text-base font-extrabold text-navy-900">
              {formatCurrency(destination.startingFare, destination.currency)}{' '}
              <span className="text-xs font-normal text-slate-600">one way</span>
            </div>
          </div>

          <button
            onClick={handleExplore}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-aviation hover:text-white text-navy-900 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm group-hover:bg-aviation group-hover:text-white"
            aria-label={`Explore flights to ${destination.city}`}
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
