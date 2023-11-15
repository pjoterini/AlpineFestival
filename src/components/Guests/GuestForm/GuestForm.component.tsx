import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import {
  GuestEditFormProps,
  GuestRegisterFormProps,
  IGuest,
  ResetGuestRegisterForm,
} from '@/redux/guests/interfaces';
import { Box, Button, MenuItem, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, Select } from 'formik-mui';
import { DefaultTFuncReturn, t } from 'i18next';
import 'react-phone-input-2/lib/style.css';
import FormStatusMessage from '../../common/FormStatusMessage';
import GMDatePicker from '../../common/GMDatePicker';
import GMInput from '../../common/GMInput';
import { InputError } from '../../common/InputError';
import { arrivalDate, departureDate } from './arrivalAndDepartureDates';
import { guestFormSchema } from './guestForm.schema';
import { speechLengthOptions } from './speechLengthOptions';
import StyledPhoneInput from './StyledPhoneInput';

interface IProps {
  formType: FormType;
  formSubmitStatus: Status;
  createGuest?: (
    values: GuestRegisterFormProps,
    resetForm: ResetGuestRegisterForm
  ) => void;
  editGuest?: (values: GuestEditFormProps, guestId?: string) => void;
  deleteGuest?: (userId: string) => void;
  currentRow?: IGuest | null;
  errorMessage: string | DefaultTFuncReturn;
}

const GuestForm = ({
  formType,
  formSubmitStatus,
  createGuest,
  editGuest,
  deleteGuest,
  currentRow,
  errorMessage,
}: IProps) => {
  const isCreateForm = formType === FormType.CREATE;
  const isEditForm = formType === FormType.EDIT;

  let initialValues: GuestRegisterFormProps | GuestEditFormProps = {
    firstName: currentRow?.firstName || '',
    lastName: currentRow?.lastName || '',
    email: currentRow?.email || '',
    tel: currentRow?.tel || '',
    arrival: currentRow?.arrival || arrivalDate,
    departure: currentRow?.departure || departureDate,
    accomodationComment: currentRow?.firstName || '',
    presents: currentRow?.presents || false,
    ownsPc: currentRow?.ownsPc || false,
    speechLength: currentRow?.speechLength || null,
    specialNeeds: currentRow?.specialNeeds || '',
  };

  if (isEditForm) {
    initialValues = {
      ...initialValues,
      checkIn: currentRow?.checkIn || false,
      type: currentRow?.type || '',
      organizer: currentRow?.organizer || '',
      accommodation: currentRow?.accommodation || '',
    };
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={guestFormSchema}
      onSubmit={(values, { resetForm }) => {
        isCreateForm && createGuest?.(values, resetForm);
        isEditForm && editGuest?.(values as GuestEditFormProps, currentRow?.id);
      }}
    >
      {({ values, touched, setFieldValue, errors }) => (
        <Form>
          <Stack
            mx="auto"
            px={isCreateForm ? 2 : 0}
            pb={isCreateForm ? 2 : 0}
            mb={isCreateForm ? 2 : 0}
            width={{
              xs: '100%',
              sm: isCreateForm ? '50%' : '100%',
            }}
          >
            {isEditForm && (
              <Typography variant="h5" component="h1">
                {t('guestForm.editGuest')}
              </Typography>
            )}

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
            <Box mt={1}>
              <StyledPhoneInput
                inputProps={{
                  name: 'tel',
                }}
                onChange={(tel: string) => {
                  setFieldValue('tel', tel);
                }}
                country={'pl'}
                containerClass={`react-phone-number ${
                  errors.tel ? 'error' : ''
                }`}
              />
              <Box mt={1}>
                {errors.tel && touched.tel && <InputError error={errors.tel} />}
              </Box>
            </Box>
            {isEditForm && (
              <>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="checkIn"
                  Label={{ label: t('guestForm.checkIn') }}
                />
                <Field
                  name="type"
                  label={t('common.type')}
                  component={GMInput}
                  // error={errors.type}
                  // touched={touched.type}
                />
                <Field
                  name="organizer"
                  label={t('common.organizer')}
                  component={GMInput}
                  // error={errors.organizer}
                  // touched={touched.organizer}
                />
                <Field
                  name="accomodation"
                  label={t('common.accommodation')}
                  component={GMInput}
                  // error={errors.accommodation}
                  // touched={touched.accommodation}
                />
              </>
            )}
            <Stack direction={{ xs: 'column', sm: 'row' }} pt={2}>
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
              <Box pt={{ xs: 2, sm: 0 }} pl={{ sm: 3 }}>
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
                  MenuProps={{ disableScrollLock: true }}
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

            <Box ml="auto" mt={2} mb={5}>
              {isEditForm && (
                <Button
                  onClick={() =>
                    currentRow && deleteGuest && deleteGuest(currentRow.id)
                  }
                  sx={{ mr: 1 }}
                  color="error"
                  variant="contained"
                  type="button"
                  size="large"
                >
                  {t('common.delete')}
                </Button>
              )}
              <Button variant="contained" type="submit" size="large">
                {isCreateForm && t('guestForm.submit')}
                {isEditForm && t('common.save')}
              </Button>
            </Box>

            {isCreateForm && (
              <FormStatusMessage
                formSubmitStatus={formSubmitStatus}
                errorMessage={errorMessage}
                message={t('formValidation.formSubmitMessageSuccess')}
              />
            )}
            {isEditForm && (
              <FormStatusMessage
                formSubmitStatus={formSubmitStatus}
                errorMessage={errorMessage}
                message={t('formValidation.formEditMessageSuccess')}
              />
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default GuestForm;
