import { Box } from '@mui/material';
import { ReactNode } from 'react';
interface IProps {
  children: ReactNode;
}

const FormModalContainer = ({ children }: IProps) => {
  return <Box p={3}>{children}</Box>;
};

export default FormModalContainer;
