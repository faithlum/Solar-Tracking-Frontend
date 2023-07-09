import React, { useEffect, useState } from 'react';

const AxialTilt = () => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/api/');
    console.log(eventSource)
    console.log("hi")

    eventSource.onmessage = event => {
      const data = event.data;
      console.log(data)
      setOutput(prevOutput => prevOutput + data);  // Append the received data to the output state
    };


    return () => {
      eventSource.close();  // Close the SSE connection when the component unmounts
    };
  }, []);

  // Render the output in the UI
  return <div>{output}</div>;
};

export default AxialTilt;
