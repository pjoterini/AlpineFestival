export interface GuestRegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  arrival: Date | null | string;
  exit: Date;
  accomodationComment?: string;
  presents: boolean;
  ownsPc?: boolean;
  speechLength?: string;
  specialNeeds?: string;
}

export interface GuestRegistrationFormProps {
  onSubmit: (values: GuestRegistrationFormValues) => void;
}
