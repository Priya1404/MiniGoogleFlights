import React from 'react';
import { FlightList, Flight } from './FlightList';

interface FlightResultsSectionProps {
  paginatedFlights: Flight[];
  sortBy: string;
  setSortBy: (v: string) => void;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (v: number) => void;
  onSelect: (f: Flight) => void;
}

const FlightResultsSection: React.FC<FlightResultsSectionProps> = ({
  paginatedFlights,
  sortBy,
  setSortBy,
  totalPages,
  currentPage,
  setCurrentPage,
  onSelect,
}) => {
  return (
    <div className="flight-results-list">
      {/* Sort by filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="best">Best</option>
          <option value="cheapest">Cheapest first</option>
          <option value="fastest">Fastest first</option>
          <option value="outbound">Outbound departure time</option>
        </select>
      </div>
      <FlightList
        flights={paginatedFlights as Flight[]}
        onSelect={onSelect}
        height={400}
        rowHeight={90}
      />
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pagination-btn${currentPage === i + 1 ? ' selected' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightResultsSection; 