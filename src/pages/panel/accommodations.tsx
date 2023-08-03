import AccommodationsTableContainer from '@/components/AccommodationsTable/AccommodationsTable.container';
import { t } from 'i18next';
import Head from 'next/head';

const AccommodationsTable = () => {
  return (
    <>
      <Head>
        <title>{t('common.accommodations')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccommodationsTableContainer />
    </>
  );
};

export default AccommodationsTable;
