import { db } from '@/firebase/config';
import { ref, remove } from 'firebase/database';

export const deleteAccommodationFirebase = async (accommodationId: string) => {
  try {
    const reference = ref(db, `accommodations/${accommodationId}`);
    await remove(reference);
    return accommodationId;
  } catch (error) {
    console.error(error);
    return false;
  }
};
