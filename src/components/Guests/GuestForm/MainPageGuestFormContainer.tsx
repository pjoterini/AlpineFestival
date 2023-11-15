import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const MainPageGuestFormContainer = ({ children }: IProps) => {
  return (
    <Box maxWidth="500px" width="100%" mx="auto">
      {children}
    </Box>
  );
};

export default MainPageGuestFormContainer;
