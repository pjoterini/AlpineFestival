import { LoginFormContainer } from '@/components/LoginForm/LoginForm.container';
import Head from 'next/head';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginFormContainer />
    </>
  );
};

export default Login;
