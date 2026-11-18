import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Mail, Phone, MapPin, ShieldAlert, ArrowUp, Globe, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-900 text-slate-400 text-xs border-t border-white/10">
      {/* Top Banner: Real Photography Notice & Demonstration Disclaimer */}
      <div className="bg-navy-800/90 border-b border-white/10 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldAlert className="w-4 h-4 text-gold flex-shrink-0" />
            <span>
              <strong>Demonstration System Notice:</strong> SkyVoyage is an interactive airline booking demonstration. All flight numbers, schedules, fares, and PNR references are simulated demonstration data.
            </span>
          </div>
          <div className="flex items-center gap-2 text-sky-brand font-medium">
            <Award className="w-4 h-4 text-aviation-light" />
            <span>100% Authentic Aviation & Destination Photography</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-aviation flex items-center justify-center text-white shadow-md shadow-aviation/30">
                <svg className="w-5 h-5 transform -rotate-45" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Sky<span className="text-sky-brand">Voyage</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              SkyVoyage is a next-generation commercial airline flight booking demonstration website built with precision engineering, authentic aviation photography, and an interactive reservation journey.
            </p>

            <div className="space-y-1.5 pt-1 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-aviation-light" />
                <span>SkyVoyage Aviation Center, International Terminal Road</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-aviation-light" />
                <span>24/7 Global Concierge: +1 (800) 555-SKYY</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-aviation-light" />
                <span>support@skyvoyage.internal (Demonstration Inquiries)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 font-display">Book & Plan</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Search All Flights
                </Link>
              </li>
              <li>
                <a href="/#destinations" className="hover:text-white transition-colors">
                  Popular Destinations
                </a>
              </li>
              <li>
                <Link to="/flight-status" className="hover:text-white transition-colors">
                  Live Flight Status
                </Link>
              </li>
              <li>
                <a href="/#offers" className="hover:text-white transition-colors">
                  Featured Offers & Deals
                </a>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-white transition-colors">
                  Manage Booking (PNR Lookup)
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 font-display">Popular Hubs</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Dubai (DXB) Flights
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Singapore (SIN) Flights
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  London Heathrow (LHR)
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Tokyo Haneda (HND)
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Bengaluru (BLR) Hub
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-white transition-colors">
                  Mumbai (BOM) Flights
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 font-display">Assistance & Rules</h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white cursor-pointer">Baggage Allowance Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Fare Rules & Cancellations</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Special Meal Requests</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Wheelchair & Mobility Access</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Privacy & Cookie Terms</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Demonstration Terms of Use</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-center sm:text-left text-xs">
            © {new Date().getFullYear()} SkyVoyage Airlines Prototype. All rights reserved. Developed as a high-fidelity frontend engineering project.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors text-xs"
            aria-label="Scroll to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
