import AdminLayout from '@/components/AdminLayout/AdminLayout';
import Head from 'next/head';
import { NextPageWithLayout } from '../_app';
import { Box } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import UsersTableContainer from '@/components/UsersTable/UsersTable.container';

const Users: NextPageWithLayout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      {!loading && user ? <UsersTableContainer /> : <Box>loading...</Box>}
    </>
  );
};

Users.getLayout = AdminLayout;

export default Users;
