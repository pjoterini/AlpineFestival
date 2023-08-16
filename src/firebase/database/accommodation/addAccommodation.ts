import { db } from '@/firebase/config';
import { AccommodationFormProps } from '@/redux/accomodations/interfaces';
import { push, ref, set } from 'firebase/database';

export const addAccommodation = async (
  accommodation: AccommodationFormProps
) => {
  try {
    const reference = ref(db, 'accommodations/');
    const newReference = await push(reference);

    const createdId = newReference.key;

    const accommodationWithId = {
      id: createdId,
      ...accommodation,
    };
    await set(newReference, accommodationWithId);

    return accommodation;
  } catch (error) {
    console.error(error);
    return false;
  }
};
