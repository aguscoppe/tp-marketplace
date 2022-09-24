import { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import Notification from "./Notification";
import { NavLink } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { useNotifications } from "../hooks";

const style = {
  height: "8vh",
  backgroundColor: "#333",
  color: "#fff",
  "@media (max-width: 480px)": {
    alignItems: "center",
    justifyContent: "center",
  },
  "@media (max-height: 700px)": {
    height: "auto",
  },
  a: {
    textDecoration: "none",
    margin: "8px",
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
    fontSize: "12px",
    marginTop: "2px",
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
    "& svg": {
      width: "20px",
      height: "20px",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};

const hideText = {
  "@media (max-width: 480px)": {
    display: "none",
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

const commonNavLinks = (
  <>
    <NavLinkIcon urlPath="/">
      <HomeIcon />
      <Typography variant="body2" sx={hideText}>
        Home
      </Typography>
    </NavLinkIcon>
    <NavLinkIcon urlPath="/about">
      <InfoIcon />
      <Typography variant="body2" sx={hideText}>
        Información
      </Typography>
    </NavLinkIcon>
  </>
);

const userNavbar = (
  <>
    {commonNavLinks}
    <NavLinkIcon urlPath="/courses">
      <SchoolIcon />
      <Typography variant="body2" sx={hideText}>
        Mis Clases
      </Typography>
    </NavLinkIcon>
    <NavLinkIcon urlPath="/profile">
      <PersonIcon />
      <Typography variant="body2" sx={hideText}>
        Mi Perfil
      </Typography>
    </NavLinkIcon>
  </>
);

const publicNavbar = (
  <>
    {commonNavLinks}
    <NavLinkIcon urlPath="/login">
      <PersonIcon />
      <Typography variant="body2" sx={hideText}>
        Ingresar
      </Typography>
    </NavLinkIcon>
  </>
);

const NavBar = ({ currentUserId }) => {
  const notifications = useNotifications(currentUserId);
  const [notificationList, setNotificationList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (notifications !== undefined) {
      setNotificationList(notifications);
    }
  }, [notifications]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" sx={style}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            "@media (max-width: 480px)": {
              width: "100%",
              justifyContent: "space-evenly",
            },
          }}
        >
          {currentUserId ? (
            <>
              {userNavbar}
              <IconButton onClick={handleClick}>
                <Badge badgeContent={notificationList.length} color="primary">
                  <NotificationsIcon />
                </Badge>
                <Typography variant="body2" sx={hideText}>
                  Notificationes
                </Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                PaperProps={{ style: { maxHeight: "400px" } }}
              >
                {notificationList.length > 0 ? (
                  notificationList.map((notification) => (
                    <Notification
                      key={notification.message}
                      data={notification}
                    />
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      padding: "6px 12px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    No tienes notificaciones
                  </Typography>
                )}
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
