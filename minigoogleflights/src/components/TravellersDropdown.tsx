import React from 'react';

interface TravellersDropdownProps {
  adults: number;
  setAdults: (v: number) => void;
  children: number;
  setChildren: (v: number) => void;
  cabinClass: string;
  setCabinClass: (v: string) => void;
  CABIN_CLASSES: { value: string; label: string }[];
  setTravellersOpen: (v: boolean) => void;
}

const TravellersDropdown: React.FC<TravellersDropdownProps> = ({
  adults,
  setAdults,
  children,
  setChildren,
  cabinClass,
  setCabinClass,
  CABIN_CLASSES,
  setTravellersOpen,
}) => {
  return (
    <div className="travellers-dropdown">
      <label>
        Adults:
        <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
          {[...Array(9)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
      <label>
        Children:
        <select value={children} onChange={(e) => setChildren(Number(e.target.value))}>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>
      <label>
        Cabin class:
        <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)}>
          {CABIN_CLASSES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <div className="dropdown-actions">
        <button type="button" onClick={() => setTravellersOpen(false)}>
          Done
        </button>
      </div>
    </div>
  );
};

export default TravellersDropdown;
