import { Button, Grid, TextField, MenuItem, Typography } from "@mui/material";
import {
  COURSE_TYPE_GROUP,
  COURSE_TYPE_SINGLE,
  COURSE_FREQUENCY_ONCE,
  COURSE_FREQUENCY_WEEKLY,
  COURSE_FREQUENCY_MONTHLY,
} from "../constants";

export const typeItems = [
  { key: 1, value: "", label: "Tipo de clase" },
  { key: 2, value: COURSE_TYPE_SINGLE, label: "Individual" },
  { key: 3, value: COURSE_TYPE_GROUP, label: "Grupal" },
];

export const frequencyItems = [
  { key: 1, value: "", label: "Frecuencia" },
  { key: 2, value: COURSE_FREQUENCY_ONCE, label: "Única" },
  { key: 3, value: COURSE_FREQUENCY_WEEKLY, label: "Semanal" },
  { key: 4, value: COURSE_FREQUENCY_MONTHLY, label: "Mensual" },
];

const ratingItems = [
  { key: 1, value: "", label: "Calificación" },
  { key: 2, value: 5, label: "⭐⭐⭐⭐⭐" },
  { key: 3, value: 4, label: "⭐⭐⭐⭐" },
  { key: 4, value: 3, label: "⭐⭐⭐" },
  { key: 5, value: 2, label: "⭐⭐" },
  { key: 6, value: 1, label: "⭐" },
];

const style = {
  backgroundColor: "#eee",
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiButton-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiInputBase-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiFormLabel-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiTextField-root": {
    width: "200px",
    margin: "10px",
    backgroundColor: "#fff",
  },
  input: {
    fontFamily: "Montserrat",
  },
};

const Header = ({ formContent, handleChange, handleClick }) => {
  const { name, type, frequency, rating } = formContent;
  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={style}
    >
      <img
        src="https://webevolmind.b-cdn.net/wp-content/uploads/2022/03/escuelas-de-negocio-cabecera.webp"
        alt="header"
        style={{ width: "500px" }}
      />
      <Typography variant="h2">¡Bienvenido!</Typography>
      <Typography variant="h4">¿Estás buscando una clase?</Typography>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          autoComplete="off"
          variant="outlined"
          label="Materia"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <TextField
          value={type}
          select
          label="Tipo de clase"
          name="type"
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
          label="Frecuencia"
          name="frequency"
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
          label="Calificación"
          name="rating"
          onChange={handleChange}
        >
          {ratingItems.map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          sx={{ height: "50px", margin: "10px" }}
          onClick={handleClick}
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
