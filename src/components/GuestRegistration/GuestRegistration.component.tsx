import { GuestRegistrationFormProps } from '@/redux/guest/interfaces';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, Select } from 'formik-mui';
import { t } from 'i18next';
import GMDatePicker from '../common/GMDatePicker';
import GMInput from '../common/GMInput';
import { arrivalDate, departureDate } from './utils/arrivalAndDepartureDates';
import { speechLengthOptions } from './utils/speechLengthOptions';
import { guestRegistrationSchema } from './utils/guestRegistrationSchema';

interface IProps {
  onSubmit: (values: GuestRegistrationFormProps) => void;
}

const GuestRegistration = ({ onSubmit }: IProps) => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        tel: '',
        arrival: arrivalDate,
        departure: departureDate,
        accomodationComment: '',
        presents: false,
        ownsPc: false,
        speechLength: null,
        specialNeeds: '',
      }}
      validationSchema={guestRegistrationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, setFieldValue, errors }) => (
        <Form>
          <Stack
            mt={{ xs: 2, sm: 4 }}
            mx="auto"
            width={{ xs: '100%', sm: '60%' }}
          >
            <Typography variant="h5" component="h1">
              {t('guestForm.guestForm')}
            </Typography>
            <Field
              name="firstName"
              label={t('common.firstName')}
              component={GMInput}
              error={errors.firstName}
              touched={touched.firstName}
            />

            <Field
              name="lastName"
              label={t('common.lastName')}
              component={GMInput}
              error={errors.lastName}
              touched={touched.lastName}
            />

            <Field
              name="email"
              type="email"
              label={t('common.email')}
              component={GMInput}
              error={errors.email}
              touched={touched.email}
            />

            <Field
              name="tel"
              type="tel"
              label={t('common.tel')}
              component={GMInput}
              error={errors.tel}
              touched={touched.tel}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} pt={2} pb={1}>
              {/* DateRangePicker is included on Pro package, thus we're using DatePickers */}
              <Box>
                <GMDatePicker
                  label={t(`guestForm.arrivalDate`)}
                  name="arrival"
                  setFieldValue={setFieldValue}
                  error={errors.arrival}
                  touched={touched.arrival}
                  disablePast={true}
                  minDate={arrivalDate}
                  maxDate={departureDate}
                  value={values.arrival}
                />
              </Box>
              <Box pt={{ xs: 3, sm: 0 }} pl={{ sm: 3 }}>
                <GMDatePicker
                  label={t(`guestForm.departureDate`)}
                  name="departure"
                  setFieldValue={setFieldValue}
                  error={errors.departure}
                  touched={touched.departure}
                  minDate={arrivalDate}
                  maxDate={departureDate}
                  value={values.departure}
                />
              </Box>
            </Stack>

            <Field
              component={GMInput}
              name="accomodationComment"
              label={t('guestForm.accomodationComment')}
              type="textarea"
              multiline={true}
              error={errors.accomodationComment}
              touched={touched.accomodationComment}
            />

            <Field
              component={CheckboxWithLabel}
              type="checkbox"
              onClick={() => {
                values.ownsPc = false;
                values.speechLength = null;
                values.specialNeeds = '';
              }}
              name="presents"
              Label={{ label: t('guestForm.presents') }}
            />
            {values.presents && (
              <>
                <Box pb={2}>
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="ownsPc"
                    Label={{ label: t('guestForm.ownsPc') }}
                  />
                </Box>

                <Field
                  component={Select}
                  name="speechLength"
                  label={t('guest.speechLength')}
                  value={values.speechLength || ''}
                  formHelperText={{
                    children: t('guestForm.speechLengthHelperText'),
                  }}
                >
                  {Object.entries(speechLengthOptions).map(([key, name]) => (
                    <MenuItem key={key} value={key}>
                      {name}
                    </MenuItem>
                  ))}
                </Field>

                <Field
                  component={GMInput}
                  name="specialNeeds"
                  label={t('guestForm.specialNeeds')}
                  type="textarea"
                  multiline={true}
                  error={errors.specialNeeds}
                  touched={touched.specialNeeds}
                />
              </>
            )}
            <Box mx="auto" mt={2} mb={5}>
              <Button variant="outlined" type="submit">
                {t('guestForm.submit')}
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default GuestRegistration;
