import { GuestRegistrationFormProps } from "@/redux/guest/interfaces";
import { Box, Button, FormControlLabel, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, Select, Switch, TextField } from "formik-mui";
import {
  speechLengthOptions,
  useDatesWithoutSeconds,
} from "./GuestRegistrationUtils";
import InputComponent from "./InputComponent";

const GuestRegistration = ({ onSubmit }: GuestRegistrationFormProps) => {
  let [preArrival, preExit] = useDatesWithoutSeconds();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        arrival: preArrival,
        exit: preExit,
        accomodationComment: "",
        presents: false,
        ownsPc: false,
        speechLength: "0-15",
        specialNeeds: "",
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, setValues, setFieldValue }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Form>
            <Box p={4}>
              <Stack width="40%" minWidth="300px">
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
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  pt="15px"
                  pb="10px"
                >
                  <Box>
                    <Field
                      component={DatePicker}
                      label="Arrival Date"
                      name="arrival"
                      onChange={(value: Date) => {
                        console.log(value);
                        setFieldValue("arrival", value);
                      }}
                      // onChange={(e: any) => setValues(e.$d)}
                      // inputFormat="MM/dd/yyyy"
                    />
                  </Box>
                  <Box pt={{ xs: "10px", lg: "0px" }} pl={{ lg: "20px" }}>
                    <Field
                      component={DatePicker}
                      label="Exit Date"
                      name="exit"
                      // inputFormat="MM/dd/yyyy"
                    />
                  </Box>
                </Stack>
                {/* Accomodation Comment */}
                <Field
                  component={InputComponent}
                  name="accomodationComment"
                  label="Accomodation Comment"
                  type="textarea"
                  multiline={true}
                />
                {/* presents SLIDER */}
                <Box margin={1}>
                  <FormControlLabel
                    control={
                      <Field
                        component={Switch}
                        type="checkbox"
                        name="presents"
                      />
                    }
                    label="Are you giving a presentation?"
                  />
                </Box>
                {/* presents CHECKBOX */}
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="presents"
                  Label={{ label: "Are you giving a presentation?" }}
                />
                {values.presents && (
                  <>
                    {/* ownsPC */}
                    <Box pb={2}>
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="ownsPc"
                        Label={{ label: "Will you have your own PC?" }}
                      />
                    </Box>
                    {/* speechLength */}
                    <Field
                      component={Select}
                      name="speechLength"
                      label="Speech Length"
                      formHelperText={{
                        children:
                          "How long will your speech take approximately(minutes)?",
                      }}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {speechLengthOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                    {/* specialNeeds */}
                    <Field
                      component={InputComponent}
                      name="specialNeeds"
                      label="Special Needs"
                      type="textarea"
                      multiline={true}
                    />
                  </>
                )}
                <Box mt={4}>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </Box>
              </Stack>
            </Box>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        </LocalizationProvider>
      )}
    </Formik>
  );
};

export default GuestRegistration;
