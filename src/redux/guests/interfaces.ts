import { FormikState } from 'formik';

export enum SpeechLength {
  min0_15 = '0-15',
  min15_30 = '15-30',
  min30_45 = '30-45',
  min45_60 = '45-60',
  min60_75 = '60-75',
  min75_90 = '75-90',
}

export enum GuestType {
  NORMAL = 'Normal',
  VIP = 'VIP',
}

export interface IGuest {
  id: string;
  firstName: string;
  lastName: string;
  checkIn: boolean;
  type: GuestType;
  organizer: string | null;
  email: string;
  tel: string;
  arrival: string;
  departure: string;
  accommodation: string | null;
  accomodationComment?: string;
  presents: boolean;
  ownsPc?: boolean;
  speechLength: SpeechLength | null;
  specialNeeds?: string;
}

export interface GuestInitialValues
  extends Omit<
    IGuest,
    'id' | 'checkIn' | 'type' | 'organizer' | 'accommodation'
  > {
  id?: string;
  checkIn?: boolean;
  type?: GuestType;
  organizer?: string | null;
  accommodation?: string | null;
}

export type GuestRegisterFormProps = Omit<
  IGuest,
  'id' | 'checkIn' | 'type' | 'organizer' | 'accommodation'
>;

type GuestRegisterFormPropsRequired = Required<GuestRegisterFormProps>;

interface GuestRegisterResetFormProps
  extends Omit<GuestRegisterFormPropsRequired, 'speechLength'> {
  speechLength: null;
}

export type ResetGuestRegisterForm = (
  nextState?: Partial<FormikState<GuestRegisterResetFormProps>> | undefined
) => void;

export type IFirebaseGuest = Omit<IGuest, 'id'>;
