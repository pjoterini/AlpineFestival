import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config';
import { ILogin } from '@/components/LoginForm/LoginForm.container';
import { Dispatch, SetStateAction } from 'react';

export const loginUser = async (
  values: ILogin,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  redirectToUserPanel: () => Promise<boolean>
) => {
  const { userEmail, password } = values;

  signInWithEmailAndPassword(auth, userEmail, password)
    .then(() => {
      redirectToUserPanel();
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      setErrorMessage(error.message);
    });
};
