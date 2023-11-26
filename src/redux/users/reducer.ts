import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../enums/status';
import {
  createUserAction,
  deleteUserAction,
  editUserAction,
  fetchUsers,
} from './actions';
import { IUser } from './interfaces';

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
  reducers: {
    closeUserForm: (state) => {
      state.status = Status.IDLE;
      state.error = undefined;
    },
  },
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
        state.users = payload;
        state.status = Status.IDLE;
      })
      .addCase(createUserAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(createUserAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(createUserAction.fulfilled, (state, { payload }) => {
        if (payload?.createdUserWithId) {
          state.status = Status.SUCCEEDED;
          state.users.push(payload.createdUserWithId);
        }

        if (payload?.response.data.errorInfo) {
          state.status = Status.FAILED;
          state.error = payload.response.data.errorInfo.message;
        }
        if (!payload?.response.data) {
          state.status = Status.FAILED;
        }
      })
      .addCase(editUserAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(editUserAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(editUserAction.fulfilled, (state, { payload }) => {
        if (payload?.editedUser) {
          state.status = Status.SUCCEEDED;
          state.users = state.users.map((user) => {
            if (user.id === payload.editedUser?.id) {
              user = payload.editedUser;
            }
            return user;
          });
        }

        if (payload?.response.data.errorInfo) {
          state.status = Status.FAILED;
          state.error = payload.response.data.errorInfo.message;
        }
      })
      .addCase(deleteUserAction.pending, (state) => {
        state.status = Status.LOADING;
        state.error = undefined;
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteUserAction.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = Status.SUCCEEDED;
          state.users = state.users.filter((user) => user.id !== payload);
        }
      });
  },
});

export const { closeUserForm } = usersSlice.actions;

export default usersSlice.reducer;
