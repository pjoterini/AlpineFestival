import AccommodationForm from '@/components/Accommodations/AccommodationForm/AccommodationForm.component';
import FormModalContainer from '@/components/common/FormModalContainer';
import {
  deleteAccommodationAction,
  updateAccommodation,
} from '@/redux/accomodations/actions';
import {
  AccommodationFormProps,
  IAccommodation,
} from '@/redux/accomodations/interfaces';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import { useAppDispatch } from '@/redux/store';
import Modal from '@mui/material/Modal';
import { t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';

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
      <FormModalContainer>
        <AccommodationForm
          formType={FormType.EDIT}
          formSubmitStatus={formSubmitStatus}
          editAccommodation={editAccommodation}
          deleteAccommodation={deleteAccommodation}
          currentRow={currentRow}
        />
      </FormModalContainer>
    </Modal>
  );
};

export default AccommodationEditModal;
