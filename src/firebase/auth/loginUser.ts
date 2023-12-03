import { ILogin } from '@/components/LoginForm/LoginForm.container';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';

export const loginUser = async (values: ILogin) => {
  const { userEmail, password } = values;
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return error;
    }
  }
};
