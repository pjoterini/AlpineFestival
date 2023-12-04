import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const FormContainer = ({ children }: IProps) => {
  return <Stack p={3}>{children}</Stack>;
};

export default FormContainer;
