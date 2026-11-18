import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Phone, Shield, ArrowLeft, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { BookingSummarySidebar } from '../components/BookingSummarySidebar';
import { isValidEmail, isValidPhone } from '../utils/validation';

export const PassengerDetails: React.FC = () => {
  const navigate = useNavigate();
  const { passengers, updatePassenger, selectedFlight } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!selectedFlight) {
    return (
      <div className="min-h-screen bg-cloud text-navy-900 pt-32 pb-20 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-card">
          <p className="text-slate-600 mb-4">Please select a flight to proceed with booking.</p>
          <button
            onClick={() => navigate('/flights')}
            className="px-5 py-2.5 bg-aviation text-white hover:bg-aviation-dark rounded-xl font-semibold text-xs transition-colors"
          >
            Browse Flights
          </button>
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    passengers.forEach((p, idx) => {
      if (!p.firstName.trim()) {
        errs[`p_${idx}_firstName`] = 'First name is required';
      }
      if (!p.lastName.trim()) {
        errs[`p_${idx}_lastName`] = 'Last name is required';
      }
      if (!p.dateOfBirth) {
        errs[`p_${idx}_dob`] = 'Date of birth is required';
      }

      if (idx === 0) {
        if (!p.email.trim()) {
          errs['email'] = 'Contact email is required';
        } else if (!isValidEmail(p.email)) {
          errs['email'] = 'Please provide a valid email address';
        }

        if (!p.phone.trim()) {
          errs['phone'] = 'Mobile phone number is required';
        } else if (!isValidPhone(p.phone)) {
          errs['phone'] = 'Please enter a valid telephone number';
        }
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigate('/seats');
    }
  };

  const handlePreFillDemo = () => {
    updatePassenger(0, {
      title: 'Mr',
      firstName: 'Alexander',
      lastName: 'Sterling',
      dateOfBirth: '1990-08-15',
      nationality: 'India',
      passportNumber: 'Z8921472',
      email: 'alexander.sterling@example.com',
      phone: '+91 98450 12345',
      frequentFlyer: 'SV-PLAT-9021',
    });

    if (passengers.length > 1) {
      updatePassenger(1, {
        title: 'Ms',
        firstName: 'Elena',
        lastName: 'Sterling',
        dateOfBirth: '1992-04-20',
        nationality: 'India',
        passportNumber: 'Z8921473',
      });
    }

    if (passengers.length > 2) {
      updatePassenger(2, {
        title: 'Master',
        firstName: 'Leo',
        lastName: 'Sterling',
        dateOfBirth: '2019-11-10',
        nationality: 'India',
      });
    }

    setErrors({});
  };

  return (
    <div className="min-h-screen bg-cloud text-navy-900 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-aviation mb-1">
              Step 1 of 4 • Booking Journey
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
              Traveler Information
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePreFillDemo}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-navy-900 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-aviation" />
              <span>Pre-fill Demo Passenger</span>
            </button>
            <button
              onClick={() => navigate(`/flight/${selectedFlight.id}`)}
              className="text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors flex items-center gap-1 px-3 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Fields */}
          <div className="lg:col-span-8 space-y-6">
            {passengers.map((passenger, idx) => (
              <div
                key={passenger.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-card space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-aviation/10 text-aviation flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 text-sm">
                        Traveler {idx + 1}{' '}
                        <span className="capitalize text-slate-500 font-normal">
                          ({passenger.type})
                        </span>
                      </h3>
                      <div className="text-[11px] text-slate-500">
                        {idx === 0 ? 'Primary Passenger & Booking Contact' : 'Additional Traveler'}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Seat Required
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Title */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Title *
                    </label>
                    <select
                      value={passenger.title}
                      onChange={(e) => updatePassenger(idx, { title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                      <option value="Master">Master</option>
                    </select>
                  </div>

                  {/* First Name */}
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      First / Given Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John"
                      value={passenger.firstName}
                      onChange={(e) => {
                        updatePassenger(idx, { firstName: e.target.value });
                        if (errors[`p_${idx}_firstName`]) {
                          setErrors({ ...errors, [`p_${idx}_firstName`]: '' });
                        }
                      }}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation ${
                        errors[`p_${idx}_firstName`] ? 'border-rose-400 ring-2 ring-rose-500/20' : 'border-slate-200'
                      }`}
                    />
                    {errors[`p_${idx}_firstName`] && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {errors[`p_${idx}_firstName`]}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Last / Surname *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sterling"
                      value={passenger.lastName}
                      onChange={(e) => {
                        updatePassenger(idx, { lastName: e.target.value });
                        if (errors[`p_${idx}_lastName`]) {
                          setErrors({ ...errors, [`p_${idx}_lastName`]: '' });
                        }
                      }}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation ${
                        errors[`p_${idx}_lastName`] ? 'border-rose-400 ring-2 ring-rose-500/20' : 'border-slate-200'
                      }`}
                    />
                    {errors[`p_${idx}_lastName`] && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {errors[`p_${idx}_lastName`]}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) => {
                        updatePassenger(idx, { dateOfBirth: e.target.value });
                        if (errors[`p_${idx}_dob`]) {
                          setErrors({ ...errors, [`p_${idx}_dob`]: '' });
                        }
                      }}
                      className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation ${
                        errors[`p_${idx}_dob`] ? 'border-rose-400 ring-2 ring-rose-500/20' : 'border-slate-200'
                      }`}
                    />
                    {errors[`p_${idx}_dob`] && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {errors[`p_${idx}_dob`]}
                      </p>
                    )}
                  </div>

                  {/* Nationality */}
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nationality *
                    </label>
                    <select
                      value={passenger.nationality}
                      onChange={(e) => updatePassenger(idx, { nationality: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                    >
                      <option value="India">India</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="Germany">Germany</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>

                  {/* Passport / ID */}
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Passport / ID Number (Demo)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Z8921472"
                      value={passenger.passportNumber || ''}
                      onChange={(e) => updatePassenger(idx, { passportNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                    />
                  </div>
                </div>

                {/* Primary Passenger Contact Fields */}
                {idx === 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                    <div className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-aviation" />
                      Contact & Itinerary Dispatch Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Email Address (E-Ticket Dispatch) *
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. yourname@example.com"
                          value={passenger.email}
                          onChange={(e) => {
                            updatePassenger(0, { email: e.target.value });
                            if (errors['email']) setErrors({ ...errors, email: '' });
                          }}
                          className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation ${
                            errors['email'] ? 'border-rose-400 ring-2 ring-rose-500/20' : 'border-slate-200'
                          }`}
                        />
                        {errors['email'] && (
                          <p className="text-[11px] text-rose-500 font-medium mt-1">
                            {errors['email']}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Mobile Phone (Flight SMS Alerts) *
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={passenger.phone}
                          onChange={(e) => {
                            updatePassenger(0, { phone: e.target.value });
                            if (errors['phone']) setErrors({ ...errors, phone: '' });
                          }}
                          className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation ${
                            errors['phone'] ? 'border-rose-400 ring-2 ring-rose-500/20' : 'border-slate-200'
                          }`}
                        />
                        {errors['phone'] && (
                          <p className="text-[11px] text-rose-500 font-medium mt-1">
                            {errors['phone']}
                          </p>
                        )}
                      </div>

                      {/* Frequent Flyer */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                          Frequent Flyer / Airline Loyalty # (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. EK-982142 or SV-GOLD-55"
                          value={passenger.frequentFlyer || ''}
                          onChange={(e) => updatePassenger(0, { frequentFlyer: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-navy-900 focus:outline-none focus:ring-2 focus:ring-aviation"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-start gap-2 border border-slate-200/80">
              <Shield className="w-4 h-4 text-aviation flex-shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Promise:</strong> All passenger data entered here is stored strictly in your browser session for this demonstration and is never shared or transmitted.
              </span>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4">
            <BookingSummarySidebar
              currentStep="Passengers"
              nextStepTitle="Proceed to Seat Selection"
              onNext={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
