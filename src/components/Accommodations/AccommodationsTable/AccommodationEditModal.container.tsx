import {
  deleteAccommodationAction,
  updateAccommodationAction,
} from '@/redux/accomodations/actions';
import {
  AccommodationFormProps,
  IAccommodation,
} from '@/redux/accomodations/interfaces';
import { closeAccommodationForm } from '@/redux/accomodations/reducer';
import { FormType } from '@/redux/enums/formType';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Dialog } from '@mui/material';
import { t } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import AccommodationForm from '../AccommodationForm/AccommodationForm.component';

interface IProps {
  selectedAccommodation: IAccommodation | null;
  setSelectedAccommodation: Dispatch<SetStateAction<IAccommodation | null>>;
}

const AccommodationEditModal = ({
  selectedAccommodation,
  setSelectedAccommodation,
}: IProps) => {
  const errorMessage = useAppSelector((state) => state.accommodations.error);
  const formSubmitStatus = useAppSelector(
    (state) => state.accommodations.status
  );
  const dispatch = useAppDispatch();

  const editAccommodation = async (
    values: AccommodationFormProps,
    accommodationId: string | undefined
  ) => {
    accommodationId &&
      (await dispatch(
        updateAccommodationAction({ id: accommodationId, ...values })
      ));
  };

  const deleteAccommodation = async (accommodationId: string) => {
    if (window.confirm(t<string>('validation.deleteGuest'))) {
      const response = await dispatch(
        deleteAccommodationAction(accommodationId)
      );
      if (response) {
        setSelectedAccommodation(null);
        dispatch(closeAccommodationForm());
      }
    }
  };

  return (
    <Dialog
      open={!!selectedAccommodation}
      onClose={() => {
        dispatch(closeAccommodationForm());
        setSelectedAccommodation(null);
      }}
    >
      <AccommodationForm
        formType={FormType.EDIT}
        formSubmitStatus={formSubmitStatus}
        editAccommodation={editAccommodation}
        deleteAccommodation={deleteAccommodation}
        selectedAccommodation={selectedAccommodation}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

export default AccommodationEditModal;
