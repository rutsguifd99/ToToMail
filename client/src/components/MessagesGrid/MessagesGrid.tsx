import {
  Box,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gmailAPI } from "../../services/GmailService";

export const MessagesGrid = () => {
  const { messageDepartment } = useParams();
  const theme = useTheme();
  const [getMessages, { data, isLoading }] = gmailAPI.useGetMessagesMutation();
  const [previousPageTokens, setPreviousPageTokens] = useState<String[]>([]);

  const fetchMessages = (
    messageDepartment: String,
    nextPageToken: String | null
  ) => {
    if (nextPageToken) {
      setPreviousPageTokens((prev) => [...prev, nextPageToken]);
    }
    return getMessages({
      messageDepartment,
      nextPageToken: nextPageToken,
    });
  };

  const handlePreviousPageClick = () => {
    getMessages({
      messageDepartment: messageDepartment ?? "inbox",
      nextPageToken: previousPageTokens[previousPageTokens.length - 1],
    });
    setPreviousPageTokens((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    fetchMessages(messageDepartment ?? "inbox", null);
  }, [messageDepartment]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <LinearProgress color="secondary" sx={{ width: "100%" }} />
      </Box>
    );
  }

  if (data?.noMessages) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Typography variant="h4">
          No messages in category {messageDepartment}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Grid container>
        <Grid
          container
          sx={{
            minHeight: "50px",
            borderRadius: "25px 25px 0 0",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
            backgroundColor: theme.palette.primary.light,
            pl: theme.spacing(2),
          }}
        >
          <IconButton
            disabled={!previousPageTokens.length}
            onClick={handlePreviousPageClick}
          >
            <NavigateBeforeOutlinedIcon />
          </IconButton>
          <IconButton
            disabled={!data?.nextPageToken}
            onClick={() =>
              fetchMessages(
                messageDepartment || "inbox",
                data?.nextPageToken || null
              )
            }
          >
            <NavigateNextOutlinedIcon />
          </IconButton>
        </Grid>
        {data?.messages.map((message) => {
          const date = new Date(message.date.toString());
          const formattedDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;

          return (
            <Grid
              container
              direction="row"
              border={`0.5px solid ${theme.palette.additional.borderColor}`}
              padding={"4px"}
              key={message.id as Key}
            >
              <Grid item xs={3}>
                <Typography>{message.from}</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography>{message.subject}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{formattedDate}</Typography>
              </Grid>
            </Grid>
          );
        })}
        <Grid
          container
          sx={{
            minHeight: "50px",
            borderRadius: "0 0 25px 25px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
            backgroundColor: theme.palette.primary.light,
          }}
        ></Grid>
      </Grid>
    </>
  );
};
