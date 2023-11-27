import { db } from '@/firebase/config';
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { ref, set } from 'firebase/database';

export const updateAccommodationFirebase = async (
  updatedAccommodation: IAccommodation
) => {
  try {
    const reference = ref(db, `accommodations/${updatedAccommodation.id}`);
    await set(reference, updatedAccommodation);
    return updatedAccommodation;
  } catch (error) {
    console.error(error);
    return false;
  }
};
