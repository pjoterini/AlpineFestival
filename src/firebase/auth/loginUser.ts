import { ILogin } from '@/pages/login';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../config';

export const loginUser = async (values: ILogin) => {
  const { userEmail, password } = values;

  await signInWithEmailAndPassword(auth, userEmail, password);
};
