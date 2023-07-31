import { FormikState } from 'formik';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  isAdmin: boolean;
}

export interface UserRegistrationFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tel: string;
  isAdmin: boolean;
}

type UserRegistrationFormPropsRequired = Required<UserRegistrationFormProps>;

export type ResetUserForm = (
  nextState?:
    | Partial<FormikState<UserRegistrationFormPropsRequired>>
    | undefined
) => void;

export type IFirebaseUser = Omit<IUser, 'id'>;
