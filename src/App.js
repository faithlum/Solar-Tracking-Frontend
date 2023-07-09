import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RectangleIndicator from './Components/AngleVisualizer';
import AxialTilt from './Components/AxialTilt';
import UserInputForm from './Components/UserInput';
import Calibrate from './Components/Calibration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/visualize" element={<RectangleIndicator/>} />  
        <Route path="/input" element={<UserInputForm/>} />
        {/* <Route path="/calibrate" element={<Calibrate/>} /> */}
        {/* <Route path="/contact" component={Contact} /> */}
      </Routes>
    </Router>
  );
};

export default App;
