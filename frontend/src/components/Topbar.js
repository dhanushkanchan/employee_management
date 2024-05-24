// src/components/Topbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Topbar = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#000' }}>
    <Toolbar>
      <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
        Dassault Systemes
      </Typography>
      <IconButton color="inherit">
        <SearchIcon />
      </IconButton>
      <IconButton color="inherit">
        <NotificationsIcon />
      </IconButton>
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Topbar;
