import { guestTypeOptions } from '@/components/Guests/GuestForm/selectInputsValues/guestTypeOptions';
import { db } from '@/firebase/config';
import { GuestRegisterFormProps } from '@/redux/guests/interfaces';
import { push, ref, set } from 'firebase/database';

export const addGuest = async (guest: GuestRegisterFormProps) => {
  try {
    const reference = ref(db, 'guests/');
    const newReference = await push(reference);

    const createdId = newReference.key;

    const guestWithAllProps = {
      id: createdId,
      checkIn: false,
      type: guestTypeOptions.Zwyczajny,
      organizer: '',
      accomodation: '',
      ...guest,
    };
    await set(newReference, guestWithAllProps);

    return guest;
  } catch (error) {
    console.error(error);
    return false;
  }
};
