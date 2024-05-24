import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
`;

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [failedRows, setFailedRows] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setSuccess(false);
    setError(null);
    setFailedRows([]);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSuccess(false);
    setError(null);
    setFailedRows([]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload_csv/', formData);
      setUploading(false);

      if (response.status === 201) {
        setSuccess(true);
        setFailedRows([]);
      } else if (response.status === 207) {
        setSuccess(true);
        setFailedRows(response.data.invalid_rows);
      } else {
        setError("An unknown error occurred.");
      }
    } catch (err) {
      setUploading(false);
      setError(err.response?.data?.error || "Failed to upload file.");
    }
  };

  return (
    <Box sx={{ p: 3, pt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Upload CSV
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload CSV</DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 2, mb: 2 }}>
            {!success && (
              <>
                <input type="file" accept=".csv" onChange={handleFileChange} />
                <Button variant="contained" color="primary" onClick={handleUpload} disabled={uploading}>
                  Upload
                </Button>
              </>
            )}
          </Paper>
          {uploading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ClipLoader css={override} size={150} color={"#123abc"} loading={uploading} />
            </Box>
          )}
          {success && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 2 }}>
              <img src="/success.gif" alt="Success" style={{ width: '150px', height: '150px' }} />
              <Typography variant="h6" color="success.main">Upload Successful!</Typography>
              {failedRows.length > 0 && (
                <Typography variant="body1" color="error.main">
                  {failedRows.length} rows failed to upload.
                </Typography>
              )}
            </Box>
          )}
          {error && (
            <Typography variant="body1" color="error.main">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UploadCSV;
