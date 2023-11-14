import { ACCOMMODATIONS, PANEL, USERS } from '@/constants/routes';
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
    <Toolbar
      sx={{
        paddingLeft: { xs: 0, md: 2 },
        paddingRight: { xs: 0, md: 2 },
        alignItems: 'flex-end',
      }}
    >
      <Tabs value={asPath} variant="scrollable" allowScrollButtonsMobile>
        <Tab
          label={t('common.guests')}
          component={Link}
          href={PANEL}
          value={PANEL}
          {...a11yProps(0)}
        />
        <Tab
          label={t('common.organizers')}
          component={Link}
          href={USERS}
          value={USERS}
          {...a11yProps(1)}
        />
        <Tab
          label={t('common.accommodations')}
          component={Link}
          href={ACCOMMODATIONS}
          value={ACCOMMODATIONS}
          {...a11yProps(3)}
        />
      </Tabs>
    </Toolbar>
  );
};

export default AdminNavbar;
