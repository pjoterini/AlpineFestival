import { updateUserCloudFunction } from '@/firebase/cloudFunctions';
import { db } from '@/firebase/config';
import { UserEditFormProps } from '@/redux/users/interfaces';
import { ref, set } from 'firebase/database';

export const setUserFirebase = async (editedUser: UserEditFormProps) => {
  try {
    const response = await updateUserCloudFunction(editedUser);

    if (response.data.errorInfo || !response.data) {
      return response;
    }

    const reference = ref(db, `users/${editedUser.id}`);
    await set(reference, editedUser);

    return response;
  } catch (error) {
    console.error(error);
  }
};
