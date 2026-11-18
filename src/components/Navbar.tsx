import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Menu, X, User, Luggage, Clock, Tag, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Flights', path: '/flights' },
    { name: 'Destinations', path: '/#destinations', isHash: true },
    { name: 'My Trips', path: '/my-trips', icon: Luggage },
    { name: 'Flight Status', path: '/flight-status', icon: Clock },
    { name: 'Offers', path: '/#offers', isHash: true, icon: Tag },
  ];

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.querySelector(hash.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isNavSolid = isScrolled || !isHome || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavSolid
          ? 'bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3.5'
          : 'bg-gradient-to-b from-navy-900/80 via-navy-900/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-aviation rounded-lg p-1"
            aria-label="SkyVoyage Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aviation to-aviation-dark border border-gold/40 flex items-center justify-center text-gold-light shadow-md shadow-aviation/40 group-hover:scale-105 transition-transform">
              <svg
                className="w-6 h-6 transform -rotate-45"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-display flex items-center gap-1">
                Sky<span className="text-gold font-extrabold">Voyage</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-300 font-medium -mt-1">
                Commercial Airlines
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleHashClick(e, link.path)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
                  >
                    {link.icon && <link.icon className="w-4 h-4 opacity-70" />}
                    {link.name}
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-white/15 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4 opacity-70" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA / Auth controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 bg-white/10 rounded-full pl-3 pr-1.5 py-1 text-sm text-white border border-white/15">
                <span className="flex items-center gap-1.5 text-xs font-medium text-sky-brand">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {user?.frequentFlyerTier} Tier
                </span>
                <span className="text-xs font-semibold text-slate-200 border-l border-white/20 pl-2">
                  {user?.name.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1 hover:bg-white/20 rounded-full text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 rounded-lg hover:bg-white/10"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <button
              onClick={() => navigate('/flights')}
              className="px-4 py-2 bg-aviation hover:bg-aviation-hover text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-aviation/40 transition-all flex items-center gap-2 group active:scale-95"
            >
              <Plane className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
              <span>Book a Flight</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-aviation"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-b border-white/10 px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => {
                      handleHashClick(e, link.path);
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2.5">
                      {link.icon && <link.icon className="w-5 h-5 text-aviation-light" />}
                      {link.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive ? 'bg-aviation text-white' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {link.icon && <link.icon className="w-5 h-5" />}
                    {link.name}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <div className="flex items-center justify-between px-3 py-2 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-sm font-semibold text-white">{user?.name}</div>
                    <div className="text-xs text-sky-brand">{user?.frequentFlyerTier} Member</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-medium text-slate-200 bg-white/5 rounded-lg hover:bg-white/10"
                >
                  Sign In / Register
                </Link>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/flights');
                }}
                className="w-full py-3 bg-aviation text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <Plane className="w-4 h-4" />
                Book a Flight
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
