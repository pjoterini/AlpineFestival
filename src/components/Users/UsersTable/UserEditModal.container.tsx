import { FormType } from '@/redux/enums/formType';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { deleteUserAction, editUserAction } from '@/redux/users/actions';
import { IUser, UserEditFormProps } from '@/redux/users/interfaces';
import { closeUserForm } from '@/redux/users/reducer';
import { Dialog } from '@mui/material';
import { t } from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import UserForm from '../UserForm/UserForm.component';

interface IProps {
  selectedUser: IUser | null;
  setSelectedUser: Dispatch<SetStateAction<IUser | null>>;
}

const UserEditModal = ({ selectedUser, setSelectedUser }: IProps) => {
  const errorMessage = useAppSelector((state) => state.users.error);
  const formSubmitStatus = useAppSelector((state) => state.users.status);
  const dispatch = useAppDispatch();

  const editUser = async (values: UserEditFormProps) => {
    await dispatch(editUserAction(values));
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm(t<string>('validation.deleteUser'))) {
      const response = await dispatch(deleteUserAction(userId));
      if (response) {
        setSelectedUser(null);
        dispatch(closeUserForm());
      }
    }
  };

  return (
    <Dialog
      open={!!selectedUser}
      onClose={() => {
        dispatch(closeUserForm());
        setSelectedUser(null);
      }}
    >
      <UserForm
        formType={FormType.EDIT}
        formSubmitStatus={formSubmitStatus}
        editUser={editUser}
        deleteUser={deleteUser}
        selectedUser={selectedUser}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

export default UserEditModal;
