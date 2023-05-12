import { ButtonBase, styled } from "@mui/material";

export const OutlinedButton = styled(ButtonBase)(({ theme }) => ({
  "&": {
    height: 40,
    width: 200,
    borderRadius: 20,
    backgroundColor: "#fff",
    transition: ".3s",
    textTransform: "none",
    color: theme.palette.secondary.main,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  "&:hover": {
    transition: ".3s",
    transform: "scale(1.05)",
  },
  "&:disabled": {
    backgroundColor: "grey",
  },
}));

export const ContainedButton = styled(ButtonBase)(({ theme }) => ({
  "&": {
    height: 40,
    width: 200,
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.main,
    transition: ".3s",
    textTransform: "none",
    color: theme.palette.secondary.contrastText,
  },
  "&:hover": {
    transition: ".3s",
    transform: "scale(1.05)",
  },
  "&:disabled": {
    backgroundColor: "grey",
  },
}));
