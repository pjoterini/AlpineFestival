import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from './interfaces';
import { getUsers } from '@/firebase/database/user/getUsers';

interface IProps {
  users: IUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: IProps = {
  users: [],
  status: 'idle',
  error: null,
};

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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
    });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
