import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EmployeeCountChart = ({ data, joinings }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map(item => new Date(item.month).toLocaleString('default', { year: 'numeric', month: 'short' })),
    datasets: [
      {
        label: 'Total Employee Count',
        data: data.map(item => item.count),
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Monthly Joinings',
        data: joinings.map(item => item.count),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      }
    ],
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
    <Paper elevation={3} sx={{ p: 2, height: '500px' }}>
      <Typography variant="h6" gutterBottom>
        Employee Count and Monthly Joinings Over Last 5 Years
      </Typography>
      <Line data={chartData} options={options} />
    </Paper>
  );
};

export default EmployeeCountChart;
