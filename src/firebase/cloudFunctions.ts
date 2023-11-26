import {
  IMutateUserCloudFunctionResponse,
  UserEditFormProps,
  UserRegisterFormProps,
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

export const createUserCloudFunction = async (user: UserRegisterFormProps) => {
  const createUser = httpsCallable<
    UserRegisterFormProps,
    IMutateUserCloudFunctionResponse
  >(functions, 'createUser');
  const response = await createUser(user);
  console.log(response);
  return response;
};

export const updateUserCloudFunction = async (user: UserEditFormProps) => {
  const updateUser = httpsCallable<
    UserEditFormProps,
    IMutateUserCloudFunctionResponse
  >(functions, 'updateUser');
  const response = await updateUser(user);
  console.log(response);

  return response;
};

export const deleteUserCloudFunction = async (userId: string) => {
  const deleteUser = httpsCallable<string, IMutateUserCloudFunctionResponse>(
    functions,
    'deleteUser'
  );
  const response = await deleteUser(userId);
  console.log(response);

  return response;
};
