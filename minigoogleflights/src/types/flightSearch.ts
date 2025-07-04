export type Suggestion = {
  skyId: string;
  entityId: string;
  name: string;
  iataCode: string;
  country: string;
  suggestionTitle: string;
};

export type Airport = typeof import('../__mocks__/mockData').MOCK_CURRENT_AIRPORT;
export type NearbyAirport = (typeof import('../__mocks__/mockData').MOCK_NEARBY_AIRPORTS)[number];
