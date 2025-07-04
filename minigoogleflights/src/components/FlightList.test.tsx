import { render, screen, fireEvent } from '@testing-library/react';
import { FlightList, Flight } from './FlightList';

describe('FlightList', () => {
  const flights: Flight[] = [
    {
      id: '1',
      price: { raw: 100, formatted: '$100' },
      legs: [
        {
          origin: { displayCode: 'DEL', name: 'Delhi' },
          destination: { displayCode: 'LHR', name: 'London' },
          departure: '2024-07-01T09:00:00',
          arrival: '2024-07-01T12:00:00',
          carriers: { marketing: [{ name: 'Air India', logoUrl: '' }] },
        },
      ],
    },
    {
      id: '2',
      price: { raw: 200, formatted: '$200' },
      legs: [
        {
          origin: { displayCode: 'JFK', name: 'New York' },
          destination: { displayCode: 'LHR', name: 'London' },
          departure: '2024-07-02T09:00:00',
          arrival: '2024-07-02T12:00:00',
          carriers: { marketing: [{ name: 'Delta', logoUrl: '' }] },
        },
      ],
    },
  ];

  it('renders a list of flights', () => {
    render(<FlightList flights={flights} onSelect={jest.fn()} />);
    expect(screen.getByText('DEL → LHR')).toBeInTheDocument();
    expect(screen.getByText('JFK → LHR')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
  });

  it('calls onSelect when a flight is selected', () => {
    const onSelect = jest.fn();
    render(<FlightList flights={flights} onSelect={onSelect} />);
    const selectButtons = screen.getAllByText('Select');
    fireEvent.click(selectButtons[0]);
    expect(onSelect).toHaveBeenCalledWith(flights[0]);
  });
});
