import React, { useEffect } from "react";
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

export default function Co2TempView({ dataset }) {
  Chart.register(
    zoomPlugin,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale,
    LineElement
  );

  if (dataset.length == 0) {
    return null;
  }

  const lineGraphData = {
    datasets: [
      {
        label: "Global Annual",
        data: dataset.globalAnnualData.map((d) =>
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
        data: dataset.globalMonthlyData.map((d) =>
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
        data: dataset.southMonthlyData.map((d) =>
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
        data: dataset.southAnnualData.map((d) =>
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
        data: dataset.northAnnualData.map((d) =>
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
        data: dataset.northMonthlyData.map((d) =>
          convertToLuxonTimeMonthlyFormat(d)
        ),
        borderColor: "rgb(50, 50, 200)",
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
        text: "Temperature Anomalies from 1850",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
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
      Co2TempView
      <Line options={graphOptions} data={lineGraphData} />
    </div>
  );
}
