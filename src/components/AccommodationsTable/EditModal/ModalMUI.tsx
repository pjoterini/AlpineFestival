import {
  deleteAccommodation,
  updateAccommodation,
} from '@/redux/accomodations/actions';
import {
  IAccommodation,
  ResetEditAccommodationForm,
} from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import { useAppDispatch } from '@/redux/store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import EditAccommodationForm from './EditAccommodationForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  borderRadius: 2,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
  currentRow: IAccommodation | null;
  handleClose: () => void;
}

const ModalMUI = ({ open, currentRow, handleClose }: IProps) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const dispatch = useAppDispatch();

  const onDelete = async (accommodationId: string) => {
    const result = await dispatch(deleteAccommodation(accommodationId));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
    }
  };

  const onSubmit = async (
    values: IAccommodation,
    resetForm: ResetEditAccommodationForm
  ) => {
    const result = await dispatch(updateAccommodation(values));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setFormSubmitStatus(Status.IDLE);
          handleClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditAccommodationForm
            onSubmit={onSubmit}
            onDelete={onDelete}
            formSubmitStatus={formSubmitStatus}
            currentRow={currentRow}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalMUI;
