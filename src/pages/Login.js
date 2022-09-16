import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material/";
import { Link, Navigate } from "react-router-dom";
import { users } from "../data";
import Navbar from "../components/NavBar";
import BackgroundImg from "../img/header.webp";

const Login = ({ currentUser, signIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser ? true : false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    let currentUser = {};
    if (
      users.some(
        (el) => el.email === values.email && el.password === values.password
      )
    ) {
      const user = users.filter((el) => el.email === values.email);
      currentUser = user[0];
    }
    if (currentUser) {
      localStorage.setItem("current-user", JSON.stringify(currentUser));
      setIsLoggedIn(true);
      signIn();
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          background:
            'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #1976d2',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "right",
          height: "90.5vh",
        }}
      >
        <Box
          sx={{
            marginTop: "50px",
            marginBottom: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "400px",
            minHeight: "500px",
            backgroundColor: "#595959",
            borderRadius: "30px",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#FFFFFF",
                fontFamily: "Montserrat",
              }}
            >
              LOGIN
            </Typography>
            <TextField
              variant="outlined"
              label="Correo electronico"
              name="name"
              value={values.email}
              onChange={handleChange("email")}
              sx={{
                width: "300px",
                margin: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            />
            <FormControl
              sx={{
                width: "300px",
                margin: "10px",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="password"
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Link
              to="/reset-password"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  justifySelf: "end",
                  "&:hover": {
                    color: "#90caf9",
                  },
                }}
              >
                Olvide mi contraseña
              </Typography>
            </Link>
            <Button
              variant="contained"
              sx={{
                height: "50px",
                marginTop: "20px",
                marginBottom: "20px",
                minWidth: "150px",
                fontFamily: "Montserrat",
              }}
              onClick={handleLogin}
            >
              Ingresar
            </Button>
            <Typography
              sx={{
                color: "#FFFFFF",
                fontFamily: "Montserrat",
                marginTop: "30px",
              }}
            >
              ¿No tienes cuenta?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "#90caf9",
                    display: "inline",
                    fontWeight: "bold",
                  }}
                >
                  Registrate
                </Typography>
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Login;
