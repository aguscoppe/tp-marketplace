import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const NavBar = () => {
  const style = {
    a: {
      textDecoration: "none",
      "& .MuiTypography-root": {
        fontFamily: "Montserrat",
      },
      "& .MuiButton-root": {
        fontFamily: "Montserrat",
      },
    },
  };
  return (
    <AppBar position="static" color="transparent" sx={style}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <Typography>LOGO</Typography>
        </Link>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Link to="/login">
            <Button variant="contained">Ingresar</Button>
          </Link>
          <Link to="/register">
            <Button variant="outlined">Registrarse</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
