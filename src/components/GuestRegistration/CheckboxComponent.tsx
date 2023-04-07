import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { FieldProps } from "formik";
import React from "react";

interface CheckboxComponentProps extends FieldProps {
  label: string;
}

const CheckboxComponent = ({ label, field }: CheckboxComponentProps) => {
  return (
    <Box pb={2}>
      <FormControlLabel
        control={<Checkbox size="medium" />}
        label={label}
        {...field}
      />
    </Box>
  );
};

export default CheckboxComponent;
