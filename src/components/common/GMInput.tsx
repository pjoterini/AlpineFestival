import { TextField } from '@mui/material';
import { FieldProps } from 'formik';
import { InputError } from './InputError';

interface IProps extends FieldProps {
  name: string;
  variant: 'standard' | 'filled' | 'outlined' | undefined;
  margin: 'normal' | 'none' | 'dense' | undefined;
  multiline: boolean | undefined;
  rows: number;
  label: string;
  type: string;
  size: 'small' | 'medium' | undefined;
  error: string;
  touched: boolean | undefined;
  disabled: boolean;
}

const GMInput = ({
  variant = 'outlined',
  margin = 'normal',
  multiline,
  rows = 3,
  label,
  type,
  size = 'medium',
  error,
  touched,
  field,
  disabled = false,
}: IProps) => {
  return (
    <>
      <TextField
        multiline={multiline}
        minRows={rows}
        variant={variant}
        margin={margin}
        type={type}
        label={label}
        size={size}
        error={!!error && !!touched}
        disabled={disabled}
        {...field}
      />
      {error && touched && <InputError error={error} />}
    </>
  );
};

export default GMInput;
