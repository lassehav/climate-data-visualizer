import React, { useEffect, useState } from "react";
import axios from "axios";
import PresetLineChart from "../../components/PresetLineChart";
import TimeValueObject from "../../types/TimeValueObject";

interface V1API {
  globalAnnualData: TimeValueObject[];
  globalMonthlyData: TimeValueObject[];
  southMonthlyData: TimeValueObject[];
  southAnnualData: TimeValueObject[];
  northMonthlyData: TimeValueObject[];
  northAnnualData: TimeValueObject[];
}

export default function V1V2() {
  const [v1GraphData, setV1GraphData] = useState<V1API>();
  const [v2GraphData, setV2GraphData] = useState<TimeValueObject[]>();

  useEffect(() => {
    async function getV1V2Data() {
      const response = await Promise.all([
        axios.get(process.env.REACT_APP_API_ADDRESS + "/api/climate/v1data"),
        axios.get(process.env.REACT_APP_API_ADDRESS + "/api/climate/v2data"),
      ]);
      setV1GraphData(response[0].data);
      setV2GraphData(response[1].data.v2data);
    }
    getV1V2Data();
  }, []);

  if (v1GraphData == undefined) {
    return null;
  }

  const lineGraphDatasets = [
    {
      label: "Global Annual",
      data: v1GraphData.globalAnnualData,
    },
    {
      label: "Global Monthly",
      data: v1GraphData.globalMonthlyData,
    },
    {
      label: "Southern Hemisphere Monthly",
      data: v1GraphData.southMonthlyData,
    },
    {
      label: "Southern Hemisphere Annual",
      data: v1GraphData.southAnnualData,
    },
    {
      label: "Northern Hemisphere Annual",
      data: v1GraphData.northAnnualData,
    },
    {
      label: "Northern Hemisphere Monthly",
      data: v1GraphData.northMonthlyData,
    },
    {
      label: "2000 year temperatures",
      data: v2GraphData,
      hidden: true,
    },
  ];

  return (
    <div>
      <PresetLineChart
        datasets={lineGraphDatasets}
        description="V1-V2 Temperature Anomalies from 1850 and proxy temperatures from 1AD"
        xScaleType="time"
        yScaleUnitText="Cº"
      />
    </div>
  );
}
