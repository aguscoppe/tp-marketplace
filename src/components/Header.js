import { Grid, Typography } from '@mui/material';

const style = {
  backgroundColor: '#1976d2',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
    fontWeight: '500',
  },
  img: {
    padding: '36px',
    maxWidth: '100%',
    maxHeight: '100%',
  },
};

const Header = () => {
  return (
    <>
      <Grid
        container
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={style}
      >
        <Grid
          item
          xs={6}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Typography variant='h2'>CourseHero</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <img
            src='https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png'
            alt='header'
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
