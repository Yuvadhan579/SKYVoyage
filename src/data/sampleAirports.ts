import { Airport } from '../types/flight';

export const SAMPLE_AIRPORTS: Airport[] = [
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'United Arab Emirates' },
  { code: 'SIN', city: 'Singapore', name: 'Singapore Changi Airport', country: 'Singapore' },
  { code: 'LHR', city: 'London', name: 'London Heathrow Airport', country: 'United Kingdom' },
  { code: 'CDG', city: 'Paris', name: 'Paris Charles de Gaulle Airport', country: 'France' },
  { code: 'HND', city: 'Tokyo', name: 'Tokyo Haneda Airport', country: 'Japan' },
  { code: 'NRT', city: 'Tokyo', name: 'Tokyo Narita Airport', country: 'Japan' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International Airport', country: 'India' },
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', country: 'India' },
  { code: 'GOI', city: 'Goa', name: 'Goa Dabolim International Airport', country: 'India' },
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International Airport', country: 'India' },
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International Airport', country: 'United States' },
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco International Airport', country: 'United States' },
  { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith Airport', country: 'Australia' },
  { code: 'DOH', city: 'Doha', name: 'Hamad International Airport', country: 'Qatar' },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt am Main Airport', country: 'Germany' },
];

export function findAirport(codeOrCity: string): Airport | undefined {
  const query = codeOrCity.toLowerCase().trim();
  return SAMPLE_AIRPORTS.find(
    a => a.code.toLowerCase() === query ||
         a.city.toLowerCase() === query ||
         a.name.toLowerCase().includes(query)
  );
}
