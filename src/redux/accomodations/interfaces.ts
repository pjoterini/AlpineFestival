import { FormikState } from 'formik';

export interface IAccommodation {
  id: string;
  name: string;
  address: string;
  tel: string;
}

export type AccommodationFormProps = Omit<IAccommodation, 'id'>;

type AccommodationFormPropsRequired = Required<AccommodationFormProps>;

interface AccommodationResetFormProps
  extends Omit<AccommodationFormPropsRequired, 'speechLength'> {
  speechLength: null;
}

export type ResetAccommodationForm = (
  nextState?: Partial<FormikState<AccommodationResetFormProps>> | undefined
) => void;
