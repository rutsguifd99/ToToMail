import { Container, useTheme } from "@mui/material";
import { RegistrationForm } from "../../components/Auth";

export const RegistrationPage = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: `linear-gradient(to right bottom, ${theme.palette.primary.main},  ${theme.palette.secondary.main})`,
      }}
    >
      <RegistrationForm />
    </Container>
  );
};
