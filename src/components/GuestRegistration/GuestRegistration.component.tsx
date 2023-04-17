import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CheckboxWithLabel, Select } from "formik-mui";
import { t } from "i18next";
import InputOrTextarea from "../common/InputOrTextarea";
import { guestRegistrationSchema } from "./utils/guestRegistrationSchema";
import { useDatesWithoutSeconds } from "./utils/useDatesWithoutSeconds";

export interface IProps {
  onSubmit: (values: GuestRegistrationFormProps) => void;
}

export interface GuestRegistrationFormProps {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  arrival: Date;
  departure: Date;
  accomodationComment?: string;
  presents: boolean;
  ownsPc?: boolean;
  speechLength?: string;
  specialNeeds?: string;
}

/**
 * TODO Date pickers pick push wrong value to formik state
 */
const GuestRegistration = () => {
  let [preArrival, preExit] = useDatesWithoutSeconds();

  const onSubmit = (values: GuestRegistrationFormProps) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        tel: "",
        arrival: preArrival,
        departure: preExit,
        accomodationComment: "",
        presents: false,
        ownsPc: false,
        speechLength: "0-15",
        specialNeeds: "",
      }}
      validationSchema={guestRegistrationSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Box p={4}>
            <Stack width="40%" minWidth="300px">
              <Field
                name="firstName"
                label={t("guestForm.firstName")}
                component={InputOrTextarea}
              />
              <ErrorMessage name="firstName" component="div" />
              <Field
                name="lastName"
                label={t("guestForm.lastName")}
                component={InputOrTextarea}
              />
              <ErrorMessage name="lastName" component="div" />
              <Field
                name="email"
                type="email"
                label={t("guestForm.email")}
                component={InputOrTextarea}
              />
              <ErrorMessage name="email" component="div" />
              <Field
                name="tel"
                type="tel"
                label={t("guestForm.tel")}
                component={InputOrTextarea}
              />
              <ErrorMessage name="tel" component="div" />

              <Stack
                direction={{ xs: "column", lg: "row" }}
                pt="15px"
                pb="10px"
              >
                {/* DateRangePicker is included on Pro package, thus we're using DatePickers */}
                <Box>
                  <Field
                    component={DatePicker}
                    label={t("guestForm.arrivalDate")}
                    name="arrival"
                    onChange={(value: Date) => {
                      setFieldValue("arrival", value);
                    }}
                    views={["day"]}
                  />
                </Box>
                <Box pt={{ xs: "10px", lg: "0px" }} pl={{ lg: "20px" }}>
                  <Field
                    component={DatePicker}
                    label={t("guestForm.departureDate")}
                    name="departure"
                    onChange={(value: Date) => {
                      setFieldValue("departure", value);
                    }}
                    views={["day"]}
                    // inputFormat="MM/dd/yyyy"
                  />
                </Box>
              </Stack>

              <Field
                component={InputOrTextarea}
                name="accomodationComment"
                label={t("guestForm.accomodationComment")}
                type="textarea"
                multiline={true}
              />

              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="presents"
                Label={{ label: t("guestForm.presents") }}
              />
              {values.presents && (
                <>
                  <Box pb={2}>
                    <Field
                      component={CheckboxWithLabel}
                      type="checkbox"
                      name="ownsPc"
                      Label={{ label: t("guestForm.ownsPc") }}
                    />
                  </Box>

                  <Field
                    component={Select}
                    name="speechLength"
                    label={t("guestForm.speechLength")}
                    formHelperText={{
                      children: t("guestForm.speechLengthHelperText"),
                    }}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {/* {speechLengthOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))} */}
                  </Field>

                  <Field
                    component={InputOrTextarea}
                    name="specialNeeds"
                    label={t("guestForm.specialNeeds")}
                    type="textarea"
                    multiline={true}
                  />
                </>
              )}
              <Box mt={4}>
                <Button variant="outlined" type="submit">
                  {t("guestForm.submit")}
                </Button>
              </Box>
            </Stack>
          </Box>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default GuestRegistration;
