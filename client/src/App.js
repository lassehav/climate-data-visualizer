import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Co2TempView from "./views/Co2TempView";
import V3Visualization from "./views/visualizations/V3";

function App() {
  return (
    <div>
      Visualization app
      <Co2TempView />
    </div>
  );
}

export default App;
