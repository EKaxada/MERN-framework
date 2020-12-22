import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { DeleteIcon } from "@material-ui/icons";
import auth from "./../auth/auth-helper";
import { remove } from "./api-user.js";
import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    const jet = auth.isAuthenticated();
    remove(
      {
        userId: props.userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
