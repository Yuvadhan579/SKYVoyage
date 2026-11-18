import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Headphones,
  CalendarCheck,
  ChevronDown,
  Sparkles,
  Plane,
  ArrowRight,
  Send,
  Smartphone,
  CheckCircle,
  Star,
  Compass,
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { DestinationCard } from '../components/DestinationCard';
import { FlightCard } from '../components/FlightCard';
import { CabinShowcase } from '../components/CabinShowcase';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { POPULAR_DESTINATIONS } from '../data/destinations';
import { SAMPLE_FLIGHTS } from '../data/sampleFlights';
import { FAQ_DATA, TESTIMONIALS } from '../data/faqs';
import { isValidEmail } from '../utils/validation';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterMsg, setNewsletterMsg] = useState('');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Featured flights
  const featuredFlights = SAMPLE_FLIGHTS.slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterMsg('Please enter a valid email address.');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterMsg('Thank you for subscribing! Demonstration fare alerts have been enabled.');
    setNewsletterEmail('');
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900">
      {/* 1. Cinematic Aircraft Hero Section with Floating Search */}
      <Hero />

      {/* 2. Popular Destinations Section */}
      <section id="destinations" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aviation/10 text-aviation text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Global Flight Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight font-display">
              Where Will You Fly Next?
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Authentic world skylines and coastal retreats. Select any destination to preview scheduled demonstration flights.
            </p>
          </div>

          <button
            onClick={() => navigate('/flights')}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:border-navy-900 text-navy-900 text-xs font-semibold flex items-center gap-1.5 transition-all bg-white hover:bg-slate-50 shadow-sm self-start md:self-auto"
          >
            <span>View All Routes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 3. Featured Offers / Flight Deals */}
      <section id="offers" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2.5 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Flight Values</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight font-display">
                Flights Worth Taking
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Believable sample routes aboard world-class airlines including Emirates, Qatar Airways, Singapore Airlines, and Air India.
              </p>
            </div>

            <button
              onClick={() => navigate('/flights')}
              className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-sm self-start md:self-auto"
            >
              <span>Explore All Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {featuredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Real Cabin Class Showcase */}
      <CabinShowcase />

      {/* 5. Why Choose SkyVoyage? */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aviation/10 text-aviation text-xs font-semibold uppercase tracking-wider">
            SkyVoyage Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight font-display">
            Why Choose SkyVoyage?
          </h2>
          <p className="text-slate-600 text-sm">
            Engineered with modern aviation booking clarity, uncompromising transparency, and exceptional passenger care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-card hover:shadow-floating transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-aviation/10 text-aviation flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base font-display">
              Transparent Pricing
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No hidden fees or unexpected checkout surprises. Every fare clearly breaks down base ticket costs, government surcharges, and optional baggage.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-card hover:shadow-floating transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base font-display">
              Flexible Travel Options
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Easily rebook, change dates, or choose refundable fares. Enjoy peace of mind with instant self-service management in My Trips.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-card hover:shadow-floating transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-aviation/10 text-aviation flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base font-display">
              Easy & Secure Booking
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Streamlined multi-step booking journey with instant mock PNR issuance, e-ticket downloads, and seat reservations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-card hover:shadow-floating transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-navy-900 text-base font-display">
              24/7 Global Support
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our concierge team and live flight tracking dashboard keep you informed at every milestone from check-in to touchdown.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Travel Inspiration / Aviation Photography Showcase */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-brand text-xs font-semibold">
                <Plane className="w-3.5 h-3.5" />
                <span>Aviation in Motion</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Authentic Photography from Across the Skies
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                We believe in genuine aviation artistry. Every image on SkyVoyage represents a real commercial airliner in flight, on the apron, or cruising at altitude.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/flights')}
                  className="px-5 py-2.5 bg-aviation hover:bg-aviation-dark text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-aviation/30"
                >
                  <span>Book Your Next Flight</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Photo Collage */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 sm:h-56 rounded-2xl overflow-hidden shadow-card border border-white/10">
                  <ImageWithFallback
                    src="/images/promo-sunset-wing.jpg"
                    alt="Airliner wing flying through golden hour sunset"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-48 sm:h-56 rounded-2xl overflow-hidden shadow-card border border-white/10">
                  <ImageWithFallback
                    src="/images/aircraft-takeoff.jpg"
                    alt="Commercial passenger aircraft taking off"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="h-48 sm:h-56 rounded-2xl overflow-hidden shadow-card border border-white/10">
                  <ImageWithFallback
                    src="/images/aircraft-gate.jpg"
                    alt="Commercial jet airliner parked at boarding gate"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-48 sm:h-56 rounded-2xl overflow-hidden shadow-card border border-white/10">
                  <ImageWithFallback
                    src="/images/promo-window-view.jpg"
                    alt="Scenic window view over mountains and clouds"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Passenger Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-aviation">
            Traveler Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display">
            Loved by Travelers Worldwide
          </h2>
          <p className="text-xs text-slate-500 italic">
            *Demonstration feedback simulated for product preview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-card flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-aviation text-white text-xs font-bold flex items-center justify-center">
                    {t.avatarText}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-navy-900">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Accordion Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl font-extrabold text-navy-900 font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs">
              Everything you need to know about booking, fare rules, and this demonstration portal.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200/80 bg-white rounded-xl overflow-hidden shadow-sm transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-bold text-navy-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'transform rotate-180 text-aviation' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Mobile App Promotion & Newsletter Section */}
      <section className="py-20 bg-cloud border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* App Promotion Card */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-2xl p-8 sm:p-10 shadow-card flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-brand text-xs font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>SkyVoyage Mobile App</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                  Your Boarding Pass in Your Pocket
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  Track live gates, receive real-time baggage carousel alerts, and access offline boarding passes seamlessly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 relative z-10">
                <button
                  type="button"
                  onClick={() => alert('Demonstration: iOS app download')}
                  className="px-4 py-2.5 bg-white text-navy-900 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  App Store (Demo)
                </button>
                <button
                  type="button"
                  onClick={() => alert('Demonstration: Google Play app download')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors border border-white/20"
                >
                  Google Play (Demo)
                </button>
              </div>
            </div>

            {/* Newsletter Subscription Card */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-card flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-aviation">
                  Fare Drop Alerts
                </div>
                <h3 className="text-2xl font-extrabold text-navy-900 font-display">
                  Subscribe to Special Offers
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Be the first to know when seasonal promotional fares launch for Dubai, Singapore, Tokyo, and London.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-aviation hover:bg-aviation-dark text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {newsletterStatus === 'success' && (
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{newsletterMsg}</span>
                  </p>
                )}

                {newsletterStatus === 'error' && (
                  <p className="text-xs text-rose-600 font-medium">
                    {newsletterMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
