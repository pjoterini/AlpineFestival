import { FormikState } from 'formik';
import { IUser } from '../users/interfaces';

export enum SpeechLength {
  min0_15 = '0-15',
  min15_30 = '15-30',
  min30_45 = '30-45',
  min45_60 = '45-60',
  min60_75 = '60-75',
  min75_90 = '75-90',
}

export interface IGuest {
  id: string;
  firstName: string;
  lastName: string;
  checkIn: boolean;
  type: string;
  organizer: IUser | null;
  email: string;
  tel: string;
  arrival: string;
  departure: string;
  accommodation: string;
  accomodationComment?: string;
  presents: boolean;
  ownsPc?: boolean;
  speechLength: SpeechLength | null;
  specialNeeds?: string;
}

export type GuestRegisterFormProps = Omit<
  IGuest,
  'id' | 'checkIn' | 'type' | 'organizer' | 'accommodation'
>;
export type GuestEditFormProps = Omit<IGuest, 'id'>;

type GuestRegisterFormPropsRequired = Required<GuestRegisterFormProps>;

interface GuestRegisterResetFormProps
  extends Omit<GuestRegisterFormPropsRequired, 'speechLength'> {
  speechLength: null;
}

export type ResetGuestRegisterForm = (
  nextState?: Partial<FormikState<GuestRegisterResetFormProps>> | undefined
) => void;

export type IFirebaseGuest = Omit<IGuest, 'id'>;
