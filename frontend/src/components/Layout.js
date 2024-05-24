// src/components/Layout.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Topbar />
    <Sidebar />
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      {children}
    </Box>
  </Box>
);

export default Layout;
