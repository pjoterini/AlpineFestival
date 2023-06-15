import GuestsTableContainer from '@/components/GuestsTable/GuestsTable.container';
import Loader from '@/components/common/Loader';
import { auth } from '@/firebase/config';
import AdminLayout from '@/layouts/AdminLayout';
import { Navbar } from '@/layouts/Navbar';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPageWithLayout } from '../_app';

const Guests: NextPageWithLayout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Guests</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && user ? <GuestsTableContainer /> : <Loader />}
    </>
  );
};

Guests.getLayout = function NextPageWithLayout(page) {
  return (
    <>
      <Navbar />
      <AdminLayout />
      {page}
    </>
  );
};

export default Guests;
