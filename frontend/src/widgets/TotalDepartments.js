import React from 'react';
import { Paper, Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const TotalDepartments = ({ total }) => {
    if (total == null) {
        return <div>Loading...</div>
    }
    
  return (
    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <BusinessIcon fontSize="large" />
      <Typography variant="h6">{total}</Typography>
      <Typography variant="subtitle1">Total Departments</Typography>
    </Paper>
  );
};

export default TotalDepartments;
