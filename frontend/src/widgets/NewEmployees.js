import React from 'react';
import { Paper, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const NewEmployees = ({ newThisMonth }) => {

    if (newThisMonth == null) {
        return <div>Loading...</div>;
      }
  return (
    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <PersonAddIcon fontSize="large" />
      <Typography variant="h6">{newThisMonth}</Typography>
      <Typography variant="subtitle1">New Employees This Month</Typography>
    </Paper>
  );
};

export default NewEmployees;
