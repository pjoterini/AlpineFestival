import GuestRegistration, {
  GuestRegistrationFormProps,
} from "./GuestRegistration.component";

const GuestRegistrationContainer = () => {
  const onSubmit = (values: GuestRegistrationFormProps) => {
    console.log(values);
  };

  return <GuestRegistration onSubmit={onSubmit} />;
};

export default GuestRegistrationContainer;
