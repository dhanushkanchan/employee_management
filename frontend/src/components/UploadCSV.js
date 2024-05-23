import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Grid } from '@mui/material';

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('/api/upload_csv/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log('File uploaded successfully:', response.data);


    })
    .catch(error => {
      console.error('Error uploading file:', error);
      
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Upload CSV
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UploadCSV;
