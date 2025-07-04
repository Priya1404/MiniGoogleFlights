import React from 'react';

interface BookingsTabProps {
  bookings: any[];
  setTab: (v: string) => void;
  resetSearch: () => void;
}

const BookingsTab: React.FC<BookingsTabProps> = ({ bookings, setTab, resetSearch }) => {
  return (
    <div className="bookings-tab">
      <h2>Your Bookings</h2>
      {bookings.length === 0 && <div>No bookings yet.</div>}
      {bookings.map((b, idx) => {
        const mainLeg = b.legs[0];
        const lastLeg = b.legs[b.legs.length - 1];
        const airline = mainLeg?.carriers?.marketing?.[0];
        return (
          <div key={b.id + idx} className="flight-result-cell">
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
            <div className="flight-price">{b.price?.formatted || 'N/A'}</div>
            <div className="booked-by">
              Booked by: {b.name} ({b.email})<br />
              On: {new Date(b.bookingDate).toLocaleString()}
            </div>
          </div>
        );
      })}
      <button
        className="select-flight-btn"
        onClick={resetSearch}
      >
        Book New Flight
      </button>
    </div>
  );
};

export default BookingsTab; 