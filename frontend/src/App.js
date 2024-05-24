// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import UploadCSV from './components/UploadCSV';
import HierarchyView from './components/HierarchyView';

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/upload" element={<UploadCSV />} />
        <Route path="/hierarchy" element={<HierarchyView />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
