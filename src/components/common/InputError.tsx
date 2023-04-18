import { Box } from "@mui/system";

interface IProps {
  error: string;
}

export const InputError = ({ error }: IProps) => {
  return (
    <Box fontFamily="Roboto" pl={1} pb={2} color="red">
      {error}
    </Box>
  );
};
