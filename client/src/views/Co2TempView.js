import React, { useEffect, useState } from "react";
import V1V2 from "./visualizations/V1V2";
import V3 from "./visualizations/V3";

export default function Co2TempView() {
  return (
    <div>
      Co2TempView
      <V1V2 />
      <V3 />
    </div>
  );
}
