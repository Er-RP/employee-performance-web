import MUIButton from "@mui/material/Button";

const Button = ({
  text = "Click Me",
  variant = "contained",
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <MUIButton variant={variant} onClick={onClick} disabled={disabled}>
      {text}
    </MUIButton>
  );
};

export default Button;
