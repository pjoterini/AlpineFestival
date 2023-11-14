import { FormikState } from 'formik';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tel: string;
  isAdmin: boolean;
}

export interface UserFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tel: string;
  isAdmin: boolean;
}

type UserFormPropsRequired = Required<UserFormProps>;

export type ResetUserForm = (
  nextState?: Partial<FormikState<UserFormPropsRequired>> | undefined
) => void;

export type IFirebaseUser = Omit<IUser, 'id'>;

export interface ICreateUserCloudFunctionResponse {
  uid?: string;
  errorInfo?: {
    code: string;
    message: string;
  };
}
