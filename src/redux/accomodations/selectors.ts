import { RootState } from '../store';

export const selectAccommodations = (state: RootState) =>
  state.accommodations.accommodations;
export const selectAccommodationsStatus = (state: RootState) =>
  state.accommodations.status;
export const selectAccommodationsError = (state: RootState) =>
  state.accommodations.error;
