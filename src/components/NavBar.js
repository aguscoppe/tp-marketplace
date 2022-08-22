import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import Notification from "./Notification";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { notifications } from "../data";

const style = {
  backgroundColor: "#333",
  color: "#fff",
  a: {
    textDecoration: "none",
    margin: "0 8px",
    "&:not(.active):hover": {
      color: "#888",
    },
    img: {
      width: "50px",
    },
  },
  "& .MuiButton-root": {
    fontFamily: "Montserrat",
  },
  "& .MuiTypography-root": {
    fontFamily: "Montserrat",
  },
  "& .active p": {
    color: "#90caf9",
  },
  "& .active svg": {
    color: "#90caf9",
  },
  "& .MuiIconButton-root": {
    color: "#eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};

const NavLinkIcon = ({ urlPath, children }) => (
  <NavLink
    className={(navData) => (navData.isActive ? "active" : "")}
    to={urlPath ? urlPath : undefined}
  >
    <IconButton>{children}</IconButton>
  </NavLink>
);

const userNavbar = (
  <>
    <NavLinkIcon urlPath="/">
      <HomeIcon />
      <Typography variant="body2">Home</Typography>
    </NavLinkIcon>
    <NavLinkIcon urlPath="/courses">
      <SchoolIcon />
      <Typography variant="body2">Mis Clases</Typography>
    </NavLinkIcon>
    <NavLinkIcon urlPath="/profile">
      <PersonIcon />
      <Typography variant="body2">Mi Perfil</Typography>
    </NavLinkIcon>
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static" color="transparent" sx={style}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {currentUser ? (
            <>
              {userNavbar}
              <IconButton onClick={handleClick}>
                <NotificationsIcon />
                <Typography variant="body2">Notificationes</Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                PaperProps={{ style: { maxHeight: "400px" } }}
              >
                {notifications
                  .filter(
                    (notification) =>
                      notification.destinationId === currentUser.id
                  )
                  .map((notification) => (
                    <Notification data={notification} />
                  ))}
              </Menu>
            </>
          ) : (
            publicNavbar
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
