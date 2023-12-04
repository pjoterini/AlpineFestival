import { db } from '@/firebase/config';
import {
  GuestRegisterFormProps,
  GuestType,
  IGuest,
} from '@/redux/guests/interfaces';
import { push, ref, set } from 'firebase/database';

export const addGuest = async (guest: GuestRegisterFormProps) => {
  try {
    const reference = ref(db, 'guests/');
    const newReference = await push(reference);

    const createdId = newReference.key;

    const guestWithAllProps: IGuest = {
      id: createdId as string,
      checkIn: false,
      type: GuestType.NORMAL,
      organizer: '',
      accommodation: '',
      ...guest,
    };
    await set(newReference, guestWithAllProps);

    return guestWithAllProps;
  } catch (error) {
    console.error(error);
    return false;
  }
};
