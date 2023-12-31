import { dbRef } from '@/firebase/config';
import { GuestRegistrationFormProps } from '@/redux/guests/interfaces';
import { child, get } from 'firebase/database';

export const getGuests = async () => {
  try {
    const snapshot = await get(child(dbRef, `guests/`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const arrayData = Object.entries(data).map(([id, guest]) => ({
        ...(guest as GuestRegistrationFormProps),
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
