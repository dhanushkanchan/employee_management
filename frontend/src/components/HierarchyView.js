// src/components/HierarchyTree.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography } from '@mui/material';
import Tree from 'react-d3-tree';

const HierarchyTree = () => {
  const [hierarchyData, setHierarchyData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/hierarchy/')
      .then(response => {
        setHierarchyData(response.data);
      })
      .catch(error => console.error('Error fetching hierarchy:', error));
  }, []);

  if (!hierarchyData) {
    return <div>Loading...</div>;
  }

  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle r="15" />
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
      <text fill="black" strokeWidth="1" x="20" dy="20">
        {nodeDatum.attributes.position}
      </text>
      <text fill="black" strokeWidth="1" x="20" dy="40">
        {nodeDatum.attributes.department}
      </text>
    </g>
  );

  const transformData = (data) => {
    if (!data || !data.length) return null;
    return data.map(item => ({
      name: `${item.employee.first_name} ${item.employee.last_name}`,
      attributes: {
        position: item.employee.position,
        department: item.employee.department,
      },
      children: transformData(item.subordinates),
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Employee Hierarchy
        </Typography>
        <Box sx={{ height: '600px' }}>
          <Tree 
            data={transformData(hierarchyData)}
            renderCustomNodeElement={renderCustomNode}
            orientation="vertical"
            pathFunc="elbow"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default HierarchyTree;
