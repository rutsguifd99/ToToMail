import { IconButton, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { PropsWithChildren, useState } from "react";
import Draggable from "react-draggable";
import { ContainedButton } from "../UI/Buttons";
import { gmailAPI } from "../../services/GmailService";

function PaperComponent(props: PropsWithChildren) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper
        {...props}
        sx={{
          alignSelf: "center",
          width: "60vw",
          //height: "60vh",
          padding: "24px",
        }}
      />
    </Draggable>
  );
}

export default function SendEmails() {
  const [message] = gmailAPI.useSendMessageMutation();
  const [saveDraft] = gmailAPI.useSaveDraftMutation();
  const [sendTo, setSendTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveDraft({ sendTo, subject, body });
  };

  const sendMessage = () => {
    message({ sendTo, subject, body });
    setOpen(false);
  };

  return (
    <>
      <ContainedButton sx={{ my: 5 }} onClick={handleClickOpen}>
        Message
      </ContainedButton>
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Message someone
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setSendTo(e.target.value)}
            variant="standard"
            label="Send To"
            color="secondary"
            type="text"
            sx={{ width: "100%", my: 1 }}
            required
          />
          <TextField
            onChange={(e) => setSubject(e.target.value)}
            variant="standard"
            label="Subject"
            color="secondary"
            type="text"
            sx={{ width: "100%", my: 1 }}
            required
          />
          <TextField
            onChange={(e) => setBody(e.target.value)}
            multiline
            maxRows={7}
            variant="standard"
            label="Message Text"
            color="secondary"
            type="text"
            sx={{ width: "100%", my: 1 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="outlined" onClick={sendMessage}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
