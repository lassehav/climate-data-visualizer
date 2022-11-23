import React, { useEffect,  useState } from "react";
import PresetLineChart from "../../components/PresetLineChart";
import TimeValueObject from '../../types/TimeValueObject'
import axios from "axios";


interface V3API {
  co2annual: TimeValueObject[],
  co2monthly: TimeValueObject[],
}
interface V4API {
  v4de08: TimeValueObject[],
  v4de0802: TimeValueObject[],
  v4dss: TimeValueObject[]
}

export default function V3V4() {
  const [v3data, setV3data] = useState<V3API>();
  const [v4data, setV4data] = useState<V4API>();
  useEffect(() => {
    async function getV3V4data() {
      const results = await Promise.all([
        axios.get(process.env.REACT_APP_API_ADDRESS + "/api/climate/v3data"),
        axios.get(process.env.REACT_APP_API_ADDRESS + "/api/climate/v4data")
      ]);      
      setV3data(results[0].data);
      setV4data(results[1].data);
    }
    getV3V4data();
  }, [])

  if((v3data == undefined) || (v4data == undefined)) {
    return null;
  }

  const lineGraphData = [
    {
      label: "Annual CO2 measurements",
      data: v3data.co2annual,
    },
    {
      label: "Monthly CO2 measurements",
      data: v3data.co2monthly,
    },
    {
      label: "Ice Core DE08 Measurements",
      data: v4data.v4de08
    },
    {
      label: "Ice Core DE08-02 Measurements",
      data: v4data.v4de0802
    },
    {
      label: "Ice Core DSS Measurements",
      data: v4data.v4dss
    },
  ];

  return (
    <div>
      V3V4 Hawaii Co2 measurements + Ice Core measurements
      <PresetLineChart
        datasets={lineGraphData}
        description="V3 Mauna Loa Co2 measurements"
        xScaleType="time"
      />
    </div>
  );
}