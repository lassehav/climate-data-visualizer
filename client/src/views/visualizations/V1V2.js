import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
} from "chart.js";
import { Chart as ReactChart, Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import "chartjs-adapter-luxon";
import zoomPlugin from "chartjs-plugin-zoom";

function convertToLuxonTimeAnnualFormat(dataObj) {
  return { ...dataObj, time: DateTime.fromObject({ year: dataObj.time }) };
}

function convertToLuxonTimeMonthlyFormat(dataObj) {
  return {
    ...dataObj,
    time: DateTime.fromObject({
      year: dataObj.time.substr(0, 4),
      month: dataObj.time.substr(5, 2),
    }),
  };
}

export default function Co2TempView() {
  const [v1GraphData, setV1GraphData] = useState([]);
  const [v2GraphData, setV2GraphData] = useState([]);

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

  Chart.register(
    zoomPlugin,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale,
    LineElement
  );

  if (v1GraphData.length == 0) {
    return null;
  }

  const lineGraphData = {
    datasets: [
      {
        label: "Global Annual",
        data: v1GraphData.globalAnnualData.map((d) =>
          convertToLuxonTimeAnnualFormat(d)
        ),
        borderColor: "rgb(0, 0, 0)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "Global Monthly",
        data: v1GraphData.globalMonthlyData.map((d) =>
          convertToLuxonTimeMonthlyFormat(d)
        ),
        borderColor: "rgb(30, 30, 30)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "Southern Hemisphere Monthly",
        data: v1GraphData.southMonthlyData.map((d) =>
          convertToLuxonTimeMonthlyFormat(d)
        ),
        borderColor: "rgb(200, 50, 50)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "Southern Hemisphere Annual",
        data: v1GraphData.southAnnualData.map((d) =>
          convertToLuxonTimeAnnualFormat(d)
        ),
        borderColor: "rgb(200, 50, 50)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "Northern Hemisphere Annual",
        data: v1GraphData.northAnnualData.map((d) =>
          convertToLuxonTimeAnnualFormat(d)
        ),
        borderColor: "rgb(50, 50, 200)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "Northern Hemisphere Monthly",
        data: v1GraphData.northMonthlyData.map((d) =>
          convertToLuxonTimeMonthlyFormat(d)
        ),
        borderColor: "rgb(50, 50, 200)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "2000 year temperatures",
        data: v2GraphData,
        borderColor: "rgb(255, 20, 20)",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature Anomalies from 1850 and proxy temperatures from 1AD",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "xy",
          speed: 100,
        },
        pan: {
          enabled: true,
          mode: "xy",
          speed: 100,
        },
      },
    },
  };

  return (
    <div>
      V1V2
      <Line options={graphOptions} data={lineGraphData} />
    </div>
  );
}
