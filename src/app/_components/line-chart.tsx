"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLivenessData } from "./liveness-data-context";
import { range } from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const ECGChart = () => {
  const livenessData = useLivenessData();
  const [dataLength, setDataLength] = useState(0);
  const [ecgData, setEcgData] = useState<number[]>(range(240).fill(0.25));

  useEffect(() => {
    const interval = setInterval(() => {
      const newLivenessData = livenessData.length > dataLength;
      if (newLivenessData) {
        setDataLength(livenessData.length);
      }
      updateECGData(
        newLivenessData ? [0.15, 0.5, 1, 0.05] : [0.25, 0.25, 0.25, 0.25],
      );
    }, 250);
    return () => clearInterval(interval);
  }, [dataLength, livenessData]);

  const updateECGData = (newValue: number[]) => {
    setEcgData((prevData) => {
      const newData = [...prevData.slice(newValue.length), ...newValue];
      return newData;
    });
  };

  const data = {
    labels: Array(240).fill(""),
    datasets: [
      {
        data: ecgData,
        fill: false,
        borderColor: "rgb(239, 68, 68)", // text-red-500
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    transitions: {
      active: {
        animation: {
          duration: 0,
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: 0,
        max: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 1.5,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="h-40 w-full border-2 border-red-500 bg-black p-2">
      <Line data={data} options={options} />
    </div>
  );
};

export default ECGChart;
