import Container from "@mui/material/Container";
import useForm from "../../helpers/hooks/useForm";
import { post } from "../../network/api";
import { useUser } from "../../providers/userProvider";
import { SIL } from "../../utils/localStorage";
import Button from "../common/input/Button";
import TextInput from "../common/input/TextInput";

const signInFormInitialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { values, handleInputChange, setValues } = useForm(
    signInFormInitialValues
  );
  const { setCurrentUser } = useUser();
  const isButtonEnabled = Boolean(values?.email) && Boolean(values?.password);
  const handleLogin = async () => {
    const res = await post("/auth/login", values, { credentials: "include" });
    if (res?.success) {
      setValues(signInFormInitialValues);
      setCurrentUser({
        loading: false,
        user: res.user,
        error: null,
      });
      SIL("UID", res?.user?.id);
    }
    console.log("res : ", res);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Container maxWidth="xs" className="px-4 py-6">
        <TextInput
          label="Email"
          value={values?.email}
          id="login_username"
          placeHolder="Enter your email"
          name="email"
          onChange={handleInputChange}
        />
        <TextInput
          label="Password"
          value={values?.password}
          id="login_password"
          placeHolder="Enter your password"
          name="password"
          onChange={handleInputChange}
          type="password"
        />
        <div className="text-center">
          <Button
            text="Sign In"
            onClick={handleLogin}
            disabled={!isButtonEnabled}
          />
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
