import { useState, useRef, useMemo, useEffect } from 'react';
import { flightRepository } from '../services/api';
import { getCachedFlightResults, cacheFlightResults } from '../utils/db';
import {
  MOCK_CURRENT_AIRPORT,
  MOCK_FLIGHTS,
  MOCK_NEARBY_AIRPORTS,
  MOCK_SUGGESTIONS,
} from '../__mocks__/mockData';
import { Suggestion, Airport, NearbyAirport } from '../types/flightSearch';

function filterSuggestions(query: string) {
  if (!query) return [];
  const q = query.toLowerCase();
  return MOCK_SUGGESTIONS.filter(
    (s) => s.name.toLowerCase().includes(q) || s.iataCode.toLowerCase().includes(q),
  );
}

function handleSelect(
  suggestion: Suggestion,
  setSelected: (s: Suggestion) => void,
  setInput: (v: string) => void,
  setSuggestions: (s: Suggestion[]) => void,
) {
  setSelected(suggestion);
  setInput(`${suggestion.name} (${suggestion.iataCode})`);
  setSuggestions([]);
}

function handleClear(
  setInput: (v: string) => void,
  setSelected: (v: Suggestion | null) => void,
  setSuggestions: (s: Suggestion[]) => void,
  inputRef: React.RefObject<HTMLInputElement>,
) {
  setInput('');
  setSelected(null);
  setSuggestions([]);
  inputRef.current?.focus();
}

