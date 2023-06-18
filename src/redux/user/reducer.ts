import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './interfaces';

interface IProps {
  users: IUser[];
}

const initialState: IProps = {
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    pushUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { pushUsers } = userSlice.actions;

export default userSlice.reducer;
