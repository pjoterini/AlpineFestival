import { Status } from '@/redux/enums/status';
import { Typography } from '@mui/material';
import { DefaultTFuncReturn, t } from 'i18next';
import React from 'react';

interface IProps {
  formSubmitStatus: Status;
  message: string;
  errorMessage?: string | DefaultTFuncReturn;
}

const FormStatusMessage = ({
  formSubmitStatus,
  message,
  errorMessage,
}: IProps) => {
  return (
    <>
      {formSubmitStatus === Status.SUCCEEDED && (
        <Typography variant="h5" mx="auto" color="success.main">
          {message}
        </Typography>
      )}
      {formSubmitStatus === Status.FAILED && (
        <Typography variant="h5" mx="auto" color="error.main">
          {errorMessage
            ? errorMessage
            : t('formValidation.formSubmitMessageError')}
        </Typography>
      )}
    </>
  );
};

export default FormStatusMessage;
