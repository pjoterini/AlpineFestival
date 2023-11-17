import { t } from 'i18next';
import * as Yup from 'yup';

export const accomodationFormSchema = Yup.object({
  name: Yup.string()
    .min(2, `${t('formValidation.addressTooShort')}`)
    .max(50, `${t('formValidation.addressTooLong')}`)
    .required(`${t('formValidation.firstNameRequired')}`),
  address: Yup.string()
    .min(2, `${t('formValidation.addressTooShort')}`)
    .max(50, `${t('formValidation.addressTooLong')}`)
    .required(`${t('formValidation.addressRequired')}`),
  tel: Yup.string()
    .required(`${t('formValidation.telRequired')}`)
    .min(8, `${t('formValidation.telLength')}`),
});
