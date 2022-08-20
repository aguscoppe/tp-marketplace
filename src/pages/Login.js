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
import { students, teachers } from "../data";

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
    let currentUser = {};
    if (
      teachers.some(
        (el) => el.email === values.email && el.password === values.password
      )
    ) {
      const teacherData = teachers.filter((el) => el.email === values.email);
      currentUser = teacherData[0];
    } else if (
      students.some(
        (el) => el.email === values.email && el.password === values.password
      )
    ) {
      const studentData = students.filter((el) => el.email === values.email);
      currentUser = studentData[0];
    }
    if (currentUser) {
      localStorage.setItem("current-user", JSON.stringify(currentUser));
    }
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
        }}
      />
      <FormControl
        sx={{
          width: "200px",
          margin: "10px",
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
