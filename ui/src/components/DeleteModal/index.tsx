import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import {Button} from '../Button';

interface Props {
  open?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  content?: string;
  helperText?: string;
}

const DeleteModal = ({
  open,
  onConfirm,
  onClose,
  title,
  content,
  helperText,
}: Props) => (
  <Dialog
    open={open || false}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText
        id="alert-dialog-description"
        sx={{color: 'text.primary'}}>
        <Typography>{content}</Typography>
        {helperText && (
          <Typography variant="subtitle2">{helperText}</Typography>
        )}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        label="No"
        buttonProps={{
          onClick: onClose,
        }}>
        <Typography variant="subtitle2" color="text.secondary">
          No
        </Typography>
      </Button>

      <Button
        label="Yes"
        buttonProps={{
          onClick: onConfirm,
          autoFocus: true,
        }}>
        <Typography variant="subtitle2">Yes</Typography>
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteModal;
