// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/employees/')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <List>
        {employees.map(employee => (
          <ListItem key={employee.employee_id}>
            <ListItemText
              primary={`${employee.first_name} ${employee.last_name}`}
              secondary={`${employee.position} - ${employee.department}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EmployeeList;
