import { AppBar, Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NameLogo from "../../assets/LOGO+NAME.svg";
import { ContainedButton, OutlinedButton } from "../UI/Buttons";

export const Header = () => {
  const navigate = useNavigate();
  const navigateRegistration = () => {
    navigate("/registration");
  };
  const navigateLogin = () => {
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          disableGutters={true}
          sx={{
            height: 70,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ ml: 8, height: 30 }}
            component="img"
            src={NameLogo}
            alt="LOGO"
          />
          <Box sx={{ mr: 8, display: "flex", gap: 4 }}>
            <ContainedButton onClick={navigateRegistration}>
              Register
            </ContainedButton>
            <OutlinedButton onClick={navigateLogin}>Login</OutlinedButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