export function useFlightSearch() {
  const [tripType, setTripType] = useState<string>('oneway');

  const [fromInput, setFromInput] = useState<string>('');
  const [toInput, setToInput] = useState<string>('');
  const [fromSuggestions, setFromSuggestions] = useState<Suggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Suggestion[]>([]);
  const [fromSelected, setFromSelected] = useState<Suggestion | null>(null);
  const [toSelected, setToSelected] = useState<Suggestion | null>(null);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  const [departDate, setDepartDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');

  const [travellersOpen, setTravellersOpen] = useState<boolean>(false);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [cabinClass, setCabinClass] = useState<string>('economy');

  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [selectedStops, setSelectedStops] = useState<string[]>([]); // ['direct', '1', '2+']
  const [depTimeRange, setDepTimeRange] = useState<[number, number]>([0, 23.99]);
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 24]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const FLIGHTS_PER_PAGE = 5;

  const [sortBy, setSortBy] = useState<string>('best');

  const [tab, setTab] = useState<string>('search');

  const [nearbyAirports, setNearbyAirports] = useState<NearbyAirport[]>([]);
  const [currentAirport, setCurrentAirport] = useState<Airport | null>(null);

  // Toggle for mock/live mode
  const [useMock, setUseMock] = useState<boolean>(true);

  const [fromFocused, setFromFocused] = useState<boolean>(false);
  const [toFocused, setToFocused] = useState<boolean>(false);

  useEffect(() => {
    if (useMock) {
      setCurrentAirport(MOCK_CURRENT_AIRPORT);
      setNearbyAirports(MOCK_NEARBY_AIRPORTS);
      return;
    }
    async function fetchNearby() {
      try {
        const url =
          'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=19.242218017578125&lng=72.85846156046128&locale=en-US';
        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || '',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.status && data.data) {
          setCurrentAirport(data.data.current);
          setNearbyAirports(data.data.nearby);
        }
      } catch (err) {
        setNearbyAirports([]);
      }
    }
    fetchNearby();
  }, [useMock]);

  useEffect(() => {
    function autoSelect(input: string, focused: boolean, setSelected: (s: Suggestion) => void) {
      if (useMock && input && focused) {
        const match = filterSuggestions(input)[0];
        if (match) setSelected(match);
      }
    }
    autoSelect(fromInput, fromFocused, setFromSelected);
    autoSelect(toInput, toFocused, setToSelected);
  }, [fromInput, fromFocused, toInput, toFocused, useMock]);

  const filterOptions = useMemo(() => {
    const stops = { direct: Infinity, '1': Infinity, '2+': Infinity };
    const airlines: Record<string, { logo: string; price: number }> = {};
    let minDep = 24,
      maxDep = 0,
      minDur = 24,
      maxDur = 0;
    flights.forEach((f: any) => {
      f.legs.forEach((leg: any) => {
        if (leg.stopCount === 0) stops.direct = Math.min(stops.direct, f.price?.raw || Infinity);
        else if (leg.stopCount === 1) stops['1'] = Math.min(stops['1'], f.price?.raw || Infinity);
        else if (leg.stopCount >= 2) stops['2+'] = Math.min(stops['2+'], f.price?.raw || Infinity);
        (leg.carriers?.marketing || []).forEach((a: any) => {
          if (!airlines[a.name] || (f.price?.raw || Infinity) < airlines[a.name].price) {
            airlines[a.name] = { logo: a.logoUrl, price: f.price?.raw || Infinity };
          }
        });
        const depHour =
          new Date(leg.departure).getHours() + new Date(leg.departure).getMinutes() / 60;
        minDep = Math.min(minDep, depHour);
        maxDep = Math.max(maxDep, depHour);
        const dur = (leg.durationInMinutes || 0) / 60;
        minDur = Math.min(minDur, dur);
        maxDur = Math.max(maxDur, dur);
      });
    });
    return {
      stops,
      airlines,
      depTime: [Math.floor(minDep), Math.ceil(maxDep)],
      duration: [Math.floor(minDur), Math.ceil(maxDur)],
    };
  }, [flights]);

  const filteredFlights = useMemo(() => {
    return flights.filter((f: any) => {
      if (selectedStops.length) {
        const stopsInFlight = f.legs.map((l: any) => l.stopCount);
        if (
          !selectedStops.some(
            (s) =>
              (s === 'direct' && stopsInFlight.includes(0)) ||
              (s === '1' && stopsInFlight.includes(1)) ||
              (s === '2+' && stopsInFlight.some((x: any) => x >= 2)),
          )
        )
          return false;
      }
      if (selectedAirlines.length) {
        const airlineNames = f.legs.flatMap((l: any) =>
          (l.carriers?.marketing || []).map((a: any) => a.name),
        );
        if (!selectedAirlines.some((a: any) => airlineNames.includes(a))) return false;
      }
      if (depTimeRange) {
        const depHour =
          new Date(f.legs[0].departure).getHours() +
          new Date(f.legs[0].departure).getMinutes() / 60;
        if (depHour < depTimeRange[0] || depHour > depTimeRange[1]) return false;
      }
      if (durationRange) {
        const dur = (f.legs[0].durationInMinutes || 0) / 60;
        if (dur < durationRange[0] || dur > durationRange[1]) return false;
      }
      return true;
    });
  }, [flights, selectedStops, selectedAirlines, depTimeRange, durationRange]);

  const sortedFlights = useMemo(() => {
    const arr = [...filteredFlights];
    if (sortBy === 'cheapest')
      arr.sort((a: any, b: any) => (a.price?.raw || 0) - (b.price?.raw || 0));
    else if (sortBy === 'fastest')
      arr.sort(
        (a: any, b: any) =>
          (a.legs[0]?.durationInMinutes || 0) - (b.legs[0]?.durationInMinutes || 0),
      );
    else if (sortBy === 'outbound')
      arr.sort(
        (a: any, b: any) =>
          new Date(a.legs[0]?.departure).getTime() - new Date(b.legs[0]?.departure).getTime(),
      );
    return arr;
  }, [filteredFlights, sortBy]);

  const totalPages = Math.ceil(sortedFlights.length / FLIGHTS_PER_PAGE);
  const paginatedFlights = sortedFlights.slice(
    (currentPage - 1) * FLIGHTS_PER_PAGE,
    currentPage * FLIGHTS_PER_PAGE,
  );

  const fetchSuggestions = async (query: string, setter: (s: Suggestion[]) => void) => {
    if (useMock) {
      setter(filterSuggestions(query));
      return;
    }
    if (!query) return setter([]);
    try {
      const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(query)}&locale=en-US`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || '',
          'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.status && Array.isArray(data.data)) {
        setter(
          data.data.map((a: any) => ({
            skyId: a.skyId,
            entityId: a.entityId,
            name: a.presentation.title,
            iataCode: a.skyId,
            country: a.presentation.subtitle,
            suggestionTitle: a.presentation.suggestionTitle,
          })),
        );
      } else {
        setter([]);
      }
    } catch (err) {
      setter([]);
    }
  };

  const from = {
    input: fromInput,
    setInput: setFromInput,
    suggestions: fromSuggestions,
    setSuggestions: setFromSuggestions,
    selected: fromSelected,
    setSelected: setFromSelected,
    inputRef: fromInputRef,
    focused: fromFocused,
    setFocused: setFromFocused,
    handleSelect: (s: Suggestion) =>
      handleSelect(s, setFromSelected, setFromInput, setFromSuggestions),
    clear: () => handleClear(setFromInput, setFromSelected, setFromSuggestions, fromInputRef),
  };
  const to = {
    input: toInput,
    setInput: setToInput,
    suggestions: toSuggestions,
    setSuggestions: setToSuggestions,
    selected: toSelected,
    setSelected: setToSelected,
    inputRef: toInputRef,
    focused: toFocused,
    setFocused: setToFocused,
    handleSelect: (s: Suggestion) => handleSelect(s, setToSelected, setToInput, setToSuggestions),
    clear: () => handleClear(setToInput, setToSelected, setToSuggestions, toInputRef),
  };

  const swapFromTo = () => {
    const tempInput = fromInput;
    const tempSelected = fromSelected;
    setFromInput(toInput);
    setFromSelected(toSelected);
    setToInput(tempInput);
    setToSelected(tempSelected);
    fromInputRef.current?.focus();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFlights([]);
    if (useMock) {
      const now = new Date();
      const dep = new Date(departDate);
      if (!fromSelected || !toSelected || !departDate || dep <= now) {
        setError('Please select valid origin, destination, and a future date.');
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setFlights(MOCK_FLIGHTS);
        setLoading(false);
      }, 600);
      return;
    }
    if (!fromSelected || !toSelected || !departDate) {
      setError('Please select valid origin, destination, and date.');
      setLoading(false);
      return;
    }
    try {
      const cacheKey = `${fromSelected.skyId}-${toSelected.skyId}-${departDate}`;
      const cached = await getCachedFlightResults(cacheKey);
      if (cached && Array.isArray(cached.data) && cached.data.length > 0) {
        setFlights(cached.data);
        setLoading(false);
        return;
      }
      const params = {
        originSkyId: fromSelected.skyId,
        destinationSkyId: toSelected.skyId,
        originEntityId: fromSelected.entityId,
        destinationEntityId: toSelected.entityId,
        cabinClass,
        adults,
        sortBy,
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
      };
      const data = await flightRepository.searchFlightsV2(params);
      if (data.status && Array.isArray(data.data) && data.data.length > 0) {
        setFlights(data.data);
        await cacheFlightResults(cacheKey, data);
        setLoading(false);
        return;
      }
      setError('No flights found. Please try different search criteria.');
      setLoading(false);
    } catch (err) {
      setError('Error searching flights. Please try again.');
      setLoading(false);
    }
  };

  return {
    tripType,
    setTripType,
    from,
    to,
    departDate,
    setDepartDate,
    returnDate,
    setReturnDate,
    travellersOpen,
    setTravellersOpen,
    adults,
    setAdults,
    children,
    setChildren,
    cabinClass,
    setCabinClass,
    flights,
    setFlights,
    loading,
    setLoading,
    error,
    setError,
    selectedStops,
    setSelectedStops,
    depTimeRange,
    setDepTimeRange,
    durationRange,
    setDurationRange,
    selectedAirlines,
    setSelectedAirlines,
    currentPage,
    setCurrentPage,
    FLIGHTS_PER_PAGE,
    sortBy,
    setSortBy,
    tab,
    setTab,
    nearbyAirports,
    setNearbyAirports,
    currentAirport,
    setCurrentAirport,
    useMock,
    setUseMock,
    filterOptions,
    filteredFlights,
    sortedFlights,
    totalPages,
    paginatedFlights,
    fetchSuggestions,
    swapFromTo,
    handleSearch,
  };
}
