import { db } from '@/firebase/config';
import { ref, remove } from 'firebase/database';

export const deleteGuestFB = async (guestId: string) => {
  try {
    const reference = ref(db, `guests/${guestId}`);
    await remove(reference);
    return guestId;
  } catch (error) {
    console.error(error);
    return false;
  }
};
