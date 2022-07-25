import React, { ReactNode } from "react";
import MuiDialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { Button } from "../Button";

interface Props {
  title: string | JSX.Element;
  children: ReactNode;
  onSave?: () => void;
  onCancel: () => void;
  disableSaveBtn?: boolean;
  dialogProps: DialogProps;
  isSaving?: boolean;
  saveBtnType?: "button" | "submit" | "reset";
}

export const Dialog = ({
  title,
  children,
  onSave = () => {},
  onCancel = () => {},
  disableSaveBtn,
  dialogProps,
  saveBtnType,
  isSaving = false,
}: Props) => (
  <MuiDialog
    fullWidth
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    {...dialogProps}
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

    <DialogContent>
      <DialogContentText id="alert-dialog-description" component="div">
        {children}
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ mt: "1.5em" }}>
      <Button
        buttonProps={{
          onClick: onCancel,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Cancel
        </Typography>
      </Button>

      <Button
        buttonProps={{
          onClick: onSave,
          autoFocus: true,
          disabled: disableSaveBtn || isSaving,
          type: saveBtnType,
        }}
      >
        <Typography variant="subtitle2">
          {isSaving ? "Saving..." : "Save"}
        </Typography>
      </Button>
    </DialogActions>
  </MuiDialog>
);
