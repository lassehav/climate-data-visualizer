import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Co2TempView from "./views/Co2TempView";
import V3Visualization from "./views/V3Visualization";

function App() {
  const [v1GraphData, setV1GraphData] = useState([]);

  useEffect(() => {
    async function getV1Data() {
      const response = await axios.get(
        process.env.REACT_APP_API_ADDRESS + "/api/climate/v1data"
      );
      setV1GraphData(response.data);
    }
    getV1Data();
  }, []);

  return (
    <div>
      Visualization app
      <V3Visualization />
    </div>
  );
}

export default App;
