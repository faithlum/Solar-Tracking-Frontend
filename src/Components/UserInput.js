import React, { useState } from 'react';
import { Box, FormControl, TextField, Button } from '@mui/material';

const UserInputForm = () => {
  const [formData, setFormData] = useState({
    timeZone: '',
    latitude: '',
    longitude: '',
    startDate: '',
    duration: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/input_form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Process the response data
          console.log(data);

          // Redirect to another page
          window.location.href = '/visualize'; 
        } else {
          // Handle the error response
          console.error('Request failed:', response.status, response.statusText);
        }
      } catch (error) {
        // Handle the network error
        console.error('Network error:', error);
      }
  };

  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Box my={1}>
          <TextField
            name="timeZone"
            label="Time Zone"
            value={formData.timeZone}
            onChange={handleChange}
            required
          />
        </Box>
        <Box my={1}>
          <TextField
            name="latitude"
            label="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box my={1}>
          <TextField
            name="longitude"
            label="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </Box>
        <Box my={1}>
          <TextField
            name="startDate"
            label="Start Date"
            value={formData.startDate}
            placeholder="YYYY-MM-DD"
            onChange={handleChange}
            required
          />
        </Box>
        <Box my={1}>
          <TextField
            name="duration"
            label="Duration (in days)"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </Box>
        <Box my={1} >
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserInputForm;
