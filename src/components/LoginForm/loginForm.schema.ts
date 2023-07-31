import { t } from 'i18next';
import * as Yup from 'yup';

export const userLoginSchema = Yup.object({
  userEmail: Yup.string()
    .email(`${t('formValidation.emailInvalid')}`)
    .required(`${t('formValidation.emailRequired')}`),
  password: Yup.string().required(`${t('formValidation.passwordRequired')}`),
});
