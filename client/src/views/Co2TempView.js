import React, { useEffect, useState } from "react";
import V1V2 from "./visualizations/V1V2";
import V3V4 from "./visualizations/V3V4";

export default function Co2TempView() {
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        minWidth: "600px",
        width: "75%",
      }}
    >
      Co2TempView
      <V1V2 />
      <V3V4 />
    </div>
  );
}
