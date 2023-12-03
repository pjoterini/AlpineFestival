import { createAccommodationFirebase } from '@/firebase/database/accommodation/createAccommodation';
import { deleteAccommodationFirebase } from '@/firebase/database/accommodation/deleteAccommodation';
import { getAccommodations } from '@/firebase/database/accommodation/getAccommodations';
import { updateAccommodationFirebase } from '@/firebase/database/accommodation/updateAccommodation';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccommodationFormProps, IAccommodation } from './interfaces';

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

export const createAccommodationAction = createAsyncThunk(
  'accommodations/createAccommodation',
  async (createdAccommodation: AccommodationFormProps) => {
    try {
      const data = await createAccommodationFirebase(createdAccommodation);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateAccommodationAction = createAsyncThunk(
  'accommodations/updateAccommodation',
  async (updatedAccommodation: IAccommodation) => {
    try {
      const data = await updateAccommodationFirebase(updatedAccommodation);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteAccommodationAction = createAsyncThunk(
  'accommodation/deleteAccommodation',
  async (accommodationId: string) => {
    try {
      const data = await deleteAccommodationFirebase(accommodationId);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
