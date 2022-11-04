import { useState } from 'react';
import { Box, Button, Dialog, TextField, Typography } from '@mui/material';

const style = {
  padding: '50px',
  '& .MuiButton-root': {
    width: '300px',
    margin: '10px',
  },
  '& .MuiTextField-root': {
    width: '300px',
    margin: '10px',
    backgroundColor: '#fff',
  },
  '& .MuiTextField-root:first-of-type': {
    marginTop: '30px',
  },
  a: {
    textDecoration: 'none',
  },
};

const BlockCommentDialog = ({ open, closeDialog, sendComment }) => {
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Dialog open={open}>
      <Box display='flex' flexDirection='column' sx={style}>
        <Typography variant='h5' textAlign='center'>
          Motivo del bloqueo
        </Typography>
        <TextField
          autoComplete='off'
          variant='outlined'
          value={comment}
          name='comment'
          onChange={handleChange}
          multiline
          rows={4}
          placeholder='Describa el motivo del bloqueo'
        />

        <Button
          variant='contained'
          color='success'
          disabled={comment === ''}
          onClick={() => {
            closeDialog();
            sendComment(comment);
            setComment('');
          }}
        >
          Enviar
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            closeDialog();
            setComment('');
          }}
        >
          Cancelar
        </Button>
      </Box>
    </Dialog>
  );
};

export default BlockCommentDialog;
