import { Typography, TextField, Button, Grid, MenuItem } from "@mui/material";
import Navbar from "../components/NavBar";
import { useState } from "react";
import { teachers, students } from "../data";

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
    if (
      teachers.some((el) => el.email === usuario.email) ||
      students.some((el) => el.email === usuario.email)
    ) {
      //error de email ya registrado
    } else {
      //loguear usuario y guardarlo.
    }
  };
  return (
    <>
      <Navbar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sw={{}}
      >
        <Typography variant="h4" sx={{ fontWeight: 900, margin: "20px" }}>
          REGISTRARSE
        </Typography>
        <TextField
          variant="outlined"
          label="Nombre"
          value={usuario.name}
          onChange={handleChange("name")}
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          variant="outlined"
          label="Apellido"
          value={usuario.surname}
          onChange={handleChange("surname")}
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          variant="outlined"
          label="Email"
          value={usuario.email}
          onChange={handleChange("email")}
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          variant="outlined"
          label="Password"
          value={usuario.password}
          onChange={handleChange("password")}
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          variant="outlined"
          label="Telefono"
          value={usuario.phone}
          onChange={handleChange("phone")}
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        />
        <TextField
          select
          id="outlined-select-currency"
          variant="outlined"
          label="Rol"
          value={usuario.role}
          onChange={handleChange("role")}
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        >
          {roles.map((rol) => (
            <MenuItem key={rol.value} value={rol.value}>
              {rol.text}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          sx={{ height: "50px", margin: "10px", minWidth: "150px" }}
          onClick={handleRegister}
        >
          REGISTRARME
        </Button>
      </Grid>
    </>
  );
};

export default Register;
