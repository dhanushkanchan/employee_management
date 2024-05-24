// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import TotalEmployees from '../widgets/TotalEmployees';
import NewEmployees from '../widgets/NewEmployees';
import EmployeesByDepartmentChart from '../widgets/EmployeesByDepartment';
import SalaryDistributionChart from '../widgets/SalaryDistribution';
import EmployeeCountChart from '../widgets/EmployeeCount';
import TotalDepartments from '../widgets/TotalDepartments';
import AverageSalary from '../widgets/AverageSalary';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistics/')
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => console.error('Error fetching statistics:', error));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, pt: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <TotalEmployees total={statistics.total_employees} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <NewEmployees newThisMonth={statistics.new_employees_this_month} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AverageSalary average={statistics.average_salary} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TotalDepartments total={statistics.total_departments} />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <ItemOrders current={statistics.current_employees} />
        </Grid> */}

        <Grid item xs={12} md={8}>
            <EmployeeCountChart data={statistics.employee_count_trend} joinings={statistics.monthly_joinings} />
        </Grid>
        <Grid item xs={12} md={4}>
          <EmployeesByDepartmentChart data={statistics.employees_by_department} />
        </Grid>
        <Grid item xs={12} md={12}>
          <SalaryDistributionChart data={statistics.salary_distribution} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
