import { IAccommodation } from '@/redux/accomodations/interfaces';
import { FormType } from '@/redux/enums/formType';
import { deleteGuestAction, editGuestAction } from '@/redux/guests/actions';
import { IGuest } from '@/redux/guests/interfaces';
import { closeGuestForm } from '@/redux/guests/reducer';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { IUser } from '@/redux/users/interfaces';
import { Dialog } from '@mui/material';
import { t } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import GuestForm from '../GuestForm/GuestForm.component';

interface IProps {
  selectedGuest: IGuest | null;
  setSelectedGuest: Dispatch<SetStateAction<IGuest | null>>;
  users: IUser[];
  accommodations: IAccommodation[];
}

const GuestEditModal = ({
  selectedGuest,
  setSelectedGuest,
  users,
  accommodations,
}: IProps) => {
  const errorMessage = useAppSelector((state) => state.guests.error);
  const formSubmitStatus = useAppSelector((state) => state.guests.status);
  const dispatch = useAppDispatch();

  const editGuest = async (values: IGuest) => {
    await dispatch(editGuestAction(values));
  };

  const deleteGuest = async (guestId: string) => {
    if (window.confirm(t<string>('validation.deleteGuest'))) {
      await dispatch(deleteGuestAction(guestId));
    }
  };

  return (
    <Dialog
      open={!!selectedGuest}
      onClose={() => {
        dispatch(closeGuestForm());
        setSelectedGuest(null);
      }}
    >
      <GuestForm
        formType={FormType.EDIT}
        formSubmitStatus={formSubmitStatus}
        editGuest={editGuest}
        deleteGuest={deleteGuest}
        selectedGuest={selectedGuest}
        errorMessage={errorMessage}
        users={users}
        accommodations={accommodations}
      />
    </Dialog>
  );
};

export default GuestEditModal;
