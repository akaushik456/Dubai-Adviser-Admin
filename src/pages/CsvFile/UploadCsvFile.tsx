import React, { useRef, useState } from 'react';
import {Box,Typography,Button,CircularProgress,Alert,} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUploadCsvMutation } from '../../services/mainApiSlice';
import snackBarUtil from '../../utils/snackbar'

function UploadCsvFile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [uploadCsv] = useUploadCsvMutation(); // <-- RTK Query mutation hook

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

 const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file || file.type !== 'text/csv') {
        alert('Please upload a valid CSV file.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file); 

      try {
        setLoading(true);
        await uploadCsv(formData); 
        snackBarUtil.success("CSV uploaded successfully!");
        setSuccess(true);
        setTimeout(() => {
        window.location.href = '/home/alllisting';
        }, 1500);
      } catch (err) {
        snackBarUtil.error("Something went wrong while uploaded.");
      } finally {
        setLoading(false);
      }
    };


  return (
    <Box
      border="2px dashed #fff"
      borderRadius={2}
      p={4}
      textAlign="center"
      maxWidth={800}
      margin="0 auto"
      mt={6}
      color="#fff"
    >
      <CloudUploadIcon sx={{ fontSize: 48, color: '#ccc' }} />
      <Typography variant="h6" mt={2}>
        Choose a File
      </Typography>
      <Typography variant="body2" color="#fff">
        Only .csv file up to 3MB
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2, minWidth: 150, }}
        onClick={handleBrowseClick}
        disabled={loading}
      >
        {loading ? (
          <>
            Uploading... <CircularProgress size={18} sx={{ color: '#fff', ml: 1 }} />
          </>
        ) : (
          "Browse a file"
        )}
      </Button>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      {loading && (
        <Box mt={2}>
          <CircularProgress />
        </Box>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Upload successful!
        </Alert>
      )}
    </Box>
  );
}

export default UploadCsvFile;
