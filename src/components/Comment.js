import { Box, Avatar, Grid, Typography } from '@mui/material';
import { useFullName } from '../utils';

function generateColor() {
  const colors = [
    '#220901',
    '#621708',
    '#941b0c',
    '#bc3908',
    '#cc5803',
    '#e2711d',
    '#b86d29',
    '#c46247',
    '#745c45',
  ];
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

const color = generateColor();

function stringAvatar(name) {
  if (name !== undefined) {
    return {
      sx: {
        bgcolor: color,
        marginRight: '12px',
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
}

const style = {
  backgroundColor: '#fafafa',
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  border: '1px solid #ddd',
  marginTop: '12px',
};

const Comment = ({ message, userId }) => {
  const getFullName = useFullName(userId);
  const props = stringAvatar(getFullName(userId));

  return (
    <Box sx={style}>
      <Avatar {...props} />
      <Grid>
        <Typography variant='body2' sx={{ fontWeight: '700' }}>
          {getFullName(userId)}
        </Typography>
        <Typography variant='body1'>{message}</Typography>
      </Grid>
    </Box>
  );
};

export default Comment;
