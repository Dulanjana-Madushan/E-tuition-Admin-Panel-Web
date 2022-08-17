import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DialogAlert() {
  const [open, setOpen] = useState(true);
  const history = useNavigate();

  const handleClose = () => {
    setOpen(false);
    history.push('/login');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent>
          <DialogContentText>
            Your Session has expired. Please log in again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} 
                  color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
    </Dialog>
  );
}