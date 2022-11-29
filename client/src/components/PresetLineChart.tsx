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
  const r = Math.round(Math.random() * 240); // Not using 255 to make darker colors
  const g = Math.round(Math.random() * 240);
  const b = Math.round(Math.random() * 240);
  return `rgb(${r}, ${g}, ${b})`;
}

interface PresetLineChartProps {
  datasets: {
    data: TimeValueObject[] | number[] | undefined;
    label: string;
    hidden?: boolean;
  }[];
  description: string;
  xScaleType: "time" | "linear" | "category";
  yScaleType?: "stacked";
  yScaleUnitText?: string;
  globalLabels?: string[];
  legendFontSize?: number;
}

export default function PresetLineChart({
  datasets,
  description,
  xScaleType,
  yScaleType,
  globalLabels,
  legendFontSize,
  yScaleUnitText,
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
  let yScaleConfig = {};
  if (yScaleType != undefined) {
    Object.assign(yScaleConfig, { stacked: true });
  }
  if (yScaleUnitText != undefined) {
    Object.assign(yScaleConfig, {
      title: {
        display: true,
        text: yScaleUnitText,
      },
    });
  }

  let lineGraphData = {
    labels: globalLabels,
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
      y: yScaleConfig,
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: legendFontSize ? legendFontSize : 12,
          },
        },
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
    elements: {
      line: {
        borderWidth: 1.5,
      },
    },
  };

  return (
    <div>
      <Line options={options} data={lineGraphData} />
    </div>
  );
}
