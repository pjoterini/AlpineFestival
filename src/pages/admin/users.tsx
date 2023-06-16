import UsersTableContainer from '@/components/UsersTable/UsersTable.container';
import Loader from '@/components/common/Loader';
import { auth } from '@/firebase/config';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPageWithLayout } from '../_app';

const Users: NextPageWithLayout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      {!loading && user ? <UsersTableContainer /> : <Loader />}
    </>
  );
};

export default Users;
