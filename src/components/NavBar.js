import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/logo.png";

const style = {
  a: {
    textDecoration: "none",
    color: "#000",
    margin: "0 16px",
    "&:not(.active):hover": {
      color: "#888",
    },
    "& .MuiTypography-root": {
      fontFamily: "Montserrat",
    },
    "& .MuiButton-root": {
      fontFamily: "Montserrat",
    },
    img: {
      width: "50px",
    },
  },
  "& .active p": {
    fontWeight: "700",
    borderBottom: `2px solid #1976d2`,
  },
};

const BaseNavLink = ({ urlPath, children }) => (
  <NavLink
    className={(navData) => (navData.isActive ? "active" : "")}
    to={urlPath}
  >
    {children}
  </NavLink>
);

const userNavbar = (
  <>
    <BaseNavLink urlPath="/">
      <Typography variant="body1">Home</Typography>
    </BaseNavLink>
    <BaseNavLink urlPath="/courses">
      <Typography variant="body1">Mis Clases</Typography>
    </BaseNavLink>
    <BaseNavLink urlPath="/profile">
      <Typography variant="body1">Mi Perfil</Typography>
    </BaseNavLink>
    <BaseNavLink urlPath="/notifications">
      <Typography variant="body1">Notificaciones</Typography>
    </BaseNavLink>
  </>
);

const publicNavbar = (
  <>
    <Link to="/login">
      <Button variant="contained">Ingresar</Button>
    </Link>
    <Link to="/register">
      <Button variant="outlined">Registrarse</Button>
    </Link>
  </>
);

const NavBar = ({ currentUser }) => {
  return (
    <AppBar position="static" color="transparent" sx={style}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {currentUser ? userNavbar : publicNavbar}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
