import React from 'react';
import { Paper, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const TotalEmployees = ({ total }) => {
    if (total == null) {
        return <div>Loading...</div>;
      }

  return (
    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <PeopleIcon fontSize="large" />
      <Typography variant="h6">{total}</Typography>
      <Typography variant="subtitle1">Total Employees</Typography>
    </Paper>
  );
};

export default TotalEmployees;
