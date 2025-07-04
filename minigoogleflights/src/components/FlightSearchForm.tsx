import React from 'react';
import { Suggestion } from '../types/flightSearch';
import TravellersDropdown from './TravellersDropdown';
import SuggestionsDropdown from './SuggestionsDropdown';

interface FlightSearchFormProps {
  tripType: string;
  setTripType: (v: string) => void;
  from: {
    input: string;
    setInput: (v: string) => void;
    suggestions: Suggestion[];
    setSuggestions: (v: Suggestion[]) => void;
    selected: Suggestion | null;
    setSelected: (v: Suggestion | null) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    focused: boolean;
    setFocused: (v: boolean) => void;
    handleSelect: (s: Suggestion) => void;
    clear: () => void;
  };
  to: {
    input: string;
    setInput: (v: string) => void;
    suggestions: Suggestion[];
    setSuggestions: (v: Suggestion[]) => void;
    selected: Suggestion | null;
    setSelected: (v: Suggestion | null) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    focused: boolean;
    setFocused: (v: boolean) => void;
    handleSelect: (s: Suggestion) => void;
    clear: () => void;
  };
  departDate: string;
  setDepartDate: (v: string) => void;
  returnDate: string;
  setReturnDate: (v: string) => void;
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  cabinClass: string;
  setCabinClass: (v: string) => void;
  travellersOpen: boolean;
  setTravellersOpen: (v: boolean) => void;
  handleSearch: (e: React.FormEvent) => void;
  CABIN_CLASSES: { value: string; label: string }[];
  loading: boolean;
  fetchSuggestions: (query: string, setter: (s: Suggestion[]) => void) => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({
  tripType,
  setTripType,
  from,
  to,
  departDate,
  setDepartDate,
  returnDate,
  setReturnDate,
  adults,
  setAdults,
  children,
  setChildren,
  cabinClass,
  setCabinClass,
  travellersOpen,
  setTravellersOpen,
  handleSearch,
  CABIN_CLASSES,
  loading,
  fetchSuggestions,
}) => {
  return (
    <form className="flight-form" onSubmit={handleSearch} autoComplete="off">
      <div className="input-group" style={{ position: 'relative' }}>
        <input
          ref={from.inputRef}
          type="text"
          placeholder="Country, city, or airport"
          value={from.input}
          onChange={(e) => {
            from.setInput(e.target.value);
            from.setSelected(null);
            fetchSuggestions(e.target.value, from.setSuggestions);
          }}
          onFocus={() => from.setFocused(true)}
          onBlur={() => from.setFocused(false)}
          required
          autoComplete="off"
        />
        {from.input && (
          <button type="button" className="input-clear" onClick={from.clear}>
            &times;
          </button>
        )}
        <SuggestionsDropdown
          suggestions={from.suggestions}
          onSelect={from.handleSelect}
          focused={from.focused}
        />
      </div>
      <button type="button" className="swap-btn" title="Swap" onClick={() => {/* swap handled in parent */}}>
        &#8646;
      </button>
      <div className="input-group" style={{ position: 'relative' }}>
        <input
          ref={to.inputRef}
          type="text"
          placeholder="Country, city, or airport"
          value={to.input}
          onChange={(e) => {
            to.setInput(e.target.value);
            to.setSelected(null);
            fetchSuggestions(e.target.value, to.setSuggestions);
          }}
          onFocus={() => to.setFocused(true)}
          onBlur={() => to.setFocused(false)}
          required
          autoComplete="off"
        />
        {to.input && (
          <button type="button" className="input-clear" onClick={to.clear}>
            &times;
          </button>
        )}
        <SuggestionsDropdown
          suggestions={to.suggestions}
          onSelect={to.handleSelect}
          focused={to.focused}
        />
      </div>
      <div className="input-group" style={{ position: 'relative' }}>
        <input
          type="date"
          value={departDate || ''}
          onChange={(e) => setDepartDate(e.target.value)}
          required
          className={departDate ? '' : 'date-empty'}
        />
        {!departDate && <span className="date-placeholder">Add Date</span>}
      </div>
      {tripType === 'return' && (
        <div className="input-group" style={{ position: 'relative' }}>
          <input
            type="date"
            value={returnDate || ''}
            onChange={(e) => setReturnDate(e.target.value)}
            required
            className={returnDate ? '' : 'date-empty'}
          />
          {!returnDate && <span className="date-placeholder">Return Date</span>}
        </div>
      )}
      <div className="input-group" style={{ position: 'relative', minWidth: '180px' }}>
        <input
          type="text"
          readOnly
          value={(() => {
            let val = `${adults} adult${adults > 1 ? 's' : ''}`;
            if (children > 0) val += `, ${children} child${children > 1 ? 'ren' : ''}`;
            val += `, ${CABIN_CLASSES.find((c) => c.value === cabinClass)?.label}`;
            return val;
          })()}
          placeholder="1 adult, Economy"
          onClick={() => setTravellersOpen(!travellersOpen)}
          style={{ cursor: 'pointer', background: '#fff' }}
        />
        {travellersOpen && (
          <TravellersDropdown
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            cabinClass={cabinClass}
            setCabinClass={setCabinClass}
            CABIN_CLASSES={CABIN_CLASSES}
            setTravellersOpen={setTravellersOpen}
          />
        )}
      </div>
      <button type="submit" disabled={loading} style={{ minWidth: '120px' }}>
        Search
      </button>
    </form>
  );
};

export default FlightSearchForm; 