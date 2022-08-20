import {
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
import { Link } from "react-router-dom";

const Login = () => {
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
    console.log("Logueaste reyyyy");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        LOGIN
      </Typography>
      <TextField
        variant="outlined"
        label="email"
        name="name"
        value={values.email}
        onChange={handleChange("email")}
        sx={{
          width: "200px",
          margin: "10px",
          backgroundColor: "#fff",
          backgroundColor: "#fff",
        }}
      />
      <FormControl
        sx={{
          width: "200px",
          margin: "10px",
          backgroundColor: "#fff",
          backgroundColor: "#fff",
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
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
      <Button
        variant="contained"
        sx={{ height: "50px", margin: "10px", minWidth: "150px" }}
        onClick={handleLogin}
      >
        Ingresar
      </Button>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          sx={{ height: "50px", margin: "10px", minWidth: "150px" }}
        >
          Registrarse
        </Button>
      </Link>
    </Grid>
  );
};

export default Login;
