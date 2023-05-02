import { GuestRegistrationFormProps, SpeechLength } from '@/redux/guest/interfaces'
import { Box, Button, MenuItem } from '@mui/material'
import { Stack } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, Select } from 'formik-mui'
import { t } from 'i18next'
import GMInput from '../common/GMInput'
import { arrivalDate, departureDate } from './utils/arrivalAndDepartureDates'
import { guestRegistrationSchema } from './utils/guestRegistrationSchema'
import { speechLengthOptions } from './utils/speechLengthOptions'

interface IProps {
  onSubmit: (values: GuestRegistrationFormProps) => void
}

const GuestRegistration = ({ onSubmit }: IProps) => {
  return (
    <>
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
          speechLength: SpeechLength.min0_15,
          specialNeeds: ''
        }}
        validationSchema={guestRegistrationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values, touched, setFieldValue, errors }) => (
          <Form>
            <Box p={4}>
              <Stack width='40%' minWidth='320px'>
                <Field
                  name='firstName'
                  label={t('common.firstName')}
                  component={GMInput}
                  error={errors.firstName}
                  touched={touched.firstName}
                />

                <Field
                  name='lastName'
                  label={t('common.lastName')}
                  component={GMInput}
                  error={errors.lastName}
                  touched={touched.lastName}
                />

                <Field
                  name='email'
                  type='email'
                  label={t('common.email')}
                  component={GMInput}
                  error={errors.email}
                  touched={touched.email}
                />

                <Field
                  name='tel'
                  type='tel'
                  label={t('common.tel')}
                  component={GMInput}
                  error={errors.tel}
                  touched={touched.tel}
                />

                <Stack direction={{ xs: 'column', lg: 'row' }} pt={2} pb={1}>
                  {/* DateRangePicker is included on Pro package, thus we're using DatePickers */}
                  <Box>
                    <Field
                      component={DatePicker}
                      label={t('guestForm.arrivalDate')}
                      name='arrival'
                      onChange={(value: Date) => {
                        setFieldValue('arrival', value)
                      }}
                      minDate={dayjs.utc(arrivalDate)}
                      maxDate={dayjs.utc(departureDate)}
                      views={['day']}
                    />
                  </Box>
                  <Box pt={{ xs: 3, lg: 0 }} pl={{ lg: 3 }}>
                    <Field
                      component={DatePicker}
                      label={t('guestForm.departureDate')}
                      name='departure'
                      onChange={(value: Date) => {
                        setFieldValue('departure', value)
                      }}
                      minDate={dayjs.utc(arrivalDate)}
                      maxDate={dayjs.utc(departureDate)}
                      views={['day']}
                    />
                  </Box>
                </Stack>

                <Field
                  component={GMInput}
                  name='accomodationComment'
                  label={t('guestForm.accomodationComment')}
                  type='textarea'
                  multiline={true}
                  error={errors.accomodationComment}
                  touched={touched.accomodationComment}
                />

                <Field
                  component={CheckboxWithLabel}
                  type='checkbox'
                  name='presents'
                  Label={{ label: t('guestForm.presents') }}
                />
                {values.presents && (
                  <>
                    <Box pb={2}>
                      <Field
                        component={CheckboxWithLabel}
                        type='checkbox'
                        name='ownsPc'
                        Label={{ label: t('guestForm.ownsPc') }}
                      />
                    </Box>

                    <Field
                      component={Select}
                      name='speechLength'
                      label={t('guest.speechLength')}
                      formHelperText={{
                        children: t('guestForm.speechLengthHelperText')
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
                      component={GMInput}
                      name='specialNeeds'
                      label={t('guestForm.specialNeeds')}
                      type='textarea'
                      multiline={true}
                      error={errors.specialNeeds}
                      touched={touched.specialNeeds}
                    />
                  </>
                )}
                <Box mt={2}>
                  <Button variant='outlined' type='submit'>
                    {t('guestForm.submit')}
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GuestRegistration
