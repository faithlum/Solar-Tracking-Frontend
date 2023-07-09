import React, { useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
  useEffect(() => {
    makeRequest();
  }, []);

  const makeRequest = () => {
    axios
      .get('http://localhost:8000/api/')
      .then(response => {
        console.log(response.data); // Handle the response data
      })
      .catch(error => {
        console.error('Error:', error); // Handle any errors
      });
  };

  return <div>Your component content</div>;
};

export default YourComponent;
