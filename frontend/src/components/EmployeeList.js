// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, TextField, Grid, Button, InputAdornment, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

const columns = (handleOpenDialog) => [
  { field: 'employee_id', headerName: 'ID', width: 80 },
  { field: 'first_name', headerName: 'First Name', width: 140 },
  { field: 'last_name', headerName: 'Last Name', width: 140 },
  { field: 'email', headerName: 'Email', width: 220 },
//   { field: 'phone_number', headerName: 'Phone', width: 130 },
  { field: 'date_of_joining', headerName: 'Joined', width: 130 },
  { field: 'supervisor_name', headerName: 'Supervisor', width: 160 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'position', headerName: 'Designation', width: 200 },

  { field: 'is_current', headerName: 'Current Employee', width: 130, renderCell: (params) => (
    <span
      style={{
        cursor: 'pointer',
      }}
      onClick={() => handleOpenDialog(params.row)}
    >
      {params.value ? 'Yes' : 'No'}
    </span>
  )},
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ status: 'all' });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/employees/')
      .then(response => {
        const employeeData = response.data.map((employee, index) => ({
          ...employee,
          serial_number: index + 1,
        }));
        setEmployees(employeeData);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenDialog = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  const handleStatusChange = () => {
    const updatedEmployee = { ...selectedEmployee, is_current: !selectedEmployee.is_current };
    axios.put(`http://127.0.0.1:8000/api/employees/${selectedEmployee.employee_id}/`, updatedEmployee)
      .then(response => {
        setEmployees((prevEmployees) => prevEmployees.map((employee) => 
          employee.employee_id === selectedEmployee.employee_id ? { ...employee, is_current: !employee.is_current } : employee
        ));
        handleCloseDialog();
      })
      .catch(error => console.error('Error updating employee status:', error));
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.first_name.toLowerCase().includes(search.toLowerCase()) ||
                          employee.last_name.toLowerCase().includes(search.toLowerCase()) ||
                          employee.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter.status === 'all' || (filter.status === 'current' && employee.is_current) || (filter.status === 'former' && !employee.is_current);
    return matchesSearch && matchesFilter;
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search customer"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filter.status}
                  onChange={handleFilterChange}
                  label="Status"
                  name="status"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="current">Current</MenuItem>
                  <MenuItem value="former">Former</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ height: '70vh', width: '100%' }}>
          <DataGrid
            rows={filteredEmployees}
            columns={columns(handleOpenDialog)}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            getRowId={(row) => row.employee_id}
          />
        </Paper>
      </Grid>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Change Employee Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Change status of {selectedEmployee && selectedEmployee.first_name} {selectedEmployee && selectedEmployee.last_name} to {selectedEmployee && (selectedEmployee.is_current ? 'Former Employee' : 'Current Employee')}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusChange} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EmployeeList;
