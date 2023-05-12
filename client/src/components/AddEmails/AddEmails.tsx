import { Box, Paper, SvgIcon, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { homeRoute } from "../../router/constants";
import { ReactComponent as Logo } from "../../assets/LOGO.svg";
import { Link, useNavigate } from "react-router-dom";
import { ContainedButton } from "../UI/Buttons";
import { gmailAPI } from "../../services/GmailService";

export const AddEmails = () => {
  const navigate = useNavigate();
  const [getProfile] = gmailAPI.useLazyGetProfileQuery();
  const [addGmailAccount, { data }] = gmailAPI.useAddGmailAccountMutation();
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      //   addGmailAccount(codeResponse.code);
      //   const res = await getProfile();
      //   console.log(res.data);
      navigate("/main/inbox");
    },
    flow: "auth-code",
    scope: "https://mail.google.com/",
  });
  console.log(data);
  return (
    <>
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to={homeRoute}>
            <SvgIcon component={Logo} inheritViewBox fontSize="large" />
          </Link>
          <Typography variant="h5" fontWeight={600}>
            Add Your Google Account
          </Typography>
        </Box>
        <ContainedButton onClick={() => googleLogin()}>
          Log In Using Google
        </ContainedButton>
      </Paper>
    </>
  );
};
