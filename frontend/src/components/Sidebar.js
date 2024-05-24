// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const drawerWidth = 240;

const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1A202C', color: '#fff' },
    }}
  >
    <Toolbar>
      <Box display="flex" alignItems="center" px={2}>
      </Box>
    </Toolbar>
    <Divider />
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon><DashboardIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/employees">
        <ListItemIcon><PeopleIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItem>
      <ListItem button component={Link} to="/upload">
        <ListItemIcon><UploadFileIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Upload CSV" />
      </ListItem>
      <ListItem button component={Link} to="/hierarchy">
        <ListItemIcon><AccountTreeIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Hierarchy" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button component={Link} to="/account">
        <ListItemIcon><AccountTreeIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
      <ListItem button component={Link} to="/error">
        <ListItemIcon><AccountTreeIcon style={{ color: '#fff' }} /></ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
