import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackbarButton({ buttonStyle, msg, alert }) {
  const [open, setOpen] = React.useState(false);
//event handler to handle click, should sent product info to database, on success pops success message
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick} style={buttonStyle}>
        {msg}
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  );
}
