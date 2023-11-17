import {
  AccommodationFormProps,
  IAccommodation,
} from '@/redux/accomodations/interfaces';
import {
  GuestEditFormProps,
  GuestRegisterFormProps,
  IGuest,
} from '@/redux/guests/interfaces';
import { IUser, UserFormProps } from '@/redux/users/interfaces';
import { Box, styled } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';
import PhoneInput from 'react-phone-input-2';
import { InputError } from './InputError';
import 'react-phone-input-2/lib/style.css';

interface IProps {
  currentRow?: IAccommodation | IGuest | IUser | null;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<
    | GuestRegisterFormProps
    | GuestEditFormProps
    | AccommodationFormProps
    | UserFormProps
  >>;
  errors: FormikErrors<
    | GuestRegisterFormProps
    | GuestEditFormProps
    | AccommodationFormProps
    | UserFormProps
  >;
  touched: FormikTouched<
    | GuestRegisterFormProps
    | GuestEditFormProps
    | AccommodationFormProps
    | UserFormProps
  >;
}

const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  '&.react-phone-number input.form-control': {
    fontFamily: 'Roboto',
    height: '56px',
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: '5px',
    borderColor: 'rgba(145, 158, 171, 0.62)',
    paddingLeft: theme.spacing(6),
    '&:focus': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
  },
  '&.react-phone-number.error': {
    '& input': {
      borderColor: theme.palette.error.main,
      '&:focus': {
        borderColor: theme.palette.error.main,
        boxShadow: `0 0 0 1px ${theme.palette.error.main}`,
      },
    },
    '& .special-label': {
      color: theme.palette.error.main,
    },
  },
}));

export const GMPhoneInput = ({
  currentRow,
  setFieldValue,
  errors,
  touched,
}: IProps) => {
  return (
    <Box mt={2}>
      <StyledPhoneInput
        value={currentRow?.tel}
        inputProps={{
          name: 'tel',
        }}
        onChange={(_0, _1, _2, formattedValue: string) => {
          setFieldValue('tel', formattedValue);
        }}
        country={'pl'}
        containerClass={`react-phone-number ${errors.tel ? 'error' : ''}`}
      />
      <Box mt={1}>
        {errors.tel && touched.tel && <InputError error={errors.tel} />}
      </Box>
    </Box>
  );
};
