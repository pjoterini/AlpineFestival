import { GuestRegistrationFormProps } from "@/redux/guest/interfaces";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import CheckboxComponent from "./CheckboxComponent";
import InputComponent from "./InputComponent";

const GuestRegistration = ({ onSubmit }: GuestRegistrationFormProps) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        stayTime: "",
        accomodationComment: "",
        presentaion: false,
        ownsPc: false,
        speechLength: "",
        specials: "",
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values }) => (
        <Form>
          <Box p={4}>
            <Typography variant="h6" pb={2}>
              Guest Registration Component
            </Typography>
            <Field
              name="firstName"
              label="First Name"
              component={InputComponent}
            />
            <Field
              name="lastName"
              label="Last Name"
              component={InputComponent}
            />
            <Field
              name="email"
              type="email"
              label="Email"
              component={InputComponent}
            />
            <Field
              name="tel"
              type="tel"
              label="Phone"
              component={InputComponent}
            />
            <Field
              name="stayTime"
              type="date"
              label="Stay Time"
              component={InputComponent}
            />
            <Field
              name="presentation"
              type="checkbox"
              label="Are you giving a presentaion?"
              component={CheckboxComponent}
            />
            <Button variant="outlined" type="submit">
              Submit
            </Button>
            <div>{JSON.stringify(values.firstName)}</div>
            <div>{JSON.stringify(values.tel)}</div>
            <div>{JSON.stringify(values.presentaion)}</div>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default GuestRegistration;
