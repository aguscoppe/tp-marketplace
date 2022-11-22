import Snackbar from '@mui/material/Snackbar';
import MUIAlert from '@mui/material/Alert';
import * as React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MUIAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Snack = ({ open, duration = 6000, onClose, type, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
