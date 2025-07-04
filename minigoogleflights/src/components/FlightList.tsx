import type { CSSProperties, FC } from 'react';
import { FixedSizeList } from 'react-window';
import Button from './Button';
import AirlineLogo from './AirlineLogo';

export interface Flight {
  id: string;
  price: { raw: number; formatted: string };
  legs: any[];
}

interface FlightListProps {
  flights: Flight[];
  onSelect: (flight: Flight) => void;
  height?: number;
  rowHeight?: number;
}

type FlightRowProps = {
  index: number;
  style: CSSProperties;
  data: { flights: Flight[]; onSelect: (flight: Flight) => void };
};

const FlightRow: FC<FlightRowProps> = ({ index, style, data }) => {
  const flight: Flight = data.flights[index];
  const onSelect = data.onSelect;
  const mainLeg = flight.legs[0];
  const lastLeg = flight.legs[flight.legs.length - 1];
  const airline = mainLeg?.carriers?.marketing?.[0];
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        padding: '0.5rem 1rem',
      }}
    >
      <div style={{ flex: 2 }}>
        <div style={{ fontWeight: 600 }}>
          {mainLeg?.origin?.displayCode} → {lastLeg?.destination?.displayCode}
        </div>
        <div style={{ fontSize: 13, color: '#555' }}>
          {mainLeg?.departure} - {lastLeg?.arrival}
        </div>
        <div style={{ fontSize: 13, color: '#555' }}>
          {airline && <AirlineLogo src={airline.logoUrl} alt={airline.name} />} {airline?.name}
        </div>
      </div>
      <div style={{ flex: 1, fontWeight: 600 }}>{flight.price.formatted}</div>
      <Button onClick={() => onSelect(flight)}>
        Select
      </Button>
    </div>
  );
};

const FixedSizeListAny = FixedSizeList as any;

export const FlightList: FC<FlightListProps> = ({
  flights,
  onSelect,
  height = 400,
  rowHeight = 72,
}) => {
  return (
    <FixedSizeListAny
      height={height}
      itemCount={flights.length}
      itemSize={rowHeight}
      width={'100%'}
      itemData={{ flights, onSelect }}
    >
      {FlightRow}
    </FixedSizeListAny>
  );
};
