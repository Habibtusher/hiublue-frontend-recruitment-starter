"use client";
import React from "react";
import dynamic from "next/dynamic";
import { days } from "@/constant/days";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ data }: any) => {
  const offersSent = data
    ? days.map((day) => data.offers_sent[day.toLowerCase()])
    : [];

  return (
    <Chart
      type="line"
      height={350}
      options={{
        chart: { id: "offers-sent", toolbar: { show: false } },
        xaxis: { categories: days },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 3 },
        colors: ["#333"],
        grid: {
          strokeDashArray: 4, // Makes horizontal lines dotted
        },
      }}
      series={[{ name: "Offers Sent", data: offersSent }]}
    />
  );
};

export default LineChart;
