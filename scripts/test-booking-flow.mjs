import { SAMPLE_AIRPORTS, findAirport } from '../src/data/sampleAirports.ts';
import { SAMPLE_FLIGHTS, searchFlights } from '../src/data/sampleFlights.ts';
import { calculateFare } from '../src/utils/fareCalculator.ts';
import { generatePNR } from '../src/utils/formatters.ts';
import { isValidEmail, isValidPhone, isPastDate } from '../src/utils/validation.ts';

function runTests() {
  console.log('=== STARTING COMPLETE SKYVOYAGE FUNCTIONALITY TESTS ===\n');

  // Test 1: Airports
  console.log('Test 1: Airport Autocomplete & Lookups');
  const dxb = findAirport('DXB');
  const blr = findAirport('blr');
  const london = findAirport('London');
  if (!dxb || !blr || !london) throw new Error('Airport lookup failed');
  console.log(`✓ Successfully found airports: ${dxb.name}, ${blr.name}, ${london.name}`);

  // Test 2: Flights search & filters
  console.log('\nTest 2: Flight Search & Filtering');
  const allFlights = searchFlights({});
  console.log(`✓ Total flights in system: ${allFlights.length}`);

  const dxbFlights = searchFlights({ originCode: 'BLR', destCode: 'DXB' });
  if (dxbFlights.length === 0) throw new Error('BLR to DXB flight search returned empty');
  console.log(`✓ BLR to DXB search found ${dxbFlights.length} flights`);

  const businessFlights = searchFlights({ originCode: 'BLR', cabinClass: 'Business' });
  if (businessFlights.length === 0) throw new Error('Business class search returned empty');
  console.log(`✓ Business class search found ${businessFlights.length} flights`);

  const nonStopFlights = searchFlights({ stops: 0 });
  console.log(`✓ Non-stop flights count: ${nonStopFlights.length}`);

  // Test 3: Sorting
  console.log('\nTest 3: Sorting Flights');
  const cheapest = searchFlights({ sortBy: 'cheapest' });
  for (let i = 0; i < cheapest.length - 1; i++) {
    if (cheapest[i].basePrice > cheapest[i + 1].basePrice) {
      throw new Error('Cheapest sort order incorrect');
    }
  }
  console.log(`✓ Cheapest flight correctly sorted: $${cheapest[0].basePrice} to $${cheapest[cheapest.length - 1].basePrice}`);

  const fastest = searchFlights({ sortBy: 'fastest' });
  for (let i = 0; i < fastest.length - 1; i++) {
    if (fastest[i].durationMinutes > fastest[i + 1].durationMinutes) {
      throw new Error('Fastest sort order incorrect');
    }
  }
  console.log(`✓ Fastest flight correctly sorted: ${fastest[0].duration} to ${fastest[fastest.length - 1].duration}`);

  // Test 4: Fare Calculations
  console.log('\nTest 4: Centralized Fare Calculation & State');
  const testFlight = dxbFlights[0];
  const fareSingleAdult = calculateFare(testFlight, { adults: 1, children: 0, infants: 0 }, {}, []);
  console.log(`✓ 1 Adult base fare: $${fareSingleAdult.totalBaseFare}, Taxes: $${fareSingleAdult.taxesAndFees}, Total: $${fareSingleAdult.totalDemonstrationFare}`);

  const mockSeat = {
    id: 's1',
    row: 1,
    col: 'A',
    code: '1A',
    zone: 'business',
    features: ['extra-legroom'],
    price: 95,
    status: 'selected'
  };
  const mockAddon = {
    id: 'b1',
    category: 'baggage',
    title: 'Extra Bag',
    description: '23kg',
    price: 45,
    unit: 'bag'
  };

  const fareWithSeatAndAddon = calculateFare(
    testFlight,
    { adults: 2, children: 1, infants: 0 },
    { 'p1': mockSeat },
    [mockAddon]
  );
  if (fareWithSeatAndAddon.seatSelectionFee !== 95) throw new Error('Seat fee not added');
  if (fareWithSeatAndAddon.addonsFee !== 45) throw new Error('Addon fee not added');
  console.log(`✓ Multi-passenger with extra seat & addon total calculated accurately: $${fareWithSeatAndAddon.totalDemonstrationFare}`);

  // Test 5: Validation
  console.log('\nTest 5: Form Validation Rules');
  if (!isValidEmail('user@skyvoyage.internal')) throw new Error('Valid email rejected');
  if (isValidEmail('invalid-email')) throw new Error('Invalid email accepted');
  if (!isValidPhone('+91 98765 43210')) throw new Error('Valid phone rejected');
  if (isPastDate('2020-01-01') !== true) throw new Error('Past date check failed');
  console.log('✓ Email, phone, and past date validators working properly');

  // Test 6: PNR Generation
  console.log('\nTest 6: Unique PNR Generation');
  const pnr1 = generatePNR();
  const pnr2 = generatePNR();
  if (pnr1 === pnr2 || !pnr1.startsWith('SV-')) throw new Error('PNR format invalid');
  console.log(`✓ Sample PNRs generated: ${pnr1}, ${pnr2}`);

  console.log('\n=== ALL FUNCTIONALITY TESTS COMPLETED WITH 100% SUCCESS ===');
}

runTests();
