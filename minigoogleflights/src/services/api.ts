import axios from 'axios';
import * as FlightApiTypes from '../types/flightApi';
import * as MockData from '../__mocks__/mockData';

declare const process: { env: { [key: string]: string | undefined } };

// axios instance
export const apiClient = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/',
  headers: {
    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY || '',
  },
});

// request interceptor for auth
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

class FlightRepository {
  async getNearByAirports(lat: number, lng: number, locale = 'en-US') {
    const response = await apiClient.get(`/flights/getNearByAirports`, {
      params: { lat, lng, locale },
    });
    return response.data;
  }

  async searchAirport(query: string, locale = 'en-US') {
    const response = await apiClient.get(`/flights/searchAirport`, {
      params: { query, locale },
    });
    return response.data;
  }

  async searchFlightsV2(params: any) {
    const response = await apiClient.get(`/flights/searchFlights`, { params });
    return response.data;
  }

  async searchFlightsV1(params: any) {
    const response = await apiClient.get(`/flights/searchFlights`, { params });
    return response.data;
  }

  async searchFlightsComplete(params: any) {
    const response = await apiClient.get(`/flights/searchFlightsComplete`, { params });
    return response.data;
  }

  async searchIncomplete(params: any) {
    const response = await apiClient.get(`/flights/searchIncomplete`, { params });
    return response.data;
  }

  async getFlightDetails(params: any) {
    const response = await apiClient.get(`/flights/getFlightDetails`, { params });
    return response.data;
  }

  async getPriceCalendar(params: any) {
    const response = await apiClient.get(`/flights/getPriceCalendar`, { params });
    return response.data;
  }

  async searchFlightsMultiStops(params: any) {
    const response = await apiClient.get(`/flights/searchFlightsMultiStops`, { params });
    return response.data;
  }

  async searchFlightEverywhere(params: any) {
    const response = await apiClient.get(`/flights/searchFlightEverywhere`, { params });
    return response.data;
  }

  async searchFlightsWebComplete(params: any) {
    const response = await apiClient.get(`/flights/searchFlightsWebComplete`, { params });
    return response.data;
  }
}

export const flightRepository = new FlightRepository();

export { FlightApiTypes, MockData };
