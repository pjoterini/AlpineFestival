import { USER_FORM, PANEL, USERS_TABLE } from '@/constants/routes';
import { Tab, Tabs } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { t } from 'i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const a11yProps = (index: number) => ({
  id: `nav-tab-${index}`,
  'aria-controls': `nav-tabpanel-${index}`,
});

interface IProps {
  isAdmin: boolean;
}

const AdminNavbar = ({ isAdmin }: IProps) => {
  const { asPath } = useRouter();

  return (
    <Toolbar
      sx={{
        paddingLeft: { xs: 0, md: 2 },
        paddingRight: { xs: 0, md: 2 },
        alignItems: 'flex-end',
      }}
    >
      <Tabs value={asPath}>
        <Tab
          sx={{
            paddingLeft: { xs: 0, md: 2 },
            paddingRight: { xs: 1, md: 2 },
          }}
          label={t('common.guests')}
          component={Link}
          href={PANEL}
          value={PANEL}
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            paddingLeft: { xs: 0, md: 2 },
            paddingRight: { xs: 2, md: 2 },
          }}
          label={t('common.organizers')}
          component={Link}
          href={USERS_TABLE}
          value={USERS_TABLE}
          {...a11yProps(1)}
        />
        {isAdmin && (
          <Tab
            sx={{
              paddingLeft: { xs: 0, md: 2 },
              paddingRight: { xs: 1, md: 2 },
            }}
            label={t('userForm.userForm')}
            component={Link}
            href={USER_FORM}
            value={USER_FORM}
            {...a11yProps(2)}
          />
        )}
      </Tabs>
    </Toolbar>
  );
};

export default AdminNavbar;
