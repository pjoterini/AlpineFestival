import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';
import { ILogin } from '@/components/LoginForm/LoginForm.container';

export const loginUser = async (values: ILogin) => {
  const { userEmail, password } = values;

  await signInWithEmailAndPassword(auth, userEmail, password);
};
