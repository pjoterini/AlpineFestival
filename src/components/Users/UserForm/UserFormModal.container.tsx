import { useIsAdmin } from '@/firebase/auth/useIsAdmin';
import { useAppDispatch } from '@/redux/store';
import { closeUserForm } from '@/redux/users/reducer';
import { Button, Dialog } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import UserFormContainer from './UserForm.container';

const UserFormModal = () => {
  const { isAdmin } = useIsAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

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
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          dispatch(closeUserForm());
        }}
      >
        <UserFormContainer />
      </Dialog>
    </>
  );
};

export default UserFormModal;
