import UsersTableContainer from '@/components/UsersTable/UsersTable.container';
import Loader from '@/components/common/Loader';
import { auth } from '@/firebase/config';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPageWithLayout } from '../_app';

const UsersTable: NextPageWithLayout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Users Table</title>
      </Head>
      {!loading && user ? <UsersTableContainer /> : <Loader />}
    </>
  );
};

export default UsersTable;
