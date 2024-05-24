import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Employee Management
        </Typography>
        <Button color="inherit" component={Link} to="/employees">Employee List</Button>
        <Button color="inherit" component={Link} to="/upload">Upload CSV</Button>
        <Button color="inherit" component={Link} to="/hierarchy">Hierarchy</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
