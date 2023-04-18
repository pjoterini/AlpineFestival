import { Box, Button, MenuItem } from "@mui/material";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";
import { CheckboxWithLabel, Select } from "formik-mui";
import { t } from "i18next";
import { InputError } from "../common/InputError";
import InputOrTextarea from "../common/InputOrTextarea";
import { guestRegistrationSchema } from "./utils/guestRegistrationSchema";
import { speechLengthOptions } from "./utils/speechLengthOptions";

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

const GuestRegistration = () => {
  const onSubmit = (values: GuestRegistrationFormProps) => {
    console.log(values);
  };

  const earliestDate = new Date("2023-05-12T00:00:00.000Z");
  const latestDate = new Date("2023-05-24T00:00:00.000Z");

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          tel: "",
          arrival: earliestDate,
          departure: latestDate,
          accomodationComment: "",
          presents: false,
          ownsPc: false,
          speechLength: "0-15",
          specialNeeds: "",
        }}
        validationSchema={guestRegistrationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values, touched, setFieldValue, errors }) => (
          <Form>
            <Box p={4}>
              <Stack width="40%" minWidth="320px">
                <Field
                  name="firstName"
                  label={t("guestForm.firstName")}
                  component={InputOrTextarea}
                />
                {errors.firstName && touched.firstName && (
                  <InputError error={errors.firstName} />
                )}

                <Field
                  name="lastName"
                  label={t("guestForm.lastName")}
                  component={InputOrTextarea}
                />
                {errors.lastName && touched.lastName && (
                  <InputError error={errors.lastName} />
                )}
                <Field
                  name="email"
                  type="email"
                  label={t("guestForm.email")}
                  component={InputOrTextarea}
                />
                {errors.email && touched.email && (
                  <InputError error={errors.email} />
                )}
                <Field
                  name="tel"
                  type="tel"
                  label={t("guestForm.tel")}
                  component={InputOrTextarea}
                />
                {errors.tel && touched.tel && <InputError error={errors.tel} />}

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
                      minDate={dayjs.utc(earliestDate)}
                      maxDate={dayjs.utc(latestDate)}
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
                      minDate={dayjs.utc(earliestDate)}
                      maxDate={dayjs.utc(latestDate)}
                      views={["day"]}
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
                {errors.accomodationComment && touched.accomodationComment && (
                  <InputError error={errors.accomodationComment} />
                )}

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
                    >
                      {Object.entries(speechLengthOptions).map(
                        ([key, name]) => (
                          <MenuItem key={key} value={key}>
                            {name}
                          </MenuItem>
                        )
                      )}
                    </Field>

                    <Field
                      component={InputOrTextarea}
                      name="specialNeeds"
                      label={t("guestForm.specialNeeds")}
                      type="textarea"
                      multiline={true}
                    />
                    {errors.specialNeeds && touched.specialNeeds && (
                      <InputError error={errors.specialNeeds} />
                    )}
                  </>
                )}
                <Box mt={2}>
                  <Button variant="outlined" type="submit">
                    {t("guestForm.submit")}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GuestRegistration;
