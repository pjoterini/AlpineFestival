import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updateUser, deleteUser } from './actions';
import { IUser } from './interfaces';
import { Status } from '../enums/status';

interface IProps {
  users: IUser[];
  status: Status;
  error: undefined | string;
}

const initialState: IProps = {
  users: [],
  status: Status.IDLE,
  error: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        state.users = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        if (payload) {
          state.users = state.users.map((user) => {
            if (user.id === payload.id) {
              user = payload;
            }
            return user;
          });
        }
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        if (payload) {
          state.users = state.users.filter((user) => user.id !== payload);
        }
      });
  },
});

export default usersSlice.reducer;
