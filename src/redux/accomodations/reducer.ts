import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../enums/status';
import {
  createAccommodationAction,
  deleteAccommodationAction,
  fetchAccommodations,
  updateAccommodationAction,
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
  reducers: {
    closeAccommodationForm: (state) => {
      state.status = Status.IDLE;
      state.error = undefined;
    },
  },
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
        state.status = Status.IDLE;
        state.accommodations = payload;
      })
      .addCase(createAccommodationAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(createAccommodationAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(createAccommodationAction.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = Status.SUCCEEDED;
          state.accommodations.push(payload);
        }
      })
      .addCase(updateAccommodationAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(updateAccommodationAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(updateAccommodationAction.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = Status.SUCCEEDED;
          state.accommodations = state.accommodations.map((accommodation) => {
            if (accommodation.id === payload.id) {
              return payload;
            }
            return accommodation;
          });
        }
      })
      .addCase(deleteAccommodationAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(deleteAccommodationAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteAccommodationAction.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = Status.SUCCEEDED;
          state.accommodations = state.accommodations.filter(
            (accommodation) => accommodation.id !== payload
          );
        }
      });
  },
});

export const { closeAccommodationForm } = accommodationsSlice.actions;

export default accommodationsSlice.reducer;
