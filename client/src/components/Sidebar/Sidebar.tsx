import {
  Container,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import OutboxOutlinedIcon from "@mui/icons-material/OutboxOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Link as RLink } from "react-router-dom";
import SendEmails from "../SendEmails";

const hoverAnimation = {
  transition: ".3s",
  "&:hover": { transition: ".3s", transform: "scale(1.1)" },
};

export const Sidebar = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
        borderRadius: "25px",
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
        padding: "25px",
      }}
    >
      <Typography
        variant="h5"
        alignSelf="center"
        fontFamily="Montserrat"
        fontWeight="600"
        mt={3}
      >
        To:To Mail
      </Typography>
      <SendEmails />
      <List sx={{ alignSelf: "start" }}>
        <Link
          color={theme.palette.primary.contrastText}
          component={RLink}
          to={"/main/inbox"}
          underline="none"
        >
          <ListItem disablePadding sx={{ my: 1 }}>
            <ListItemIcon>
              <MoveToInboxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" sx={hoverAnimation} />
          </ListItem>
        </Link>
        <Link
          color={theme.palette.primary.contrastText}
          component={RLink}
          to={"/main/starred"}
          underline="none"
        >
          <ListItem disablePadding sx={{ my: 1 }}>
            <ListItemIcon>
              <BookmarkBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Favored" sx={hoverAnimation} />
          </ListItem>
        </Link>
        <Link
          color={theme.palette.primary.contrastText}
          component={RLink}
          to={"/main/important"}
          underline="none"
        >
          <ListItem disablePadding sx={{ my: 1 }}>
            <ListItemIcon>
              <AccessTimeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Important" sx={hoverAnimation} />
          </ListItem>
        </Link>
        <Link
          color={theme.palette.primary.contrastText}
          component={RLink}
          to={"/main/sent"}
          underline="none"
        >
          <ListItem disablePadding sx={{ my: 1 }}>
            <ListItemIcon>
              <OutboxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sent" sx={hoverAnimation} />
          </ListItem>
        </Link>
        <Link
          color={theme.palette.primary.contrastText}
          component={RLink}
          to={"/main/draft"}
          underline="none"
        >
          <ListItem disablePadding sx={{ my: 1 }}>
            <ListItemIcon>
              <InboxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" sx={hoverAnimation} />
          </ListItem>
        </Link>
        <Link
          color={theme.palette.primary.contrastText}
          component={RLink}
          to={"/main/anywhere"}
          underline="none"
        >
          <ListItem disablePadding sx={{ my: 1 }}>
            <ListItemIcon>
              <MoreHorizOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="More" sx={hoverAnimation} />
          </ListItem>
        </Link>
      </List>
    </Container>
  );
};
