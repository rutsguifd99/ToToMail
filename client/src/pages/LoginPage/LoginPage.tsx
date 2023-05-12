import { Container, useTheme } from "@mui/material";
import { LoginForm } from "../../components/Auth";

export const LoginPage = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: `linear-gradient(to right bottom, ${theme.palette.secondary.main},  ${theme.palette.primary.main})`,
      }}
    >
      <LoginForm />
    </Container>
  );
};
