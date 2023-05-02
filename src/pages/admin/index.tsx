import AdminLayout from '@/components/AdminLayout/AdminLayout';
import GuestsTableContainer from '@/components/GuestsTable/GuestsTable.container';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';

const Guests: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Guests</title>
      </Head>
      <GuestsTableContainer />
    </>
  );
};

Guests.getLayout = AdminLayout;

export default Guests;
