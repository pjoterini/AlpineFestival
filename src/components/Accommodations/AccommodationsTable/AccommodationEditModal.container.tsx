import AccommodationForm from '@/components/Accommodations/AccommodationForm/AccommodationForm.component';
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
import { Dialog } from '@mui/material';
import { DefaultTFuncReturn, t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';

interface IProps {
  currentRow: IAccommodation | null;
  setCurrentRow: Dispatch<SetStateAction<IAccommodation | null>>;
}

const AccommodationEditModal = ({ currentRow, setCurrentRow }: IProps) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | DefaultTFuncReturn>(
    ''
  );
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
      setErrorMessage('something went wrong');
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
    <Dialog
      open={!!currentRow}
      onClose={() => {
        setFormSubmitStatus(Status.IDLE);
        setCurrentRow(null);
      }}
    >
      <AccommodationForm
        formType={FormType.EDIT}
        editAccommodation={editAccommodation}
        deleteAccommodation={deleteAccommodation}
        currentRow={currentRow}
        formSubmitStatus={formSubmitStatus}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

export default AccommodationEditModal;
