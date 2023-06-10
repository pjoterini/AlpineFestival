import { GuestRegistrationFormProps } from '@/redux/guest/interfaces';
import GuestRegistration from './GuestRegistration.component';
import { addGuest } from '@/firebase/database/guest/addGuest';

const GuestRegistrationContainer = () => {
  const onSubmit = (values: GuestRegistrationFormProps) => {
    addGuest(values);
  };

  return <GuestRegistration onSubmit={onSubmit} />;
};

export default GuestRegistrationContainer;
