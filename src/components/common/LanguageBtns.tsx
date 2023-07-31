import { Box, Button, Stack } from '@mui/material';
import React from 'react';

export const LanguageBtns = () => {
  const changeLang = () => {
    console.log('change lang');
  };

  return (
    <Stack p={1} direction="row">
      <Box>
        <Button onClick={changeLang} variant="outlined">
          PL
        </Button>
      </Box>
      <Box pl={1}>
        <Button onClick={changeLang} variant="outlined">
          ENG
        </Button>
      </Box>
    </Stack>
  );
};
