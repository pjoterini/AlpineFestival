import { FormikState } from 'formik';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  tel: string;
  isAdmin: boolean;
}

export interface UserInitialValues
  extends Omit<IUser, 'id' | 'email' | 'password'> {
  id?: string;
  email?: string;
  password?: string;
}

export type UserRegisterFormProps = Omit<IUser, 'id'>;

export type UserEditFormProps = Omit<IUser, 'password'>;

type UserRegisterFormPropsRequired = Required<UserRegisterFormProps>;

export type ResetUserForm = (
  nextState?: Partial<FormikState<UserRegisterFormPropsRequired>> | undefined
) => void;

export type IFirebaseUser = Omit<IUser, 'id'>;

export interface IMutateUserCloudFunctionResponse {
  uid?: string;
  errorInfo?: {
    code: string;
    message: string;
  };
}
