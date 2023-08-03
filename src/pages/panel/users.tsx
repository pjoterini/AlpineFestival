import UsersTableContainer from '@/components/UsersTable/UsersTable.container';
import Loader from '@/components/common/Loader';
import { auth } from '@/firebase/config';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NextPageWithLayout } from '../_app';
import { t } from 'i18next';

const UsersTable: NextPageWithLayout = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>{t('common.organizers')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && user ? <UsersTableContainer /> : <Loader />}
    </>
  );
};

export default UsersTable;
