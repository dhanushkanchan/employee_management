import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import { Container, Typography } from '@mui/material';

const HierarchyView = () => {
  const [hierarchyData, setHierarchyData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/hierarchy/')
      .then(response => {
        setHierarchyData(transformHierarchyData(response.data));
      })
      .catch(error => {
        console.error('Error fetching hierarchy data:', error);
      });
  }, []);

  const transformHierarchyData = (data) => {
    const transformNode = (node) => ({
      name: `${node.employee.first_name} ${node.employee.last_name}`,
      attributes: {
        position: node.employee.position,
        department: node.employee.department,
      },
      children: node.subordinates.map(transformNode),
    });
    return data.map(transformNode);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Organization Hierarchy
      </Typography>
      {hierarchyData && (
        <div id="treeWrapper" style={{ width: '100%', height: '500px' }}>
          <Tree
            data={hierarchyData}
            orientation="vertical"
            translate={{ x: 200, y: 50 }}
            pathFunc="elbow"
            collapsible={true}
            initialDepth={1}
          />
        </div>
      )}
    </Container>
  );
};

export default HierarchyView;
