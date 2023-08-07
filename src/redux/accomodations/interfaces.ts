import { FormikState } from 'formik';

export enum FormType {
  CREATE = 'create',
  EDIT = 'edit',
}
export interface IAccommodation {
  id: string;
  name: string;
  address: string;
  tel: string;
}

export type AccommodationFormProps = Omit<IAccommodation, 'id'>;

type AccommodationFormPropsRequired = Required<AccommodationFormProps>;

export type ResetAccommodationForm = (
  nextState?: Partial<FormikState<AccommodationFormPropsRequired>> | undefined
) => void;
