import FormModalContainer from '@/components/common/FormModalContainer';
import { Button, Modal } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import UserFormContainer from './UserForm.container';

const UserFormModal = () => {
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
        {t('userForm.addUser')}
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormModalContainer>
          <UserFormContainer />
        </FormModalContainer>
      </Modal>
    </>
  );
};

export default UserFormModal;
