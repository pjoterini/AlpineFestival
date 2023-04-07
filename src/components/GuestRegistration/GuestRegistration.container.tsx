import GuestRegistration from "./GuestRegistration.component";

const onSubmit = () => {
  console.log("submitted");
};

const GuestRegistrationContainer = () => {
  return <GuestRegistration onSubmit={onSubmit} />;
};

export default GuestRegistrationContainer;
