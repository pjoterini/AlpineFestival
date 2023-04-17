import * as Yup from "yup";

export const guestRegistrationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(5, "Must be 30 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(5, "Must be 30 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  tel: Yup.string().required("Required"),
  arrival: Yup.date().required("Required"),
  departure: Yup.date().required("Required"),
  accomodationComment: Yup.string().max(500, "Must be 500 characters or less"),
  specialNeeds: Yup.string().max(500, "Must be 500 characters or less"),
});
