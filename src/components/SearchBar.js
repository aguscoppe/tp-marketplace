import { Button, Grid, TextField, MenuItem } from '@mui/material';
import {
  COURSE_TYPE_GROUP,
  COURSE_TYPE_SINGLE,
  COURSE_FREQUENCY_ONCE,
  COURSE_FREQUENCY_WEEKLY,
  COURSE_FREQUENCY_MONTHLY,
} from '../constants';

export const typeItems = [
  { key: 1, value: '', label: 'Tipo de clase' },
  { key: 2, value: COURSE_TYPE_SINGLE, label: 'Individual' },
  { key: 3, value: COURSE_TYPE_GROUP, label: 'Grupal' },
];

export const frequencyItems = [
  { key: 1, value: '', label: 'Frecuencia' },
  { key: 2, value: COURSE_FREQUENCY_ONCE, label: 'Única' },
  { key: 3, value: COURSE_FREQUENCY_WEEKLY, label: 'Semanal' },
  { key: 4, value: COURSE_FREQUENCY_MONTHLY, label: 'Mensual' },
];

const ratingItems = [
  { key: 1, value: '', label: 'Calificación' },
  { key: 2, value: 5, label: '⭐⭐⭐⭐⭐' },
  { key: 3, value: 4, label: '⭐⭐⭐⭐' },
  { key: 4, value: 3, label: '⭐⭐⭐' },
  { key: 5, value: 2, label: '⭐⭐' },
  { key: 6, value: 1, label: '⭐' },
];

const style = {
  marginBottom: '32px',
  '& .MuiTextField-root': {
    width: '200px',
    margin: '10px',
    backgroundColor: '#fff',
  },
  '@media (max-width: 800px)': {
    flexDirection: 'column',
    '& .MuiTextField-root': {
      width: '95%',
    },
    '& .MuiButton-root': {
      width: '95%',
    },
  },
  '@media (max-width: 700px)': {
    '& input.MuiOutlinedInput-input': {
      padding: '14px',
    },
    '& .MuiButton-root': {
      fontSize: '10px',
    },
  },
};

const SearchBar = ({ formContent, handleChange, handleClick }) => {
  const { name, subject, type, frequency, rating } = formContent;
  return (
    <Grid
      item
      xs={12}
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={style}
    >
      <TextField
        autoComplete='off'
        variant='outlined'
        label='Nombre'
        value={name}
        name='name'
        onChange={handleChange}
      />
      <TextField
        autoComplete='off'
        variant='outlined'
        label='Materia'
        value={subject}
        name='subject'
        onChange={handleChange}
      />
      <TextField
        value={type}
        select
        label='Tipo de clase'
        name='type'
        onChange={handleChange}
      >
        {typeItems.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        value={frequency}
        select
        label='Frecuencia'
        name='frequency'
        onChange={handleChange}
      >
        {frequencyItems.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        value={rating}
        select
        label='Calificación'
        name='rating'
        onChange={handleChange}
      >
        {ratingItems.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant='contained'
        sx={{ height: '50px', margin: '10px' }}
        onClick={handleClick}
      >
        Buscar
      </Button>
    </Grid>
  );
};

export default SearchBar;
