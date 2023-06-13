import UsersTableContainer from '@/components/UsersTable/UsersTable.container';
import { auth } from '@/firebase/config';
import AdminLayout from '@/layouts/AdminLayout';
import { Navbar } from '@/layouts/Navbar';
import { Container, Typography } from '@mui/material';
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
      {!loading && user ? (
        <UsersTableContainer />
      ) : (
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      )}
    </>
  );
};
Users.getLayout = function NextPageWithLayout(page) {
  return (
    <>
      <Navbar />
      <AdminLayout />
      {page}
    </>
  );
};
export default Users;
