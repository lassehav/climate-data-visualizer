import React, { useEffect, useState } from "react";
import V1V2 from "./visualizations/V1V2";
import V3V4 from "./visualizations/V3V4";
import V5 from "./visualizations/V5";
import V6 from "./visualizations/V6";
import V7 from "./visualizations/V7";
import V8 from "./visualizations/V8";

export default function Co2TempView() {
  /*
      

      
*/

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        minWidth: "600px",
        width: "85%",
        position: "relative",
      }}
    >
      Co2TempView
      <V1V2 />
      <V3V4 />
      <V5 />
      <V6 />
      <V7 />
      <div>Emissions</div>
      <V8 />
    </div>
  );
}
