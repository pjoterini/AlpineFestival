import { createSlice } from '@reduxjs/toolkit';
import { IUser, status } from './interfaces';
import { fetchUsers } from './actions';

interface IProps {
  users: IUser[];
  status: status;
  error: undefined | string;
}

const initialState: IProps = {
  users: [],
  status: status.IDLE,
  error: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = status.LOADING;
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = status.SUCCEEDED;
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = status.FAILED;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
