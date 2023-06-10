import firebaseApp from '@/firebase/config';
import { GuestRegistrationFormProps } from '@/redux/guest/interfaces';
import { getDatabase, push, ref, set } from 'firebase/database';

export function addGuest(guest: GuestRegistrationFormProps) {
  const db = getDatabase(firebaseApp);
  const reference = ref(db, 'guests/');
  const newReference = push(reference);

  set(newReference, guest);
}
