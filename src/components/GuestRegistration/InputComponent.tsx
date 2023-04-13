import { Box, TextField } from "@mui/material";
import { FieldProps } from "formik";
import React from "react";

export interface InputComponentProps extends FieldProps {
  variant: "standard" | "filled" | "outlined" | undefined;
  margin: "normal" | "none" | "dense" | undefined;
  multiline: boolean | undefined;
  rows: number;
  label: string;
  type: string;
  size: "small" | "medium" | undefined;
}

const InputComponent = ({
  variant = "outlined",
  margin = "normal",
  multiline = undefined,
  rows = 3,
  label,
  type,
  size = "medium",
  field,
}: InputComponentProps) => {
  return (
    <TextField
      multiline={multiline}
      minRows={rows}
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
