import FormModalContainer from '@/components/common/FormModalContainer';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import { useAppDispatch } from '@/redux/store';
import { deleteUserAction, editUserAction } from '@/redux/users/actions';
import { IUser, UserFormProps } from '@/redux/users/interfaces';
import { Modal } from '@mui/material';
import { DefaultTFuncReturn, t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import UserForm from '../UserForm/UserForm.component';

interface IProps {
  currentRow: IUser | null;
  setCurrentRow: Dispatch<SetStateAction<IUser | null>>;
}

const UserEditModal = ({ currentRow, setCurrentRow }: IProps) => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | DefaultTFuncReturn>(
    ''
  );
  const dispatch = useAppDispatch();

  const editUser = async (
    values: UserFormProps,
    userId: string | undefined
  ) => {
    const result =
      userId && (await dispatch(editUserAction({ id: userId, ...values })));
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
      setErrorMessage('something went wrong');
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
    }
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm(t<string>('validation.deleteUser'))) {
      const result = await dispatch(deleteUserAction(userId));
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
      <FormModalContainer>
        <UserForm
          formType={FormType.EDIT}
          formSubmitStatus={formSubmitStatus}
          editUser={editUser}
          deleteUser={deleteUser}
          currentRow={currentRow}
          errorMessage={errorMessage}
        />
      </FormModalContainer>
    </Modal>
  );
};

export default UserEditModal;
