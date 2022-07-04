import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../progress";

export default function FormDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle style={{ fontWeight: "bold" }}>{props?.title}</DialogTitle>
        <DialogContent>{props.children && props.children}</DialogContent>
        <DialogActions>
          {props.loader ? (
            <Loader style={{marginRight:"20px",marginBottom:"10px"}} />
          ) : (
            <>
              <Button onClick={props.handleClose}>Cancel</Button>
              <Button onClick={props.handleSubmit}>
                {props.submitLabel ? props.submitLabel : "Add"}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
