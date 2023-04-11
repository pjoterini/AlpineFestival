import { Box, TextField } from "@mui/material";
import { FieldProps } from "formik";
import React from "react";

interface InputComponentProps extends FieldProps {
  variant: "standard" | "filled" | "outlined" | undefined;
  margin: "normal" | "none" | "dense" | undefined;
  label: string;
  type: string;
  size: "small" | "medium" | undefined;
}

const InputComponent = ({
  variant = "outlined",
  margin = "normal",
  label,
  type,
  size = "medium",
  field,
}: InputComponentProps) => {
  return (
    <TextField
      variant={variant}
      margin={margin}
      type={type}
      label={label}
      size={size}
      {...field}
    />
  );
};

export default InputComponent;
