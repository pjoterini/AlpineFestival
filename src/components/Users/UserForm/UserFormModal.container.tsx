import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { Button, Dialog } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import UserFormContainer from './UserForm.container';

const UserFormModal = () => {
  const { isAdmin } = useIsAdmin();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          isAdmin && setIsOpen(true);
        }}
        variant="contained"
        type="submit"
        size="large"
        sx={{ marginBottom: 3 }}
      >
        {t('userForm.addUser')}
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <UserFormContainer />
      </Dialog>
    </>
  );
};

export default UserFormModal;
