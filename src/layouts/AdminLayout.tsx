import { ADMIN_PANEL, ADMIN_USERS } from '@/constants/routes';
import { AppBar, Container, Tab, Tabs, Toolbar } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const a11yProps = (index: number) => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`,
});

const AdminLayout = () => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'white', height: '48px' }}
      >
        <Container>
          <Toolbar sx={{ alignItems: 'start' }}>
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
        </Container>
      </AppBar>
    </>
  );
};

export default AdminLayout;
