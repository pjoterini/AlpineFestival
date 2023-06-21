import { getUsers } from '@/firebase/database/user/getUsers';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
