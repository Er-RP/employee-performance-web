import { TextField } from "@mui/material";

const TextInput = ({
  label = "label",
  id = "id",
  error = null,
  defaultValue,
  placeHolder = "Enter here",
  variant = "standard",
  shrink = true,
  onChange = () => {},
  value,
  sx = { m: 1.5 },
  ...others
}) => {
  return (
    <TextField
      error={error ? true : false}
      id={id}
      label={label}
      value={value}
      defaultValue={defaultValue}
      helperText={error && JSON.stringify(error)}
      placeholder={placeHolder}
      variant={variant}
      InputLabelProps={{
        shrink: shrink,
      }}
      onChange={onChange}
      fullWidth
      sx={sx}
      {...others}
    />
  );
};

export default TextInput;
