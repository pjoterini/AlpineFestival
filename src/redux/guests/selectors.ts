import { RootState } from '../store';

export const selectGuests = (state: RootState) => state.guests.guests;
export const selectGuestsStatus = (state: RootState) => state.guests.status;
export const selectGuestsError = (state: RootState) => state.guests.error;
