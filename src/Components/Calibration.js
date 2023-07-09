import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Calibrate = () => {

  const handleCalibrate = async () => {
    console.log("hi")
    try {
      const response = await fetch('http://localhost:8000/api/calibrate', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        // Process the response data
        console.log(data);
      } else {
        // Handle the error response
        console.error('Request failed:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle the network error
      console.error('Network error:', error);
    }
  };

  const handleButtonClick = () => {
    handleCalibrate();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography>Move hinge back to horizontal position then press calibrate</Typography>
      <Button variant="contained" color="primary" onClick={handleButtonClick} sx={{ marginTop: '1rem' }}>
        Calibrate
      </Button>
    </Box>
  );
};

export default Calibrate;
