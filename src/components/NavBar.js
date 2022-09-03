import { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';
import Notification from './Notification';
import { Link, NavLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import { notifications } from '../data';

const style = {
  backgroundColor: '#333',
  color: '#fff',
  a: {
    textDecoration: 'none',
    margin: '8px',
    '&:not(.active):hover': {
      color: '#888',
    },
    img: {
      width: '50px',
    },
  },
  '& .MuiButton-root': {
    fontFamily: 'Montserrat',
  },
  '& .MuiTypography-root': {
    fontFamily: 'Montserrat',
  },
  '& .active p': {
    color: '#90caf9',
  },
  '& .active svg': {
    color: '#90caf9',
  },
  '& .MuiIconButton-root': {
    color: '#eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};

const NavLinkIcon = ({ urlPath, children }) => (
  <NavLink
    className={(navData) => (navData.isActive ? 'active' : '')}
    to={urlPath ? urlPath : undefined}
  >
    <IconButton>{children}</IconButton>
  </NavLink>
);

const commonNavLinks = (
  <>
    <NavLinkIcon urlPath='/'>
      <HomeIcon />
      <Typography variant='body2'>Home</Typography>
    </NavLinkIcon>
    <NavLinkIcon urlPath='/about'>
      <InfoIcon />
      <Typography variant='body2'>Información</Typography>
    </NavLinkIcon>
  </>
);

const userNavbar = (
  <>
    {commonNavLinks}
    <NavLinkIcon urlPath='/courses'>
      <BookmarksIcon />
      <Typography variant='body2'>Mis Clases</Typography>
    </NavLinkIcon>
    <NavLinkIcon urlPath='/profile'>
      <PersonIcon />
      <Typography variant='body2'>Mi Perfil</Typography>
    </NavLinkIcon>
  </>
);

const publicNavbar = (
  <>
    {commonNavLinks}
    <NavLinkIcon urlPath='/login'>
      <PersonIcon />
      <Typography variant='body2'>Ingresar</Typography>
    </NavLinkIcon>
  </>
);

const NavBar = ({ currentUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const notificationList = notifications.filter(
    (notification) => notification.destinationId === currentUser?.id
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' color='transparent' sx={style}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to='/'>
          <IconButton
            sx={{
              '& svg': {
                color: '#f6c451',
                fontSize: '50px',
              },
            }}
          >
            <SchoolIcon />
          </IconButton>
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {currentUser ? (
            <>
              {userNavbar}
              <IconButton onClick={handleClick}>
                <Badge badgeContent={notificationList.length} color='primary'>
                  <NotificationsIcon />
                </Badge>
                <Typography variant='body2'>Notificationes</Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                PaperProps={{ style: { maxHeight: '400px' } }}
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
                    variant='body2'
                    sx={{
                      textAlign: 'center',
                      padding: '6px 12px',
                      fontFamily: 'Montserrat',
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
