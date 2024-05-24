import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalaryDistributionChart = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map(item => item.range),
    datasets: [{
      label: 'Number of Employees',
      data: data.map(item => item.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Salary Distribution
      </Typography>
      <Bar data={chartData} options={options} />
    </Paper>
  );
};

export default SalaryDistributionChart;
