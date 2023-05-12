import {
  Alert,
  Box,
  Paper,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuthProvider";
import { homeRoute } from "../../router/constants";
import { authAPI } from "../../services/AuthService";
import { useInput } from "./hooks/useInput";

import { ReactComponent as Logo } from "../../assets/LOGO.svg";
import { ContainedButton } from "../UI/Buttons";
import { useState } from "react";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [passwordEqError, setPasswordEqError] = useState<string | null>(null);

  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 24,
  });
  const confirmPassword = useInput("", {
    isEmpty: true,
    minLength: 8,
    maxLength: 24,
  });

  const [registration, { isError, error }] = authAPI.useRegistrationMutation();
  const auth = useAuth();

  const handleClick = async () => {
    if (password.value !== confirmPassword.value) {
      setPasswordEqError(() => "Passwords don't match");
      console.log(password.value, confirmPassword.value, passwordEqError);
    } else {
      await registration({
        email: email.value,
        password: password.value,
      })
        .unwrap()
        .then((user) => {
          localStorage.setItem("token", user.accessToken);
          auth?.setAuth(user);
        });
      navigate("/add-emails");
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
      {isError || passwordEqError ? (
        <Alert severity="error">
          {passwordEqError ||
            (error as { data: { message: string } }).data.message}
        </Alert>
      ) : null}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link to={homeRoute}>
          <SvgIcon component={Logo} inheritViewBox fontSize="large" />
        </Link>
        <Typography variant="h5" fontWeight={600}>
          Sign Up
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
      <TextField
        error={confirmPassword.isDirty && !confirmPassword.inputValid}
        variant="standard"
        label="Confirm Password"
        helperText={
          confirmPassword.isDirty && !confirmPassword.inputValid
            ? confirmPassword.isEmptyError ||
              confirmPassword.minLengthError ||
              confirmPassword.maxLengthError
            : null
        }
        color="secondary"
        onChange={(e) => confirmPassword.onChange(e.target.value)}
        onBlur={confirmPassword.onBlur}
        type="password"
        sx={{ width: "50%" }}
        required
      />
      <ContainedButton
        onClick={handleClick}
        disabled={!email.inputValid || !password.inputValid}
      >
        Sign Up
      </ContainedButton>
      <Typography sx={{ textAlign: "center", fontSize: 14 }}>
        Don't remember your password?
        <br />
        <Link to="#">change it.</Link>
      </Typography>
      <Typography sx={{ width: "50%", textAlign: "right", fontSize: 14 }}>
        Already have an account?
        <br />
        <Link to="/login">sign in.</Link>
      </Typography>
    </Paper>
  );
};
