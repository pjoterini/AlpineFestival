import { t } from 'i18next';
import * as Yup from 'yup';

export const guestFormSchema = Yup.object({
  firstName: Yup.string()
    .min(2, `${t('formValidation.firstNameTooShort')}`)
    .max(50, `${t('formValidation.firstNameTooLong')}`)
    .required(`${t('formValidation.firstNameRequired')}`),
  lastName: Yup.string()
    .min(2, `${t('formValidation.lastNameTooShort')}`)
    .max(50, `${t('formValidation.lastNameTooLong')}`)
    .required(`${t('formValidation.lastNameRequired')}`),
  email: Yup.string()
    .email(`${t('formValidation.emailInvalid')}`)
    .required(`${t('formValidation.emailRequired')}`),
  tel: Yup.string()
    .required(`${t('formValidation.telRequired')}`)
    .min(8, `${t('formValidation.telTooShort')}`)
    .max(13, `${t('formValidation.telTooLong')}`),
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
