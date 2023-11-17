import AccommodationsContainer from '@/components/Accommodations/AccommodationsContainer';
import Loader from '@/components/common/Loader';
import { auth } from '@/firebase/config';
import { t } from 'i18next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';

const Accommodations = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>{t('common.accommodations')}</title>
      </Head>
      {!loading && user ? <AccommodationsContainer /> : <Loader />}
    </>
  );
};

export default Accommodations;
