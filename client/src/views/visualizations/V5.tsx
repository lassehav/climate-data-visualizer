import React, { useEffect, useState } from "react";
import PresetLineChart from "../../components/PresetLineChart";
import TimeValueObject from "../../types/TimeValueObject";
import axios from "axios";

interface V5API extends Array<TimeValueObject> {}

export default function V5() {
  const [v5data, setV5data] = useState<V5API>();
  useEffect(() => {
    async function getV5data() {
      const results = await axios.get(
        process.env.REACT_APP_API_ADDRESS + "/api/climate/v5data"
      );
      setV5data(results.data.reverse());
    }
    getV5data();
  }, []);

  if (v5data == undefined || v5data == undefined) {
    return null;
  }
  const lineGraphData = [
    {
      label: "CO2 measurements",
      data: v5data,
    },
  ];

  return (
    <div>
      V5 Vostok Ice Core CO2 measurements
      <PresetLineChart
        datasets={lineGraphData}
        description="V5 Vostok Ice Core CO2 measurements"
        xScaleType="category"
        yScaleUnitText="Co2 ppm"
      />
    </div>
  );
}
