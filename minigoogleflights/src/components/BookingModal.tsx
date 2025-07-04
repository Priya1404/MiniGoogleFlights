import React from 'react';
import { Flight } from './FlightList';

interface BookingModalProps {
  selectedFlight: Flight | null;
  bookingForm: { name: string; email: string };
  setBookingForm: (v: { name: string; email: string }) => void;
  setBookings: (fn: (b: any[]) => any[]) => void;
  setBookingSuccess: (v: boolean) => void;
  setSelectedFlight: (v: Flight | null) => void;
  setTab: (v: string) => void;
  bookingSuccess: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({
  selectedFlight,
  bookingForm,
  setBookingForm,
  setBookings,
  setBookingSuccess,
  setSelectedFlight,
  setTab,
  bookingSuccess,
}) => {
  if (!selectedFlight) return null;
  const price = selectedFlight.price?.formatted || 'N/A';
  const mainLeg = selectedFlight.legs[0];
  const lastLeg = selectedFlight.legs[selectedFlight.legs.length - 1];
  const airline = mainLeg?.carriers?.marketing?.[0];
  return (
    <div className="booking-modal modal-common">
      <h2>Book Flight</h2>
      <div className="flight-result-cell">
        <div className="flight-result-main">
          <div className="flight-airline">
            {airline && <img src={airline.logoUrl} alt="logo" />}
            {airline?.name || 'Airline'}
          </div>
          <div className="flight-times">
            <div className="flight-time">
              {mainLeg
                ? new Date(mainLeg.departure).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}{' '}
              -{' '}
              {lastLeg
                ? new Date(lastLeg.arrival).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}
            </div>
            <div className="flight-duration">
              {mainLeg
                ? `${Math.floor(mainLeg.durationInMinutes / 60)}h ${mainLeg.durationInMinutes % 60}m`
                : ''}
            </div>
          </div>
          <div className="flight-route">
            {mainLeg?.origin?.displayCode} → {lastLeg?.destination?.displayCode}
          </div>
        </div>
        <div className="flight-price">{price}</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBookings((b) => [
            ...b,
            { ...selectedFlight, ...bookingForm, bookingDate: new Date().toISOString() },
          ]);
          setBookingSuccess(true);
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={bookingForm.name}
            onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={bookingForm.email}
            onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
            required
          />
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="select-flight-btn">
            Complete Booking
          </button>
          <button
            type="button"
            className="select-flight-btn"
            style={{ background: '#888' }}
            onClick={() => {
              setSelectedFlight(null);
              setBookingSuccess(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      {bookingSuccess && (
        <div className="success-message">
          Booking successful!{' '}
          <button
            onClick={() => {
              setSelectedFlight(null);
              setBookingSuccess(false);
              setTab('bookings');
            }}
          >
            Go to Bookings
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
