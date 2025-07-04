export interface AirportPresentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface RelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}

export interface AirportNavigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

export interface AirportData {
  presentation: AirportPresentation;
  navigation: AirportNavigation;
}

export interface GetNearByAirportsResponse {
  status: boolean;
  timestamp: number;
  data: {
    current: AirportData;
    nearby: AirportData[];
    recent: AirportData[];
  };
}

export interface SearchAirportResponse {
  status: boolean;
  timestamp: number;
  data: AirportData[];
}

export interface FlightCarrier {
  name: string;
  logoUrl: string;
}

export interface FlightLeg {
  id: string;
  origin: { displayCode: string; name: string };
  destination: { displayCode: string; name: string };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  stopCount: number;
  carriers: { marketing: FlightCarrier[] };
}

export interface FlightPrice {
  raw: number;
  formatted: string;
}

export interface FlightItinerary {
  id: string;
  price: FlightPrice;
  legs: FlightLeg[];
}

export interface SearchFlightsV2Response {
  status: boolean;
  timestamp: number;
  data: FlightItinerary[];
}

export interface SearchFlightsV2Params {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  cabinClass: string;
  adults: number;
  sortBy: string;
  currency: string;
  market: string;
  countryCode: string;
}