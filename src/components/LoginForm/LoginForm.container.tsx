import { loginUser } from '@/firebase/auth/loginUser';
import { useRouter } from 'next/router';
import { LoginForm } from './LoginForm.component';

export interface ILogin {
  userEmail: string;
  password: string;
}

export const LoginFormContainer = () => {
  const router = useRouter();

  const handleLogin = async (values: ILogin) => {
    await loginUser(values);
    router.replace('/admin');
  };

  return <LoginForm handleLogin={handleLogin} />;
};
