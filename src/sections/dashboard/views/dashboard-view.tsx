"use client";

import DashboardSummary from "./dashboard-summary";
import OffersTable from "./offer-list";

export default function DashboardView() {
  return (
    <>
      <DashboardSummary />
      <OffersTable />
    </>
  );
}
