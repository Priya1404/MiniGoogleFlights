import '../styles/App.css';
import { useFlightSearch } from '../hooks/useFlightSearch';
import { useBooking } from '../hooks/useBooking';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightFiltersSidebar from '../components/FlightFiltersSidebar';
import FlightResultsSection from '../components/FlightResultsSection';
import BookingModal from '../components/BookingModal';
import CheckoutModal from '../components/CheckoutModal';
import BookingsTab from '../components/BookingsTab';
import { CABIN_CLASSES } from '../constants/cabinClasses';

function HomePage() {
  const flightSearch = useFlightSearch();
  const booking = useBooking();

  const resetSearch = () => {
    flightSearch.setTab('search');
    flightSearch.from.setInput('');
    flightSearch.to.setInput('');
    flightSearch.from.setSelected(null);
    flightSearch.to.setSelected(null);
    flightSearch.setDepartDate('');
    flightSearch.setReturnDate('');
    flightSearch.setFlights([]);
    flightSearch.setError('');
    flightSearch.setCurrentPage(1);
  };

  return (
    <div className="App">
      {/* Mock/Live toggle */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0.5rem 2rem 0 0' }}>
        <label style={{ fontWeight: 600 }}>
          Mock Mode
          <input
            type="checkbox"
            checked={flightSearch.useMock}
            onChange={(e) => flightSearch.setUseMock(e.target.checked)}
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>
      {/* Tab navigation */}
      <div
        style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', justifyContent: 'center' }}
      >
        <button
          className={`select-flight-btn${flightSearch.tab === 'search' ? ' selected' : ''}`}
          style={{
            background: flightSearch.tab === 'search' ? '#1967d2' : '#fff',
            color: flightSearch.tab === 'search' ? '#fff' : '#1967d2',
            border: '1px solid #1967d2',
          }}
          onClick={() => flightSearch.setTab('search')}
        >
          Search Flights
        </button>
        <button
          className={`select-flight-btn${flightSearch.tab === 'bookings' ? ' selected' : ''}`}
          style={{
            background: flightSearch.tab === 'bookings' ? '#1967d2' : '#fff',
            color: flightSearch.tab === 'bookings' ? '#fff' : '#1967d2',
            border: '1px solid #1967d2',
          }}
          onClick={() => flightSearch.setTab('bookings')}
        >
          Bookings
        </button>
      </div>
      {flightSearch.tab === 'search' && (
        <>
          <h1>Google Flights Clone</h1>
          <FlightSearchForm
            tripType={flightSearch.tripType}
            setTripType={flightSearch.setTripType}
            from={flightSearch.from}
            to={flightSearch.to}
            departDate={flightSearch.departDate}
            setDepartDate={flightSearch.setDepartDate}
            returnDate={flightSearch.returnDate}
            setReturnDate={flightSearch.setReturnDate}
            adults={flightSearch.adults}
            setAdults={flightSearch.setAdults}
            children={flightSearch.children}
            setChildren={flightSearch.setChildren}
            cabinClass={flightSearch.cabinClass}
            setCabinClass={flightSearch.setCabinClass}
            travellersOpen={flightSearch.travellersOpen}
            setTravellersOpen={flightSearch.setTravellersOpen}
            handleSearch={flightSearch.handleSearch}
            CABIN_CLASSES={CABIN_CLASSES}
            loading={flightSearch.loading}
            fetchSuggestions={flightSearch.fetchSuggestions}
          />
          {flightSearch.loading && <p>Loading...</p>}
          {flightSearch.error && <p className="error">{flightSearch.error}</p>}
          {/* Results layout with sidebar and list */}
          {flightSearch.flights.length > 0 && (
            <div className="flight-results-layout">
              <FlightFiltersSidebar
                filterOptions={flightSearch.filterOptions}
                selectedStops={flightSearch.selectedStops}
                setSelectedStops={flightSearch.setSelectedStops}
                depTimeRange={flightSearch.depTimeRange}
                setDepTimeRange={flightSearch.setDepTimeRange}
                durationRange={flightSearch.durationRange}
                setDurationRange={flightSearch.setDurationRange}
                selectedAirlines={flightSearch.selectedAirlines}
                setSelectedAirlines={flightSearch.setSelectedAirlines}
              />
              <FlightResultsSection
                paginatedFlights={flightSearch.paginatedFlights}
                sortBy={flightSearch.sortBy}
                setSortBy={flightSearch.setSortBy}
                totalPages={flightSearch.totalPages}
                currentPage={flightSearch.currentPage}
                setCurrentPage={flightSearch.setCurrentPage}
                onSelect={booking.setCheckoutFlight}
              />
            </div>
          )}
          {/* Booking modal/page */}
          {booking.selectedFlight && (
            <BookingModal
              selectedFlight={booking.selectedFlight}
              bookingForm={booking.bookingForm}
              setBookingForm={booking.setBookingForm}
              setBookings={booking.setBookings}
              setBookingSuccess={booking.setBookingSuccess}
              setSelectedFlight={booking.setSelectedFlight}
              setTab={flightSearch.setTab}
              bookingSuccess={booking.bookingSuccess}
            />
          )}
          {/* Checkout modal/page */}
          {booking.checkoutFlight && (
            <CheckoutModal
              checkoutFlight={booking.checkoutFlight}
              checkoutForm={booking.checkoutForm}
              setCheckoutForm={booking.setCheckoutForm}
              setBookings={booking.setBookings}
              setCheckoutSuccess={booking.setCheckoutSuccess}
              setCheckoutFlight={booking.setCheckoutFlight}
              setTab={flightSearch.setTab}
              checkoutSuccess={booking.checkoutSuccess}
            />
          )}
        </>
      )}
      {flightSearch.tab === 'bookings' && (
        <BookingsTab bookings={booking.bookings} setTab={flightSearch.setTab} resetSearch={resetSearch} />
      )}
    </div>
  );
}

export default HomePage;
