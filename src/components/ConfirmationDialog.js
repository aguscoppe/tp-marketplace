import { Dialog, Box, Typography, Button } from '@mui/material';

const style = {
  padding: '36px 0',
};

const ConfirmationDialog = ({ open, handleCancel, handleConfirm }) => {
  return (
    <Dialog open={open}>
      <Box display='flex' flexDirection='column' sx={style}>
        <Typography variant='h5' textAlign='center' marginBottom={2}>
          Atención
        </Typography>
        <Typography
          variant='body1'
          textAlign='center'
          sx={{ maxWidth: '75%', margin: '0 auto 20px auto' }}
        >
          ¿Estás seguro/a de que quieres realizar esta acción?
        </Typography>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-evenly'
          marginBottom={2}
        >
          <Button variant='contained' color='error' onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant='contained' color='success' onClick={handleConfirm}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;
