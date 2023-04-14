import GuestRegistration from "./GuestRegistration.component";

const onSubmit = (values: any) => {
  console.log(values);
};

const GuestRegistrationContainer = () => {
  return <GuestRegistration onSubmit={onSubmit} />;
};

export default GuestRegistrationContainer;
