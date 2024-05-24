import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Tooltip } from '@mui/material';
import Tree from 'react-d3-tree';

const HierarchyTree = () => {
  const [hierarchyData, setHierarchyData] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/hierarchy/')
      .then(response => {
        setHierarchyData(transformData(response.data));
      })
      .catch(error => console.error('Error fetching hierarchy:', error));
  }, []);

  const containerRef = useCallback(node => {
    if (node !== null) {
      const dimensions = node.getBoundingClientRect();
      setTranslate({ x: dimensions.width / 2, y: 50 });
    }
  }, []);

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

  const renderCustomNode = ({ nodeDatum, toggleNode }) => (
    <Tooltip
      title={
        <React.Fragment>
          <Typography color="inherit">{nodeDatum.name}</Typography>
          <Typography variant="body2" color="inherit">{nodeDatum.attributes.position}</Typography>
          <Typography variant="body2" color="inherit">{nodeDatum.attributes.department}</Typography>
        </React.Fragment>
      }
      arrow
    >
      <g>
        <circle r="15" fill="#69b3a2" onClick={toggleNode} />
        <text fill="black" strokeWidth="1" x="20" dy="-5">
          {nodeDatum.name}
        </text>
      </g>
    </Tooltip>
  );

  if (!hierarchyData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3, pt:10 }} ref={containerRef}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Employee Hierarchy
        </Typography>
        <Box sx={{ height: '1000px' }}>
          <Tree 
            data={hierarchyData}
            renderCustomNodeElement={renderCustomNode}
            orientation="vertical"
            pathFunc="elbow"
            translate={translate}
            nodeSize={{ x: 200, y: 100 }}
            separation={{ siblings: 1, nonSiblings: 2 }}
            collapsible={true}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default HierarchyTree;
