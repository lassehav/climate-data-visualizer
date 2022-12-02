import React, { useEffect, useState } from "react";
import {
  Chart,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend,  
  LineElement,
} from "chart.js";
import { Chart as ReactChart, Line } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import zoomPlugin from "chartjs-plugin-zoom";
import TimeValueObject from "../../types/TimeValueObject";
import axios from "axios";

interface V7API {
  v7co2: TimeValueObject[];
  v7gast: TimeValueObject[];
}

function convertToNumberTime(o : TimeValueObject) {
  return {
          time: parseInt(o.time),
          value: o.value
        } 
}

export default function V7() {
  const [v7Co2Data, setV7Co2Data] = useState<any[]>();
  const [v7GastData, setV7GastData] = useState<any[]>();
  useEffect(() => {
    async function getV7data() {
      const results = await axios.get(
        process.env.REACT_APP_API_ADDRESS + "/api/climate/v7data"
      );      
      setV7Co2Data(results.data.v7co2.map((d: TimeValueObject) => convertToNumberTime(d)));
      setV7GastData(results.data.v7gast.map((d: TimeValueObject) => {
        return {
          time: 1950 - parseInt(d.time),
          value: d.value
        }
      }));
    }
    
    getV7data();
  }, []);

  Chart.register(
    zoomPlugin,
    LinearScale, 
    CategoryScale,   
    PointElement,
    Tooltip,
    Legend,    
    LineElement
  );

  if (v7Co2Data == undefined || v7GastData == undefined) {
    return null;
  }
  const data = {
    datasets: [
      {
        label: "Co2 ppm",
        data: v7Co2Data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "co2",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "Temperature Change",
        data: v7GastData,
        borderColor: "rgb(99, 132, 255)",
        backgroundColor: "rgba(99, 132, 255, 0.5)",
        yAxisID: "temperature",
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 1,
      },
      {
        label: "History",
        data: [
          {
            time: 1500,
            value: 1,
            text: "crop failures across the northern hemisphere caused by volcanic eruptions in Iceland; then bubonic plague (536-547) → century of economic stagnation"
          },
          {
            time: -4800,
            value: 1,     
            text: "global population of humans passes 50 million; annual energy use per person averages 2,100 kWh, 3× the resting metabolism"  
          },
          {
            time: -41500,
            value: 1, 
            text: "most recent reversal of Earth’s magnetic poles, lasting 500 years, decreasing stratospheric ozone, driving global climate shifts and extinction events"  
          },
          {
            time: -450000,
            value: 1,
            text: "rise of Homo neanderthalensis across Europe"
          },
          {
            time: -1500000,
            value: 1,
            text: "earliest control of fire, by Homo erectus (Koobi Fora, Kenya): uniquely human capability → extending the day with firelight; improving nutrient uptake with cooked food"
          }

        ],
        borderColor: "rgb(255, 132, 99)",
        backgroundColor: "rgba(255, 132, 99, 0.5)",  
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        pointRadius: 10,
        showLine: false,
        yAxisID: "temperature",
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "2m and 800k year plots of Co2 ppm and Surface Temperature Change",
      },
      tooltip: {
        callbacks: {
            label: function(context : any) {        

              if(context.dataset.label == "History") {              
                return context.raw.text;
              } else {
                return context.formattedValue;
              }                            
            },
            title: function(context : any) {
              if(context.length > 0) {
                return "Year " + context[0].label;
              }
              else {
                return "";
              }            
            }
        }
      }
    },
    scales: {
      co2: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: 'CO2 ppm',
        },
      },
      temperature: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: 'Temperature anomaly Cº',
        },
      },
      x: {
        type: "linear",
        max: 2022,
        title: {
          display: true,
          text: 'Time in years',
        },
      }
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
  };

  return (
    <div>
        <Line options={options} data={data} />
    </div>
  );
}
