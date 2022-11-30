import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const info = (props) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  const onOk = () => {
    handleClose();
    if (props.onOk) {
      props.onOk();
    }
  };

  const onCancel = () => {
    handleClose();
    if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{props.title || ''}</DialogTitle>
        <DialogContent>{props.content}</DialogContent>
        <DialogActions>
          <Button onClick={onOk} autoFocus>
            {props.okText || 'OK'}
          </Button>
          <Button autoFocus onClick={onCancel}>
            {props.cancelText || 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
info.propTypes = {
  title: PropTypes.any,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  content: PropTypes.any
};
