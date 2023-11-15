import { Button, Dialog } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import AccommodationFormContainer from './AccommodationForm.container';

const AccommodationFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="contained"
        type="submit"
        size="large"
        sx={{ marginBottom: 3 }}
      >
        {t('accommodationForm.addAccommodation')}
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <AccommodationFormContainer />
      </Dialog>
    </>
  );
};

export default AccommodationFormModal;
