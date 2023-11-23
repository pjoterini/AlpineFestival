import { createUserFirebase } from '@/firebase/database/user/createUser';
import { deleteUserFB } from '@/firebase/database/user/deleteUser';
import { getUsers } from '@/firebase/database/user/getUsers';
import { setUser } from '@/firebase/database/user/setUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, UserFormProps } from './interfaces';

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
  async (createdUser: UserFormProps) => {
    const response = await createUserFirebase(createdUser);

    if (response?.data.uid) {
      const createdUserWithId: IUser = {
        id: response.data.uid,
        ...createdUser,
      };
      return { response, createdUserWithId };
    }
    return { response };
  }
);

export const editUserAction = createAsyncThunk(
  'users/updateUser',
  async (editedUser: IUser) => {
    try {
      const data = await setUser(editedUser);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  'users/deleteUser',
  async (userId: string) => {
    try {
      const data = await deleteUserFB(userId);
      return data;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
);
