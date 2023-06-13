import GuestRegistrationContainer from '@/components/GuestRegistration/GuestRegistration.container';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Guest Registration</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GuestRegistrationContainer />
    </>
  );
};

export default Home;
