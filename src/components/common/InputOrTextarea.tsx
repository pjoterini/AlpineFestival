import { TextField } from "@mui/material";
import { FieldProps } from "formik";

// USAGE: PASSING MULTILINE TRUE PROP WILL MAKE THIS COMPONENT TEXT AREA

interface IProps extends FieldProps {
  variant: "standard" | "filled" | "outlined" | undefined;
  margin: "normal" | "none" | "dense" | undefined;
  multiline: boolean | undefined;
  rows: number;
  label: string;
  type: string;
  size: "small" | "medium" | undefined;
}

const InputOrTextarea = ({
  variant = "outlined",
  margin = "normal",
  multiline = undefined,
  rows = 3,
  label,
  type,
  size = "medium",
  field,
}: IProps) => {
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

export default InputOrTextarea;
