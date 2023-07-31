import { db } from '@/firebase/config';
import { IGuest } from '@/redux/guests/interfaces';
import { ref, set } from 'firebase/database';

export const setGuest = async (editedGuest: IGuest) => {
  try {
    const reference = ref(db, `guests/${editedGuest.id}`);
    await set(reference, editedGuest);
    return editedGuest;
  } catch (error) {
    console.error(error);
    return false;
  }
};
