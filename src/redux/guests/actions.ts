import { getGuests } from '@/firebase/database/guest/getGuests';
import { setGuest } from '@/firebase/database/guest/setGuest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGuest } from './interfaces';
import { deleteGuestFB } from '@/firebase/database/guest/deleteGuest';

export const fetchGuests = createAsyncThunk('guests/fetchGuests', async () => {
  try {
    const data = await getGuests();
    if (data) {
      return data;
    }
  } catch (err) {
    console.error(err);
  }
  return [];
});

export const editGuestAction = createAsyncThunk(
  'guests/editGuest',
  async (editedGuest: IGuest) => {
    try {
      const data = await setGuest(editedGuest);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
);

export const deleteGuestAction = createAsyncThunk(
  'guests/deleteGuest',
  async (guestId: string) => {
    try {
      const data = await deleteGuestFB(guestId);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
);
