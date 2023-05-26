import { auth } from '../config';

export const logoutUser = async () => {
  auth.signOut();
};
