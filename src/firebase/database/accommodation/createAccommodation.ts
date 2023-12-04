import { db } from '@/firebase/config';
import {
  AccommodationFormProps,
  IAccommodation,
} from '@/redux/accomodations/interfaces';
import { push, ref, set } from 'firebase/database';

export const createAccommodationFirebase = async (
  accommodation: AccommodationFormProps
) => {
  try {
    const reference = ref(db, 'accommodations/');
    const newReference = await push(reference);
    const createdId = newReference.key;

    if (createdId) {
      const accommodationWithId: IAccommodation = {
        id: createdId,
        ...accommodation,
      };

      await set(newReference, accommodationWithId);

      return accommodationWithId;
    }

    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
