import { updateUser } from '@/firebase/cloudFunctions';
import { db } from '@/firebase/config';
import { IUser } from '@/redux/users/interfaces';
import { ref, set } from 'firebase/database';

export const setUser = async (editedUser: IUser) => {
  try {
    await updateUser(editedUser);

    const reference = ref(db, `users/${editedUser.id}`);
    await set(reference, editedUser);
    return editedUser;
  } catch (error) {
    console.error(error);
    return false;
  }
};
