import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import { deleteGuestAction, editGuestAction } from '@/redux/guests/actions';
import { GuestEditFormProps, IGuest } from '@/redux/guests/interfaces';
import { useAppDispatch } from '@/redux/store';
import { Box, Modal } from '@mui/material';
import { DefaultTFuncReturn, t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import GuestForm from '../GuestForm/GuestForm.component';

interface IProps {
  currentRow: IGuest | null;
  setCurrentRow: Dispatch<SetStateAction<IGuest | null>>;
}

const GuestEditModal = ({ currentRow, setCurrentRow }: IProps) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | DefaultTFuncReturn>(
    ''
  );
  const dispatch = useAppDispatch();

  const editGuest = async (
    values: GuestEditFormProps,
    guestId: string | undefined
  ) => {
    const result =
      guestId && (await dispatch(editGuestAction({ id: guestId, ...values })));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
      setErrorMessage('something went wrong');
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
    }
  };

  const deleteGuest = async (guestId: string) => {
    if (window.confirm(t<string>('validation.deleteGuest'))) {
      const result = await dispatch(deleteGuestAction(guestId));
      if (!result) {
        setFormSubmitStatus(Status.FAILED);
        setErrorMessage(t('formValidation.formSubmitMessageError'));
      } else {
        setFormSubmitStatus(Status.SUCCEEDED);
      }
    }
  };

  return (
    <Modal
      open={!!currentRow}
      onClose={() => {
        setFormSubmitStatus(Status.IDLE);
        setCurrentRow(null);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="block"
        position="absolute"
        overflow="scroll"
        height="90%"
        sx={{
          transform: 'translate(-50%, -50%)',
          overflowX: 'hidden',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
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
        top="50%"
        left="50%"
        p={3}
        width="320px"
        boxShadow="10"
        bgcolor="background.paper"
      >
        <GuestForm
          formType={FormType.EDIT}
          formSubmitStatus={formSubmitStatus}
          editGuest={editGuest}
          deleteGuest={deleteGuest}
          currentRow={currentRow}
          errorMessage={errorMessage}
        />
      </Box>
    </Modal>
  );
};

export default GuestEditModal;
