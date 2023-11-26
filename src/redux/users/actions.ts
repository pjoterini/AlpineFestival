import { createUserFirebase } from '@/firebase/database/user/createUser';
import { deleteUserFirebase } from '@/firebase/database/user/deleteUser';
import { getUsers } from '@/firebase/database/user/getUsers';
import { setUserFirebase } from '@/firebase/database/user/setUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, UserEditFormProps, UserRegisterFormProps } from './interfaces';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const data = await getUsers();
    if (data) {
      return data;
    }
  } catch (err) {
    console.error(err);
  }
  return [];
});

export const createUserAction = createAsyncThunk(
  'users/createUser',
  async (createdUser: UserRegisterFormProps) => {
    const response = await createUserFirebase(createdUser);

    if (response?.data.uid) {
      const createdUserWithId: IUser = {
        id: response.data.uid,
        ...createdUser,
      };
      return { response, createdUserWithId };
    } else if (response?.data.errorInfo) {
      return { response };
    }
  }
);

export const editUserAction = createAsyncThunk(
  'users/updateUser',
  async (editedUser: UserEditFormProps) => {
    const response = await setUserFirebase(editedUser);

    if (response?.data.uid) {
      return { response, editedUser };
    } else if (response?.data.errorInfo && !response.data) {
      return { response };
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  'users/deleteUser',
  async (userId: string) => {
    try {
      const data = await deleteUserFirebase(userId);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
);
