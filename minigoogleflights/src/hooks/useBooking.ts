import { useState } from 'react';
import { Flight } from '../components/FlightList';

export function useBooking() {
  // Booking state
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingForm, setBookingForm] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Checkout state
  const [checkoutFlight, setCheckoutFlight] = useState<Flight | null>(null);
  const [checkoutForm, setCheckoutForm] = useState<{
    name: string;
    email: string;
    card: string;
    cvv: string;
    expiry: string;
  }>({
    name: '',
    email: '',
    card: '',
    cvv: '',
    expiry: '',
  });
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  return {
    selectedFlight,
    setSelectedFlight,
    bookings,
    setBookings,
    bookingForm,
    setBookingForm,
    bookingSuccess,
    setBookingSuccess,
    checkoutFlight,
    setCheckoutFlight,
    checkoutForm,
    setCheckoutForm,
    checkoutSuccess,
    setCheckoutSuccess,
  };
} 