import React, { useEffect, useState } from "react";
import {
  Chart,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
} from "chart.js";
import { Chart as ReactChart, Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import zoomPlugin from "chartjs-plugin-zoom";
import TimeValueObject from "../types/TimeValueObject";

function generateRGBColor() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

interface PresetLineChartProps {
  datasets: {
    data: TimeValueObject[] | undefined;
    label: string;
    hidden?: boolean;
  }[];
  description: string;
  xScaleType: "time" | "linear" | "category";
}

export default function PresetLineChart({
  datasets,
  description,
  xScaleType,
}: PresetLineChartProps) {
  Chart.register(
    zoomPlugin,
    LinearScale,
    CategoryScale,
    PointElement,
    Tooltip,
    Legend,
    TimeScale,
    LineElement
  );

  if (datasets.length == 0) {
    return null;
  }
  const lineGraphData = {
    datasets: datasets.map((d) => {
      return {
        label: d.label,
        data: d.data,
        borderColor: generateRGBColor(),
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
        hidden: d.hidden ? d.hidden : false,
      };
    }),
  };

  const options: any = {
    responsive: true,
    scales: {
      x: {
        type: xScaleType,
        time: {
          unit: "month",
          tooltipFormat: "dd.mm.yyyy",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: description,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "xy",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
    },
  };

  return (
    <div>
      <Line options={options} data={lineGraphData} />
    </div>
  );
}
