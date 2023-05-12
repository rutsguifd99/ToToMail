import { Container, useTheme } from "@mui/material";
import AddEmails from "../../components/AddEmails";

export const AddEmailsPage = () => {
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
        background: `radial-gradient(${theme.palette.secondary.main},  ${theme.palette.primary.main})`,
      }}
    >
      <AddEmails />
    </Container>
  );
};
