import { Button, Grid, TextField, MenuItem, Typography } from "@mui/material";

const typeItems = [
  { key: 1, value: "", label: "Tipo de clase" },
  { key: 2, value: "Individual", label: "Individual" },
  { key: 3, value: "Grupal", label: "Grupal" },
];

const frequencyItems = [
  { key: 1, value: "", label: "Frecuencia" },
  { key: 2, value: "Única", label: "Única" },
  { key: 3, value: "Semanal", label: "Semanal" },
  { key: 4, value: "Mensual", label: "Mensual" },
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
          sx={{
            width: "200px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          value={type}
          select
          label="Tipo de clase"
          name="type"
          onChange={handleChange}
          sx={{
            width: "200px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        >
          {typeItems.map((item) => (
            <MenuItem key={item.id} value={item.value}>
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
          sx={{ width: "200px", margin: "10px", backgroundColor: "#fff" }}
        >
          {frequencyItems.map((item) => (
            <MenuItem key={item.id} value={item.value}>
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
          sx={{ width: "200px", margin: "10px", backgroundColor: "#fff" }}
        >
          {ratingItems.map((item) => (
            <MenuItem key={item.id} value={item.value}>
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
