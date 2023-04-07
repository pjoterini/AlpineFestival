import { Box, TextField } from "@mui/material";
import { FieldProps } from "formik";
import React from "react";

interface InputComponentProps extends FieldProps {
  label: string;
  type: string;
}

const InputComponent = ({ label, type, field }: InputComponentProps) => {
  return (
    <Box pb={2}>
      <TextField type={type} label={label} {...field} />
    </Box>
  );
};

export default InputComponent;
