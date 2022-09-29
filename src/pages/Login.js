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
import { useEffect, useState, useContext } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material/";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useUsers } from "../hooks";
import { UserContext } from "../contexts/UserContext";

const Login = ({ signIn }) => {
  const currentUser = useContext(UserContext);
  const userList = useUsers();
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    currentUser === undefined ? false : true
  );
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { email, password } = values;

  useEffect(() => {
    if (userList !== undefined) {
      setUsers(userList);
    }
  }, [userList]);

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
    let user = [];
    if (
      users.some(
        (el) => el.email === values.email && el.password === values.password
      )
    ) {
      user = users.filter((el) => el.email === values.email);
    }
    if (user.length > 0) {
      localStorage.setItem("current-user", user[0].id);
      setIsLoggedIn(true);
      signIn();
    } else {
      alert("Email o contraseña incorrectos");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Box sx={{ display: "flex", flexFlow: "column", height: "100vh" }}>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            background:
              'url("https://sephorconsulting.es/kitdigital/wp-content/uploads/2022/01/mujer-ordenador.png"), #009DE6',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "right",
            "@media (max-width: 480px)": {
              width: "100vw",
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
                width: "100%",
                height: "100%",
                borderRadius: "0px",
                justifyContent: "center",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#FFFFFF",
                fontFamily: "Montserrat",
              }}
            >
              Ingresar
            </Typography>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              marginTop="30px"
              sx={{
                width: "400px",
                "@media (max-width: 480px)": {
                  width: "100vw",
                },
              }}
            >
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                sx={{
                  width: "300px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
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
                      "&:hover": {
                        color: "#90caf9",
                      },
                    }}
                  >
                    Olvidé mi contraseña
                  </Typography>
                </Link>
              </Box>
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  minWidth: "200px",
                  fontFamily: "Montserrat",
                  ":disabled": {
                    backgroundColor: "#999",
                    color: "#555",
                  },
                }}
                disabled={email === "" || password === ""}
                onClick={handleLogin}
              >
                Ingresar
              </Button>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontFamily: "Montserrat",
                  marginTop: "50px",
                }}
              >
                ¿No tienes cuenta?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: "#009bdd",
                      display: "inline",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#90caf9",
                      },
                    }}
                  >
                    Registrate
                  </Typography>
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
