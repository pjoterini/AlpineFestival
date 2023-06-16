import { ADMIN_PANEL, ADMIN_USERS } from '@/constants/routes';
import { Tab, Tabs } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const a11yProps = (index: number) => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`,
});

const AdminNavbar = () => {
  const { asPath } = useRouter();

  return (
    <Toolbar sx={{ alignItems: 'flex-end' }}>
      <Tabs value={asPath}>
        <Tab
          label={t('common.guests')}
          component={Link}
          href={ADMIN_PANEL}
          value={ADMIN_PANEL}
          {...a11yProps(0)}
        />
        <Tab
          label={t('common.organizers')}
          component={Link}
          href={ADMIN_USERS}
          value={ADMIN_USERS}
          {...a11yProps(1)}
        />
      </Tabs>
    </Toolbar>
  );
};

export default AdminNavbar;
