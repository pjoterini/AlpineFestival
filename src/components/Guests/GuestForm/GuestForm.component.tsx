import FormButtonsContainer from '@/components/common/FormButtonsContainer';
import FormContainer from '@/components/common/FormContainer';
import { GMPhoneInput } from '@/components/common/GMPhoneInput';
import { IAccommodation } from '@/redux/accomodations/interfaces';
import { FormType } from '@/redux/enums/formType';
import { Status } from '@/redux/enums/status';
import {
  GuestEditFormProps,
  GuestInitialValues,
  GuestRegisterFormProps,
  GuestType,
  IGuest,
  ResetGuestRegisterForm,
} from '@/redux/guests/interfaces';
import { IUser } from '@/redux/users/interfaces';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, Select } from 'formik-mui';
import { DefaultTFuncReturn, t } from 'i18next';
import FormStatusMessage from '../../common/FormStatusMessage';
import GMDatePicker from '../../common/GMDatePicker';
import GMInput from '../../common/GMInput';
import { guestFormSchema } from './guestForm.schema';
import {
  arrivalDate,
  departureDate,
} from './selectInputsValues/arrivalAndDepartureDates';
import { guestTypeOptions } from './selectInputsValues/guestTypeOptions';
import { speechLengthOptions } from './selectInputsValues/speechLengthOptions';

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
  users?: IUser[];
  accommodations?: IAccommodation[];
}

const GuestForm = ({
  formType,
  formSubmitStatus,
  createGuest,
  editGuest,
  deleteGuest,
  currentRow,
  errorMessage,
  users,
  accommodations,
}: IProps) => {
  const isCreateForm = formType === FormType.CREATE;
  const isEditForm = formType === FormType.EDIT;

  let initialValues: GuestInitialValues = {
    firstName: currentRow?.firstName || '',
    lastName: currentRow?.lastName || '',
    email: currentRow?.email || '',
    tel: currentRow?.tel || '',
    arrival: currentRow?.arrival || arrivalDate,
    departure: currentRow?.departure || departureDate,
    accomodationComment: currentRow?.accomodationComment || '',
    presents: currentRow?.presents || false,
    ownsPc: currentRow?.ownsPc || false,
    speechLength: currentRow?.speechLength || null,
    specialNeeds: currentRow?.specialNeeds || '',
  };

  if (isEditForm) {
    initialValues = {
      ...initialValues,
      checkIn: currentRow?.checkIn || false,
      type: currentRow?.type || GuestType.NORMAL,
      organizer: currentRow?.organizer || null,
      accommodation: currentRow?.accommodation || null,
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
          <FormContainer>
            <Typography variant="h5" component="h1" mb={1}>
              {isCreateForm && t('guestForm.guestForm')}
              {isEditForm && t('guestForm.editGuest')}
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
            <GMPhoneInput
              currentRow={currentRow}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
            />
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
            {isEditForm && (
              <>
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="checkIn"
                  Label={{ label: t('guestForm.checkIn') }}
                />
                <Stack mt={2}>
                  <Field
                    component={Select}
                    name="type"
                    label={t('common.type')}
                    value={values.type || ''}
                    formHelperText={{
                      children: t('guestForm.typeHelperText'),
                    }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    {Object.entries(guestTypeOptions).map(([key, name]) => (
                      <MenuItem key={key} value={key}>
                        {name}
                      </MenuItem>
                    ))}
                  </Field>
                </Stack>
                <Stack mt={2}>
                  <Field
                    component={Select}
                    name="organizer"
                    label={t('common.organizer')}
                    value={values.organizer || ''}
                    formHelperText={{
                      children: t('guestForm.organizerHelperText'),
                    }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    {users?.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </MenuItem>
                    ))}
                  </Field>
                </Stack>
                <Stack mt={2}>
                  <Field
                    component={Select}
                    name="accommodation"
                    label={t('common.accommodation')}
                    value={values.accommodation || ''}
                    formHelperText={{
                      children: t('guestForm.accommodationHelperText'),
                    }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    {accommodations?.map((accommodation) => (
                      <MenuItem key={accommodation.id} value={accommodation.id}>
                        {accommodation.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Stack>
              </>
            )}
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
            <FormButtonsContainer>
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
            </FormButtonsContainer>
            <FormStatusMessage
              formSubmitStatus={formSubmitStatus}
              errorMessage={errorMessage}
              message={
                isCreateForm
                  ? t('formValidation.formSubmitMessageSuccess')
                  : t('formValidation.formEditMessageSuccess')
              }
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default GuestForm;
