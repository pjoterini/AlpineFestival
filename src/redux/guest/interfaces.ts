export interface GuestRegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  stayTime: string;
  accomodationComment?: string;
  presentaion?: boolean;
  ownsPc?: boolean;
  speechLength?: string;
  specials?: string;
}

export interface GuestRegistrationFormProps {
  onSubmit: (values: GuestRegistrationFormValues) => void;
}
