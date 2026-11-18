import { Flight } from '../types/flight';
import { PassengerCount, Seat, AddonItem, FareBreakdown } from '../types/booking';

export function calculateFare(
  flight: Flight | null,
  passengers: PassengerCount,
  selectedSeats: Record<string, Seat>,
  selectedAddons: AddonItem[]
): FareBreakdown {
  if (!flight) {
    return {
      baseFarePerPassenger: 0,
      passengerCount: 0,
      totalBaseFare: 0,
      taxesAndFees: 0,
      seatSelectionFee: 0,
      addonsFee: 0,
      totalDemonstrationFare: 0,
    };
  }

  const basePrice = flight.basePrice;
  // Adults full fare, children 75%, infants 10%
  const adultsTotal = (passengers.adults || 1) * basePrice;
  const childrenTotal = (passengers.children || 0) * Math.round(basePrice * 0.75);
  const infantsTotal = (passengers.infants || 0) * Math.round(basePrice * 0.1);
  const totalBaseFare = adultsTotal + childrenTotal + infantsTotal;

  const totalPassengerCount = (passengers.adults || 1) + (passengers.children || 0) + (passengers.infants || 0);

  // Government taxes & carrier surcharges ~ 12% + $28 per passenger
  const taxesAndFees = Math.round(totalBaseFare * 0.12 + totalPassengerCount * 28);

  // Seat selection fee
  const seatSelectionFee = Object.values(selectedSeats).reduce((sum, s) => sum + (s.price || 0), 0);

  // Addons
  const addonsFee = selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);

  const totalDemonstrationFare = totalBaseFare + taxesAndFees + seatSelectionFee + addonsFee;

  return {
    baseFarePerPassenger: basePrice,
    passengerCount: totalPassengerCount,
    totalBaseFare,
    taxesAndFees,
    seatSelectionFee,
    addonsFee,
    totalDemonstrationFare,
  };
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
