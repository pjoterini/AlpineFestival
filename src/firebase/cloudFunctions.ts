import {
  ICreateUserCloudFunctionResponse,
  IUser,
  UserFormProps,
} from '@/redux/users/interfaces';
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

export const createUser = async (user: UserFormProps) => {
  const createUser = httpsCallable<
    UserFormProps,
    ICreateUserCloudFunctionResponse
  >(functions, 'createUser');
  const result = await createUser(user);

  return result;
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
