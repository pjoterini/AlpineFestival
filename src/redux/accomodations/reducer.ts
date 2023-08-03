import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../enums/status';
import {
  deleteAccommodation,
  fetchAccommodations,
  updateAccommodation,
} from './actions';
import { IAccommodation } from './interfaces';

interface IProps {
  accommodations: IAccommodation[];
  status: Status;
  error: undefined | string;
}

const initialState: IProps = {
  accommodations: [],
  status: Status.IDLE,
  error: undefined,
};

export const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchAccommodations.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        state.accommodations = payload;
      })
      .addCase(updateAccommodation.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        if (payload) {
          state.accommodations = state.accommodations.map((accommodation) => {
            if (accommodation.id === payload.id) {
              return payload;
            }
            return accommodation;
          });
        }
      })
      .addCase(deleteAccommodation.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;

        if (payload) {
          state.accommodations = state.accommodations.filter(
            (accommodation) => accommodation.id !== payload
          );
        }
      });
  },
});

export default accommodationsSlice.reducer;
