import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { FlightDetails } from './pages/FlightDetails';
import { PassengerDetails } from './pages/PassengerDetails';
import { SeatSelection } from './pages/SeatSelection';
import { AddOns } from './pages/AddOns';
import { BookingReview } from './pages/BookingReview';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { MyTrips } from './pages/MyTrips';
import { FlightStatus } from './pages/FlightStatus';
import { Login } from './pages/Login';

// Automatically scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<SearchResults />} />
                <Route path="/flight/:id" element={<FlightDetails />} />
                <Route path="/passengers" element={<PassengerDetails />} />
                <Route path="/seats" element={<SeatSelection />} />
                <Route path="/addons" element={<AddOns />} />
                <Route path="/booking-review" element={<BookingReview />} />
                <Route path="/confirmation" element={<BookingConfirmation />} />
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/flight-status" element={<FlightStatus />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
