import React from 'react';
import { Suggestion } from '../types/flightSearch';

interface SuggestionsDropdownProps {
  suggestions: Suggestion[];
  onSelect: (s: Suggestion) => void;
  focused: boolean;
}

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
  suggestions,
  onSelect,
  focused,
}) => {
  if (!focused || suggestions.length === 0) return null;
  return (
    <ul className="suggestions-list">
      {suggestions.map((s, idx) => (
        <li key={idx} className="suggestion-cell" onMouseDown={() => onSelect(s)}>
          <span className="suggestion-main">
            {s.suggestionTitle || s.name + (s.iataCode ? ` (${s.iataCode})` : '')}
          </span>
          <span className="suggestion-meta">{s.country}</span>
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsDropdown;
