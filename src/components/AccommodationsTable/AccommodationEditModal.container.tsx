import AccommodationForm from '@/components/AccommodationForm/AccommodationForm.component';
import { FormType, IAccommodation } from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { addAccommodation } from '@/firebase/database/accommodation/addAccommodation';
import {
  deleteAccommodationAction,
  updateAccommodation,
} from '@/redux/accomodations/actions';
import {
  AccommodationFormProps,
  ResetAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { useAppDispatch } from '@/redux/store';
import { useState } from 'react';
interface IProps {
  open: boolean;
  currentRow: IAccommodation | null;
  handleClose: () => void;
}

const AccommodationEditModal = ({ open, currentRow, handleClose }: IProps) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const dispatch = useAppDispatch();

  const createAccommodation = async (
    values: AccommodationFormProps,
    resetForm: ResetAccommodationForm
  ) => {
    const result = await addAccommodation(values);
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };

  const editAccommodation = async (
    values: AccommodationFormProps,
    accommodationId: string | undefined
  ) => {
    const result =
      accommodationId &&
      (await dispatch(updateAccommodation({ id: accommodationId, ...values })));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
    }
  };

  const deleteAccommodation = async (accommodationId: string) => {
    const result = await dispatch(deleteAccommodationAction(accommodationId));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setFormSubmitStatus(Status.IDLE);
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        position="absolute"
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
        top="50%"
        left="50%"
        p={4}
        width="320"
        borderRadius={2}
        boxShadow="24"
        bgcolor="background.paper"
      >
        <AccommodationForm
          formType={FormType.EDIT}
          formSubmitStatus={formSubmitStatus}
          createAccommodation={createAccommodation}
          editAccommodation={editAccommodation}
          deleteAccommodation={deleteAccommodation}
          currentRow={currentRow}
        />
      </Box>
    </Modal>
  );
};

export default AccommodationEditModal;
