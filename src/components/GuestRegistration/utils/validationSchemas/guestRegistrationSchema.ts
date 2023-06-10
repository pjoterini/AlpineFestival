import { t } from 'i18next';
import * as Yup from 'yup';

export const guestRegistrationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, `${t('guestFormValidation.firstNameTooShort')}`)
    .max(50, `${t('guestFormValidation.firstNameTooLong')}`)
    .required(`${t('guestFormValidation.firstNameRequired')}`),
  lastName: Yup.string()
    .min(2, `${t('guestFormValidation.lastNameTooShort')}`)
    .max(50, `${t('guestFormValidation.lastNameTooLong')}`)
    .required(`${t('guestFormValidation.lastNameRequired')}`),
  email: Yup.string()
    .email(`${t('formValidation.emailInvalid')}`)
    .required(`${t('formValidation.emailRequired')}`),
  tel: Yup.string().required(`${t('guestFormValidation.telRequired')}`),
  arrival: Yup.string()
    .typeError(`${t('guestFormValidation.dateTypeError')}`)
    .required(`${t('guestFormValidation.arrivalRequired')}`),
  departure: Yup.string()
    .required(`${t('guestFormValidation.departureRequired')}`)
    .test(
      'compare_date',
      `${t('guestFormValidation.departureMin')}`,
      (departue, { parent: { arrival } }) =>
        Date.parse(departue) > Date.parse(arrival)
    ),
  accomodationComment: Yup.string().max(
    500,
    `${t('guestFormValidation.commentTooLong')}`
  ),
  specialNeeds: Yup.string().max(
    500,
    `${t('guestFormValidation.commentTooLong')}`
  ),
});
