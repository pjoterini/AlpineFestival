import Loader from '@/components/common/Loader';
import UsersContainer from '@/components/Users/UsersContainer';
import { auth } from '@/firebase/config';
import { t } from 'i18next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPageWithLayout } from '../_app';

const Users: NextPageWithLayout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>{t('common.organizers')}</title>
      </Head>
      {!loading && user ? <UsersContainer /> : <Loader />}
    </>
  );
};

export default Users;
