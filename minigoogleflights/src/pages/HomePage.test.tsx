import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the search form and Mock Mode toggle', () => {
    render(<HomePage />);
    expect(screen.getAllByPlaceholderText('Country, city, or airport')).toHaveLength(2);
    expect(screen.getByText('Mock Mode')).toBeInTheDocument();
    expect(screen.getByText('Search Flights')).toBeInTheDocument();
  });
});
