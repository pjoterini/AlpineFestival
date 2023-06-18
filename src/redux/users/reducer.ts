import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './interfaces';

const initialState: IUser[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
