import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeesByDepartmentChart = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map(item => item.department),
    datasets: [{
      data: data.map(item => item.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }],
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '500px' }}>
      <Typography variant="h6" gutterBottom>
        Employees by Department
      </Typography>
      <Pie data={chartData} />
    </Paper>
  );
};

export default EmployeesByDepartmentChart;
