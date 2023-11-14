import AccommodationForm from '@/components/Accommodations/AccommodationForm/AccommodationForm.component';
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { Status } from '@/redux/enums/status';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
  deleteAccommodationAction,
  updateAccommodation,
} from '@/redux/accomodations/actions';
import { AccommodationFormProps } from '@/redux/accomodations/interfaces';
import { useAppDispatch } from '@/redux/store';
import { Dispatch, SetStateAction, useState } from 'react';
import { t } from 'i18next';
import { FormType } from '@/redux/enums/formType';

interface IProps {
  currentRow: IAccommodation | null;
  setCurrentRow: Dispatch<SetStateAction<IAccommodation | null>>;
}

const AccommodationEditModal = ({ currentRow, setCurrentRow }: IProps) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const dispatch = useAppDispatch();

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
    if (window.confirm(t<string>('validation.deleteGuest'))) {
      const result = await dispatch(deleteAccommodationAction(accommodationId));
      if (!result) {
        setFormSubmitStatus(Status.FAILED);
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
        position="absolute"
        sx={{
          transform: 'translate(-50%, -50%)',
        }}
        top="50%"
        left="50%"
        p={3}
        width="320px"
        borderRadius={2}
        boxShadow="10"
        bgcolor="background.paper"
      >
        <AccommodationForm
          formType={FormType.EDIT}
          formSubmitStatus={formSubmitStatus}
          editAccommodation={editAccommodation}
          deleteAccommodation={deleteAccommodation}
          currentRow={currentRow}
        />
      </Box>
    </Modal>
  );
};

export default AccommodationEditModal;
