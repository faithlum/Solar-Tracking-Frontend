import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import "./AngleVisualizer.css"
import axios from 'axios';

const RectangleIndicator = () => {
  // useEffect(() => {
  //   makeRequest();
  // }, []);

  // const makeRequest = () => {
  //   axios
  //     .get('http://localhost:8000/accel')
  //     .then(response => {
  //       console.log(response.data); // Handle the response data
  //     })
  //     .catch(error => {
  //       console.error('Error:', error); // Handle any errors
  //     });
  // };


  const [angle, setAngle] = useState(0);
  const [output, setOutput] = useState('');
  const target = 50; // Replace with your target angle value
  const [isRunning, setIsRunning] = useState(false);  // State for tracking if the stream is running
  // let eventSource;  // Declare the eventSource variable outside the functions
  const eventSourceRef = useRef(null);
  let correct_iter = 0;
  const CORRECT_NUM = 5;


  const handleChange = (event) => {
    let newAngle = parseFloat(event.target.value);

    // Calculate the valid range based on the target angle
    const minAngle = 0;
    const maxAngle = 90;

    // Ensure angle is within the valid range
    if (isNaN(newAngle) || newAngle > maxAngle) {
      newAngle = maxAngle;
    } else if (newAngle < minAngle) {
      newAngle = minAngle;
    }

    setAngle(newAngle);
  };

  const handleButtonClick = async () => {
    eventSourceRef.current = new EventSource('http://localhost:8000/api/');

    eventSourceRef.current.onmessage = event => {
      const data = event.data;
      const MAX_ERROR = 0.5;
      console.log(data)
      setAngle(data);
      if (Math.abs(data - target) < MAX_ERROR) {
        correct_iter += 1;
      }
      if (correct_iter >= CORRECT_NUM) {
        eventSourceRef.current.close();  // Close the SSE connection
        setIsRunning(false); 
      }
    };
    setIsRunning(true); 
    return () => {
      eventSourceRef.current.close();  // Close the SSE connection when the component unmounts
    };
  };

  const handleStopButtonClick = () => {
    eventSourceRef.current.close();  // Close the SSE connection
    setIsRunning(false);  // Update the state to indicate that the stream is no longer running
  };

  const calculateIndicatorPosition = () => {
    const minAngle = 0;
    const maxAngle = 90;
    const position = ((angle - minAngle) / (maxAngle - minAngle)) * 100;
    return position + '%';
  };

  const calculateTargetPosition = () => {
    const minAngle = 0;
    const maxAngle = 90;
    const position = ((target - minAngle) / (maxAngle - minAngle)) * 100;
    return position + '%';
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="25vh"
      >
        <Typography>Move hinge back to horizontal position then press calibrate</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: '1rem' }} onClick={handleButtonClick}>
          Calibrate
        </Button>
        <Button variant="contained" color="secondary" sx={{ marginTop: '1rem' }} onClick={handleStopButtonClick} disabled={!isRunning}>
          Stop Run
        </Button>
      </Box>
      <div className="rectangle-indicator">
        <div className="target-label">
          Target: {target}°
        </div>
        <div className="rectangle">
          <div
            className="vertical-line"
            style={{ left: calculateIndicatorPosition() }}
          ></div>
          <div className="target-indicator" style={{ left: calculateTargetPosition() }}></div>
        </div>
        <div className="angle-labels">
          <div className="angle-label">0°</div>
          <div className="angle-label">90°</div>
        </div>
        <div className="angle-input">
          <label>Enter Angle:</label>
          <input type="number" value={angle} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default RectangleIndicator;
