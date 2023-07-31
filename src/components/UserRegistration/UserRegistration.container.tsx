import { addUserFB } from '@/firebase/database/user/addUser';
import { Status } from '@/redux/enums/status';
import { ResetUserForm } from '@/redux/users/interfaces';
import { UserRegistrationFormProps } from '@/redux/users/interfaces';
import { useState } from 'react';
import UserRegistration from './UserRegistration.component';

const UserRegistrationContainer = () => {
  const [formSubmitStatus, setFormSubmitStatus] = useState<Status>(Status.IDLE);

  const onSubmit = async (
    values: UserRegistrationFormProps,
    resetForm: ResetUserForm
  ) => {
    const result = await addUserFB(values);
    if (!result) {
      setFormSubmitStatus(Status.FAILED);
    } else {
      setFormSubmitStatus(Status.SUCCEEDED);
      resetForm();
    }
  };

  return (
    <>
      <UserRegistration
        onSubmit={onSubmit}
        formSubmitStatus={formSubmitStatus}
      />
    </>
  );
};

export default UserRegistrationContainer;
