import { Container } from '@mui/material';
import { Navbar } from './Navbar';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Navbar />
      <Container sx={{ py: { xs: 2, sm: 3 } }}>{children}</Container>
    </>
  );
};

export default Layout;
