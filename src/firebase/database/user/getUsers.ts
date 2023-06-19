import firebaseApp from '@/firebase/config';
import { IUser } from '@/redux/users/interfaces';
import { child, get, getDatabase, ref } from 'firebase/database';

export const getUsers = async () => {
  const dbRef = ref(getDatabase(firebaseApp));

  try {
    const snapshot = await get(child(dbRef, `users/`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const arrayData = Object.entries(data).map(([id, user]) => ({
        ...(user as IUser),
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
