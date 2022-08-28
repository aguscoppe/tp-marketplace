import { useState } from "react";
import NavBar from "../components/NavBar";
import Home from "./Home";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { STUDENT_ROLE, TEACHER_ROLE } from "../constants";
import EducationForm from "../components/EducationForm";

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
  a: {
    textDecoration: "none",
  },
};

const Profile = ({ currentUser, signOut }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentProfile, setCurrentProfile] = useState({
    name: currentUser.name,
    surname: currentUser.surname,
    email: currentUser.email,
    phone: currentUser.phone,
    experience: currentUser.experience,
  });
  const [showDialog, setShowDialog] = useState(false);
  const { name, surname, email, phone, experience } = currentProfile;

  const handleLogout = () => {
    localStorage.removeItem("current-user");
    setIsLoggedIn(false);
    signOut();
  };

  const handleChange = (e) => {
    setCurrentProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = () => {
    // TODO: update user profile
    console.log("submitted");
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
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
          {currentUser.role === TEACHER_ROLE && (
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
          )}
          {currentUser.role === STUDENT_ROLE && (
            <>
              <EducationForm open={showDialog} closeDialog={closeDialog} />
              <Button onClick={openDialog}>+ Agrear Estudio Cursado</Button>
            </>
          )}

          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              sx={{ height: "50px", margin: "10px" }}
              onClick={handleClick}
            >
              Guardar
            </Button>
            <Link to="reset-password">
              <Button
                variant="outlined"
                sx={{ height: "50px", margin: "10px" }}
              >
                Cambiar Contraseña
              </Button>
            </Link>
            <Button
              variant="contained"
              sx={{ height: "50px", margin: "10px" }}
              onClick={handleLogout}
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
