import React from 'react';

interface FlightFiltersSidebarProps {
  filterOptions: any;
  selectedStops: string[];
  setSelectedStops: (v: string[]) => void;
  depTimeRange: [number, number];
  setDepTimeRange: (v: [number, number]) => void;
  durationRange: [number, number];
  setDurationRange: (v: [number, number]) => void;
  selectedAirlines: string[];
  setSelectedAirlines: (v: string[]) => void;
}

const FlightFiltersSidebar: React.FC<FlightFiltersSidebarProps> = ({
  filterOptions,
  selectedStops,
  setSelectedStops,
  depTimeRange,
  setDepTimeRange,
  durationRange,
  setDurationRange,
  selectedAirlines,
  setSelectedAirlines,
}) => {
  return (
    <aside className="filters-sidebar">
      <div>
        <h4>Stops</h4>
        <label>
          <input
            type="checkbox"
            checked={selectedStops.includes('direct')}
            onChange={(e) =>
              setSelectedStops(
                e.target.checked
                  ? [...selectedStops, 'direct']
                  : selectedStops.filter((x) => x !== 'direct')
              )
            }
          />{' '}
          Direct{' '}
          {isFinite(filterOptions.stops.direct) && (
            <span>from ${filterOptions.stops.direct.toFixed(0)}</span>
          )}
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStops.includes('1')}
            onChange={(e) =>
              setSelectedStops(
                e.target.checked
                  ? [...selectedStops, '1']
                  : selectedStops.filter((x) => x !== '1')
              )
            }
          />{' '}
          1 stop{' '}
          {isFinite(filterOptions.stops['1']) && (
            <span>from ${filterOptions.stops['1'].toFixed(0)}</span>
          )}
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedStops.includes('2+')}
            onChange={(e) =>
              setSelectedStops(
                e.target.checked
                  ? [...selectedStops, '2+']
                  : selectedStops.filter((x) => x !== '2+')
              )
            }
          />{' '}
          2+ stops{' '}
          {isFinite(filterOptions.stops['2+']) && (
            <span>from ${filterOptions.stops['2+'].toFixed(0)}</span>
          )}
        </label>
      </div>
      <div>
        <h4>Departure time</h4>
        <div className="slider-labels">
          <span>{Math.floor(filterOptions.depTime[0])}:00</span>
          <span>{Math.ceil(filterOptions.depTime[1])}:59</span>
        </div>
        <input
          type="range"
          min={filterOptions.depTime[0]}
          max={filterOptions.depTime[1]}
          step={0.25}
          value={depTimeRange[0]}
          onChange={(e) => setDepTimeRange([+e.target.value, depTimeRange[1]])}
        />
        <input
          type="range"
          min={filterOptions.depTime[0]}
          max={filterOptions.depTime[1]}
          step={0.25}
          value={depTimeRange[1]}
          onChange={(e) => setDepTimeRange([depTimeRange[0], +e.target.value])}
        />
      </div>
      <div>
        <h4>Journey Duration</h4>
        <div className="slider-labels">
          <span>{filterOptions.duration[0]}h</span>
          <span>{filterOptions.duration[1]}h</span>
        </div>
        <input
          type="range"
          min={filterOptions.duration[0]}
          max={filterOptions.duration[1]}
          step={0.25}
          value={durationRange[0]}
          onChange={(e) => setDurationRange([+e.target.value, durationRange[1]])}
        />
        <input
          type="range"
          min={filterOptions.duration[0]}
          max={filterOptions.duration[1]}
          step={0.25}
          value={durationRange[1]}
          onChange={(e) => setDurationRange([durationRange[0], +e.target.value])}
        />
      </div>
      <div>
        <h4>Airlines</h4>
        <div className="airlines-list">
          {Object.entries(filterOptions.airlines).map(([name, info]) => (
            <label key={name}>
              <input
                type="checkbox"
                checked={selectedAirlines.includes(name)}
                onChange={(e) =>
                  setSelectedAirlines(
                    e.target.checked
                      ? [...selectedAirlines, name]
                      : selectedAirlines.filter((x) => x !== name)
                  )
                }
              />{' '}
              <img
                src={(info as { logo: string; price: number }).logo}
                alt="logo"
                style={{ height: 18, verticalAlign: 'middle', marginRight: 4 }}
              />{' '}
              {name}{' '}
              {isFinite((info as { logo: string; price: number }).price) && (
                <span>from ${(info as { logo: string; price: number }).price.toFixed(0)}</span>
              )}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FlightFiltersSidebar; 