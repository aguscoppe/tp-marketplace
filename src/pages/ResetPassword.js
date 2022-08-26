import {
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
import { Circle, VisibilityOff, Visibility } from "@mui/icons-material/";
import Navbar from "../components/NavBar";
import { useState } from "react";

const ResetPassword = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    new_password: "",
    repeated_password: "",
    showPassword: "",
  });

  const [hasError, setHasError] = useState(false);

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

  const checkPasswordMatch = () => {
    if (values.repeated_password !== "") {
      if (values.new_password !== values.repeated_password) {
        console.log("Los passwords NO matchean");
        setHasError(true);
      } else {
        console.log("Los passwords SI matchean");
        setHasError(false);
      }
    }
  };

  const handlePasswordChange = () => {};
  return (
    <>
      <Navbar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" sx={{ fontWeight: 900, margin: "10px" }}>
          CAMBIAR CONTRASEÑA
        </Typography>
        <Typography variant="h6">Su contraseña deberá contener:</Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <Circle sx={{ color: "#000" }} />
            </ListItemIcon>
            <ListItemText primary="Al menos una mayúscula" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Circle sx={{ color: "#000" }} />
            </ListItemIcon>

            <ListItemText primary="Al menos un número" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Circle sx={{ color: "#000" }} />
            </ListItemIcon>
            <ListItemText primary="Al menos un carácter especial" />
          </ListItem>
        </List>
        <TextField
          variant="outlined"
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
        />
        <FormControl
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Contraseña actual
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            label="Contraseña actual"
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
        <FormControl
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-new-password">
            Nueva Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-new-password"
            label="newPassword"
            name="newPassword"
            type={values.showPassword ? "text" : "password"}
            value={values.new_password}
            onChange={handleChange("new_password")}
            onBlur={checkPasswordMatch}
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
        <FormControl
          error={hasError}
          helperText="Passwords do not match"
          sx={{
            width: "250px",
            margin: "10px",
            backgroundColor: "#fff",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-repeated-password">
            Repetir Nueva Contraseña
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-repeated-password"
            label="repeatPassword"
            name="repeatPassword"
            type="password"
            value={values.repeated_password}
            onBlur={checkPasswordMatch}
            onChange={handleChange("repeated_password")}
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ height: "50px", margin: "10px", minWidth: "150px" }}
          onClick={handlePasswordChange}
        >
          FINALIZAR
        </Button>
      </Grid>
    </>
  );
};

export default ResetPassword;
