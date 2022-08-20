import { Button, Grid, TextField, MenuItem, Typography } from "@mui/material";

const typeItems = [
  { key: 1, value: "Individual" },
  { key: 2, value: "Grupal" },
];

const frequencyItems = [
  { key: 1, value: "Única" },
  { key: 2, value: "Semanal" },
  { key: 3, value: "Mensual" },
];

const ratingItems = [
  { key: 5, value: "⭐⭐⭐⭐⭐" },
  { key: 4, value: "⭐⭐⭐⭐" },
  { key: 3, value: "⭐⭐⭐" },
  { key: 2, value: "⭐⭐" },
  { key: 1, value: "⭐" },
];

const style = {
  backgroundColor: "#ccc",
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiButton-root": {
    fontFamily: "Montserrat",
  },
};

const Header = ({ formContent, handleChange, handleClick, beginSearch }) => {
  const { name, type, frequency, rating } = formContent;
  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={style}
    >
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
          variant="outlined"
          label="Materia"
          value={name}
          name="name"
          onChange={handleChange}
          sx={{
            width: "200px",
            margin: "10px",
            backgroundColor: "#fff",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          value={type}
          select
          label="Tipo de clase"
          name="type"
          onChange={handleChange}
          sx={{ width: "200px", margin: "10px", backgroundColor: "#fff" }}
        >
          {typeItems.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.value}
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
              {item.value}
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
              {item.value}
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
