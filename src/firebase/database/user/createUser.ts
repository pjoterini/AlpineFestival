import { createUserCloudFunction } from '@/firebase/cloudFunctions';
import { db } from '@/firebase/config';
import { UserRegisterFormProps } from '@/redux/users/interfaces';
import { ref, set } from 'firebase/database';

export const createUserFirebase = async (user: UserRegisterFormProps) => {
  try {
    const response = await createUserCloudFunction(user);

    if (response.data.errorInfo) {
      return response;
    }

    const userId = response.data.uid;
    const reference = ref(db, `users/${userId}`);

    const userWithId = {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tel: user.tel,
      isAdmin: user.isAdmin,
    };

    set(reference, userWithId);

    return response;
  } catch (error) {
    console.error(error);
  }
};
