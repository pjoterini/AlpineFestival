import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './interfaces';
import { fetchUsers } from './actions';

interface IProps {
  users: IUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: undefined | string;
}

const initialState: IProps = {
  users: [],
  status: 'idle',
  error: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
