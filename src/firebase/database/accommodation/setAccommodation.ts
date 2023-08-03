import { db } from '@/firebase/config';
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { ref, set } from 'firebase/database';

export const setAccommodation = async (editedAccommodation: IAccommodation) => {
  try {
    const reference = ref(db, `accommodations/${editedAccommodation.id}`);
    await set(reference, editedAccommodation);
    return editedAccommodation;
  } catch (error) {
    console.error(error);
    return false;
  }
};
