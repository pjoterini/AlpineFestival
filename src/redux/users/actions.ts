import { getUsers } from '@/firebase/database/user/getUsers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from './interfaces';
import { setUser } from '@/firebase/database/user/setUser';
import { deleteUserFB } from '@/firebase/database/user/deleteUser';

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

export const editUserAction = createAsyncThunk(
  'users/updateUser',
  async (editedUser: IUser) => {
    editedUser.tel = editedUser.tel.replace(/\s/g, '');
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
