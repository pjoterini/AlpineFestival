import { GuestRegistrationFormProps } from "@/redux/guest/interfaces";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
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
            <Stack width="40%" minWidth="300px">
              <Field
                name="first-name"
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
                value=""
                name="tel"
                type="tel"
                label="Phone"
                component={InputComponent}
              />
              {/* hide placeholder or value */}
              <Field
                name="stay-time"
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
              <div>First Name: {JSON.stringify(values.firstName)}</div>
              <div>Tel :{JSON.stringify(values.tel)}</div>
              <div>Presentation: {JSON.stringify(values.presentaion)}</div>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default GuestRegistration;
