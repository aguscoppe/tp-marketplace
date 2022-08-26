import { useState } from "react";
import NavBar from "../components/NavBar";
import Home from "./Home";
import { Box, Button, Grid, TextField } from "@mui/material";

const style = {
  height: "100%",
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
    width: "300px",
    margin: "10px",
    backgroundColor: "#fff",
  },
  "& .MuiTextField-root:first-of-type": {
    marginTop: "50px",
  },
  input: {
    fontFamily: "Montserrat",
  },
};

const Profile = ({ currentUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [newCourse, setNewCourse] = useState({
    name: currentUser.name,
    surname: currentUser.surname,
    email: currentUser.email,
    phone: currentUser.phone,
    experience: currentUser.experience,
  });
  const { name, surname, email, phone, experience } = newCourse;

  const signOut = () => {
    localStorage.removeItem("current-user");
    setIsLoggedIn(false);
  };

  const handleChange = (e) => {
    setNewCourse((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    // TODO: update user profile
    console.log("submitted");
  };

  if (isLoggedIn) {
    return (
      <>
        <NavBar currentUser={currentUser} />
        <Grid
          container
          sx={style}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            autoComplete="off"
            variant="outlined"
            label="Nombre"
            value={name}
            name="name"
            onChange={handleChange}
          />
          <TextField
            autoComplete="off"
            variant="outlined"
            label="Apellido"
            value={surname}
            name="surname"
            onChange={handleChange}
          />
          <TextField
            autoComplete="off"
            variant="outlined"
            label="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <TextField
            autoComplete="off"
            variant="outlined"
            label="Teléfono"
            value={phone}
            name="phone"
            onChange={handleChange}
          />
          <TextField
            autoComplete="off"
            variant="outlined"
            label="Experiencia"
            value={experience}
            name="experience"
            onChange={handleChange}
            multiline
            rows={4}
          />
          <Box>
            <Button
              variant="contained"
              sx={{ height: "50px", margin: "10px" }}
              onClick={handleClick}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              sx={{ height: "50px", margin: "10px" }}
              onClick={signOut}
              color="error"
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Grid>
      </>
    );
  } else {
    return <Home />;
  }
};

export default Profile;
