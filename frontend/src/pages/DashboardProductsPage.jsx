import React from "react";
import { DashboardProductsSection } from "../components";

const DashboardProductsPage = () => {
  return (
    <div className="p-10 flex flex-col gap-">
      <p className="text-3xl font-bold mb-3">All Products</p>
      <DashboardProductsSection />
    </div>
  );
};

export default DashboardProductsPage;
