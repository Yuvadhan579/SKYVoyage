import React, { useState } from 'react';
import { Sparkles, Utensils, Wifi, Tv, BedDouble, Check } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { CabinClass } from '../types/flight';

interface CabinTier {
  id: CabinClass;
  title: string;
  tagline: string;
  image: string;
  description: string;
  pitch: string;
  recline: string;
  dining: string;
  entertainment: string;
  amenities: string[];
}

const CABIN_TIERS: CabinTier[] = [
  {
    id: 'First Class',
    title: 'Private First Class Suites',
    tagline: 'The pinnacle of private luxury at 40,000 feet',
    image: '/images/cabin-first.jpg',
    description: 'Enclosed private sanctuary with sliding privacy doors, motorized leather seat that transforms into a fully flat bed with memory foam mattress, personalized minibar, and on-demand fine caviar dining.',
    pitch: '78 to 82 inches',
    recline: '180° Full Flat Bed',
    dining: 'Dine-on-demand multi-course chef menus & vintage champagnes',
    entertainment: '32-inch 4K touchscreen with noise-canceling headphones',
    amenities: ['Sliding Privacy Suite Doors', 'Complimentary High-Speed Wi-Fi', 'Luxury Designer Amenity Kit', 'Priority Chauffeur Transfer (Demo)', 'Onboard Shower Spa Access']
  },
  {
    id: 'Business',
    title: 'Business Class Lie-Flat Sanctuary',
    tagline: 'Refined comfort and seamless productivity',
    image: '/images/cabin-business.jpg',
    description: 'Direct aisle access for every traveler in a 1-2-1 layout. Ergonomically sculpted suites that convert into full-length horizontal beds with luxurious duvet and soft linens.',
    pitch: '60 to 76 inches',
    recline: '180° Lie-Flat Bed',
    dining: 'Three-course artisan dining with sommelier-curated wine pairing',
    entertainment: '18-inch HD monitor with 2,000+ movies & live satellite TV',
    amenities: ['Direct Aisle Access (1-2-1)', 'Universal AC & High-Power USB-C', 'Bvlgari / Diptyque Care Pack', 'Dedicated Airport Lounge Access', '40 kg Baggage Allowance']
  },
  {
    id: 'Premium Economy',
    title: 'Premium Economy Experience',
    tagline: 'Generous legroom and elevated dining',
    image: '/images/cabin-premium.jpg',
    description: 'A dedicated quiet cabin offering wider leather seats, generous legroom with calf and footrests, larger personal entertainment screens, and premium plated meals served on chinaware.',
    pitch: '38 to 40 inches',
    recline: '8 inches recline with calf rest',
    dining: 'Upgraded multi-course meals with complimentary wine & spirits',
    entertainment: '13.3-inch HD touch display with Bluetooth audio pairing',
    amenities: ['38-inch Extra Legroom Pitch', 'Priority Check-in & Boarding', 'Plated Gourmet Dining', 'Adjustable Leather Headrest', '2x 23 kg Checked Baggage']
  },
  {
    id: 'Economy',
    title: 'Smart Modern Economy',
    tagline: 'Thoughtful ergonomic design for every journey',
    image: '/images/cabin-economy.jpg',
    description: 'Contoured ergonomic seating with 6-way adjustable headrests, personal seatback entertainment screens, in-seat USB charging ports, and warm complimentary meal service.',
    pitch: '31 to 33 inches',
    recline: '5 inches comfortable recline',
    dining: 'Complimentary hot meal, snacks, and complimentary soft beverages',
    entertainment: '10.6-inch touchscreen with movies, music, and interactive 3D map',
    amenities: ['Ergonomic 6-way Headrest', 'In-seat Power & USB Port', 'Complimentary Warm Meals', 'Generous Overhead Bin Space', 'Complimentary Seatback IFE']
  }
];

export const CabinShowcase: React.FC = () => {
  const [selectedCabin, setSelectedCabin] = useState<CabinClass>('Business');

  const activeTier = CABIN_TIERS.find(c => c.id === selectedCabin) || CABIN_TIERS[1];

  return (
    <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aviation/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-sky-brand text-xs font-bold tracking-wider uppercase border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Authentic Cabin Interiors
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Experience Flight Redefined
          </h2>
          <p className="text-slate-300 text-base">
            From seamless modern Economy to world-renowned First Class private suites, discover real commercial aircraft cabins designed for maximum comfort.
          </p>
        </div>

        {/* Cabin Switcher Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-navy-800 rounded-2xl border border-white/10">
            {CABIN_TIERS.map(tier => {
              const isSelected = tier.id === selectedCabin;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedCabin(tier.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-aviation text-white shadow-lg shadow-aviation/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tier.title.split(' ')[0]} {tier.id === 'First Class' ? 'First Class' : tier.id === 'Premium Economy' ? 'Premium Economy' : tier.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Cabin Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-navy-800/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-floating">
          {/* Left: Authentic Cabin Photograph */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-72 sm:h-96 w-full border border-white/10">
              <ImageWithFallback
                src={activeTier.image}
                alt={`Authentic photograph of commercial airline ${activeTier.title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-bold text-white">
                Authentic Aircraft Interior Photography
              </div>
            </div>
          </div>

          {/* Right: Cabin Specs & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">
                {activeTier.id} Experience
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                {activeTier.title}
              </h3>
              <p className="text-xs text-sky-brand font-medium mt-1">
                {activeTier.tagline}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeTier.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-navy-900/70 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Seat Pitch / Bed</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeTier.pitch}</div>
              </div>
              <div className="bg-navy-900/70 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Seat Recline</div>
                <div className="text-xs font-bold text-white mt-0.5">{activeTier.recline}</div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-200">Signature Amenities:</div>
              <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                {activeTier.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
