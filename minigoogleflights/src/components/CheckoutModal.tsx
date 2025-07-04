import React from 'react';
import { Flight } from './FlightList';

interface CheckoutModalProps {
  checkoutFlight: Flight | null;
  checkoutForm: {
    name: string;
    email: string;
    card: string;
    cvv: string;
    expiry: string;
  };
  setCheckoutForm: (v: any) => void;
  setBookings: (fn: (b: any[]) => any[]) => void;
  setCheckoutSuccess: (v: boolean) => void;
  setCheckoutFlight: (v: Flight | null) => void;
  setTab: (v: string) => void;
  checkoutSuccess: boolean;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  checkoutFlight,
  checkoutForm,
  setCheckoutForm,
  setBookings,
  setCheckoutSuccess,
  setCheckoutFlight,
  setTab,
  checkoutSuccess,
}) => {
  if (!checkoutFlight) return null;
  const price = checkoutFlight.price?.formatted || 'N/A';
  const mainLeg = checkoutFlight.legs[0];
  const lastLeg = checkoutFlight.legs[checkoutFlight.legs.length - 1];
  const airline = mainLeg?.carriers?.marketing?.[0];
  if (checkoutSuccess) {
    return (
      <div className="checkout-modal modal-common success-screen">
        <h2>Booking Successful!</h2>
        <div>
          Your flight from {mainLeg?.origin?.displayCode} to {lastLeg?.destination?.displayCode} is
          booked.
        </div>
        <button
          className="select-flight-btn"
          onClick={() => {
            setCheckoutFlight(null);
            setCheckoutSuccess(false);
            setTab('bookings');
          }}
        >
          Go to Bookings
        </button>
        <button
          className="select-flight-btn"
          style={{ background: '#888' }}
          onClick={() => {
            setCheckoutFlight(null);
            setCheckoutSuccess(false);
            setTab('search');
          }}
        >
          Book Another
        </button>
      </div>
    );
  }
  return (
    <div className="checkout-modal modal-common">
      <h2>Checkout</h2>
      <div className="flight-result-cell">
        <div className="flight-result-main">
          <div className="flight-airline">
            {airline && <img src={airline.logoUrl} alt="logo" />} {airline?.name || 'Airline'}
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
            { ...checkoutFlight, ...checkoutForm, bookingDate: new Date().toISOString() },
          ]);
          setCheckoutSuccess(true);
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={checkoutForm.name}
            onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={checkoutForm.email}
            onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
            required
          />
        </label>
        <label>
          Card Number:
          <input
            type="text"
            maxLength={16}
            value={checkoutForm.card}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, card: e.target.value.replace(/[^0-9]/g, '') })
            }
            required
          />
        </label>
        <label>
          Expiry:
          <input
            type="text"
            maxLength={5}
            placeholder="MM/YY"
            value={checkoutForm.expiry}
            onChange={(e) => setCheckoutForm({ ...checkoutForm, expiry: e.target.value })}
            required
          />
        </label>
        <label>
          CVV:
          <input
            type="number"
            maxLength={4}
            value={checkoutForm.cvv}
            onChange={(e) =>
              setCheckoutForm({ ...checkoutForm, cvv: e.target.value.replace(/[^0-9]/g, '') })
            }
            required
          />
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="select-flight-btn">
            Pay & Book
          </button>
          <button
            type="button"
            className="select-flight-btn"
            style={{ background: '#888' }}
            onClick={() => {
              setCheckoutFlight(null);
              setCheckoutSuccess(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutModal;
