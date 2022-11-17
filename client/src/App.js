import "./App.css";
import { useState, useEffect } from "react";

import Co2TempView from "./views/Co2TempView";

function App() {
  return (
    <div>
      Visualization app
      <Co2TempView />
    </div>
  );
}

export default App;
