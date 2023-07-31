import { deleteUser } from '@/firebase/cloudFunctions';
import { db } from '@/firebase/config';
import { ref, remove } from 'firebase/database';

export const deleteUserFB = async (userId: string) => {
  try {
    const reference = ref(db, `users/${userId}`);
    await remove(reference);
    await deleteUser(userId);
    return userId;
  } catch (error) {
    console.error(error);
    return false;
  }
};
