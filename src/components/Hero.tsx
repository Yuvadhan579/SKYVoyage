import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Compass, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { FlightSearch } from './FlightSearch';
import { ImageWithFallback } from './ImageWithFallback';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-16 bg-navy-900 overflow-hidden">
      {/* Background authentic commercial airliner photograph */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/hero-plane.jpg"
          fallbackSrc="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80"
          alt="Commercial passenger aircraft flying above cloud deck in blue skies"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic dark gradients to guarantee text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/40" />
      </div>

      {/* Floating hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 pb-12">
          {/* Main Headline & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Airline Route Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-950/70 backdrop-blur-md border border-gold/30 text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                Commercial Airline Booking
              </span>
              <span className="text-xs text-slate-300 border-l border-white/20 pl-2">
                150+ Global Routes
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
              Your Journey <br />
              <span className="bg-gradient-to-r from-[#FFFFFF] via-sky-brand to-gold bg-clip-text text-transparent">
                Begins in the Sky.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed">
              Discover destinations, compare fares, and book your next adventure with ease. Experience world-class service aboard modern commercial fleets.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/flights')}
                className="px-6 py-3.5 bg-aviation hover:bg-aviation-hover text-white text-base font-bold rounded-xl shadow-lg shadow-aviation/40 border border-gold/25 transition-all flex items-center gap-2.5 group active:scale-95"
              >
                <span>Explore Flights</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToDestinations}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-base font-semibold rounded-xl backdrop-blur-md border border-gold/30 transition-all flex items-center gap-2 active:scale-95"
              >
                <Compass className="w-4 h-4 text-gold" />
                <span>Discover Destinations</span>
              </button>
            </div>

            {/* Value Props Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg border-t border-white/15">
              <div className="flex items-center gap-2 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-xs font-medium">Guaranteed Best Rates</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-xs font-medium">Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Award className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-xs font-medium">Award-winning Fleet</span>
              </div>
            </div>
          </div>

          {/* Right Floating Flight Info Card */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-navy-900/85 backdrop-blur-xl border border-gold/30 rounded-2xl p-5 text-white shadow-floating transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-aviation flex items-center justify-center text-white shadow-sm">
                    <Plane className="w-4 h-4 text-gold-light" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gold">
                      Featured Route
                    </div>
                    <div className="text-xs text-slate-300">SkyVoyage Flagship</div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Daily Direct
                </span>
              </div>

              {/* Route Display */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold font-display">BLR</div>
                  <div className="text-xs text-slate-300">Bengaluru</div>
                  <div className="text-xs text-slate-400 mt-1">04:30 AM</div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
                    4h 15m
                  </span>
                  <div className="relative w-24 my-1.5 flex items-center">
                    <div className="h-0.5 w-full bg-white/20" />
                    <Plane className="w-4 h-4 text-aviation-light absolute left-1/2 -translate-x-1/2 transform rotate-90" />
                  </div>
                  <span className="text-[10px] text-sky-brand font-medium">
                    Boeing 777-300ER
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-extrabold font-display">DXB</div>
                  <div className="text-xs text-slate-300">Dubai</div>
                  <div className="text-xs text-slate-400 mt-1">07:15 AM</div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-400">Sample Fare From</div>
                  <div className="text-xl font-bold text-sky-brand">
                    $340 <span className="text-xs text-slate-300 font-normal">/ person</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/flights')}
                  className="px-3.5 py-1.5 bg-aviation hover:bg-aviation-hover text-white text-xs font-bold rounded-lg transition-colors"
                >
                  View Flights
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search Panel Overlapping Hero */}
        <div className="pt-2 pb-2">
          <FlightSearch />
        </div>
      </div>
    </section>
  );
};
