import { Container } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import { Navbar } from './Navbar';
import { useRouter } from 'next/router';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      {router.pathname.includes('admin') && <AdminNavbar />}
      <Container sx={{ py: { xs: 2, sm: 3 } }}>{children}</Container>
    </>
  );
};

export default Layout;
