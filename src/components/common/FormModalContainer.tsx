import { Box } from '@mui/material';
import { ReactNode } from 'react';
interface IProps {
  children: ReactNode;
}

const FormModalContainer = ({ children }: IProps) => {
  return (
    <Box
      display="block"
      position="absolute"
      overflow="scroll"
      height="90%"
      maxHeight="700px"
      top="50%"
      left="50%"
      p={3}
      width="320px"
      bgcolor="background.paper"
      boxShadow="10"
      sx={{
        transform: 'translate(-50%, -50%)',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '0.8em',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#e9e9e9',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#a9a9a9',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default FormModalContainer;
