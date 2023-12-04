import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../enums/status';
import {
  createGuestAction,
  deleteGuestAction,
  editGuestAction,
  fetchGuests,
} from './actions';
import { IGuest } from './interfaces';

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
  reducers: {
    closeGuestForm: (state) => {
      state.status = Status.IDLE;
      state.error = undefined;
    },
  },
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
        state.status = Status.IDLE;
        state.guests = payload;
      })
      .addCase(createGuestAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(createGuestAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(createGuestAction.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = Status.SUCCEEDED;
          state.guests.push(payload);
        }
      })
      .addCase(editGuestAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(editGuestAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(editGuestAction.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = Status.SUCCEEDED;
          state.guests = state.guests.map((guest) => {
            if (guest.id === payload.id) {
              return payload;
            }
            return guest;
          });
        }
      })
      .addCase(deleteGuestAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(deleteGuestAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteGuestAction.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = Status.SUCCEEDED;
          state.guests = state.guests.filter((guest) => guest.id !== payload);
        }
      });
  },
});

export const { closeGuestForm } = guestsSlice.actions;

export default guestsSlice.reducer;
