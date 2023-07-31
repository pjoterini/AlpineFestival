import { styled } from '@mui/material';
import PhoneInput from 'react-phone-input-2';

const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  '&.react-phone-number input.form-control': {
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

export default StyledPhoneInput;
