import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Flight {
  id: string;
}

interface FlightsState {
  flights: Flight[];
}

const initialState: FlightsState = {
  flights: [],
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights(state, action: PayloadAction<Flight[]>) {
      state.flights = action.payload;
    },
  },
});

export const { setFlights } = flightsSlice.actions;
export default flightsSlice.reducer; 