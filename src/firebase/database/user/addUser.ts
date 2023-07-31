import { createUser } from '@/firebase/cloudFunctions';
import { db } from '@/firebase/config';
import { UserRegistrationFormProps } from '@/redux/users/interfaces';
import { ref, set } from 'firebase/database';

export const addUserFB = async (user: UserRegistrationFormProps) => {
  try {
    const result = await createUser(user);

    const unknownData = result.data as { uid: string };
    const userId = unknownData.uid;

    const reference = ref(db, `users/${userId}`);

    const userWithId = {
      id: userId,
      ...user,
    };

    set(reference, userWithId);

    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
};
