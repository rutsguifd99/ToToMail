import {
  Alert,
  Box,
  Paper,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { ContainedButton } from "../UI/Buttons";
import { useInput } from "./hooks/useInput";
import { ReactComponent as Logo } from "../../assets/LOGO.svg";
import { Link, useNavigate } from "react-router-dom";
import { homeRoute } from "../../router/constants";
import { authAPI } from "../../services/AuthService";
import { useAuth } from "../../context/useAuthProvider";

export const LoginForm = () => {
  const navigate = useNavigate();

  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 24,
  });

  const [login, { isError, error }] = authAPI.useLoginMutation();
  const auth = useAuth();

  const handleClick = async () => {
    try {
      const user = await login({
        email: email.value,
        password: password.value,
      }).unwrap();

      localStorage.setItem("token", user.accessToken);
      auth?.setAuth(user);
      navigate("/add-emails");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "40vw",
        minWidth: "400px",
        gap: 4,
        boxShadow: 4,
      }}
    >
      {isError ? (
        <Alert severity="error">
          {(error as { data: { message: string } }).data.message}
        </Alert>
      ) : null}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to={homeRoute}>
          <SvgIcon component={Logo} inheritViewBox fontSize="large" />
        </Link>
        <Typography variant="h5" fontWeight={600}>
          Sign In
        </Typography>
      </Box>
      <TextField
        error={email.isDirty && !email.inputValid}
        variant="standard"
        label="Email"
        helperText={
          email.isDirty && !email.inputValid
            ? email.isEmptyError || email.emailError
            : null
        }
        color="secondary"
        onChange={(e) => email.onChange(e.target.value)}
        onBlur={email.onBlur}
        type="text"
        sx={{ width: "50%" }}
        required
      />
      <TextField
        error={password.isDirty && !password.inputValid}
        variant="standard"
        label="Password"
        helperText={
          password.isDirty && !password.inputValid
            ? password.isEmptyError ||
              password.minLengthError ||
              password.maxLengthError
            : null
        }
        color="secondary"
        onChange={(e) => password.onChange(e.target.value)}
        onBlur={password.onBlur}
        type="password"
        sx={{ width: "50%" }}
        required
      />
      <ContainedButton
        onClick={handleClick}
        disabled={!email.inputValid || !password.inputValid}
      >
        Sign In
      </ContainedButton>
      <Typography sx={{ textAlign: "center", fontSize: 14 }}>
        Don't remember your password?
        <br />
        <Link to="#">change it.</Link>
      </Typography>
      <Typography sx={{ width: "50%", textAlign: "right", fontSize: 14 }}>
        Don't have account yet?
        <br />
        <Link to="/registration">sign up.</Link>
      </Typography>
    </Paper>
  );
};
