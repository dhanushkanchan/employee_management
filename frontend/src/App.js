// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import UploadCSV from './components/UploadCSV';
import HierarchyView from './components/OrgHierarchy';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/upload" element={<UploadCSV />} />
          <Route path="/hierarchy" element={<HierarchyView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
