import { createSlice } from '@reduxjs/toolkit';
import { deleteGuest, fetchGuests, updateGuest } from './actions';
import { IGuest } from './interfaces';
import { Status } from '../enums/status';

interface IProps {
  guests: IGuest[];
  status: Status;
  error: undefined | string;
}

const initialState: IProps = {
  guests: [],
  status: Status.IDLE,
  error: undefined,
};

export const guestsSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchGuests.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        state.guests = payload;
      })
      .addCase(updateGuest.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        if (payload) {
          state.guests = state.guests.map((guest) => {
            if (guest.id === payload.id) {
              return payload;
            }
            return guest;
          });
        }
      })
      .addCase(deleteGuest.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;

        if (payload) {
          state.guests = state.guests.filter((guest) => guest.id !== payload);
        }
      });
  },
});

export default guestsSlice.reducer;
