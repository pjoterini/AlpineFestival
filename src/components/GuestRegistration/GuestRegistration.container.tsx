import { addGuest } from '@/firebase/database/guest/addGuest';
import { GuestRegistrationFormProps } from '@/redux/guests/interfaces';
import GuestRegistration from './GuestRegistration.component';

const GuestRegistrationContainer = () => {
  const onSubmit = (values: GuestRegistrationFormProps) => {
    addGuest(values);
  };

  return <GuestRegistration onSubmit={onSubmit} />;
};

export default GuestRegistrationContainer;
