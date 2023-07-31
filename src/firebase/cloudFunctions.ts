import { IUser, UserRegistrationFormProps } from '@/redux/users/interfaces';
import { httpsCallable } from 'firebase/functions';
import { functions } from './config';

export const addAdminRole = async (userId: string) => {
  const addAdminRole = httpsCallable(functions, 'addAdminRole');
  await addAdminRole(userId);
};

export const removeAdminRole = async (userId: string) => {
  const removeAdminRole = httpsCallable(functions, 'removeAdminRole');
  await removeAdminRole(userId);
};

export const createUser = async (user: UserRegistrationFormProps) => {
  const createUser = httpsCallable(functions, 'createUser');
  const createdUser = await createUser(user);
  return createdUser;
};

export const updateUser = async (user: IUser) => {
  const updateUser = httpsCallable(functions, 'updateUser');
  const updatedUser = await updateUser(user);
  return updatedUser;
};

export const deleteUser = async (userId: string) => {
  const deleteUser = httpsCallable(functions, 'deleteUser');
  const deletedUser = await deleteUser(userId);
  return deletedUser;
};
