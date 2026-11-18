import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plane, Lock, Mail, Eye, EyeOff, User, Sparkles, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { isValidEmail } from '../utils/validation';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginDemoUser, isAuthenticated, user, logout } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isValidEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (isRegisterMode && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    try {
      await login(email, password, isRegisterMode ? name : undefined);
      setSuccessMsg(isRegisterMode ? 'Account created successfully! Redirecting...' : 'Signed in successfully! Redirecting...');
      setTimeout(() => navigate('/'), 600);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Unable to sign in. Please try again.');
    }
  };

  const handleDemoSignIn = async () => {
    setErrorMsg('');
    try {
      await loginDemoUser();
      setSuccessMsg('Demonstration Captain profile loaded!');
      setTimeout(() => navigate('/'), 600);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Unable to load demo account.');
    }
  };

  return (
    <div className="min-h-screen bg-cloud pt-20 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-slate-200 shadow-floating overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Authentic Aviation Imagery & Loyalty Perks */}
        <div className="md:col-span-5 bg-navy-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <ImageWithFallback
              src="/images/cabin-first.jpg"
              alt="Luxury First Class Airline Cabin"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
          </div>

          <div className="relative z-10 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-aviation flex items-center justify-center text-white">
                <Plane className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="text-xl font-bold font-display">SkyVoyage</span>
            </Link>

            <h2 className="text-2xl font-extrabold font-display leading-tight pt-4">
              Fly Elevated with SkyVoyage Miles
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Earn tier status points on every flight, unlock complimentary lounge access, and enjoy priority boarding across our global network.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Earn 5x miles on First & Business flights</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-aviation-light" />
              <span>Complimentary seat selection for Gold members</span>
            </div>
          </div>
        </div>

        {/* Right Side: Sign-in / Register Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Header / Tabs */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-extrabold text-navy-900 font-display">
                  {isRegisterMode ? 'Create SkyVoyage Account' : 'Welcome to SkyVoyage'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRegisterMode ? 'Join our frequent flyer program' : 'Access your reservations and miles'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrorMsg('');
                }}
                className="text-xs font-bold text-aviation hover:underline"
              >
                {isRegisterMode ? 'Sign In' : 'Register'}
              </button>
            </div>

            {/* Quick Demo Pre-fill Button */}
            <div className="my-5 p-3 bg-aviation/5 border border-aviation/20 rounded-2xl flex items-center justify-between">
              <div className="text-xs text-navy-900">
                <span className="font-bold block">Testing the Prototype?</span>
                <span className="text-[11px] text-slate-500">Sign in with our sample Captain profile</span>
              </div>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="px-3.5 py-1.5 bg-aviation hover:bg-aviation-hover text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>One-Click Demo</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Captain Julian Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="e.g. traveler@skyvoyage.internal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  {!isRegisterMode && (
                    <span className="text-[11px] text-aviation hover:underline cursor-pointer">
                      Forgot Password?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-aviation border-slate-300 focus:ring-aviation"
                  />
                  <span className="text-slate-600">Remember this device</span>
                </label>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-aviation hover:bg-aviation-hover text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              >
                {isRegisterMode ? 'Create Account' : 'Sign In to SkyVoyage'}
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400">
            Accounts and reservations are stored in the project SQLite database.
          </div>
        </div>
      </div>
    </div>
  );
};
