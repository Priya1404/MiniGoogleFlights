export const MOCK_FLIGHTS = [
  // London Heathrow → New York JFK
  {
    id: 'LHR-JFK-1',
    price: { raw: 420, formatted: '$420' },
    legs: [
      {
        id: 'leg1',
        origin: { displayCode: 'LHR', name: 'London Heathrow' },
        destination: { displayCode: 'JFK', name: 'New York John F. Kennedy' },
        departure: '2024-07-01T09:00:00',
        arrival: '2024-07-01T12:00:00',
        durationInMinutes: 420,
        stopCount: 0,
        carriers: {
          marketing: [
            {
              name: 'British Airways',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/BA.png',
            },
          ],
        },
      },
    ],
  },
  // London Heathrow → Delhi
  {
    id: 'LHR-DEL-1',
    price: { raw: 380, formatted: '$380' },
    legs: [
      {
        id: 'leg2',
        origin: { displayCode: 'LHR', name: 'London Heathrow' },
        destination: { displayCode: 'DEL', name: 'Delhi Indira Gandhi' },
        departure: '2024-07-01T14:00:00',
        arrival: '2024-07-01T23:00:00',
        durationInMinutes: 540,
        stopCount: 1,
        carriers: {
          marketing: [
            {
              name: 'Air India',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/AI.png',
            },
          ],
        },
      },
    ],
  },
  // New York JFK → London Heathrow
  {
    id: 'JFK-LHR-1',
    price: { raw: 450, formatted: '$450' },
    legs: [
      {
        id: 'leg3',
        origin: { displayCode: 'JFK', name: 'New York John F. Kennedy' },
        destination: { displayCode: 'LHR', name: 'London Heathrow' },
        departure: '2024-07-02T10:00:00',
        arrival: '2024-07-02T22:00:00',
        durationInMinutes: 480,
        stopCount: 0,
        carriers: {
          marketing: [
            {
              name: 'Virgin Atlantic',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/VS.png',
            },
          ],
        },
      },
    ],
  },
  // New York JFK → Delhi
  {
    id: 'JFK-DEL-1',
    price: { raw: 700, formatted: '$700' },
    legs: [
      {
        id: 'leg4',
        origin: { displayCode: 'JFK', name: 'New York John F. Kennedy' },
        destination: { displayCode: 'DEL', name: 'Delhi Indira Gandhi' },
        departure: '2024-07-03T08:00:00',
        arrival: '2024-07-03T22:00:00',
        durationInMinutes: 840,
        stopCount: 1,
        carriers: {
          marketing: [
            { name: 'United', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/UA.png' },
          ],
        },
      },
    ],
  },
  // Delhi → London Heathrow
  {
    id: 'DEL-LHR-1',
    price: { raw: 410, formatted: '$410' },
    legs: [
      {
        id: 'leg5',
        origin: { displayCode: 'DEL', name: 'Delhi Indira Gandhi' },
        destination: { displayCode: 'LHR', name: 'London Heathrow' },
        departure: '2024-07-04T06:00:00',
        arrival: '2024-07-04T12:00:00',
        durationInMinutes: 510,
        stopCount: 0,
        carriers: {
          marketing: [
            {
              name: 'Vistara',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/UK.png',
            },
          ],
        },
      },
    ],
  },
  // Delhi → New York JFK
  {
    id: 'DEL-JFK-1',
    price: { raw: 800, formatted: '$800' },
    legs: [
      {
        id: 'leg6',
        origin: { displayCode: 'DEL', name: 'Delhi Indira Gandhi' },
        destination: { displayCode: 'JFK', name: 'New York John F. Kennedy' },
        departure: '2024-07-05T07:00:00',
        arrival: '2024-07-05T19:00:00',
        durationInMinutes: 900,
        stopCount: 1,
        carriers: {
          marketing: [
            {
              name: 'Air India',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/AI.png',
            },
          ],
        },
      },
    ],
  },
  // New York JFK → Delhi
  {
    id: 'JFK-DEL-2',
    price: { raw: 720, formatted: '$720' },
    legs: [
      {
        id: 'leg7',
        origin: { displayCode: 'JFK', name: 'New York John F. Kennedy' },
        destination: { displayCode: 'DEL', name: 'Delhi Indira Gandhi' },
        departure: '2024-07-06T09:00:00',
        arrival: '2024-07-06T23:00:00',
        durationInMinutes: 840,
        stopCount: 1,
        carriers: {
          marketing: [
            { name: 'Delta', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/DL.png' },
          ],
        },
      },
    ],
  },
  // London Heathrow → New York JFK (extra)
  {
    id: 'LHR-JFK-2',
    price: { raw: 530, formatted: '$530' },
    legs: [
      {
        id: 'leg8',
        origin: { displayCode: 'LHR', name: 'London Heathrow' },
        destination: { displayCode: 'JFK', name: 'New York John F. Kennedy' },
        departure: '2024-07-07T11:00:00',
        arrival: '2024-07-07T14:00:00',
        durationInMinutes: 420,
        stopCount: 0,
        carriers: {
          marketing: [
            {
              name: 'American Airlines',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/AA.png',
            },
          ],
        },
      },
    ],
  },
  // Delhi → London Heathrow (extra)
  {
    id: 'DEL-LHR-2',
    price: { raw: 430, formatted: '$430' },
    legs: [
      {
        id: 'leg9',
        origin: { displayCode: 'DEL', name: 'Delhi Indira Gandhi' },
        destination: { displayCode: 'LHR', name: 'London Heathrow' },
        departure: '2024-07-08T08:00:00',
        arrival: '2024-07-08T14:00:00',
        durationInMinutes: 510,
        stopCount: 0,
        carriers: {
          marketing: [
            {
              name: 'British Airways',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/BA.png',
            },
          ],
        },
      },
    ],
  },
];

export const MOCK_SUGGESTIONS = [
  {
    skyId: 'LHR',
    entityId: '123',
    name: 'London Heathrow',
    iataCode: 'LHR',
    country: 'United Kingdom',
    suggestionTitle: 'London Heathrow (LHR)',
  },
  {
    skyId: 'JFK',
    entityId: '456',
    name: 'New York John F. Kennedy',
    iataCode: 'JFK',
    country: 'United States',
    suggestionTitle: 'New York John F. Kennedy (JFK)',
  },
  {
    skyId: 'DEL',
    entityId: '789',
    name: 'Delhi Indira Gandhi',
    iataCode: 'DEL',
    country: 'India',
    suggestionTitle: 'Delhi Indira Gandhi (DEL)',
  },
];

export const MOCK_CURRENT_AIRPORT = {
  skyId: 'BOM',
  entityId: '95673320',
  presentation: {
    title: 'Mumbai',
    suggestionTitle: 'Mumbai (BOM)',
    subtitle: 'India',
  },
};

export const MOCK_NEARBY_AIRPORTS = [
  {
    navigation: {
      relevantFlightParams: {
        skyId: 'PNQ',
        entityId: '95673321',
      },
    },
    presentation: {
      title: 'Pune',
      suggestionTitle: 'Pune (PNQ)',
      subtitle: 'India',
    },
  },
  {
    navigation: {
      relevantFlightParams: {
        skyId: 'GOI',
        entityId: '95673322',
      },
    },
    presentation: {
      title: 'Goa',
      suggestionTitle: 'Goa (GOI)',
      subtitle: 'India',
    },
  },
];

export const MOCK_MULTI_STOP_FLIGHTS = [
  {
    id: 'multi1',
    price: { raw: 309, formatted: '$309' },
    legs: [
      {
        id: 'leg1',
        origin: { displayCode: 'AMD', name: 'Ahmedabad' },
        destination: { displayCode: 'STV', name: 'Surat' },
        departure: '2025-02-07T15:35:00',
        arrival: '2025-02-07T21:00:00',
        durationInMinutes: 325,
        stopCount: 1,
        carriers: {
          marketing: [
            {
              name: 'Vistara',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/IK.png',
            },
            {
              name: 'AirAsia India',
              logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/04.png',
            },
          ],
        },
      },
      {
        id: 'leg2',
        origin: { displayCode: 'STV', name: 'Surat' },
        destination: { displayCode: 'BOM', name: 'Mumbai' },
        departure: '2025-02-12T22:30:00',
        arrival: '2025-02-13T04:00:00',
        durationInMinutes: 330,
        stopCount: 1,
        carriers: {
          marketing: [
            { name: 'IndiGo', logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/6E.png' },
          ],
        },
      },
    ],
  },
];

export const MOCK_PRICE_CALENDAR = {
  status: true,
  timestamp: Date.now(),
  data: {
    flights: {
      noPriceLabel: 'No price information',
      groups: [
        { id: 'low', label: '$' },
        { id: 'medium', label: '$$' },
        { id: 'high', label: '$$$' },
      ],
      days: [
        { day: '2024-07-01', group: 'low', price: 420 },
        { day: '2024-07-02', group: 'medium', price: 520 },
        { day: '2024-07-03', group: 'high', price: 620 },
      ],
      currency: 'USD',
    },
  },
};

export const MOCK_FLIGHT_DETAILS = {
  status: true,
  timestamp: Date.now(),
  data: {
    itinerary: {
      legs: [
        {
          id: 'leg1',
          origin: { id: 'LHR', name: 'London Heathrow', displayCode: 'LHR', city: 'London' },
          destination: {
            id: 'JFK',
            name: 'New York John F. Kennedy',
            displayCode: 'JFK',
            city: 'New York',
          },
          segments: [],
          duration: 420,
          stopCount: 0,
          departure: '2024-07-01T09:00:00',
          arrival: '2024-07-01T12:00:00',
          dayChange: 0,
        },
      ],
      pricingOptions: [
        {
          agents: [
            {
              id: 'ba',
              name: 'British Airways',
              isCarrier: true,
              bookingProposition: 'PBOOK',
              url: 'https://www.britishairways.com/',
            },
          ],
          price: { raw: 420, formatted: '$420' },
          deeplink: 'https://www.britishairways.com/',
        },
      ],
    },
  },
};