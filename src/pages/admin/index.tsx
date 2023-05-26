import AdminLayout from '@/components/AdminLayout/AdminLayout';
import GuestsTableContainer from '@/components/GuestsTable/GuestsTable.container';
import { auth } from '@/firebase/config';
import { Box } from '@mui/material';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPageWithLayout } from '../_app';

const Guests: NextPageWithLayout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Guests</title>
      </Head>
      {!loading && user ? <GuestsTableContainer /> : <Box>loading...</Box>}
    </>
  );
};

Guests.getLayout = AdminLayout;

export default Guests;
