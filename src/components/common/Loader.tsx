import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress size={45} color="primary" />
    </Box>
  );
};

export default Loader;
