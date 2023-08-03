import { dbRef } from '@/firebase/config';
import { AccommodationFormProps } from '@/redux/accomodations/interfaces';
import { child, get } from 'firebase/database';

export const getAccommodations = async () => {
  try {
    const snapshot = await get(child(dbRef, `accommodations/`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const arrayData = Object.entries(data).map(([id, guest]) => ({
        ...(guest as AccommodationFormProps),
        id,
      }));
      return arrayData;
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
