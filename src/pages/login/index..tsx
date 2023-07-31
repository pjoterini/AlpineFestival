import { LoginFormContainer } from '@/components/LoginForm/LoginForm.container';
import Head from 'next/head';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginFormContainer />
    </>
  );
};

export default Login;
