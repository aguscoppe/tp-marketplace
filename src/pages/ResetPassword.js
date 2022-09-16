import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useState } from "react";

const ResetPassword = ({ currentUser }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    new_password: "",
    repeated_password: "",
    showPassword: "",
  });

  const handleRecovery = () => {
    console.log("Recuperaste tu contraseña!");
  };

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Box
        sx={{
          width: "100vw",
          height: "90.5vh",
          display: "flex",
          justifyContent: "center",
          background:
            'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #1976d2',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "right",
        }}
      >
        <Box
          sx={{
            boxShadow: 20,
            minWidth: "400px",
            height: "470px",
            backgroundColor: "#595959",
            marginTop: "100px",
            marginBottom: "50px",
            color: "#FFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <Box sx={{ maxWidth: "300px", textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                marginTop: "20px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
            <Typography
              sx={{
                marginTop: "20px",
                fontFamily: "Montserrat",
                textAlign: "justify",
              }}
            >
              Ingresa tu correo electrónico y te estaremos enviando un mail con
              las instrucciones para que puedas ingresar
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            label="Correo electronico"
            name="email"
            sx={{
              marginTop: "50px",
              minWidth: "150px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              fontFamily: "Montserrat",
              width: "300px",
            }}
          />
          <Button
            variant="contained"
            sx={{
              height: "50px",
              marginTop: "20px",
              marginBottom: "20px",
              minWidth: "150px",
              fontFamily: "Montserrat",
              borderRadius: "8px",
              width: "300px",
            }}
            onClick={handleRecovery}
          >
            Recuperar contraseña
          </Button>
          <Typography
            sx={{
              color: "#90caf9",
              "&:visited": {
                color: "#90caf9",
              },
            }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
              }}
            >
              Volver al Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
