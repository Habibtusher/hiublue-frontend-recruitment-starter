"use client";
import React from "react";
import dynamic from "next/dynamic";
import { days } from "@/constant/days";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const Barchart = ({ data }: any) => {
  const desktopVisits = data
    ? days.map((day) => data.website_visits[day.toLowerCase()].desktop)
    : [];
  const mobileVisits = data
    ? days.map((day) => data.website_visits[day.toLowerCase()].mobile)
    : [];

  return (
    <Chart
      type="bar"
      height={350}
      options={{
        chart: { id: "website-visits", toolbar: { show: false } },
        xaxis: { categories: days },
        dataLabels: { enabled: false },
        colors: ["#007867", "#FFAB00"],
        legend: {
          position: "top",
          horizontalAlign: "right",
        },
        grid: {
          strokeDashArray: 4,
        },
      }}
      series={[
        { name: "Desktop", data: desktopVisits },
        { name: "Mobile", data: mobileVisits },
      ]}
    />
  );
};

export default Barchart;
