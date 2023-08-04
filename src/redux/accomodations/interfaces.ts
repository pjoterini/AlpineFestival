import { FormikState } from 'formik';

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

export type ResetEditAccommodationForm = (
  nextState?: Partial<FormikState<IAccommodation>> | undefined
) => void;
