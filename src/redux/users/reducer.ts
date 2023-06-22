import { createSlice } from '@reduxjs/toolkit';
import { IUser, Status } from './interfaces';
import { fetchUsers } from './actions';

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
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = Status.SUCCEEDED;
        state.users = payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
