import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const FormButtonsContainer = ({ children }: IProps) => {
  return (
    <Box ml="auto" pt={2}>
      {children}
    </Box>
  );
};

export default FormButtonsContainer;
