import { PANEL } from '@/constants/routes';
import { loginUser } from '@/firebase/auth/loginUser';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginForm } from './LoginForm.component';

export interface ILogin {
  userEmail: string;
  password: string;
}

export const LoginFormContainer = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleLogin = async (values: ILogin) => {
    const result = await loginUser(values);

    if (result instanceof Error) {
      setErrorMessage(result.message);
    } else {
      router.replace(PANEL);
    }
  };

  return <LoginForm handleLogin={handleLogin} errorMessage={errorMessage} />;
};
