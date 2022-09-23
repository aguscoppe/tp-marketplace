import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import Navbar from "../components/NavBar";
import { useState } from "react";
import { users } from "../data";

const Register = () => {
  const [usuario, setUsuario] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const roles = [
    { text: "Profesor", value: "profesor" },
    { text: "Alumno", value: "alumno" },
  ];

  const handleChange = (prop) => (event) => {
    setUsuario({ ...usuario, [prop]: event.target.value });
  };

  const handleRegister = () => {
    if (users.some((el) => el.email === usuario.email)) {
      //error de email ya registrado
    } else {
      //loguear usuario y guardarlo.
    }
  };

  const styles = {
    width: "300px",
    margin: "10px",
    backgroundColor: "#fff",
    fontFamily: "Montserrat",
    borderRadius: "8px",
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          height: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #1976d2',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "right",
          a: {
            color: "#fff",
            "&:hover": {
              color: "#90caf9",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "400px",
            Height: "500px",
            backgroundColor: "#595959",
            borderRadius: "30px",
            padding: "40px",
            boxShadow: 20,
            "@media (max-width: 480px)": {
              width: "100vw",
              height: "100%",
              borderRadius: "0px",
              justifyContent: "center",
            },
            color: "#FFF",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              "@media (max-width: 480px)": {
                width: "100vw",
                height: "100%",
                borderRadius: "0px",
                justifyContent: "center",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, margin: "20px", fontFamily: "Montserrat" }}
            >
              Registrarse
            </Typography>
            <TextField
              variant="outlined"
              label="Nombre"
              value={usuario.name}
              onChange={handleChange("name")}
              sx={styles}
            />
            <TextField
              variant="outlined"
              label="Apellido"
              value={usuario.surname}
              onChange={handleChange("surname")}
              sx={styles}
            />
            <TextField
              variant="outlined"
              label="Email"
              value={usuario.email}
              onChange={handleChange("email")}
              sx={styles}
            />
            <TextField
              variant="outlined"
              label="Password"
              value={usuario.password}
              onChange={handleChange("password")}
              sx={styles}
            />
            <TextField
              variant="outlined"
              label="Telefono"
              value={usuario.phone}
              onChange={handleChange("phone")}
              sx={styles}
            />
            <TextField
              select
              id="outlined-select-currency"
              variant="outlined"
              label="Rol"
              value={usuario.role}
              onChange={handleChange("role")}
              sx={styles}
            >
              {roles.map((rol) => (
                <MenuItem key={rol.value} value={rol.value}>
                  {rol.text}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                margin: "10px",
                marginTop: "20px",
                minWidth: "200px",
                fontFamily: "Montserrat",
              }}
              onClick={handleRegister}
            >
              REGISTRARME
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Register;
