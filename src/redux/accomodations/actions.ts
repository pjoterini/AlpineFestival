import { deleteAccommodationFB } from '@/firebase/database/accommodation/deleteAccommodation';
import { getAccommodations } from '@/firebase/database/accommodation/getAccommodations';
import { setAccommodation } from '@/firebase/database/accommodation/setAccommodation';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAccommodation } from './interfaces';

export const fetchAccommodations = createAsyncThunk(
  'accommodations/fetchAccommodations',
  async () => {
    try {
      const data = await getAccommodations();
      if (data) {
        return data;
      }
    } catch (err) {
      console.error(err);
    }
    return [];
  }
);

export const updateAccommodation = createAsyncThunk(
  'accommodations/updateAccommodation',
  async (editedAccommodation: IAccommodation) => {
    try {
      const data = await setAccommodation(editedAccommodation);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
);

export const deleteAccommodationAction = createAsyncThunk(
  'accommodation/deleteAccommodation',
  async (accommodationId: string) => {
    try {
      const data = await deleteAccommodationFB(accommodationId);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
);
