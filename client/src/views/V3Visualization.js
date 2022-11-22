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

const data = [
  {
    date: "1958-03-01",
    co2ppm: 315.7,
  },
  {
    date: "1958-04-01",
    co2ppm: 315.45,
  },
  {
    date: "1958-05-01",
    co2ppm: 315.51,
  },
  {
    date: "1958-06-01",
    co2ppm: 315.24,
  },
  {
    date: "1958-07-01",
    co2ppm: 315.86,
  },
  {
    date: "1958-08-01",
    co2ppm: 315.93,
  },
  {
    date: "1958-09-01",
    co2ppm: 315.2,
  },
  {
    date: "1958-10-01",
    co2ppm: 315.43,
  },
];

export default function V3Visualization() {
  Chart.register(
    zoomPlugin,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale,
    LineElement
  );

  const lineGraphData = {
    datasets: [
      {
        label: "Annual",
        data: data,
        borderColor: "rgb(0, 0, 0)",
        parsing: {
          xAxisKey: "date",
          yAxisKey: "co2ppm",
        },
        pointRadius: 1,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mauna Loa Co2 measurements",
      },
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
      V3 Hawaii Co2 measurements
      <Line options={graphOptions} data={lineGraphData} />
    </div>
  );
}
