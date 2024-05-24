import React from 'react';
import { Paper, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AverageSalary = ({ average }) => {
    if (average == null) {
        average = 0;
    }
  return (
    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
      <AttachMoneyIcon fontSize="large" />
      <Typography variant="h6">${average.toFixed(2)}</Typography>
      <Typography variant="subtitle1">Average Salary</Typography>
    </Paper>
  );
};

export default AverageSalary;
