import React, { useEffect, useState } from "react";
import PresetLineChart from "../../components/PresetLineChart";
import TimeValueObject from "../../types/TimeValueObject";
import axios from "axios";

interface V6API extends Array<TimeValueObject> {}

export default function V6() {
  const [v6data, setV6data] = useState<V6API>();
  useEffect(() => {
    async function getV6data() {
      const results = await axios.get(
        process.env.REACT_APP_API_ADDRESS + "/api/climate/v6data"
      );
      setV6data(results.data.reverse());
    }
    getV6data();
  }, []);

  if (v6data == undefined || v6data == undefined) {
    return null;
  }
  const lineGraphData = [
    {
      label: "CO2 measurements",
      data: v6data,
    },
  ];

  return (
    <div>
      V6 Ice core 800k year composite study CO2 measurements
      <PresetLineChart
        datasets={lineGraphData}
        description="V6 Ice core 800k year composite study CO2 measurements "
        xScaleType="category"
        yScaleUnitText="CO2 ppm"
      />
    </div>
  );
}
